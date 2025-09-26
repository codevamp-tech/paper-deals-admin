"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserFromToken } from "@/hooks/use-token";
import { Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function SlotPage() {
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [date, setDate] = useState("");
  const [consultantPrice, setConsultantPrice] = useState("1");
  const [slots, setSlots] = useState<any[]>([]);
  const [allSlots, setAllSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const user = getUserFromToken();
  const userId = user?.user_id;

  // Normalize consultant slot (sometimes nested under `slot`)
  const normalizeSlot = (s: any) => ({
    id: s.id,
    from_time: s.from_time || s.slot?.from_time || "",
    to_time: s.to_time || s.slot?.to_time || "",
    date: s.date || s.slot?.date || "",
    consultant_price: s.consultant_price || s.slot?.consultant_price || "1",
  });

  // Fetch all slots (master list)
  const fetchAllSlots = async () => {
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/slot`);
      const data = await res.json();
      setAllSlots(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching all slots", error);
      setAllSlots([]);
    }
  };

  // Fetch consultant’s booked slots
  const fetchSlots = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/consultant/${userId}`);
      const data = await res.json();
      const arr = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.slots)
            ? data.slots
            : Array.isArray(data?.result)
              ? data.result
              : [];

      setSlots(arr.map(normalizeSlot));
    } catch (error) {
      console.error("Error fetching slots", error);
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSlots();
      fetchAllSlots();
    }
  }, [userId]);

  const handleSave = async () => {
    if (!userId || !fromTime || !toTime || !date) return;
    const payload = {
      from_time: fromTime,
      to_time: toTime,
      consultant_price: consultantPrice,
      date,
      user_id: userId,
    };
    try {
      const res = await fetch("https://paper-deal-server.onrender.com/api/consultant/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setFromTime("");
        setToTime("");
        setDate("");
        fetchSlots();
      }
    } catch (error) {
      console.error("Error saving slot", error);
    }
  };

  // Already booked from times
  const bookedFromTimes = useMemo(
    () => slots.map((s) => s.from_time),
    [slots]
  );

  // Available "to times" depend on selected fromTime
  const availableToTimes = useMemo(() => {
    if (!fromTime) return [];
    const slot = allSlots.find((s) => s.from_time === fromTime);
    if (!slot) return [];
    // Filter: all times after chosen fromTime
    return allSlots.filter((s) => s.from_time >= fromTime);
  }, [fromTime, allSlots]);
  // Edit slot
  const handleEdit = (slot: any) => {
    setEditingId(slot.id);
    setFromTime(slot.from_time);
    setToTime(slot.to_time);
    setDate(slot.date ? slot.date.split("T")[0] : "");
    setConsultantPrice(String(slot.consultant_price || "1"));
    setOpen(true);
  };

  // Update slot
  const handleUpdate = async () => {
    if (!editingId || !userId) return;

    const payload = {
      from_time: fromTime,
      to_time: toTime,
      consultant_price: consultantPrice,
      date,
      user_id: userId,
    };

    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/consultant/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchSlots();
        setOpen(false);
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error updating slot", error);
    }
  };

  // Delete slot
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/consultant/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchSlots();
    } catch (error) {
      console.error("Error deleting slot", error);
    }
  };

  // Already booked times
  const selectedTimes = useMemo(() => slots.map((s) => s.from_time), [slots]);

  return (
    <div className="p-6 space-y-8">
      {/* Create Slot Form */}
      <Card>
        <CardHeader>
          <CardTitle>Consultant Slot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {/* From Time */}
            <div>
              <Label>From Time</Label>
              <select
                value={fromTime}
                onChange={(e) => {
                  setFromTime(e.target.value);
                  setToTime(""); // reset toTime
                }}
                className="border rounded p-2 w-full"
              >
                <option value="">Select</option>
                {allSlots.map((s) => (
                  <option
                    key={s.id}
                    value={s.from_time}
                    disabled={bookedFromTimes.includes(s.from_time)}
                    className={
                      bookedFromTimes.includes(s.from_time)
                        ? "bg-red-200"
                        : "bg-white"
                    }
                  >
                    {s.from_time}
                  </option>
                ))}
              </select>
            </div>

            {/* To Time */}
            <div>
              <Label>To Time</Label>
              <select
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="">Select</option>
                {availableToTimes.map((s) => (
                  <option
                    key={s.id}
                    value={s.to_time}
                    className={
                      bookedFromTimes.includes(s.from_time)
                        ? "bg-red-200"
                        : "bg-white"
                    }
                  >
                    {s.to_time}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <Label>Consultant Price</Label>
              <Input
                type="number"
                value={consultantPrice}
                readOnly
                className="bg-gray-100"
              />
            </div>

            {/* Date */}
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <Button className="mt-4" onClick={handleSave}>
            Save
          </Button>
        </CardContent>
      </Card>

      {/* Slot List */}
      <Card>
        <CardHeader>
          <CardTitle>Slot List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-4">Loading...</div>
            ) : !Array.isArray(slots) || slots.length === 0 ? (
              <div className="p-4">No slots found.</div>
            ) : (
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">#</th>
                    <th className="px-4 py-2 border">From Time</th>
                    <th className="px-4 py-2 border">To Time</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Edit</th>
                    <th className="px-4 py-2 border">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {slots.map((slot: any, i) => (
                    <tr key={slot.id}>
                      <td className="p-2 border">{i + 1}</td>
                      <td className="p-2 border">{slot.from_time}</td>
                      <td className="p-2 border">{slot.to_time}</td>
                      <td className="p-2 border">{slot.consultant_price}</td>
                      <td className="p-2 border">
                        {slot.date
                          ? new Date(slot.date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="p-2 border">
                        <Button variant="ghost" onClick={() => handleEdit(slot)}>
                          <Edit />
                        </Button>
                      </td>
                      <td className="p-2 border">
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(slot.id)}
                        >
                          <Trash2 />
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
            <DialogTitle>Edit Slot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>From Time</Label>
              <Input
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
              />
            </div>
            <div>
              <Label>To Time</Label>
              <Input
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
              />
            </div>
            <div>
              <Label>Consultant Price</Label>
              <Input
                type="number"
                value={consultantPrice}
                readOnly
                className="bg-gray-100"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
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
