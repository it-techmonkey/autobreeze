export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-matte-black">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
        <div className="absolute inset-0 h-16 w-16 rounded-full border-2 border-transparent border-b-gold/50 animate-spin [animation-delay:150ms]" />
      </div>
      <p className="mt-6 font-display text-lg text-gold-champagne tracking-[0.3em] uppercase">
        Loading
      </p>
      <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </div>
  );
}
