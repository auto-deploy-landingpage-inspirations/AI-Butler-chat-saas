"use client";

import AddEditNoteDialog from "@/components/notes/AddEditNoteDialog";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Bot, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { redirect, useRouter } from "next/navigation";
import CategorySelector from "@/components/CategorySelector";

const Navbar = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="h-16 p-4 shadow">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <Link href="/dashboard" className="flex items-center gap-1">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
              <span className="font-bold">AI-Butler</span>
            </Link>
            <CategorySelector />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                  avatarBox: {
                    width: "2.5rem",
                    height: "2.5rem",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
