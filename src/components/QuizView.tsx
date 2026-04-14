import { useState } from "react";
import { Subject } from "@/data/questions";
import { ArrowLeft, CheckCircle2, XCircle, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizViewProps {
  subject: Subject;
  onBack: () => void;
}

const QuizView = ({ subject, onBack }: QuizViewProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = subject.questions[currentQ];

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);

    if (index === question.correctAnswer) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (currentQ < subject.questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setShowFeedback(false);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  if (finished) {
    const percentage = Math.round((score / subject.questions.length) * 100);
    const emoji = percentage >= 80 ? "🌟" : percentage >= 60 ? "👍" : "💪";
    const message =
      percentage >= 80
        ? "Luar biasa! Kamu hebat!"
        : percentage >= 60
        ? "Bagus! Terus belajar ya!"
        : "Semangat! Coba lagi ya!";

    return (
      <div className="flex flex-col items-center gap-6 text-center animate-in fade-in">
        <PartyPopper className="w-16 h-16 text-kids-yellow" />
        <span className="text-6xl">{emoji}</span>
        <h2 className="text-2xl font-extrabold text-foreground">Kuis Selesai!</h2>
        <p className="text-lg text-muted-foreground">{message}</p>
        <div className="rounded-2xl bg-card border p-6 shadow-sm">
          <p className="text-4xl font-black text-primary">
            {score}/{subject.questions.length}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Jawaban Benar</p>
        </div>
        <div className="flex gap-3 mt-4">
          <Button
            onClick={() => {
              setCurrentQ(0);
              setSelected(null);
              setScore(0);
              setFinished(false);
              setShowFeedback(false);
            }}
            className="rounded-xl bg-primary text-primary-foreground font-bold px-6"
          >
            Ulangi Kuis
          </Button>
          <Button onClick={onBack} variant="outline" className="rounded-xl font-bold px-6">
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            {subject.icon} {subject.name}
          </h2>
        </div>
        <span className="text-sm font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {currentQ + 1}/{subject.questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentQ + 1) / subject.questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border">
        <p className="text-xl font-bold text-foreground leading-relaxed">{question.question}</p>
      </div>

      <div className="grid gap-3">
        {question.options.map((option, index) => {
          let optionStyle = "bg-card border hover:bg-muted";
          if (showFeedback) {
            if (index === question.correctAnswer) {
              optionStyle = "bg-kids-green/15 border-kids-green text-foreground";
            } else if (index === selected && index !== question.correctAnswer) {
              optionStyle = "bg-destructive/10 border-destructive text-foreground";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showFeedback}
              className={`card-bounce w-full rounded-xl p-4 text-left font-semibold border-2 transition-all flex items-center gap-3 ${optionStyle} disabled:cursor-default`}
            >
              <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground shrink-0">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option}</span>
              {showFeedback && index === question.correctAnswer && (
                <CheckCircle2 className="w-5 h-5 text-kids-green shrink-0" />
              )}
              {showFeedback && index === selected && index !== question.correctAnswer && (
                <XCircle className="w-5 h-5 text-destructive shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizView;
