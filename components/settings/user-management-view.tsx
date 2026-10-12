"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterTabs } from "@/components/filter-tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  name: string; email: string; role: "Executive" | "Engineering" | "Commercial" | "Finance";
  department: string; lastLogin: string; status: "active" | "inactive";
};

const users: User[] = [
  { name: "Rajesh Kumar", email: "rajesh.kumar@yukti.in", role: "Executive", department: "Management", lastLogin: "20/3/2026", status: "active" },
  { name: "Priya Sharma", email: "priya.sharma@yukti.in", role: "Engineering", department: "Reliability Engineering", lastLogin: "20/3/2026", status: "active" },
  { name: "Arjun Mehta", email: "arjun.mehta@yukti.in", role: "Commercial", department: "Tender Support", lastLogin: "19/3/2026", status: "active" },
  { name: "Kavita Joshi", email: "kavita.joshi@yukti.in", role: "Finance", department: "Financial Planning", lastLogin: "17/3/2026", status: "inactive" },
  { name: "Sanjay Rao", email: "sanjay.rao@yukti.in", role: "Engineering", department: "Quality Assurance", lastLogin: "20/3/2026", status: "active" },
  { name: "Neha Gupta", email: "neha.gupta@yukti.in", role: "Commercial", department: "AMC Management", lastLogin: "18/3/2026", status: "active" },
  { name: "Vikram Singh", email: "vikram.singh@yukti.in", role: "Engineering", department: "Supplier Quality", lastLogin: "20/3/2026", status: "active" },
  { name: "Anjali Nair", email: "anjali.nair@yukti.in", role: "Finance", department: "Insurance & Risk", lastLogin: "16/3/2026", status: "inactive" },
  { name: "Rohan Desai", email: "rohan.desai@yukti.in", role: "Executive", department: "Operations", lastLogin: "19/3/2026", status: "active" },
  { name: "Meera Iyer", email: "meera.iyer@yukti.in", role: "Engineering", department: "Data Engineering", lastLogin: "20/3/2026", status: "active" },
];

export function UserManagementView() {
  const [role, setRole] = useState("All Roles");

  const filtered = useMemo(
    () => (role === "All Roles" ? users : users.filter((u) => u.role === role)),
    [role]
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <PageHeader icon="users" title="User Management" subtitle="Manage platform users, roles, and access permissions" />
        <Button>Invite User</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Users" value={`${users.length}`} icon="users" />
        <StatCard label="Active" value={`${users.filter((u) => u.status === "active").length}`} tone="success" icon="metrics" />
        <StatCard label="Roles" value="4" icon="users" />
        <StatCard label="Last 24h Active" value="7" icon="time" />
      </div>

      <div className="mt-6">
        <FilterTabs options={["All Roles", "Executive", "Engineering", "Commercial", "Finance"]} value={role} onChange={setRole} />
      </div>

      <Card className="mt-4">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => (
                  <TableRow key={u.email}>
                    <TableCell className="font-medium text-foreground">{u.name}</TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell className="text-muted-foreground">{u.role}</TableCell>
                    <TableCell className="text-muted-foreground">{u.department}</TableCell>
                    <TableCell className="text-muted-foreground">{u.lastLogin}</TableCell>
                    <TableCell>
                      <Badge variant={u.status === "active" ? "outline" : "secondary"}>{u.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
