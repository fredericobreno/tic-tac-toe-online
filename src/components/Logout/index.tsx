'use client'

import { signOut } from "next-auth/react";
import { Button } from "../Button";

export const Logout = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
}
