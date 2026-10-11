import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-[#E6E8E7] bg-white shadow-xs overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
