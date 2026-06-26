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
