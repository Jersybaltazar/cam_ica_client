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
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  // Estilos base
  const baseStyles = "font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center";
  
  // Variantes de estilo
  const variantStyles = {
    primary: "bg-[#154E40] text-white hover:bg-[#2DB292] focus:ring-2 focus:ring-offset-2 focus:ring-[#154E40]",
    secondary: "bg-[#FFA92B] text-white hover:bg-[#e69518] focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA92B]",
    outline: "bg-transparent border-2 border-[#2DB292] text-[#2DB292] hover:bg-[#2DB292] hover:text-white",
    text: "bg-transparent text-[#154E40] hover:bg-[#f0f0f0]"
  };
  
  // Tamaños
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "px-4 py-2",
    lg: "text-lg px-6 py-3"
  };
  
  // Ancho completo
  const widthStyles = fullWidth ? "w-full" : "";
  
  // Estilo deshabilitado
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
      style={{ fontFamily: 'Montserrat' }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;