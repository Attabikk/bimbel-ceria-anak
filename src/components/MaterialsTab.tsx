import { useState } from "react";
import { getMaterials, addMaterial, deleteMaterial, Material } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";

const SUBJECTS = ["Matematika", "IPA", "Bahasa Indonesia", "IPS", "PKn", "Bahasa Inggris", "Lainnya"];

const MaterialsTab = () => {
  const [materials, setMaterials] = useState<Material[]>(getMaterials());
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = () => {
    if (!subject || !title || !content) {
      toast.error("Semua field harus diisi!");
      return;
    }
    addMaterial({ subject, title, content });
    setMaterials(getMaterials());
    setSubject("");
    setTitle("");
    setContent("");
    setShowForm(false);
    toast.success("Materi berhasil ditambahkan!");
  };

  const handleDelete = (id: string) => {
    deleteMaterial(id);
    setMaterials(getMaterials());
    toast.success("Materi dihapus.");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Materi Pembelajaran</h2>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Tambah
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-4 flex flex-col gap-3">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger><SelectValue placeholder="Pilih mata pelajaran" /></SelectTrigger>
              <SelectContent>
                {SUBJECTS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Judul materi" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Isi materi..." value={content} onChange={(e) => setContent(e.target.value)} rows={5} />
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="flex-1">Simpan</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {materials.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>Belum ada materi. Tambahkan materi pertama!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {materials.map((m) => (
            <Card key={m.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {m.subject}
                    </span>
                    <CardTitle className="text-base mt-1">{m.title}</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{m.content}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(m.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialsTab;
