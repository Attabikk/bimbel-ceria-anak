import { Subject } from "@/data/questions";

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

const SubjectCard = ({ subject, onClick }: SubjectCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`card-bounce w-full rounded-2xl ${subject.bgColor} p-6 flex flex-col items-center gap-3 border-2 border-transparent hover:border-current ${subject.color} shadow-md cursor-pointer`}
    >
      <span className="text-5xl">{subject.icon}</span>
      <span className="text-lg font-bold text-foreground">{subject.name}</span>
      <span className="text-sm text-muted-foreground">{subject.questions.length} soal</span>
    </button>
  );
};

export default SubjectCard;
