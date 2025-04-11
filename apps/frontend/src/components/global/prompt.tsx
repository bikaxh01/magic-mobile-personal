"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { PRIMARY_BACKEND_URL } from "@/config/config";

import { useAuth, useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

function Prompt() {
  const [prompt, setPrompt] = useState("");

  const { getToken } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Clicked");

    try {
      const token = await getToken();
      const res = await axios.post(
        `${PRIMARY_BACKEND_URL}/create-project`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("Initial-prompt", prompt);
      router.push(`/project/${res.data.data.id}`);
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
  return (
    <div className=" flex items-center flex-col justify-center h-full">
      <textarea
        className="  w-[12rem]"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

export default Prompt;
