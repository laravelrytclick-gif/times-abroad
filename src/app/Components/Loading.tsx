// app/dashboard/loading.tsx
export default function Loading() {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="relative h-16 w-16">
          {/* Animated Blue Ring */}
          <div className="absolute h-full w-full rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  }