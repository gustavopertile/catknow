import { Breed } from "@/types/breed";
import Link from "next/link";

type Props = {
  breed: Breed;
};

export default function BreedDescription({ breed }: Props) {
  const renderInfo = (label: string, info: string | undefined) => {
    return (
      <p>
        <strong>{label}:</strong> {info ?? "Unknown"}
      </p>
    );
  };

  return (
    <>
      {renderInfo("Name", breed?.name)}
      {renderInfo("Description", breed?.description)}
      {renderInfo("Life Span", breed?.life_span)}
      {renderInfo("Origin", breed?.origin)}

      {breed?.wikipedia_url && (
        <p>
          <span className="font-semibold">More Info:</span>{" "}
          <Link
            href={breed.wikipedia_url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary"
          >
            Wikipedia
          </Link>
        </p>
      )}
    </>
  );
}
