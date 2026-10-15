'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import type { UserRoleRow, AppRole } from '@/lib/supabase/database.types';
import { RoleBadge } from './RoleBadge';
import { UserRoleDropdown } from './UserRoleDropdown';
import { useLanguage } from '@/lib/i18n';

interface UserDirectoryProps {
  initialUsers: UserRoleRow[];
  currentUserId?: string | null;
}

export function UserDirectory({ initialUsers, currentUserId }: UserDirectoryProps) {
  const { t } = useLanguage();
  const [users, setUsers] = useState<UserRoleRow[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | AppRole>('all');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleRoleChanged = (userId: string, newRole: AppRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.user_id === userId ? { ...u, role: newRole } : u))
    );
    setNotification({
      type: 'success',
      text: `${t('dashboard.roleUpdated')}: ${newRole.toUpperCase()}`,
    });
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const name = u.full_name || '';
      const email = u.email || '';
      const matchesSearch =
        searchQuery === '' ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === 'all' || u.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  // Counts by role
  const roleCounts = useMemo(() => {
    const counts = { all: users.length, admin: 0, broker: 0, agent: 0, viewer: 0 };
    users.forEach((u) => {
      if (counts[u.role] !== undefined) {
        counts[u.role]++;
      }
    });
    return counts;
  }, [users]);

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-white text-sm font-medium flex items-center justify-between shadow-soft animate-in fade-in duration-200 ${
            notification.type === 'success' ? 'bg-mosque' : 'bg-red-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-icons text-base">
              {notification.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span>{notification.text}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white">
            <span className="material-icons text-sm">close</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-nordic-dark">
            {t('dashboard.userDirectory')}
          </h1>
          <p className="text-nordic-dark/60 mt-1 text-sm">
            {t('dashboard.userDirectorySubtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-nordic-dark/40">
              <span className="material-icons text-lg">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('dashboard.searchUsersPlaceholder')}
              className="block w-full pl-9 pr-3 py-2.5 rounded-lg bg-white text-nordic-dark placeholder-nordic-dark/40 border border-nordic-dark/15 focus:outline-none focus:ring-2 focus:ring-mosque/30 text-xs shadow-2xs"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              alert(
                'Los nuevos usuarios se registran mediante autenticación social (Google / GitHub) y se sincronizan automáticamente con este directorio.'
              )
            }
            className="inline-flex items-center justify-center px-4 py-2.5 border border-mosque text-xs font-semibold rounded-lg text-mosque bg-white hover:bg-hint-green/30 transition-colors shadow-2xs cursor-pointer"
          >
            <span className="material-icons text-base mr-1.5">person_add</span>
            <span>Añadir Usuario</span>
          </button>
        </div>
      </div>

      {/* Role Tabs */}
      <div className="flex gap-4 sm:gap-6 border-b border-nordic-dark/10 overflow-x-auto pb-px">
        <button
          onClick={() => setRoleFilter('all')}
          className={`pb-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            roleFilter === 'all'
              ? 'text-mosque border-mosque'
              : 'text-nordic-dark/60 border-transparent hover:text-nordic-dark'
          }`}
        >
          {t('dashboard.allUsers')} ({roleCounts.all})
        </button>
        <button
          onClick={() => setRoleFilter('admin')}
          className={`pb-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            roleFilter === 'admin'
              ? 'text-mosque border-mosque font-semibold'
              : 'text-nordic-dark/60 border-transparent hover:text-nordic-dark'
          }`}
        >
          {t('dashboard.admins')} ({roleCounts.admin})
        </button>
        <button
          onClick={() => setRoleFilter('broker')}
          className={`pb-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            roleFilter === 'broker'
              ? 'text-mosque border-mosque font-semibold'
              : 'text-nordic-dark/60 border-transparent hover:text-nordic-dark'
          }`}
        >
          {t('dashboard.brokers')} ({roleCounts.broker})
        </button>
        <button
          onClick={() => setRoleFilter('agent')}
          className={`pb-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            roleFilter === 'agent'
              ? 'text-mosque border-mosque font-semibold'
              : 'text-nordic-dark/60 border-transparent hover:text-nordic-dark'
          }`}
        >
          {t('dashboard.agents')} ({roleCounts.agent})
        </button>
        <button
          onClick={() => setRoleFilter('viewer')}
          className={`pb-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            roleFilter === 'viewer'
              ? 'text-mosque border-mosque font-semibold'
              : 'text-nordic-dark/60 border-transparent hover:text-nordic-dark'
          }`}
        >
          {t('dashboard.viewers')} ({roleCounts.viewer})
        </button>
      </div>

      {/* Directory Content */}
      <div className="space-y-3">
        {/* Table Header (Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-nordic-dark/50 mb-1">
          <div className="col-span-4">Detalles del Usuario</div>
          <div className="col-span-3">Rol y Estatus</div>
          <div className="col-span-3">Acceso y Nivel</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center border border-nordic-dark/10 shadow-2xs">
            <span className="material-icons text-4xl text-nordic-dark/30 mb-2">person_off</span>
            <p className="text-base font-semibold text-nordic-dark">No se encontraron usuarios</p>
            <p className="text-xs text-nordic-dark/60 mt-1">
              Prueba cambiando el término de búsqueda o el filtro de rol.
            </p>
          </div>
        ) : (
          filteredUsers.map((u) => {
            const isCurrentUser = u.user_id === currentUserId;
            const shortId = u.user_id.slice(0, 8).toUpperCase();
            const isAdmin = u.role === 'admin';

            return (
              <div
                key={u.id}
                className={`group relative rounded-xl p-5 shadow-2xs border transition-all flex flex-col md:grid md:grid-cols-12 gap-4 items-center ${
                  isAdmin
                    ? 'bg-hint-green/50 border-mosque/20 hover:shadow-soft'
                    : 'bg-white border-nordic-dark/10 hover:bg-hint-green/20'
                }`}
              >
                {/* User Details */}
                <div className="col-span-12 md:col-span-4 flex items-center w-full">
                  <div className="relative flex-shrink-0">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 ring-2 ring-white shadow-2xs flex items-center justify-center">
                      {u.avatar_url ? (
                        <Image
                          src={u.avatar_url}
                          alt={u.full_name || 'User'}
                          width={48}
                          height={48}
                          unoptimized
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-mosque text-white font-bold text-base">
                          {(u.full_name || u.email || 'U').charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  </div>

                  <div className="ml-4 overflow-hidden min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-nordic-dark truncate">
                        {u.full_name || 'Usuario'}
                      </p>
                      {isCurrentUser && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-mosque text-white font-semibold">
                          Tú
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-nordic-dark/60 truncate">{u.email}</p>
                    <span className="mt-1 text-[10px] px-1.5 py-0.5 inline-block bg-white/70 rounded text-nordic-dark/60 font-mono">
                      ID: #{shortId}
                    </span>
                  </div>
                </div>

                {/* Role & Status */}
                <div className="col-span-12 md:col-span-3 w-full flex items-center justify-between md:justify-start gap-4">
                  <RoleBadge role={u.role} />
                  <div className="flex items-center text-xs text-nordic-dark/60">
                    <span className="material-icons text-[14px] mr-1 text-mosque">
                      check_circle
                    </span>
                    {t('dashboard.active')}
                  </div>
                </div>

                {/* Performance / Info */}
                <div className="col-span-12 md:col-span-3 w-full grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-nordic-dark/40 font-semibold">
                      Permisos
                    </div>
                    <div className="text-xs font-semibold text-nordic-dark mt-0.5">
                      {u.role === 'admin'
                        ? 'Acceso Total'
                        : u.role === 'broker'
                        ? 'Gestión Listados'
                        : u.role === 'agent'
                        ? 'Agente Inmobiliario'
                        : 'Solo Lectura'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-nordic-dark/40 font-semibold">
                      Miembro Desde
                    </div>
                    <div className="text-xs font-semibold text-nordic-dark mt-0.5">
                      {new Date(u.created_at).toLocaleDateString('es-ES', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Actions: Change Role */}
                <div className="col-span-12 md:col-span-2 w-full flex justify-end">
                  <UserRoleDropdown
                    userId={u.user_id}
                    userName={u.full_name || u.email}
                    currentRole={u.role}
                    onRoleChanged={(newRole) => handleRoleChanged(u.user_id, newRole)}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
