import { runCmd } from "./cmd";

export async function getAwgClientsTable(
  containerName: string,
): Promise<Record<string, string>> {
  try {
    const { stdout } = await runCmd(
      `docker exec -i ${containerName} cat /opt/amnezia/awg/clientsTable`,
    );

    if (!stdout.trim()) return {};

    const data = JSON.parse(stdout);
    const mapping: Record<string, string> = {};

    if (typeof data === "object" && data !== null) {
      const entries = Array.isArray(data) ? data : Object.entries(data);

      for (const entry of entries) {
        if (entry && entry.clientId && entry.userData?.clientName) {
          mapping[entry.clientId] = entry.userData.clientName;
        }
      }
    }
    return mapping;
  } catch (err) {
    return {};
  }
}
