type CategoryChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export default function CategoryChip({
  label,
  selected,
  onClick,
}: CategoryChipProps) {
  return (
    <button
      className={`capitalize px-4 py-1 text-sm rounded-full border transition cursor-pointer border-customBlack dark:border-foreground 
          ${
            selected
              ? "bg-customBlack text-white dark:bg-foreground dark:text-customBlack"
              : "bg-transparent"
          }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
