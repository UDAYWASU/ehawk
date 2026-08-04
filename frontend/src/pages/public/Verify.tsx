import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { verifyById } from "@/services/public";

export default function Verify() {

  const [hawkerId, setHawkerId] = useState("");

  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({

    queryKey: ["verify", search],

    queryFn: () => verifyById(search),

    enabled: search.length > 0,

  });

  return (
    <div className="mx-auto max-w-xl space-y-6">

      <Card>

        <Input
          label="Hawker ID"
          placeholder="NGP-HWK-00000001"
          value={hawkerId}
          onChange={(e) =>
            setHawkerId(e.target.value)
          }
        />

        <div className="mt-5">

          <Button
            loading={isLoading}
            onClick={() => setSearch(hawkerId)}
          >
            Verify
          </Button>

        </div>

      </Card>

      {data && (

        <Card>

          {data.verified ? (
            <div className="space-y-2">

              <h2 className="text-xl font-bold">
                Verified
              </h2>

              <p>Name: {data.data.name}</p>

              <p>Business: {data.data.business}</p>

              <p>City: {data.data.city}</p>

              <p>Status: {data.data.status}</p>

              <img
                src={data.data.photo}
                alt=""
                className="mt-4 h-40 rounded-xl"
              />

            </div>
          ) : (

            <div className="text-red-600">

              {data.message}

            </div>

          )}

        </Card>

      )}

    </div>
  );
}