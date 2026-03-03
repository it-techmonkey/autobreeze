"use client";

import { useState } from "react";
import ThreeSixtyViewer from "@/components/ThreeSixtyViewer";

interface Car360ButtonProps {
  url: string;
  title: string;
}

export default function Car360Button({ url, title }: Car360ButtonProps) {
  const [show360, setShow360] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShow360(true)}
        className="inline-flex items-center justify-center rounded-full border-2 border-gold px-8 py-4 font-semibold text-gold hover:bg-gold/10 transition-colors"
      >
        View 360°
      </button>
      <ThreeSixtyViewer
        isOpen={show360}
        onClose={() => setShow360(false)}
        url={url}
        title={title}
      />
    </>
  );
}
