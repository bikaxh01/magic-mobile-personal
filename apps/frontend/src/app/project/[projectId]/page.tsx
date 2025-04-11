
import ChatComponent from "@/components/global/chatComponent";
import CodeBlock from "@/components/global/iFrame";
import React from "react";

async function page({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;


  return (
    <div className=" grid grid-cols-12 ">
      <div className=" col-span-5 w-full h-full">
        {" "}
        <ChatComponent projectId={projectId}/>
      </div>
      <div className=" col-span-7 w-full h-full">
        {" "}
        <CodeBlock />
      </div>
    </div>
  );
}

export default page;
