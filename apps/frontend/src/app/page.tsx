import NavBar from "@/components/global/nav";
import Prompt from "@/components/global/prompt";

import Image from "next/image";

export default function Home() {
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
