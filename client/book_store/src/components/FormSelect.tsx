import React from "react";

interface SelectOption {
    label: string;
    value: string;
}

interface FormSelectProps {
    label: string;
    id: string;
    name: string;
    value: string | string[];
    options: SelectOption[];
    multiple?: boolean;
    compact?: boolean;
    error?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
    label,
    id,
    name,
    value,
    options,
    compact,
    multiple = false,
    error,
    required,
    onChange,
}) => {
    const baseClasses = compact ? "w-full px-2 py-1 text-sm bg-input-background rounded border focus:outline-none" :
        "w-full px-4 py-3 bg-input-background rounded-lg border focus:outline-none transition-colors";


    const borderClasses = error
        ? "border-red-500 focus:border-red-500"
        : "border-transparent focus:border-primary";

    return (
        <div className="space-y-1">
            <label htmlFor={id} className="block mb-2">
                {label}
            </label>

            <select
                id={id}
                name={name}
                value={value}
                multiple={multiple}
                required={required}
                onChange={onChange}
                className={`${baseClasses} ${borderClasses}`}
            >
                {!multiple && <option value="">Select {label}</option>}

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default FormSelect;
