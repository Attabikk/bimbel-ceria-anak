import { useState } from "react";
import { getMaterials, deleteMaterial, Material, MaterialFile } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, BookOpen, FileText, Image, Download } from "lucide-react";
import { toast } from "sonner";

const MaterialsTab = () => {
  const [materials, setMaterials] = useState<Material[]>(getMaterials());

  const handleDelete = (id: string) => {
    deleteMaterial(id);
    setMaterials(getMaterials());
    toast.success("Materi dihapus.");
  };

  const openFile = (file: MaterialFile) => {
    const link = document.createElement("a");
    link.href = file.data;
    link.download = file.name;
    if (file.type.startsWith("image/")) {
      window.open(file.data, "_blank");
    } else {
      link.click();
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <Image className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
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

            {/* File attachment */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp,.gif"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="w-4 h-4 mr-1" /> Lampirkan File
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                PDF, JPG, PNG, WebP (maks 2MB/file)
              </p>
            </div>

            {files.length > 0 && (
              <div className="flex flex-col gap-2">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 bg-muted rounded-md px-3 py-2 text-sm">
                    {getFileIcon(file.type)}
                    <span className="flex-1 truncate">{file.name}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(i)}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleAdd} className="flex-1">Simpan</Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setFiles([]); }}>Batal</Button>
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

                {m.files && m.files.length > 0 && (
                  <div className="flex flex-col gap-2 mt-3">
                    {m.files.map((file, i) => (
                      <div key={i}>
                        {file.type.startsWith("image/") ? (
                          <img
                            src={file.data}
                            alt={file.name}
                            className="rounded-md max-h-48 object-contain cursor-pointer"
                            onClick={() => window.open(file.data, "_blank")}
                          />
                        ) : (
                          <button
                            onClick={() => openFile(file)}
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Download className="w-4 h-4" />
                            {file.name}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

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
