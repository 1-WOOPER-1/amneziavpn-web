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
