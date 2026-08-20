"use client";
import { useAuthStore } from "@/store/auth.js";
import { useRouter } from "next/navigation";
import React from "react";

// children are expecetyd argument in layout
const Layout = ({ children }) => {
  const { session } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <div>
      {/* everything from login and signup will load in children */}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
