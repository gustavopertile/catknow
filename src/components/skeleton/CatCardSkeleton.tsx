export default function CatCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden shadow animate-pulse bg-white dark:bg-customBlack">
      <div className="w-full h-64 bg-foreground/10" />
      <div className="p-3 text-center space-y-2">
        <div className="h-4 rounded w-3/4 mx-auto bg-foreground/30" />
      </div>
    </div>
  );
}
