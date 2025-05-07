export default function CatDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-pulse">
      <div className="rounded-xl overflow-hidden border">
        <div className="w-full h-[400px] bg-foreground/10 rounded" />
        <div className="p-3 text-center space-y-2">
          <div className="h-4 rounded w-3/4 mx-auto bg-foreground/30" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <div className="w-2/3 h-5 bg-foreground/10 rounded" />
          <div className="w-full h-4 bg-foreground/10 rounded" />
          <div className="w-4/5 h-4 bg-foreground/10 rounded" />
        </div>

        <div className="space-y-2">
          <div className="w-1/2 h-5 bg-foreground/10 rounded" />
          <div className="w-full h-4 bg-foreground/10 rounded" />
        </div>

        <div className="space-y-2">
          <div className="w-1/3 h-5 bg-foreground/10 rounded" />
          <div className="w-2/3 h-4 bg-foreground/10 rounded" />
        </div>
      </div>
    </div>
  );
}
