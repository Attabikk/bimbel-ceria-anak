import { useState } from "react";
import { getAttendance, addAttendance, deleteAttendance, getStudents, Attendance, Student } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";

type Status = "hadir" | "izin" | "sakit" | "alpa";

const STATUS_OPTIONS: { value: Status; label: string; emoji: string; color: string }[] = [
  { value: "hadir", label: "Hadir", emoji: "✅", color: "bg-green-100 text-green-700" },
  { value: "izin", label: "Izin", emoji: "📝", color: "bg-blue-100 text-blue-700" },
  { value: "sakit", label: "Sakit", emoji: "🤒", color: "bg-yellow-100 text-yellow-700" },
  { value: "alpa", label: "Alpa", emoji: "❌", color: "bg-red-100 text-red-700" },
];

const today = () => new Date().toISOString().slice(0, 10);

const AttendanceTab = () => {
  const [records, setRecords] = useState<Attendance[]>(getAttendance());
  const [students] = useState<Student[]>(getStudents());
  const [showForm, setShowForm] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState(today());
  const [status, setStatus] = useState<Status>("hadir");
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (!studentId || !date) {
      toast.error("Murid dan tanggal harus diisi!");
      return;
    }
    addAttendance({ studentId, date, status, note });
    setRecords(getAttendance());
    setStudentId("");
    setDate(today());
    setStatus("hadir");
    setNote("");
    setShowForm(false);
    toast.success("Absensi dicatat!");
  };

  const handleDelete = (id: string) => {
    deleteAttendance(id);
    setRecords(getAttendance());
    toast.success("Absensi dihapus.");
  };

  const getStudentName = (id: string) => students.find((s) => s.id === id)?.name || "—";
  const getStatusMeta = (s: string) => STATUS_OPTIONS.find((o) => o.value === s) || STATUS_OPTIONS[0];

  const filtered = [...records].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Absensi Murid</h2>
        <Button onClick={() => setShowForm(!showForm)} size="sm" disabled={students.length === 0}>
          <Plus className="w-4 h-4 mr-1" /> Catat
        </Button>
      </div>

      {students.length === 0 && (
        <Card>
          <CardContent className="py-6 text-center text-muted-foreground text-sm">
            Tambahkan murid dulu di tab Murid untuk mencatat absensi.
          </CardContent>
        </Card>
      )}

      {showForm && (
        <Card>
          <CardContent className="pt-4 flex flex-col gap-3">
            <Select value={studentId} onValueChange={setStudentId}>
              <SelectTrigger><SelectValue placeholder="Pilih murid" /></SelectTrigger>
              <SelectContent>
                {students.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name} • {s.grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <div className="grid grid-cols-4 gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  variant={status === opt.value ? "default" : "outline"}
                  onClick={() => setStatus(opt.value)}
                  className="flex flex-col h-auto py-2 text-xs"
                >
                  <span className="text-lg">{opt.emoji}</span>
                  {opt.label}
                </Button>
              ))}
            </div>
            <Input placeholder="Catatan (opsional)" value={note} onChange={(e) => setNote(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="flex-1">Simpan</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-2">
        <Input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} placeholder="Filter tanggal" />
        {filterDate && (
          <Button variant="outline" size="sm" onClick={() => setFilterDate("")}>Reset</Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <ClipboardCheck className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>Belum ada catatan absensi.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((r) => {
            const meta = getStatusMeta(r.status);
            return (
              <Card key={r.id}>
                <CardContent className="py-3 px-4 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground truncate">{getStudentName(r.studentId)}</p>
                    <p className="text-xs text-muted-foreground">{r.date}{r.note ? ` • ${r.note}` : ""}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${meta.color}`}>
                    {meta.emoji} {meta.label}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AttendanceTab;
