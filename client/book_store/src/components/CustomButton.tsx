import React from 'react';
import { Loader2 } from 'lucide-react'; 

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    icon?: React.ElementType; 
}

export const CustomButton = ({
    children,
    isLoading = false,
    icon: Icon,
    className = "",
    disabled,
    ...props
}: CustomButtonProps) => {
    return (
        <button
            disabled={isLoading || disabled}
            className={`
        w-full py-3 rounded-lg text-white flex items-center justify-center gap-2 transition-colors
        bg-primary hover:bg-primary/90
        ${isLoading || disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                Icon && <Icon className="h-5 w-5" />
            )}

            {children}
        </button>
    );
};