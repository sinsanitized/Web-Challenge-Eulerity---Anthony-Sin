const sizeCache = new Map<string, number | null>();

export async function estimateFileSize(imageUrl: string): Promise<number | null> {
  if (sizeCache.has(imageUrl)) {
    return sizeCache.get(imageUrl) ?? null;
  }

  try {
    const response = await fetch(imageUrl, {
      method: "HEAD",
      mode: "cors",
    });

    if (!response.ok) {
      sizeCache.set(imageUrl, null);
      return null;
    }

    const contentLength = response.headers.get("content-length");

    if (!contentLength) {
      sizeCache.set(imageUrl, null);
      return null;
    }

    const size = Number(contentLength);

    if (Number.isNaN(size)) {
      sizeCache.set(imageUrl, null);
      return null;
    }

    sizeCache.set(imageUrl, size);
    return size;
  } catch {
    sizeCache.set(imageUrl, null);
    return null;
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}
