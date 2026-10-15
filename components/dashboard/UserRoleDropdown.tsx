'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import type { AppRole } from '@/lib/supabase/database.types';
import { updateUserRole } from '@/lib/roles';

interface UserRoleDropdownProps {
  userId: string;
  userName: string;
  currentRole: AppRole;
  onRoleChanged?: (newRole: AppRole) => void;
  disabled?: boolean;
}

const ROLES: { id: AppRole; label: string; icon: string; description: string }[] = [
  {
    id: 'admin',
    label: 'Administrator',
    icon: 'shield',
    description: 'Acceso total y gestión de roles',
  },
  {
    id: 'broker',
    label: 'Broker',
    icon: 'business_center',
    description: 'Gestión de listados y cartera',
  },
  {
    id: 'agent',
    label: 'Agent',
    icon: 'support_agent',
    description: 'Publicación y atención de clientes',
  },
  {
    id: 'viewer',
    label: 'Viewer',
    icon: 'visibility',
    description: 'Solo visualización en la app',
  },
];

export function UserRoleDropdown({
  userId,
  userName,
  currentRole,
  onRoleChanged,
  disabled = false,
}: UserRoleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectRole = (newRole: AppRole) => {
    if (newRole === currentRole || isPending || disabled) {
      setIsOpen(false);
      return;
    }

    setErrorMsg(null);
    setIsOpen(false);

    // Optimistic UI callback
    onRoleChanged?.(newRole);

    startTransition(async () => {
      const res = await updateUserRole(userId, newRole);
      if (!res.success) {
        setErrorMsg(res.error || 'Failed to update role');
        // Rollback if needed
        onRoleChanged?.(currentRole);
      }
    });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled || isPending}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Change role for ${userName}`}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 border text-xs font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-mosque/30 cursor-pointer ${
          isOpen
            ? 'bg-mosque text-white border-mosque shadow-sm'
            : 'bg-white text-nordic-dark border-nordic-dark/15 hover:border-nordic-dark hover:bg-black/5 shadow-2xs'
        } ${disabled || isPending ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {isPending ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            <span>Actualizando...</span>
          </>
        ) : (
          <>
            <span>Change Role</span>
            <span className="material-icons text-[16px] transition-transform duration-200">
              {isOpen ? 'expand_less' : 'expand_more'}
            </span>
          </>
        )}
      </button>

      {/* Role selection dropdown */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full mt-2 w-64 rounded-xl shadow-dropdown bg-nordic-dark text-white border border-white/10 ring-1 ring-black/10 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right"
        >
          <div className="p-2 border-b border-white/10 bg-white/5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50 px-2 pt-1">
              Asignar rol a {userName.split(' ')[0]}
            </p>
          </div>

          <div className="p-1.5 space-y-1">
            {ROLES.map((role) => {
              const isSelected = role.id === currentRole;
              return (
                <button
                  key={role.id}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelectRole(role.id)}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-mosque text-white font-medium ring-1 ring-white/20'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span
                    className={`material-icons text-lg mt-0.5 ${
                      isSelected ? 'text-hint-green' : 'text-white/60'
                    }`}
                  >
                    {role.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">{role.label}</span>
                      {isSelected && (
                        <span className="material-icons text-sm text-hint-green">check</span>
                      )}
                    </div>
                    <p className="text-[11px] text-white/60 line-clamp-1">{role.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {errorMsg && (
            <div className="p-2 bg-red-900/40 border-t border-red-500/20 text-[11px] text-red-200 px-3">
              {errorMsg}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
