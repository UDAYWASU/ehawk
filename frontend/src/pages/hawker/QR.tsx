import { useQuery } from "@tanstack/react-query";

import Card from "@/components/ui/Card";

import { getProfile } from "@/services/hawker";

export default function QR() {

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading)
    return <p>Loading...</p>;

  if (data.status !== "approved") {

    return (
      <Card>
        <h2 className="text-xl font-bold text-yellow-600">
          Your registration is still pending approval.
        </h2>
      </Card>
    );

  }

  return (

    <Card>

      <h1 className="mb-6 text-3xl font-bold">
        My QR Code
      </h1>

      <img
        src={data.qr_code_url}
        className="mb-6 w-72"
      />

      <p className="mb-6">

        <b>{data.hawker_id}</b>

      </p>

      <a
        href={data.qr_code_url}
        download
        className="rounded-xl bg-blue-600 px-5 py-3 text-white"
      >
        Download QR
      </a>

    </Card>

  );

}