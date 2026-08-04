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
      <h2 className="text-xl font-bold text-foreground">Materi Pembelajaran</h2>

      {materials.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>Belum ada materi.</p>
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
