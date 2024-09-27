export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-based month
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function timeToSeconds(time: string): number {
  const parts = time.split(":");

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parts[2] ? parseInt(parts[2], 10) : 0; // Default to 0 if seconds are not provided

  return hours * 3600 + minutes * 60 + seconds;
}

export function secondsToTime(
  seconds: number,
  includeSeconds: boolean = false,
): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(secs).padStart(2, "0");

  if (includeSeconds) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedHours}:${formattedMinutes}`;
  }
}
