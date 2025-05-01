import NavBar from "@/components/global/nav";
import Prompt from "@/components/global/prompt";
import { getAuth } from "@clerk/nextjs/server";

import Image from "next/image";

export default async function Home() {

  return (
    <>
      <div className="  h-full">
        <NavBar />
        <div className=" ">
          <Prompt />
        </div>
      </div>
    </>
  );
}
