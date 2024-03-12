import { Box, Modal } from "@mui/material";
import Inbox from "./Inbox";
import React, { useState } from "react";
import { Mic } from "lucide-react";
import Dictaphone from "./Dictaphone";
import runChat from "./utils/gemini";

function ChatContainer() {
  const [history, setHistory] = React.useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user !== "") {
      await runChat(history, user).then((res) => {
        console.log(res);
        setHistory((old) => [
          ...old,
          {
            role: "user",
            parts: [user],
          },
          {
            role: "model",
            parts: [res],
          },
        ]);
      });
    }

    // console.log(process.env.REACT_APP_API_KEY)

    setUser("");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    p: 4,
    backgroundColor: "transparent",
    borderRadius: "10px",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div class="flex flex-col  min-h-screen w-[90%] m-auto rounded-lg">
      <div class="flex-1 border-t border-[#3e3e3e] grid w-full">
        <div class="flex flex-col w-full min-h-0">
          <div class="bg-[#1B1F22] text-white grid/rows-2 border-b border-[#3e3e3e] px-4 py-2 gap-2">
            <div class="text-sm font-semibold">Chat</div>
            <div class="text-xs text-gray-500 ">You can text or talk</div>
          </div>
          <div class="bg-[#17181F] flex-1 flex flex-col justify-end p-4 gap-4 transition-all">
            {history.map((item, index) => {
              return (
                <Inbox
                  key={index}
                  type={item.role === "user" ? 1 : 2}
                  text={item.parts[0]}
                />
              );
            })}
          </div>
          <div class="bg-[#17181F] flex items-center gap-2 p-2">
            <textarea
              value={user}
              onChange={(e) => setUser(e.target.value)}
              class="
                    p-10
                    bg-[#111317] rounde-xl text-white outline-none flex w-full   px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 min-h-[20px] flex-1"
              placeholder="Type a message..."
            ></textarea>
            <button
              onClick={handleOpen}
              class="rounded-full inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-neutral-foreground hover:bg-primary/90 h-10 w-10 hover:bg-black hover:rounded-full text-white hover:text-[#b2b2b2]"
            >
              <Mic className=" " />
            </button>

            <button
              disabled={user === ""}
              onClick={handleSubmit}
              class="rounded-full hover:bg-black hover:rounded-full text-white hover:text-[#b2b2b2] inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-neutral-foreground hover:bg-primary/90 h-10 w-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-4 h-4"
              >
                <path d="m22 2-7 20-4-9-9-4Z"></path>
                <path d="M22 2 11 13"></path>
              </svg>
              <span class="sr-only">Send</span>
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="grid place-content-center">
            <Dictaphone
              history={history}
              setHistory={setHistory}
              loading={loading}
              setLoading={setLoading}
              speaking={speaking}
              setSpeaking={setSpeaking}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ChatContainer;
