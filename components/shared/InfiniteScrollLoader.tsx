export default function InfiniteScrollLoader() {
  return (
    <div className="col-span-2 flex justify-center items-center py-8">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-[#E5DCC5] rounded-full" />
          <div className="absolute inset-0 border-4 border-[#C2A14D] rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="text-gray-500 text-sm font-medium">Loading more products...</p>
      </div>
    </div>
  );
}
