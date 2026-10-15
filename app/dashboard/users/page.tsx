import React from 'react';
import { connection } from 'next/server';
import { getAllUserRoles, getCurrentUserRole } from '@/lib/roles';
import { UserDirectory } from '@/components/dashboard/UserDirectory';

export const instant = false;

export default async function DashboardUsersPage() {
  await connection();
  const { users } = await getAllUserRoles();
  const { userId } = await getCurrentUserRole();

  return <UserDirectory initialUsers={users} currentUserId={userId} />;
}
