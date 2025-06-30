import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  ...props
}) => (
  <button
    className={`px-4 py-2 rounded-lg transition duration-200 flex items-center bg-gray-900 text-white hover:bg-gray-800 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;