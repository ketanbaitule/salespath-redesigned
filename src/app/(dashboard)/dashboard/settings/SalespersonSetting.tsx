"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, QrCode, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  addSalespersonSetting,
  deleteSalespersonSetting,
} from "./settingAction";

// Mock salespeople data - in a real app, this would come from a database
const initialSalespeople = [
  {
    id: "SP-001-JD",
    name: "John Doe",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JD",
    email: "john.doe@example.com",
  },
  {
    id: "SP-002-SS",
    name: "Sarah Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SS",
    email: "sarah.smith@example.com",
  },
  {
    id: "SP-003-MJ",
    name: "Mike Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MJ",
    email: "mike.johnson@example.com",
  },
  {
    id: "SP-004-LB",
    name: "Lisa Brown",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "LB",
    email: "lisa.brown@example.com",
  },
  {
    id: "SP-005-DW",
    name: "David Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "DW",
    email: "david.wilson@example.com",
  },
];

export function SalespersonSettings({
  salespeople,
}: {
  salespeople: {
    id: string;
    name: string;
    initials: string;
  }[];
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [newSalespersonId, setNewSalespersonId] = useState("");
  const [newSalespersonName, setNewSalespersonName] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  async function addSalesperson(formData: FormData) {
    // In a real app, this would be a server action that adds to the database
    const uuid = formData.get("uuid") as string;

    if (!uuid) {
      toast.error("Error", {
        description: "Salesperson ID is required",
      });
      return;
    }

    const res = await addSalespersonSetting(uuid, newSalespersonName);

    if (res) {
      // Show success toast
      toast.success("Salesperson added", {
        description: `Salesperson with ID ${uuid} has been added successfully.`,
      });
    } else {
      // Show error toast
      toast.error("Error", {
        description: `An error occurred while adding the salesperson with ID ${uuid}.`,
      });
    }

    // Close dialog and reset form
    setIsAddDialogOpen(false);
    setNewSalespersonId("");
    setNewSalespersonName("");
  }

  async function deleteSalesperson(formData: FormData) {
    // In a real app, this would be a server action that deletes from the database
    const id = formData.get("id") as string;

    if (!id) return;

    setIsDeleting(id);

    const res = await deleteSalespersonSetting(id);

    if (res) {
      // Show success toast
      toast("Salesperson removed", {
        description: `Salesperson with ID ${id} has been removed successfully.`,
      });
    } else {
      // Show error toast
      toast.error("Error", {
        description: `An error occurred while removing the salesperson with ID ${id}.`,
      });
    }

    setIsDeleting(null);
  }

  const simulateScan = () => {
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      setNewSalespersonId(
        `SP-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}-XX`
      );

      toast.success("QR Code Scanned", {
        description: "Salesperson ID has been scanned successfully.",
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Sales Team</CardTitle>
          <CardDescription>Manage your salespeople</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Salesperson
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form action={addSalesperson}>
              <DialogHeader>
                <DialogTitle>Add Salesperson</DialogTitle>
                <DialogDescription>
                  Enter the salesperson's unique ID or scan their QR code.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="uuid">Salesperson ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="uuid"
                      name="uuid"
                      value={newSalespersonId}
                      onChange={(e) => setNewSalespersonId(e.target.value)}
                      placeholder="Enter ID"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="hidden"
                      onClick={simulateScan}
                      disabled={isScanning}
                    >
                      {isScanning ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <QrCode className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Salesperson Name</Label>
                  <div className="flex gap-2">
                    <Input
                      id="name"
                      name="name"
                      value={newSalespersonName}
                      onChange={(e) => setNewSalespersonName(e.target.value)}
                      placeholder="Enter Name"
                      required
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Salesperson</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Salesperson</TableHead>
                <TableHead>ID</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salespeople.map((person) => (
                <TableRow key={person.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{person.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{person.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-2 py-1 text-sm">
                      {person.id}
                    </code>
                  </TableCell>
                  <TableCell>
                    <form action={deleteSalesperson}>
                      <input type="hidden" name="id" value={person.id} />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        disabled={isDeleting === person.id}
                      >
                        {isDeleting === person.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        <span className="sr-only">Delete</span>
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
