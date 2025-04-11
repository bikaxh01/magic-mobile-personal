import React from "react";

function CodeBlock() {
  const url = `${process.env.NEXT_PUBLIC_WORKER_BACKEND_URL}8080`;

  return (
    <div className=" h-screen w-full p-2">
      <iframe src={url} className=" h-screen w-full"></iframe>
    </div>
  );
}

export default CodeBlock;
