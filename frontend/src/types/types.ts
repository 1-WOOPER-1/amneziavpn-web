export interface ClientPeer {
  publicKey: string;
  name: string;
  creationDate: string;
  presharedKey: string;
  endpoint: string;
  allowedIps: string[];
  latestHandshake: number;
  transferRx: number;
  transferTx: number;
  persistentKeepalive: string;
  isOnline: boolean;
}

export interface ServerInfo {
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

export interface ConnectionsResponse {
  success: boolean;
  data: {
    server: ServerInfo;
    peers: ClientPeer[];
  };
}

export interface SystemStats {
  cpu: {
    load: number;
  };
  ram: {
    total: number;
    used: number;
    free: number;
    percent: number;
  };
  disk: {
    total: number;
    used: number;
    free: number;
    percent: number;
  };
  network: {
    rx_sec: number;
    tx_sec: number;
  };
}

export interface SystemStatsFormatted {
  cpu: { load: number };
  ram: { total: string; used: string; percent: number };
  disk: { total: string; used: string; percent: number };
  network: { rx_sec: string; tx_sec: string };
}

export interface SystemStatsResponse {
  success: boolean;
  data: SystemStats;
}
