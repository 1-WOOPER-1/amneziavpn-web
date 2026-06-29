"use client";

import { useCallback } from "react";
import { Progress } from "@/components/ui/progress";
import { getAPIDomain } from "@/lib/domain";
import { formatBytes } from "@/lib/units";
import { SystemStatsFormatted, SystemStatsResponse } from "@/types/types";
import {
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [systemStats, setSystemStats] = useState<SystemStatsFormatted | null>(
    null,
  );

  const fetchSystemStats = useCallback(async () => {
    const response = await fetch(`${getAPIDomain()}/api/system-stats`);
    const json: SystemStatsResponse = await response.json();
    const stats = json.data;

    const ramTotal = formatBytes(stats.ram.total);
    const ramUsed = formatBytes(stats.ram.used, ramTotal.unit);

    const diskTotal = formatBytes(stats.disk.total);
    const diskUsed = formatBytes(stats.disk.used, diskTotal.unit);

    const networkRx = formatBytes(stats.network.rx_sec);
    const networkTx = formatBytes(stats.network.tx_sec);

    setSystemStats({
      cpu: {
        load: stats.cpu.load,
      },
      ram: {
        total: `${ramTotal.value} ${ramTotal.unit}`,
        used: ramUsed.value.toString(),
        percent: stats.ram.percent,
      },
      disk: {
        total: `${diskTotal.value} ${diskTotal.unit}`,
        used: diskUsed.value.toString(),
        percent: stats.disk.percent,
      },
      network: {
        rx_sec: `${networkRx.value} ${networkRx.unit}`,
        tx_sec: `${networkTx.value} ${networkTx.unit}`,
      },
    });
  }, []);

  useEffect(() => {
    function fetchData() {
      fetchSystemStats();
    }
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchSystemStats]);

  return (
    <section className="w-full grid grid-cols-4 gap-5">
      <div className="aspect-square flex flex-col justify-between p-3 bg-card rounded-xl border border-border">
        <div className="flex justify-between">
          <h3 className="text-xl">Cpu Load</h3>
          <Cpu size={35} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-3xl">{systemStats?.cpu.load} %</span>
          <Progress value={systemStats?.cpu.load} />
        </div>
      </div>

      <div className="aspect-square flex flex-col justify-between p-3 bg-card rounded-xl border border-border">
        <div className="flex justify-between">
          <h3 className="text-xl">RAM Usage</h3>
          <MemoryStick size={40} />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            {systemStats?.ram.used !== undefined &&
              systemStats?.ram.total !== undefined && (
                <>
                  <span className="text-3xl">{systemStats?.ram.used}</span>
                  <span> / {systemStats?.ram.total}</span>
                </>
              )}
          </div>
          <Progress value={systemStats?.ram.percent} />
        </div>
      </div>

      <div className="aspect-square flex flex-col justify-between p-3 bg-card rounded-xl border border-border">
        <div className="flex justify-between">
          <h3 className="text-xl">Disk Allocation</h3>
          <HardDrive size={35} />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            {systemStats?.disk.used !== undefined &&
              systemStats?.disk.total !== undefined && (
                <>
                  <span className="text-3xl">{systemStats?.disk.used}</span>
                  <span> / {systemStats?.disk.total}</span>
                </>
              )}
          </div>
          <Progress value={systemStats?.disk.percent} />
        </div>
      </div>

      <div className="aspect-square flex flex-col justify-between p-3 bg-card rounded-xl border border-border">
        <div className="flex justify-between">
          <h3 className="text-xl">Link Bandwidth</h3>
          <Network size={30} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex">
            <ArrowDownRight className="text-emerald-500" />
            RX:
            {` ${systemStats?.network.rx_sec}`}
          </span>
          <span className="flex">
            <ArrowUpRight className="text-blue-500" />
            TX:
            {` ${systemStats?.network.tx_sec}`}
          </span>
        </div>
      </div>
    </section>
  );
}
