import React from 'react';
import { getAllUserRoles, getCurrentUserRole } from '@/lib/roles';
import { UserDirectory } from '@/components/dashboard/UserDirectory';

export const instant = false;

export default async function DashboardUsersPage() {
  const { users } = await getAllUserRoles();
  const { userId } = await getCurrentUserRole();

  return <UserDirectory initialUsers={users} currentUserId={userId} />;
}
