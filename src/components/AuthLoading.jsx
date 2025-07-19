export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="brand-spinner mb-4">
          <div className="spinner"></div>
          <div className="logo">
            <img src="/nevu.png" alt="Nevú" className="w-16 h-16" />
          </div>
        </div>
        <p className="text-gray-600 text-lg">Verificando autenticação...</p>
      </div>
    </div>
  )
} 