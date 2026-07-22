'use client';

import React, { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export function ImageUploader({ value, onChange, label = 'Upload Image' }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError('');

        const supabase = getSupabaseClient();
        if (!supabase) {
            // Fallback: If Supabase storage is not configured, create object URL for preview
            const fakeUrl = URL.createObjectURL(file);
            onChange(fakeUrl);
            setUploading(false);
            return;
        }

        try {
            const ext = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
            const filePath = `uploads/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                setError(uploadError.message);
                setUploading(false);
                return;
            }

            const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
            onChange(data.publicUrl);
        } catch (err: any) {
            setError(err.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="space-y-2">
            {label && <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">{label}</label>}
            {value ? (
                <div className="relative group rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 h-40 flex items-center justify-center">
                    <img src={value} alt="Preview" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button type="button" variant="destructive" size="sm" onClick={() => onChange('')}>
                            <X className="h-4 w-4 mr-1" /> Remove
                        </Button>
                    </div>
                </div>
            ) : (
                <label className="border-2 border-dashed border-zinc-800 hover:border-primary/50 bg-zinc-900/40 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2 text-primary">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <span className="text-xs font-medium">Uploading asset...</span>
                        </div>
                    ) : (
                        <>
                            <div className="p-3 bg-zinc-800/60 rounded-full mb-2 text-zinc-400 group-hover:text-primary">
                                <Upload className="h-6 w-6" />
                            </div>
                            <span className="text-sm font-medium text-zinc-300">Click to upload image</span>
                            <span className="text-xs text-zinc-500 mt-1">PNG, JPG, WEBP or SVG up to 5MB</span>
                        </>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
                </label>
            )}
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}
