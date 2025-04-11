import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
function NavBar() {
  return (
    <div className=" w-full bg-green-200 flex justify-between p-4">
      <div>LOGO</div>
      <div className=" flex gap-2">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default NavBar;
