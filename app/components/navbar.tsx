import Link from "next/link";
import { ModeToggle } from "./Toggle";

export default function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-evenly max-w mx-auto px-4 py-5">
      <Link href={"/"} className="font-bold text-3xl">
        Raj <span className="text-primary">Blog</span>
      </Link>
      <ModeToggle />
    </nav>
  );
}
