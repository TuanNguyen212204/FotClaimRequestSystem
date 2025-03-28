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
      <a href={href} className="block px-3 py-2 text-white hover:text-gray-300">
        {children}
      </a>
    </li>
  );
}

export default function TopBar(): JSX.Element {
  return (
    <header className="container mx-auto flex w-full items-center justify-between p-4">
      <div className="text-2xl font-bold text-white">FCT</div>

      <nav>
        <ul className="flex space-x-2 md:space-x-4">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#feature">Feature</NavLink>
          <NavLink href="#contact">Contact Us</NavLink>
        </ul>
      </nav>
    </header>
  );
}
