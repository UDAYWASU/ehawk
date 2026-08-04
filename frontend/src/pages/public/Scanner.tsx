import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

import Card from "@/components/ui/Card";

import { verifyById } from "@/services/public";

export default function Scanner() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        scanner.clear();

        const id = decodedText.trim().toUpperCase();

        const data = await verifyById(id);

        setResult(data);
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl py-8 px-4 space-y-8">
      {/* QR Scanner Card */}
      <Card className="p-8 shadow-xl border border-gray-100 rounded-2xl bg-white text-center">
        <div className="mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 mb-3">
            <svg
              className="h-6 w-6 text-blue-600"
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
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Scan QR Code
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Position the hawker ID QR code inside the camera frame below.
          </p>
        </div>

        {/* Viewport styling wrapper for html5-qrcode element */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-2 shadow-inner">
          <div id="reader" className="w-full" />
        </div>
      </Card>

      {/* Verification Result Card */}
      {result && (
        <Card className="p-8 shadow-xl border border-gray-100 rounded-2xl bg-white overflow-hidden animate-fadeIn">
          {result.verified ? (
            <div className="space-y-6">
              {/* Verification Success Header */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-emerald-900">
                    Official Hawker Verified
                  </h2>
                  <p className="text-xs text-emerald-700 font-medium">
                    This registration is verified and active with the local authority.
                  </p>
                </div>
              </div>

              {/* Information Grid & Photo */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start pt-2">
                {result.data?.photo && (
                  <img
                    src={result.data.photo}
                    alt={result.data.name || "Hawker Photo"}
                    className="h-40 w-40 object-cover rounded-xl border-2 border-gray-100 shadow-md ring-4 ring-emerald-50 shrink-0"
                  />
                )}

                <div className="flex-1 w-full space-y-3">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500">
                      Hawker Name
                    </span>
                    <span className="block text-base font-bold text-gray-900 mt-0.5">
                      {result.data?.name || "N/A"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="block text-xs font-medium text-gray-500">
                        Business Category
                      </span>
                      <span className="block text-sm font-semibold text-gray-800 mt-0.5">
                        {result.data?.business || "N/A"}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="block text-xs font-medium text-gray-500">
                        City / Location
                      </span>
                      <span className="block text-sm font-semibold text-gray-800 mt-0.5">
                        {result.data?.city || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500">
                      Registration Status
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      {result.data?.status || "Active"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Verification Failed State */
            <div className="flex items-start gap-4 p-5 rounded-xl bg-red-50 border border-red-200">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-red-900">
                  Verification Failed
                </h2>
                <p className="text-sm text-red-700 mt-0.5">
                  {result.message || "Invalid or unverified Hawker ID scanned."}
                </p>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}