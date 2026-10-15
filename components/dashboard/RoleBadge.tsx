import React from 'react';
import type { AppRole } from '@/lib/supabase/database.types';

interface RoleBadgeProps {
  role: AppRole;
  className?: string;
}

export function RoleBadge({ role, className = '' }: RoleBadgeProps) {
  switch (role) {
    case 'admin':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-nordic-dark text-white shadow-xs ${className}`}
        >
          <span className="material-icons text-[13px] text-hint-green">shield</span>
          <span>Administrator</span>
        </span>
      );
    case 'broker':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-mosque text-white shadow-xs ${className}`}
        >
          <span className="material-icons text-[13px]">business_center</span>
          <span>Broker</span>
        </span>
      );
    case 'agent':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-hint-green text-mosque border border-mosque/20 ${className}`}
        >
          <span className="material-icons text-[13px]">support_agent</span>
          <span>Agent</span>
        </span>
      );
    case 'viewer':
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 ${className}`}
        >
          <span className="material-icons text-[13px] text-gray-400">visibility</span>
          <span>Viewer</span>
        </span>
      );
  }
}
