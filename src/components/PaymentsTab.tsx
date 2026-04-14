import { useState } from "react";
import { getPayments, addPayment, deletePayment, getStudents, Payment, Student } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Wallet, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const PaymentsTab = () => {
  const [payments, setPayments] = useState<Payment[]>(getPayments());
  const [students] = useState<Student[]>(getStudents());
  const [showForm, setShowForm] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (!studentId || !amount || !month) {
      toast.error("Murid, jumlah, dan bulan harus diisi!");
      return;
    }
    addPayment({
      studentId,
      amount: Number(amount),
      month,
      date: new Date().toISOString(),
      note,
    });
    setPayments(getPayments());
    setStudentId("");
    setAmount("");
    setMonth("");
    setNote("");
    setShowForm(false);
    toast.success("Pembayaran dicatat!");
  };

  const handleDelete = (id: string) => {
    deletePayment(id);
    setPayments(getPayments());
    toast.success("Catatan pembayaran dihapus.");
  };

  const getStudentName = (id: string) => {
    const s = students.find((s) => s.id === id);
    return s ? s.name : "Murid tidak ditemukan";
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Pembayaran</h2>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Catat
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-4 flex flex-col gap-3">
            {students.length === 0 ? (
              <p className="text-sm text-destructive">Tambahkan murid terlebih dahulu di tab Murid.</p>
            ) : (
              <>
                <Select value={studentId} onValueChange={setStudentId}>
                  <SelectTrigger><SelectValue placeholder="Pilih murid" /></SelectTrigger>
                  <SelectContent>
                    {students.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name} - Kelas {s.grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input type="number" placeholder="Jumlah pembayaran (Rp)" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger><SelectValue placeholder="Bulan pembayaran" /></SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Catatan (opsional)" value={note} onChange={(e) => setNote(e.target.value)} />
                <div className="flex gap-2">
                  <Button onClick={handleAdd} className="flex-1">Simpan</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {payments.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Wallet className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>Belum ada catatan pembayaran.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {payments.map((p) => (
            <Card key={p.id}>
              <CardContent className="py-3 px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground">{getStudentName(p.studentId)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(p.amount)} • {p.month}
                    </p>
                    {p.note && <p className="text-xs text-muted-foreground">{p.note}</p>}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-destructive hover:text-destructive">
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

export default PaymentsTab;
