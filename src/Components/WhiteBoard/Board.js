import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const Board = ({ color, size }) => {
  const socketRef = useRef();
  const canvasRef = useRef();
  let ctx;

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.7;

    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    socketRef.current = io.connect(
      "https://edu-trio-dynamix-server.onrender.com"
    );
    socketRef.current.on("canvas-data", (data) => {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
      image.src = data;
    });

    return () => socketRef.current.disconnect();
  }, [color, size]);

  const onMouseDown = (e) => {
    const { clientX, clientY } = e;
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);

    canvasRef.current.addEventListener("mousemove", onMouseMove);
    canvasRef.current.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    if (socketRef.current) {
      const canvasData = canvasRef.current.toDataURL("image/png");
      socketRef.current.emit("canvas-data", canvasData);
    }
  };

  const onMouseUp = () => {
    canvasRef.current.removeEventListener("mousemove", onMouseMove);
    canvasRef.current.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="sketch">
      <canvas
        ref={canvasRef}
        className="board"
        id="board"
        onMouseDown={onMouseDown}
      ></canvas>
    </div>
  );
};

export default Board;
