"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import BookNowModal from "@/components/BookNowModal";

export type RentalPlan = "Daily" | "Weekly" | "Monthly";

type BookModalContextType = {
  openBookModal: (initialCar?: string, initialPlan?: RentalPlan) => void;
  closeBookModal: () => void;
};

const BookModalContext = createContext<BookModalContextType | null>(null);

export function BookModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialCar, setInitialCar] = useState("");
  const [initialPlan, setInitialPlan] = useState<RentalPlan>("Daily");

  const openBookModal = useCallback((car?: string, plan?: RentalPlan) => {
    if (car) setInitialCar(car);
    else setInitialCar("");
    if (plan) setInitialPlan(plan);
    else setInitialPlan("Daily");
    setIsOpen(true);
  }, []);

  const closeBookModal = useCallback(() => setIsOpen(false), []);

  return (
    <BookModalContext.Provider value={{ openBookModal, closeBookModal }}>
      {children}
      <BookNowModal isOpen={isOpen} onClose={closeBookModal} initialCar={initialCar} initialPlan={initialPlan} />
    </BookModalContext.Provider>
  );
}

export function useBookModal() {
  const ctx = useContext(BookModalContext);
  if (!ctx) throw new Error("useBookModal must be used within BookModalProvider");
  return ctx;
}
