import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { LEVELS } from "@/lib/constants";
import type { Level } from "@/lib/types";

export type LevelSelectorProps = {
  value: Level;
  onChange: (level: Level) => void;
  className?: string;
};

const options = LEVELS.map((l) => ({
  value: l.id,
  label: l.label,
}));

export function LevelSelector({ value, onChange, className }: LevelSelectorProps) {
  return (
    <div className={className}>
      <SegmentedControl<Level>
        options={options}
        value={value}
        onChange={onChange}
        ariaLabel="Simplicity level"
      />
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Converts legal English into clear, plain words so court orders and legal authority rulings are understandable by anyone.
      </p>
    </div>
  );
}
