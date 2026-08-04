import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="space-y-12 py-6 max-w-6xl mx-auto px-4">
      {/* Hero Banner Card */}
      <Card className="relative overflow-hidden border border-gray-100 shadow-xl rounded-3xl bg-gradient-to-b from-blue-50/60 via-white to-white p-8 md:p-14 text-center">
        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Official Municipal Verification Portal
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight">
            Welcome to <span className="text-blue-600">eHawk</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-xl text-gray-600 leading-relaxed">
            Verify whether a street hawker is officially registered and approved by the Municipal Corporation in real-time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link to="/verify" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all text-base flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 7 0 0114 0z"
                  />
                </svg>
                Verify Hawker
              </Button>
            </Link>

            <Link to="/scan" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all text-base flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                Scan QR
              </Button>
            </Link>
          </div>
        </div>

        {/* Soft Decorative Background Circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      </Card>

      {/* Process / How It Works Card */}
      <Card className="p-8 md:p-10 shadow-lg border border-gray-100 rounded-3xl bg-white">
        <div className="text-center md:text-left mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            A simple 4-step municipal authentication ecosystem.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 relative">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base mb-4">
                01
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                1. Registration
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Hawker submits personal, vending, and document details.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base mb-4">
                02
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                2. Verification
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Municipal Admin reviews and validates submitted documents.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base mb-4">
                03
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                3. QR Generation
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Unique Hawker ID and digital QR badge are generated.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base mb-4">
                04
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                4. Public Verification
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Citizens scan QR codes or search manually to check status.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}