import { useState } from "react";
import { subjects, Subject } from "@/data/questions";
import SubjectCard from "@/components/SubjectCard";
import QuizView from "@/components/QuizView";
import { GraduationCap } from "lucide-react";

const Index = () => {
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-8">
        {!activeSubject ? (
          <div className="flex flex-col gap-8 animate-in fade-in">
            {/* Header */}
            <div className="text-center flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-black text-foreground">Bimbel SD</h1>
              <p className="text-muted-foreground font-medium">
                Belajar seru untuk anak SD! 🎒
              </p>
            </div>

            {/* Subject cards */}
            <div className="grid gap-4">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onClick={() => setActiveSubject(subject)}
                />
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Pilih mata pelajaran untuk mulai kuis ✨
            </p>
          </div>
        ) : (
          <QuizView subject={activeSubject} onBack={() => setActiveSubject(null)} />
        )}
      </div>
    </div>
  );
};

export default Index;
