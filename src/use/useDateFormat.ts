export function useDateFormat(timestamp: number): string {
  return new Date(timestamp).toDateString();
}
