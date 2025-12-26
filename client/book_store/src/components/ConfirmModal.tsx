interface ConfirmModalProps {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: 'destructive' | 'primary';
    confirmLabel?: string;
}

export function ConfirmModal({
    title,
    description,
    onConfirm,
    onCancel,
    variant = 'destructive',
    confirmLabel = 'Confirm'
}: ConfirmModalProps) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-muted-foreground mb-6">{description}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded border hover:bg-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded text-white ${variant === 'destructive'
                            ? 'bg-destructive hover:bg-destructive/90'
                            : 'bg-primary hover:bg-primary/90'
                            }`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
