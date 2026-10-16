'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n';
import type { PropertyImageInput } from '@/lib/property-actions';

interface PropertyImageUploaderProps {
  images: PropertyImageInput[];
  onChange: (images: PropertyImageInput[]) => void;
  propertyId?: string;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve(URL.createObjectURL(file));
    reader.readAsDataURL(file);
  });
}

export function PropertyImageUploader({
  images,
  onChange,
  propertyId,
}: PropertyImageUploaderProps) {
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await uploadFiles(Array.from(files));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      await uploadFiles(Array.from(droppedFiles));
    }
  };

  const uploadFiles = async (fileList: File[]) => {
    setIsUploading(true);
    setUploadError(null);

    const validFiles = fileList.filter((f) => {
      if (f.size > 5 * 1024 * 1024) {
        setUploadError(`El archivo "${f.name}" supera el límite de 5MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      setIsUploading(false);
      return;
    }

    const newImages: PropertyImageInput[] = [...images];
    let client: ReturnType<typeof createSupabaseBrowserClient> | null = null;
    try {
      client = createSupabaseBrowserClient();
    } catch (err) {
      console.warn('Could not initialize Supabase browser client:', err);
    }

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanFileName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_');
      const uniquePath = `${propertyId || 'drafts'}/${Date.now()}-${i}-${cleanFileName}.${fileExt}`;

      let uploadedUrl: string | null = null;

      if (client) {
        try {
          const { error: uploadErr } = await client.storage
            .from('properties')
            .upload(uniquePath, file, {
              cacheControl: '3600',
              upsert: true,
            });

          if (!uploadErr) {
            const { data } = client.storage.from('properties').getPublicUrl(uniquePath);
            uploadedUrl = data?.publicUrl || null;
          } else {
            console.warn('Supabase storage upload error:', uploadErr.message);
          }
        } catch (err) {
          console.warn('Storage upload failed:', err);
        }
      }

      // If storage upload succeeded, use public URL; otherwise convert to persistent base64 data URL
      const finalUrl = uploadedUrl || (await readFileAsDataUrl(file));
      newImages.push({
        imageUrl: finalUrl,
        altText: file.name.replace(/\.[^/.]+$/, ''),
        caption: newImages.length === 0 ? 'Main View' : `Photo ${newImages.length + 1}`,
        displayOrder: newImages.length,
      });
    }

    onChange(newImages);
    setIsUploading(false);
  };

  const handleDelete = (index: number) => {
    const updated = images.filter((_, i) => i !== index).map((img, i) => ({
      ...img,
      displayOrder: i,
    }));
    onChange(updated);
  };

  const handleSetMain = (index: number) => {
    if (index === 0) return;
    const item = images[index];
    const rest = images.filter((_, i) => i !== index);
    const updated = [item, ...rest].map((img, i) => ({
      ...img,
      displayOrder: i,
      caption: i === 0 ? 'Main View' : img.caption,
    }));
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-hint-green/30 flex justify-between items-center bg-gradient-to-r from-hint-green/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic">
            <span className="material-icons text-lg">image</span>
          </div>
          <h2 className="text-xl font-bold text-nordic">
            {t('dashboard.form.gallery')}
          </h2>
        </div>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded font-sf-pro">
          {t('dashboard.form.galleryFormats')}
        </span>
      </div>

      <div className="p-8">
        {uploadError && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-icons text-base text-amber-600">warning</span>
              <span>{uploadError}</span>
            </div>
            <button
              type="button"
              onClick={() => setUploadError(null)}
              className="text-amber-700 hover:text-amber-900"
            >
              <span className="material-icons text-sm">close</span>
            </button>
          </div>
        )}

        {/* Dropzone with Drag and Drop */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer group ${
            isDragging
              ? 'border-mosque bg-hint-green/30 ring-4 ring-mosque/20 scale-[1.01]'
              : 'border-gray-300 bg-gray-50/50 hover:bg-hint-green/10 hover:border-mosque/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-mosque group-hover:scale-110 transition-transform duration-300">
              {isUploading ? (
                <div className="w-6 h-6 border-2 border-mosque border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="material-icons text-2xl">cloud_upload</span>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-base font-medium text-nordic font-sf-pro">
                {isUploading ? 'Subiendo imágenes...' : t('dashboard.form.dropzoneTitle')}
              </p>
              <p className="text-xs text-gray-400 font-sf-pro">
                {t('dashboard.form.dropzoneSubtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {images.map((img, idx) => (
            <div
              key={`${img.imageUrl}-${idx}`}
              className="aspect-square rounded-lg overflow-hidden relative group shadow-sm bg-gray-100"
            >
              <Image
                src={img.imageUrl}
                alt={img.altText || `Property image ${idx + 1}`}
                fill
                unoptimized
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-nordic/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(idx);
                  }}
                  className="w-8 h-8 rounded-full bg-white text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors shadow-sm"
                  title={t('dashboard.form.deleteImage')}
                >
                  <span className="material-icons text-sm">delete</span>
                </button>
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetMain(idx);
                    }}
                    className="w-8 h-8 rounded-full bg-white text-nordic hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm"
                    title={t('dashboard.form.setAsMain')}
                  >
                    <span className="material-icons text-sm">star</span>
                  </button>
                )}
              </div>

              {idx === 0 && (
                <span className="absolute top-2 left-2 bg-mosque text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm font-sf-pro uppercase tracking-wider">
                  {t('dashboard.form.mainBadge')}
                </span>
              )}
            </div>
          ))}

          {/* Add more button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-mosque hover:border-mosque hover:bg-hint-green/20 transition-all group cursor-pointer"
          >
            <span className="material-icons group-hover:scale-110 transition-transform">
              add
            </span>
            <span className="text-xs mt-1 font-medium font-sf-pro">
              {t('dashboard.form.addMore')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
