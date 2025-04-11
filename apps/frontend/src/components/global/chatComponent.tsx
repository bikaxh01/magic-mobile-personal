"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";

interface Message {
  id: string;
  content: string;
  role: "AI" | "USER";
}

function ChatComponent({ projectId }: { projectId: string }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessage] = useState<Message[] | []>([]);
  const [initialPrompt, setInitialPrompt] = useState(
    localStorage.getItem("Initial-prompt")
  );

  async function sendPrompt(prompt: string, projectId: string) {
    setMessage((prev) => [
      ...prev,
      { content: prompt, id: Math.random().toString(), role: "USER" },
    ]);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_WORKER_BACKEND_URL}8000/prompt`,{
        projectId,
        prompt
      }
    );
    console.log("🚀 ~ sendPrompt ~ res:", res)
    setMessage((prev) => [
      ...prev,
      { content: "Done", id: Math.random().toString(), role: "AI" },
    ]);
  }
  useEffect(() => {}, [projectId]);

  useEffect(() => {
    console.log("🚀 ~ page ~ initialPrompt:", initialPrompt);
    // req to worker
    if (initialPrompt) {
      (async function () {
        await sendPrompt(initialPrompt, projectId);
        localStorage.setItem("Initial-prompt", "");
        setInitialPrompt("");
      })();
    }

    //clear local storage
  }, [initialPrompt]);

  const handleClick = async () => {
    sendPrompt(prompt, projectId);
  };
  return (
    <div className="  h-full flex flex-col justify-between">
      <div className="  h-[40rem] overflow-auto">
        {messages.map((message: Message) => {
          return (
            <>
              <div key={message.id} className=" flex flex-col gap-2">
                <h1 className=" text-sm">{message.role.toLocaleLowerCase()}</h1>
                <h2>{message.content}</h2>
              </div>
            </>
          );
        })}
      </div>

      <div className=" flex flex-col gap-2">
        <input
          type="text"
          value={prompt}
          className=" h-12 border rounded-md"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={handleClick} className=" w-full">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ChatComponent;
