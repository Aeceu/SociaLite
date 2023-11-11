import { LucideLoader2 } from "lucide-react";

export default function LoadingAnim({
  className,
  size,
}: {
  className?: string;
  size?: string;
}) {
  return (
    <LucideLoader2
      className={`animate-spin ${className}`}
      size={size ? size : "1rem"}
    />
  );
}
