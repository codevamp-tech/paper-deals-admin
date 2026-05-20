"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserFromToken } from "@/hooks/use-token";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const timeOptions = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
  "08:00 PM", "08:30 PM", "09:00 PM"
];

export default function SlotPage() {
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [date, setDate] = useState("");
  const [consultantPrice, setConsultantPrice] = useState("500");
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loggedInUser = getUserFromToken();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const userId = user?.user_id;
  const isConsultant = user?.user_role === 5;

  const [consultants, setConsultants] = useState<any[]>([]);
  const [selectedConsultant, setSelectedConsultant] = useState<string>("");

  // Fetch consultants if Admin
  useEffect(() => {
    if (user && !isConsultant) {
      const fetchConsultantsList = async () => {
        try {
          const res = await fetch("https://paper-deal-server.onrender.com/api/users/getallconsultants?user_type=5&page=1&limit=100");
          if (res.ok) {
            const data = await res.json();
            const list = data.data || [];
            setConsultants(list);
            if (list.length > 0) {
              const demo = list.find((c: any) => c.email_address === "democonsultant@gmail.com" || c.name?.toLowerCase().includes("demo"));
              if (demo) {
                setSelectedConsultant(String(demo.id));
              } else {
                setSelectedConsultant(String(list[0].id));
              }
            }
          }
        } catch (error) {
          console.error("Error fetching consultants:", error);
        }
      };
      fetchConsultantsList();
    }
  }, [user, isConsultant]);

  // Fetch consultant’s availability slots
  const fetchSlots = useCallback(async () => {
    const targetId = isConsultant ? userId : selectedConsultant;
    if (!targetId) return;
    setLoading(true);
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/consultant-availability/${targetId}`);
      if (!res.ok) throw new Error("Failed to fetch slots");
      const data = await res.json();
      setSlots(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching slots", error);
      toast({ title: "Error", description: "Failed to load slots", variant: "destructive" });
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, [userId, selectedConsultant, isConsultant]);

  useEffect(() => {
    const targetId = isConsultant ? userId : selectedConsultant;
    if (targetId) {
      fetchSlots();
    }
  }, [fetchSlots, userId, selectedConsultant, isConsultant]);

  const handleSave = async () => {
    const targetId = isConsultant ? userId : selectedConsultant;
    if (!targetId || !fromTime || !toTime || !date) {
      toast({ title: "Validation Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    try {
      const payload = {
        consultant_id: Number(targetId),
        date: date,
        from_time: fromTime,
        to_time: toTime,
        price: isConsultant ? 0 : (Number(consultantPrice) || 0)
      };

      const res = await fetch("https://paper-deal-server.onrender.com/api/consultant-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({ title: "Success", description: "Availability Slot Created Successfully" });
        setFromTime("");
        setToTime("");
        setDate("");
        setConsultantPrice("500");
        fetchSlots();
      } else {
        toast({ title: "Error", description: "Failed to save slot", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Error saving slot", variant: "destructive" });
      console.error(error);
    }
  };

  // Edit slot
  const handleEdit = (slot: any) => {
    setEditingId(slot.id);
    setFromTime(slot.from_time);
    setToTime(slot.to_time);
    setDate(slot.date ? slot.date.split("T")[0] : "");
    setConsultantPrice(String(slot.price || "0"));
    setOpen(true);
  };

  // Update slot
  const handleUpdate = async () => {
    const targetId = isConsultant ? userId : selectedConsultant;
    if (!editingId || !targetId || !fromTime || !toTime || !date) return;

    try {
      const payload = {
        date: date,
        from_time: fromTime,
        to_time: toTime,
        price: isConsultant ? Number(consultantPrice) : (Number(consultantPrice) || 0)
      };

      const res = await fetch(`https://paper-deal-server.onrender.com/api/consultant-availability/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchSlots();
        setOpen(false);
        setEditingId(null);
        toast({ title: "Success", description: "Availability Slot Updated Successfully" });
      } else {
        toast({ title: "Error", description: "Failed to update slot", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Error updating slot", variant: "destructive" });
      console.error("Error updating slot", error);
    }
  };

  // Delete slot
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this availability slot?")) return;
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/consultant-availability/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({ title: "Success", description: "Slot deleted successfully" });
        fetchSlots();
      } else {
        toast({ title: "Error", description: "Failed to delete slot", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Error deleting slot", variant: "destructive" });
      console.error("Error deleting slot", error);
    }
  };

  if (!isClient) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[300px]">
        <div className="text-muted-foreground text-sm">Loading slot configuration...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Consultant Selector for Admin */}
      {!isConsultant && (
        <Card>
          <CardHeader>
            <CardTitle>Select Consultant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-xs space-y-2">
              <Label htmlFor="consultant-select">Choose a Consultant</Label>
              {consultants.length > 0 ? (
                <Select value={selectedConsultant} onValueChange={(val) => setSelectedConsultant(val)}>
                  <SelectTrigger id="consultant-select" className="bg-white">
                    <SelectValue placeholder="Select Consultant" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {consultants.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name} ({c.email_address})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-gray-500 py-2">Loading consultants list...</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Slot Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Availability Slot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`grid grid-cols-1 ${isConsultant ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4`}>
            {/* Date */}
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white"
              />
            </div>

            {/* From Time */}
            <div>
              <Label>From Time</Label>
              <Select value={fromTime} onValueChange={(val) => setFromTime(val)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select From Time" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* To Time */}
            <div>
              <Label>To Time</Label>
              <Select value={toTime} onValueChange={(val) => setToTime(val)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select To Time" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            {!isConsultant && (
              <div>
                <Label>Consultant Price (Rs.)</Label>
                <Input
                  type="number"
                  value={consultantPrice}
                  onChange={(e) => setConsultantPrice(e.target.value)}
                  className="bg-white"
                />
              </div>
            )}
          </div>

          <Button className="mt-4" onClick={handleSave}>
            Save Availability Slot
          </Button>
        </CardContent>
      </Card>

      {/* Slot List */}
      <Card>
        <CardHeader>
          <CardTitle>{isConsultant ? "My Availability Slots" : "Consultant Availability Slots"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-4 text-center">Loading slots...</div>
            ) : !Array.isArray(slots) || slots.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No availability slots set. Add some above!</div>
            ) : (
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border text-left">#</th>
                    <th className="px-4 py-2 border text-left">Date</th>
                    <th className="px-4 py-2 border text-left">From Time</th>
                    <th className="px-4 py-2 border text-left">To Time</th>
                    {!isConsultant && (
                      <th className="px-4 py-2 border text-left">Price</th>
                    )}
                    <th className="px-4 py-2 border text-left">Status</th>
                    <th className="px-4 py-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slots.map((slot: any, i) => (
                    <tr key={slot.id} className={slot.is_booked ? "bg-green-50/50" : ""}>
                      <td className="p-2 border">{i + 1}</td>
                      <td className="p-2 border">
                        {slot.date ? slot.date.split("T")[0] : "-"}
                      </td>
                      <td className="p-2 border font-medium">{slot.from_time}</td>
                      <td className="p-2 border font-medium">{slot.to_time}</td>
                      {!isConsultant && (
                        <td className="p-2 border font-semibold text-blue-600">Rs. {slot.price}</td>
                      )}
                      <td className="p-2 border">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${slot.is_booked ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                          {slot.is_booked ? "Booked" : "Available"}
                        </span>
                      </td>
                      <td className="p-2 border text-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={slot.is_booked}
                          onClick={() => handleEdit(slot)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={slot.is_booked}
                          onClick={() => handleDelete(slot.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Availability Slot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <Label>From Time</Label>
              <Select value={fromTime} onValueChange={(val) => setFromTime(val)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select From Time" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>To Time</Label>
              <Select value={toTime} onValueChange={(val) => setToTime(val)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select To Time" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {!isConsultant && (
              <div>
                <Label>Consultant Price</Label>
                <Input
                  type="number"
                  value={consultantPrice}
                  onChange={(e) => setConsultantPrice(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Update</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
