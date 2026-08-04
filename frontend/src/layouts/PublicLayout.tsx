import { Link, Outlet } from "react-router-dom";
import headerImg from "@/assets/header.png";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Official Top Banner Image Container */}
      <div className="w-full bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2">
          <Link to="/" className="block">
            <img
              src={headerImg}
              alt="Amravati Municipal Corporation Header"
              className="w-full h-auto max-h-24 sm:max-h-28 object-contain object-left md:object-center"
            />
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link
            to="/"
            className="text-xl font-bold text-blue-800 tracking-tight flex items-center gap-2"
          >
            <span className="bg-blue-800 text-white px-2 py-0.5 rounded text-sm font-black">
              eHawk
            </span>
            <span className="text-xs text-gray-500 font-normal hidden sm:inline-block border-l pl-2 border-gray-300">
              Citizen Verification Portal
            </span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-6 text-sm font-medium text-gray-700">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/verify"
              className="px-3 py-1.5 rounded-lg hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Verify
            </Link>

            <Link
              to="/scan"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-sm"
            >
              Scan QR
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-6xl p-4 sm:p-8">
        <Outlet />
      </main>

      {/* Official Government Footer */}
      <footer className="mt-auto border-t bg-gray-900 text-gray-400 text-xs py-6 px-4">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-gray-200">
              Amravati Municipal Corporation (अमरावती महानगरपालिका)
            </p>
            <p className="mt-0.5 text-gray-400">
              Official eHawk Hawker Registration & Verification System
            </p>
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} Government of Maharashtra. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}