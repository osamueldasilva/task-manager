import { ModeToggle } from "@/components/dark-mode/dark-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Quicksand } from "next/font/google";
import { mockDataUser } from "../mocks/teste";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function Header() {
  const data = mockDataUser;

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

  const initials = getInitials(data.name);

  return (
    <header className="px-6 py-2 flex justify-between">
      <h1 className={`text-3xl font-semibold ${quicksand.className}`}>
        TaskMaster
      </h1>
      <div className="flex gap-2 items-center">
        <Button variant="outline" size="icon" className="rounded-full">
          {initials}
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}
