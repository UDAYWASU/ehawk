import { useQuery } from "@tanstack/react-query";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

import { getProfile } from "@/services/hawker";

export default function Profile() {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl py-10 px-4">
        <Card className="p-8 shadow-sm border border-gray-100 rounded-2xl bg-white animate-pulse">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 border-b pb-6">
            <div className="h-28 w-28 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-3 w-full text-center sm:text-left">
              <div className="h-7 bg-gray-200 rounded w-1/3 mx-auto sm:mx-0" />
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto sm:mx-0" />
              <div className="h-6 bg-gray-200 rounded-full w-20 mx-auto sm:mx-0 mt-2" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="h-16 bg-gray-100 rounded-xl" />
            <div className="h-16 bg-gray-100 rounded-xl" />
            <div className="h-16 bg-gray-100 rounded-xl" />
            <div className="h-16 bg-gray-100 rounded-xl" />
          </div>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-xl py-12 px-4">
        <Card className="p-8 text-center shadow-sm border border-gray-100 rounded-2xl bg-white">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
            <svg
              className="h-6 w-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Profile Not Found
          </h3>
          <p className="text-sm text-gray-500">
            We couldn't retrieve your profile details at this moment.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl py-8 px-4">
      <Card className="p-8 shadow-xl border border-gray-100 rounded-2xl bg-white overflow-hidden">
        {/* Profile Header Block */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-100 pb-8">
          {data.photo_url ? (
            <img
              src={data.photo_url}
              className="h-28 w-28 rounded-full object-cover shadow-md ring-4 ring-indigo-50 border border-gray-200"
              alt="Profile"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl font-bold ring-4 ring-indigo-50/50">
              {data.full_name ? data.full_name.charAt(0).toUpperCase() : "H"}
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {data.full_name || "Hawker Profile"}
              </h1>
              <div>
                <Badge status={data.status} />
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-1 font-medium">
              {data.business_category || "General Vendor"}
            </p>

            {data.hawker_id && (
              <div className="mt-3 inline-flex items-center px-3 py-1 rounded-md bg-gray-50 border border-gray-200 text-xs font-mono text-gray-600">
                <span className="font-semibold mr-1.5 text-gray-400">ID:</span>
                {data.hawker_id}
              </div>
            )}
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="mt-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Account Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100">
              <span className="block text-xs font-medium text-gray-500">
                Full Name
              </span>
              <span className="block text-base font-semibold text-gray-800 mt-1">
                {data.full_name || "N/A"}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100">
              <span className="block text-xs font-medium text-gray-500">
                Phone Number
              </span>
              <span className="block text-base font-semibold text-gray-800 mt-1">
                {data.phone || "N/A"}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100">
              <span className="block text-xs font-medium text-gray-500">
                Business Category
              </span>
              <span className="block text-base font-semibold text-gray-800 mt-1">
                {data.business_category || "N/A"}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100">
              <span className="block text-xs font-medium text-gray-500">
                City / Location
              </span>
              <span className="block text-base font-semibold text-gray-800 mt-1">
                {data.city || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}