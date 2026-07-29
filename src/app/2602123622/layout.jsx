export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 font-sans text-gray-800">
      <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white shadow-xl">
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Howen Antonio - 2602123622</h1>
            <p className="text-indigo-200 text-sm mt-1">Computer Science Student</p>
          </div>
          <nav className="space-x-8">
            <a href="/2602123622" className="hover:text-yellow-300 transition font-medium text-sm tracking-wide uppercase">Home</a>
            <a href="/2602123622/details" className="hover:text-yellow-300 transition font-medium text-sm tracking-wide uppercase">Details</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {children}
      </main>

      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-5 text-sm mt-12">
        <p>&copy; 2026 Howen Antonio - 2602123622. All rights reserved.</p>
      </footer>
    </div>
  );
}