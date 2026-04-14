import { useState } from "react";
import { getStudents, addStudent, deleteStudent, Student } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

const StudentsTab = () => {
  const [students, setStudents] = useState<Student[]>(getStudents());
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [phone, setPhone] = useState("");

  const handleAdd = () => {
    if (!name || !grade) {
      toast.error("Nama dan kelas harus diisi!");
      return;
    }
    addStudent({ name, grade, phone });
    setStudents(getStudents());
    setName("");
    setGrade("");
    setPhone("");
    setShowForm(false);
    toast.success("Murid berhasil ditambahkan!");
  };

  const handleDelete = (id: string) => {
    deleteStudent(id);
    setStudents(getStudents());
    toast.success("Murid dihapus.");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Daftar Murid</h2>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Tambah
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-4 flex flex-col gap-3">
            <Input placeholder="Nama murid" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Kelas (cth: 4 SD)" value={grade} onChange={(e) => setGrade(e.target.value)} />
            <Input placeholder="No. HP orang tua (opsional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="flex-1">Simpan</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {students.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>Belum ada murid. Tambahkan murid pertama!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {students.map((s) => (
            <Card key={s.id}>
              <CardContent className="py-3 px-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-sm text-muted-foreground">Kelas {s.grade}{s.phone ? ` • ${s.phone}` : ""}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentsTab;
