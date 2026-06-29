type unitsString = "B" | "KB" | "MB" | "GB" | "TB";

interface formatBytesResult {
  value: number;
  unit: unitsString;
}

export function formatBytes(
  bytes: number,
  unit?: unitsString,
): formatBytesResult {
  const units = ["B", "KB", "MB", "GB", "TB"];
  if (typeof unit !== "undefined" && !units.includes(unit))
    throw new Error(
      "Incorrect memory units selected. Correct units: B, KB, MB, GB, TB",
    );

  if (bytes === 0) return { value: 0, unit: "B" };

  const degree = unit
    ? units.indexOf(unit)
    : Math.floor(Math.log(bytes) / Math.log(1024));

  let res = bytes / Math.pow(1024, degree);
  if (res > 100) res = Math.round(res);
  else if (res > 10) res = Math.round(res * 10) / 10;
  else res = Math.round(res * 100) / 100;

  return {
    value: res,
    unit: units[degree] as unitsString,
  };
}
