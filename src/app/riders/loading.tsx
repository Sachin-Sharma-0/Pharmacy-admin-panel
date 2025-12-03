export default function Loading() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="h-10 w-full bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
