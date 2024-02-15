import React from "react";
import Board from "./Board";

const Container = () => {
  return (
    <div className="bg-gradient-to-r from-neutral via-blue-100 to-neutral">
      <div className="flex justify-center items-center h-screen">
        <div className="border border-gray-500 p-8">
          <div className="flex justify-center mb-4">
            <div className="mr-4">
              <label htmlFor="colorPicker" className="mr-2">
                Select Brush Color:
              </label>
              <input id="colorPicker" type="color" className="rounded" />
            </div>
            <div>
              <label htmlFor="brushSize" className="mr-2">
                Select Brush Size:
              </label>
              <select id="brushSize" className="rounded">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <Board />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
