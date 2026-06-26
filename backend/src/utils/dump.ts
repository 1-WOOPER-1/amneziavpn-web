import type { ServerInfo } from "../types/server.types";
import type { ClientPeer } from "../types/clients.types";

export function parseAwgDump(
  stdout: string,
  clientsMap: Record<string, Record<string, string>>,
) {
  const lines = stdout.trim().split("\n");
  if (lines.length === 0 || lines[0] === "") {
    throw new Error("Received empty output from AmneziaWG");
  }

  const serverParts = lines[0].split("\t");
  const server: ServerInfo = {
    privateKey: serverParts[0],
    publicKey: serverParts[1],
    listenPort: parseInt(serverParts[2], 10),
    jc: parseInt(serverParts[3], 10),
    jmin: parseInt(serverParts[4], 10),
    jmax: parseInt(serverParts[5], 10),
    s1: parseInt(serverParts[6], 10),
    s2: parseInt(serverParts[7], 10),
    h1: parseInt(serverParts[8], 10),
    h2: parseInt(serverParts[9], 10),
    h3: serverParts[10],
    h4: serverParts[11],
  };

  const peers: ClientPeer[] = [];
  const peerLines = lines.slice(1);

  for (const line of peerLines) {
    const parts = line.split("\t");
    if (parts.length < 8) continue;

    const [
      publicKey,
      presharedKey,
      endpoint,
      allowedIps,
      latestHandshakeStr,
      transferRxStr,
      transferTxStr,
      persistentKeepalive,
    ] = parts;

    const latestHandshake = parseInt(latestHandshakeStr, 10);
    const transferRx = parseInt(transferRxStr, 10);
    const transferTx = parseInt(transferTxStr, 10);

    const isOnline =
      endpoint !== "(none)" && Date.now() / 1000 - latestHandshake < 180;

    const name = clientsMap[publicKey ?? ""].name || "Unknown client";
    const creationDate =
      clientsMap[publicKey ?? ""].creationDate || new Date(0).toISOString();

    peers.push({
      publicKey,
      name,
      creationDate,
      presharedKey: presharedKey === "(none)" ? "" : presharedKey,
      endpoint: endpoint === "(none)" ? "" : endpoint,
      allowedIps: allowedIps.split(","),
      latestHandshake,
      transferRx,
      transferTx,
      persistentKeepalive,
      isOnline,
    });
  }

  return { server, peers };
}
