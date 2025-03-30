"use client";

import type React from "react";

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
import { Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";
import { updateAgencyDetails } from "./settingAction";

export function AgencySettings({
  agencyData,
}: {
  agencyData: {
    agency_name: string;
    phone_no: string;
    address: string;
  };
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{
    agency_name: string;
    phone_no: string;
    address: string;
  }>(agencyData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function updateAgency(formData: FormData) {
    if (!formData) {
      setIsEditing(false);
      return;
    }

    const res = await updateAgencyDetails(
      formData.get("agency_name") as string,
      formData.get("phone_no") as string,
      formData.get("address") as string
    );

    if (res) {
      // Show success toast
      toast.success("Agency updated", {
        description: "Your agency information has been updated successfully.",
      });
    } else {
      // Show error toast
      toast.error("Failed to update agency", {
        description:
          "An error occurred while updating your agency information.",
      });
    }
    // Exit edit mode
    setIsEditing(false);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>Manage your agency details</CardDescription>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Agency
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">{agencyData.agency_name}</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Phone
                </div>
                <div>{agencyData.phone_no}</div>
              </div>
              <div className="">
                <div className="text-sm font-medium text-muted-foreground">
                  Address
                </div>
                <div>{agencyData.address}</div>
              </div>
            </div>
          </div>
        ) : (
          <form action={updateAgency} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agency Name</Label>
              <Input
                id="name"
                name="agency_name"
                value={formData.agency_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
