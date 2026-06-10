import Fastify from "fastify";
import cors from "@fastify/cors";
import { promisify } from "node:util";
import { exec } from "node:child_process";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const CONTAINER_NAME = process.env.CONTAINER_NAME || "amnezia-awg2";
const INTERFACE_NAME = process.env.INTERFACE_NAME || "awg0";

const execAsync = promisify(exec);
const fastify = Fastify({
  logger: true,
});

fastify.register(cors, { origin: "*" });

interface AwgServerInfo {
  privateKey: string;
  publicKey: string;
  listenPort: number;
  jc: number;
  jmin: number;
  jmax: number;
  s1: number;
  s2: number;
  h1: number;
  h2: number;
  h3: string;
  h4: string;
}

interface AwgPeerInfo {
  publicKey: string;
  presharedKey: string;
  endpoint: string;
  allowedIps: string[];
  latestHandshake: number; // Unix timestamp
  transferRx: number; // Байт получено
  transferTx: number; // Байт отправлено
  persistentKeepalive: string;
  isOnline: boolean; // Удобно для фронтенда
}

function parseAwgDump(stdout: string) {
  const lines = stdout.trim().split("\n");
  if (lines.length === 0 || lines[0] === "") {
    throw new Error("Received empty output from AmneziaWG");
  }

  const serverParts = lines[0].split("\t");
  const server: AwgServerInfo = {
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

  const peers: AwgPeerInfo[] = [];
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

    peers.push({
      publicKey,
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

fastify.get("/api/connections", async (_request, reply) => {
  try {
    const { stdout, stderr } = await execAsync(
      `docker exec -i ${CONTAINER_NAME} awg show ${INTERFACE_NAME} dump`,
    );

    if (stderr && !stdout) throw new Error(stderr);

    const parsedData = parseAwgDump(stdout);
    return { success: true, data: parsedData };
  } catch (err: any) {
    return reply.status(500).send({ success: false, error: err.message });
  }
});

async function start() {
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`API is running on http://127.0.0.1:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
