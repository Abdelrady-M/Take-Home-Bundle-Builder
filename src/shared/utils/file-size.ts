import { type FileSizeUnit } from "../types";

/**
 * Get file size in more human readable format
 * @param size in bytes
 */
export function fileSize(size: number): {
  size: string;
  unit: FileSizeUnit;
} {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;

  while (size > 1024) {
    size /= 1024;
    unitIndex++;
  }

  return {
    size: size.toFixed(2),
    unit: units[unitIndex] as FileSizeUnit,
  };
}

/**
 * Convert the given file size with unit into bytes
 */
export function convertFileSizeToBytes(size: number, unit: FileSizeUnit) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  const unitIndex = units.indexOf(unit);
  let result = size;

  for (let i = 0; i < unitIndex; i++) {
    result *= 1024;
  }

  return result;
}
