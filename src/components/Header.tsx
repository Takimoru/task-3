import React from "react";
import { DialogDemo } from "./Dialog";

interface HeaderProps {
  title?: string;
  onAddPost: (post: { title: string; content: string }) => void;
}

const Header: React.FC<HeaderProps> = ({ title = "My App", onAddPost }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      <h1 className="text-xl font-bold">{title}</h1>

      <nav className="flex gap-4">
        <a href="#" className="hover:text-gray-300 transition">
          Home
        </a>
        <a href="#" className="hover:text-gray-300 transition">
          About
        </a>
        <a href="#" className="hover:text-gray-300 transition">
          Contact
        </a>
      </nav>

      <DialogDemo onAddPost={onAddPost} />
    </header>
  );
};

export default Header;
