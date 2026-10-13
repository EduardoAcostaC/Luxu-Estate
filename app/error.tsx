'use client';

import React from 'react';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background-light text-nordic-dark flex items-center justify-center px-4">
      <div className="text-center bg-white/60 rounded-2xl border border-nordic-dark/5 p-10 max-w-md shadow-soft">
        <span className="material-icons text-4xl text-nordic-muted mb-2">error_outline</span>
        <h1 className="text-xl font-medium text-nordic-dark">Something went wrong</h1>
        <p className="text-sm text-nordic-muted mt-1">
          We couldn&apos;t load the properties. Please try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 px-6 py-2.5 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors shadow-lg shadow-mosque/20 cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
