import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
    label: string;
    value: string;
}

interface FormSelectProps {
    label: string;
    id: string;
    name: string;
    value: string;
    options: SelectOption[];
    compact?: boolean;
    error?: string;
    required?: boolean;
    onChange: (e: { target: { name: string; value: string } }) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
    label,
    id,
    name,
    value,
    options,
    compact,
    error,
    required,
    onChange,
}) => {
    const baseClasses = compact
        ? "w-full px-2 py-1 text-sm rounded border"
        : "w-full px-4 py-3 rounded-lg border transition-colors";

    const borderClasses = error
        ? "border-red-500"
        : "border-transparent focus:border-primary";

    return (
        <div className="space-y-1">
            <label htmlFor={id} className="block mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <Select.Root
                value={value}
                onValueChange={(val) =>
                    onChange({
                        target: { name, value: val },
                    })
                }
            >
                <Select.Trigger
                    id={id}
                    className={`
            flex items-center justify-between
            bg-white
            ${baseClasses}
            ${borderClasses}
          `}
                >
                    <Select.Value placeholder={`Select ${label}`} />
                    <Select.Icon>
                        <ChevronDown size={16} />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content
                        className="
              z-50 overflow-hidden rounded-lg border shadow-lg
              bg-input-background
            "
                    >
                        <Select.Viewport className="p-1">
                            {options.map((option) => (
                                <Select.Item
                                    key={option.value}
                                    value={option.value}
                                    className="
                    relative flex cursor-pointer select-none items-center
                    rounded-md px-3 py-2 text-sm outline-none
                    focus:bg-primary/10
                    data-[state=checked]:bg-primary/15
                  "
                                >
                                    <Select.ItemText>{option.label}</Select.ItemText>
                                    <Select.ItemIndicator className="absolute right-2">
                                        <Check size={14} />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default FormSelect;
