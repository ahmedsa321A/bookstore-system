import { useState } from 'react';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import bookService from '../api/bookService';
import FormInput from './FormInput';

interface AddPublisherModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function AddPublisherModal({ isOpen, onClose, onSuccess }: AddPublisherModalProps) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
    });
    const [error, setError] = useState('');

    const mutation = useMutation({
        mutationFn: bookService.addPublisher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['publishers'] });
            setFormData({ name: '', address: '', phone: '' });
            setError('');
            if (onSuccess) onSuccess();
            onClose();
        },
        onError: (err: any) => {
            console.error(err);
            const msg = err.response?.data || 'Failed to add publisher';
            setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
        },
    });

    const validatePublisherForm = () => {
        if (!formData.name.trim()) return 'Publisher Name is required';
        if (!formData.address.trim()) return 'Address is required';
        if (formData.address.trim().length < 5) return 'Address must be at least 5 characters';
        if (!formData.phone.trim()) return 'Phone is required';
        if (formData.phone.trim().length < 6) return 'Phone number is too short';
        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validatePublisherForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        mutation.mutate(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Add New Publisher</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <FormInput
                        label="Publisher Name"
                        id="pub-name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. O'Reilly Media"
                    />

                    <FormInput
                        label="Address"
                        id="pub-address"
                        name="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g. 1005 Gravenstein Hwy N"
                    />

                    <FormInput
                        label="Phone"
                        id="pub-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +1 707-827-7000"
                    />

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 transition-colors"
                        >
                            {mutation.isPending ? 'Adding...' : 'Add Publisher'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
