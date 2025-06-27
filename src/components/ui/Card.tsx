import React, { ReactNode, HTMLAttributes } from 'react';

// Componente Card estandarizado
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'highlight' | 'subtle' | 'accent';
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  // Estilos base
  const baseStyles = "rounded-lg overflow-hidden transition-all duration-300";
  
  // Variantes
  const variants = {
    default: "bg-white shadow-md hover:shadow-lg",
    highlight: "bg-white border-l-4 border-[#2DB292] shadow-md hover:shadow-lg",
    subtle: "bg-[#F8F9FA] shadow-sm hover:shadow",
    accent: "bg-[#F0F9F6] shadow-sm hover:shadow"
  };
  
  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};