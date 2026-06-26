export function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const unitInd = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${String((bytes / Math.pow(1024, unitInd)).toFixed(2))} ${units[unitInd]}`;
}
