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
