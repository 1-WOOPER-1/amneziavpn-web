import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { getAwgClientsTable } from "./utils/clientsTable";
import { parseAwgDump } from "./utils/dump";
import { runCmd } from "./utils/cmd";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const CONTAINER_NAME = process.env.CONTAINER_NAME || "amnezia-awg2";
const INTERFACE_NAME = process.env.INTERFACE_NAME || "awg0";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, { origin: "*" });

fastify.get("/api/connections", async (_request, reply) => {
  try {
    const [dumpResult, clientsMap] = await Promise.all([
      runCmd(
        `docker exec -i ${CONTAINER_NAME} awg show ${INTERFACE_NAME} dump`,
      ),
      getAwgClientsTable(CONTAINER_NAME),
    ]);

    if (dumpResult.stderr && !dumpResult.stdout)
      throw new Error(dumpResult.stderr);

    const parsedData = parseAwgDump(dumpResult.stdout, clientsMap);
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
