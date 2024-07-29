"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem
          className={`hover:bg-gray-300/80 dark:hover:bg-gray-600/80 ${
            theme === "light" ? "bg-gray-300 dark:bg-gray-600" : ""
          }`}
          onClick={() => setTheme("light")}
        >
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`hover:bg-gray-300/80 dark:hover:bg-gray-600/80 ${
            theme === "dark" ? "bg-gray-300 dark:bg-gray-600" : ""
          }`}
          onClick={() => setTheme("dark")}
        >
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`hover:bg-gray-300/80 dark:hover:bg-gray-600/80 ${
            theme === "system" ? "bg-gray-300 dark:bg-gray-600" : ""
          }`}
          onClick={() => setTheme("system")}
        >
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
