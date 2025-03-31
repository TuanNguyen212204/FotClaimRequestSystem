import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-md shadow-md mb-6 p-6 transition-shadow duration-300 ease-in-out hover:shadow-lg box-border">
      {children}
    </div>
  );
};

export default Card;
