import { cn } from "@/lib/utils";

export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E2923]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base sm:text-lg text-[#4B5651]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
