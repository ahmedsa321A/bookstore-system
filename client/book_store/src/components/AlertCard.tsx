import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Variant = "success" | "error";

interface AlertCardProps {
    variant?: Variant;
    title?: string;
    message: string;
    dismissible?: boolean;
    onClose?: () => void;
    className?: string;
    duration?: number;
}

const variantStyles: Record<Variant, { bg: string; ring: string; icon: React.ReactNode }> = {
    success: {
        bg: "bg-green-300",
        ring: "ring-green-500/30",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="text-success">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    error: {
        bg: "bg-red-300",
        ring: "ring-red-500/30",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="text-error">
                <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
};

function AlertCard({
    variant = "success",
    title,
    message,
    dismissible = true,
    onClose,
    duration=3000,
    className = "",
}: AlertCardProps) {
    const styles = variantStyles[variant];
    useEffect(() => {
        if (duration && onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    return (
        <div className="mt-5 mb-5">
            <AnimatePresence >
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    role="alert"
                    aria-live={variant === "error" ? "assertive" : "polite"}
                    className={`max-w-md w-full ${styles.bg} ${styles.ring} ring-1 p-4 rounded-2xl shadow-sm flex items-start gap-3 ${className}`}
                >
                    <div className="shrink-0 text-current text-lg mt-0.5">{styles.icon}</div>
                    <div className="flex-1 min-w-0">
                        {title ? (
                            <div className="font-semibold text-sm text-slate-900">{title}</div>
                        ) : null}
                        <div className="text-sm text-black mt-1">{message}</div>
                    </div>

                    {dismissible ? (
                        <div className="shrink-0 ml-2">
                            <button
                                onClick={onClose}
                                aria-label="Dismiss notification"
                                className="p-1 rounded-full hover:bg-gray-300 focus:outline-none dark:text-white focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 cursor-pointer"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    ) : null}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}


export default AlertCard;