import { ClientPeer } from "@/types/types";
import { Button } from "./button";
import { ArrowDownRight, ArrowUpRight, UserCheck } from "lucide-react";
import { formatBytes } from "@/lib/units";

export function ClientCard({ client }: { client: ClientPeer }) {
  return (
    <div className="w-full p-3 bg-card rounded-xl border border-border grid grid-cols-3">
      <div className="flex gap-2 items-center">
        <Button variant="active-client">
          <UserCheck className="size-5" />
        </Button>
        <div>
          <h3 className="text-lg">{client.name}</h3>
          <span className="text-muted-foreground text-xs">
            Created on {new Date(client.creationDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <div className="flex flex-col">
          <span className="text-sm flex items-center gap-1 text-muted-foreground">
            <ArrowDownRight className="inline text-emerald-500" size={15} />{" "}
            Downloaded:{" "}
          </span>
          <span className="text-sm flex items-center gap-1 text-muted-foreground">
            <ArrowUpRight className="inline text-blue-500" size={15} />{" "}
            Uploaded:{" "}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm">{formatBytes(client.transferRx)}</span>
          <span className="text-sm">{formatBytes(client.transferTx)}</span>
        </div>
      </div>
    </div>
  );
}
