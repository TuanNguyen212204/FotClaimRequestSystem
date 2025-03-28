import { JSX } from "react";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        className="group block px-3 py-2 text-2xl font-bold text-white no-underline decoration-4 underline-offset-4"
      >
        {children}
        <span className="block h-[5px] max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
      </a>
    </li>
  );
}

export default function TopBar(): JSX.Element {
  return (
    <header className="container mx-auto flex w-full items-center justify-center p-4">
      <nav>
        <ul className="flex list-none space-x-2 md:space-x-4">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#feature">Feature</NavLink>
          <NavLink href="#contact">Contact Us</NavLink>
        </ul>
      </nav>
    </header>
  );
}
