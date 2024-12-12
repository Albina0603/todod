"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Plus, Search } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-2 bg-background text-foreground">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="text-foreground hover:bg-accent">
            Today
          </Button>
        </div>

        <div className="flex-1 max-w-md px-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full bg-muted text-foreground placeholder-muted-foreground border-none pl-8 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Hi, {session?.user.name}</span>
          <Button className="w-full" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </nav>
    </>
  );
}
