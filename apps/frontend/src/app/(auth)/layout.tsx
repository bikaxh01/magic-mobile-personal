import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className=" flex items-center justify-center h-screen w-screen">
      {children}
    </div>
  );
}

export default layout;
