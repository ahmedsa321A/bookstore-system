import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps {
    label?: string;
    id: string;
    name: string;
    type?: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    compact?: boolean;
    rows?: number;
    error?: string;
    showPassword?: boolean;
    onTogglePassword?: () => void;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    id,
    name,
    type = "text",
    value,
    placeholder,
    rows,
    compact,
    error,
    showPassword,
    onTogglePassword,
    onChange,
}) => {
    const isPassword = type === "password";

    const baseClasses = compact ?
        "w-full px-2 py-1 text-sm bg-input-background rounded border focus:outline-none" :
        "w-full px-4 py-3 bg-input-background rounded-lg border focus:outline-none transition-colors";

    const borderClasses = error
        ? "border-red-500 focus:border-red-500"
        : "border-transparent focus:border-primary";

    return (
        <div className="space-y-1">

            {label &&
                <label htmlFor={id} className="block mb-2">
                    {label}
                </label>
            }
            <div className="relative">
                {rows ? (
                    <textarea
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        rows={rows}
                        placeholder={placeholder}
                        className={`${baseClasses} ${borderClasses}`}
                    />
                ) : (
                    <input
                        id={id}
                        name={name}
                        type={isPassword && showPassword ? "text" : type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`${baseClasses} ${borderClasses} ${isPassword ? "pr-10" : ""
                            }`}
                    />
                )}

                {/* 👁 Password Toggle */}
                {isPassword && onTogglePassword && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>

            {/* Error Text */}
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default FormInput;
