
import React from "react";
import { UserManagementTable } from "./UserManagementTable";

const UserManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">View and manage registered users</p>
      </div>

      <UserManagementTable />
    </div>
  );
};

export default UserManagementPage;
