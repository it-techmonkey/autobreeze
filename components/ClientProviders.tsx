"use client";

import { BookModalProvider } from "@/contexts/BookModalContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <BookModalProvider>{children}</BookModalProvider>;
}
