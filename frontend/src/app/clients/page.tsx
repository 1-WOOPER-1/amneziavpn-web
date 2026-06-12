"use client";

import { useEffect, useState } from "react";
import { ClientPeer, ConnectionsResponse } from "@/types/types";
import { Button } from "@/components/ui/button";
import { getAPIDomain } from "@/lib/domain";

export default function ClientsPage() {
  const [users, setUsers] = useState<ClientPeer[]>([]);

  async function fetchUsers() {
    const response = await fetch(`${getAPIDomain()}/api/connections`);
    const json: ConnectionsResponse = await response.json();
    const { peers } = json.data;

    setUsers(peers);
  }

  useEffect(() => {
    async function fetchData() {
      await fetchUsers();
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">AmneziaVPN</h1>
      <Button onClick={fetchUsers}>Fetch</Button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Public Key</th>
            <th>Endpoint</th>
            <th>Allowed IPs</th>
            <th>Latest Handshake</th>
            <th>Transfer RX</th>
            <th>Transfer TX</th>
            <th>Persistent Keepalive</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: ClientPeer) => (
            <tr key={user.publicKey}>
              <td>{user.name}</td>
              <td>{user.publicKey}</td>
              <td>{user.endpoint}</td>
              <td>{user.allowedIps.join(", ")}</td>
              <td>{new Date(user.latestHandshake * 1000).toLocaleString()}</td>
              <td>{(user.transferRx / (1024 * 1024)).toFixed(2)} MB</td>
              <td>{(user.transferTx / (1024 * 1024)).toFixed(2)} MB</td>
              <td>{user.persistentKeepalive}</td>
              <td>{user.isOnline ? "Online" : "Offline"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
