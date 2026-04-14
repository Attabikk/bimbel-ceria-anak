export interface Material {
  id: string;
  subject: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  phone: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  month: string;
  date: string;
  note: string;
}

const MATERIALS_KEY = "bimbel_materials";
const STUDENTS_KEY = "bimbel_students";
const PAYMENTS_KEY = "bimbel_payments";

function getItem<T>(key: string): T[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function setItem<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Materials
export const getMaterials = () => getItem<Material>(MATERIALS_KEY);
export const addMaterial = (m: Omit<Material, "id" | "createdAt">) => {
  const all = getMaterials();
  const item: Material = { ...m, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  all.push(item);
  setItem(MATERIALS_KEY, all);
  return item;
};
export const deleteMaterial = (id: string) => {
  setItem(MATERIALS_KEY, getMaterials().filter((m) => m.id !== id));
};

// Students
export const getStudents = () => getItem<Student>(STUDENTS_KEY);
export const addStudent = (s: Omit<Student, "id">) => {
  const all = getStudents();
  const item: Student = { ...s, id: crypto.randomUUID() };
  all.push(item);
  setItem(STUDENTS_KEY, all);
  return item;
};
export const deleteStudent = (id: string) => {
  setItem(STUDENTS_KEY, getStudents().filter((s) => s.id !== id));
};

// Payments
export const getPayments = () => getItem<Payment>(PAYMENTS_KEY);
export const addPayment = (p: Omit<Payment, "id">) => {
  const all = getPayments();
  const item: Payment = { ...p, id: crypto.randomUUID() };
  all.push(item);
  setItem(PAYMENTS_KEY, all);
  return item;
};
export const deletePayment = (id: string) => {
  setItem(PAYMENTS_KEY, getPayments().filter((p) => p.id !== id));
};
