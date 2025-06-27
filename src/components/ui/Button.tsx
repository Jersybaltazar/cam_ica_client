import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  className = '',
  ...props 
}) => {
  // Estilos base
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-md";
  
  // Variantes
  const variants = {
    primary: "bg-[#154E40] text-white hover:bg-[#2DB292] shadow-sm",
    secondary: "bg-[#2DB292] text-white hover:bg-[#154E40] shadow-sm",
    outline: "bg-transparent border-2 border-[#2DB292] text-[#2DB292] hover:bg-[#2DB292] hover:text-white",
    text: "bg-transparent text-[#2DB292] hover:underline",
    accent: "bg-[#FFA92B] text-white hover:bg-[#e69518] shadow-sm",
    ghost: "bg-[rgba(255,255,255,0.2)] text-white border border-white hover:bg-[rgba(45,178,146,0.7)] hover:border-[#2DB292]"
  };
  
  // Tamaños
  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-6 py-2.5",
    lg: "text-base px-8 py-3.5"
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ fontFamily: 'Montserrat' }}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;