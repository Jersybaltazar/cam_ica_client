export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-3"></div>
      <p className="text-gray-600">Cargando información...</p>
    </div>
  );
}