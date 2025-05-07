import { Breed } from "@/types/breed";

type Props = {
  breed: Breed;
};

export default function BreedAttributes({ breed }: Props) {
  const numericAttributes = Object.entries(breed)
    .filter(([, value]) => typeof value === "number")
    .map(([key, value]) => ({
      key,
      label: key.replace(/_/g, " "),
      value: value as number,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  if (numericAttributes.length === 0) return null;

  return (
    <div className="space-y-4 mt-4">
      {numericAttributes.map(({ key, label, value }) => (
        <div key={key}>
          <div className="flex justify-between mb-1 text-sm font-medium">
            <span className="capitalize">{label}</span>
            <span>{value}/5</span>
          </div>
          <div className="w-full bg-foreground/10 h-2 rounded">
            <div
              className="h-full bg-foreground rounded"
              style={{ width: `${(value / 5) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
