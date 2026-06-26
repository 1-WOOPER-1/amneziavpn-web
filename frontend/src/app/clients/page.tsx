"use client";

import { useEffect, useState } from "react";
import { ClientPeer, ConnectionsResponse } from "@/types/types";
import { Button } from "@/components/ui/button";
import { getAPIDomain } from "@/lib/domain";
import { Plus, Users } from "lucide-react";
import { ClientCard } from "@/components/ui/client-card";

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientPeer[]>([]);

  async function fetchClients() {
    const response = await fetch(`${getAPIDomain()}/api/connections`);
    const json: ConnectionsResponse = await response.json();
    const { peers } = json.data;

    setClients(peers);
  }

  useEffect(() => {
    async function fetchData() {
      await fetchClients();
    }
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between py-3 my-3 border-b">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Users size={34} />
            VPN Tunnel Access Cards
          </h2>
          <p className="text-sm text-muted-foreground">
            Centrally generate security keys, view configuration profiles, and
            scan QR Codes.
          </p>
        </div>
        <Button>
          <Plus />
          Generate Access Key
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {clients.map((client: ClientPeer) => (
          <ClientCard key={client.publicKey} client={client} />
        ))}
      </div>

      <Button onClick={fetchClients}>Fetch</Button>
    </div>
  );
}
