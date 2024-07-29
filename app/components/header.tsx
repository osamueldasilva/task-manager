"use client";

import { useState, useEffect, use } from "react";
import { ModeToggle } from "@/components/dark-mode/dark-mode";
import { Button } from "@/components/ui/button";
import { Quicksand } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function Header() {
  const pathName = usePathname();
  const session = useSession();
  const { push } = useRouter();

  function getInitials(name: string) {
    const names = name.split(" ");

    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    if (names.length >= 3) {
      return `${names[0].charAt(0).toUpperCase()}${names[1]
        .charAt(0)
        .toUpperCase()}`;
    }

    return `${names[0].charAt(0).toUpperCase()}${names[1]
      .charAt(0)
      .toUpperCase()}`;
  }

  const initials = getInitials(session.data?.user?.name ?? "");

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`px-6 py-2 flex justify-between items-center transition-all duration-500 ${
        isSticky &&
        "sticky top-0 backdrop-filter backdrop-blur-md bg-transparent shadow-lg z-10"
      }  ${pathName === "/login" || pathName === "/register" ? "hidden" : ""}`}
    >
      <h1
        className={`text-3xl font-semibold ${quicksand.className} cursor-pointer`}
        onClick={() => push("/task")}
      >
        TaskMaster
      </h1>
      <div className="flex gap-2 items-center">
        <Button variant="outline" size="icon" className="rounded-full">
          {initials}
        </Button>

        <ModeToggle />
        <Button variant="outline" size="icon" className="rounded-full">
          <LogOut
            className="h-[1.2rem] w-[1.2rem]"
            onClick={() => signOut({ callbackUrl: "/login" })}
          />
        </Button>
      </div>
    </header>
  );
}
