import { GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaterialsTab from "@/components/MaterialsTab";
import StudentsTab from "@/components/StudentsTab";
import PaymentsTab from "@/components/PaymentsTab";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground">Bimbel SD</h1>
          <p className="text-sm text-muted-foreground">Dashboard Guru 📚</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="materials" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="materials">📖 Materi</TabsTrigger>
            <TabsTrigger value="students">👨‍🎓 Murid</TabsTrigger>
            <TabsTrigger value="payments">💰 Bayar</TabsTrigger>
          </TabsList>
          <TabsContent value="materials">
            <MaterialsTab />
          </TabsContent>
          <TabsContent value="students">
            <StudentsTab />
          </TabsContent>
          <TabsContent value="payments">
            <PaymentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
