"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addSalespersonTaskSchema } from "@/types/salesperson";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { SubmitButton } from "@/components/submit-button";
import { submitAddTaskToSalesperson } from "../salespersonActions";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

// Create a dedicated component for map events
function MapClickHandler({ form }: { form: any }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      form.setValue("lat", lat);
      form.setValue("long", lng);
    },
  });
  return null;
}

export default function AddTaskDialog({
  salespersonId,
}: {
  salespersonId: string;
}) {
  const form = useForm<z.infer<typeof addSalespersonTaskSchema>>({
    resolver: zodResolver(addSalespersonTaskSchema),
    defaultValues: {
      goal: "",
      lat: 0,
      long: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof addSalespersonTaskSchema>) {
    try {
      await submitAddTaskToSalesperson(values, salespersonId);
      form.reset({
        goal: "",
        lat: 0,
        long: 0,
      });
      toast("New Task Added Successfully");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto py-10"
            >
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="overflow-hidden rounded-md border bg-secondary">
                <div className="h-64 w-full">
                  <MapContainer
                    center={[21.0514, 79.0601]}
                    zoom={80}
                    className="h-64 w-full relative"
                  >
                    <TileLayer
                      url="https://salespath-admin.vercel.app"
                      attribution="Made By SalesPath"
                    />
                    <MapClickHandler form={form} />
                    {form.watch("lat") && form.watch("long") && (
                      <Marker
                        position={[form.watch("lat"), form.watch("long")]}
                        icon={L.divIcon({
                          className: "custom-marker",
                          html: `<div style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; background-color: #ff5722; border-radius: 50%; color: white;">
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                               <path stroke-linecap="round" stroke-linejoin="round" d="M12 2c3.866 0 7 3.134 7 7 0 5.25-7 13-7 13S5 14.25 5 9c0-3.866 3.134-7 7-7z" />
                               <path stroke-linecap="round" stroke-linejoin="round" d="M12 11a2 2 0 100-4 2 2 0 000 4z" />
                               </svg>
                             </div>`,
                        })}
                      >
                        <Popup>
                          Latitude: {form.watch("lat")}, Longitude:{" "}
                          {form.watch("long")}
                        </Popup>
                      </Marker>
                    )}
                  </MapContainer>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="lat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Latitude"
                            type="number"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="long"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Longitude"
                            type="number"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <SubmitButton>Add Task</SubmitButton>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
