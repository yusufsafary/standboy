export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-[960px] mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}
