// Helpers for turning FormData into backend payloads

export function readString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

// Builds a payload from optional fields. Blank fields become null (clears the value on update)
// or are omitted entirely when `omitBlank` is set (create, where null is meaningless).
export function readOptionalFields(formData: FormData, keys: readonly string[], omitBlank = false) {
  const payload: Record<string, string | null> = {};
  for (const key of keys) {
    const value = readString(formData, key);
    if (value !== null || !omitBlank) payload[key] = value;
  }
  return payload;
}

// <input type="date"> yields YYYY-MM-DD, but Prisma only accepts full ISO-8601 DateTimes,
// so dates are sent (and stored) as UTC midnight
export function toIsoDate(value: string | null) {
  if (!value) return value;
  const date = new Date(`${value}T00:00:00.000Z`);
  // Pass malformed input through untouched and let the backend reject it
  return isNaN(date.getTime()) ? value : date.toISOString();
}

// Deadlines are due by the end of the chosen day, so finishing on that day still counts as on time
export function toEndOfDayIso(value: string | null) {
  if (!value) return value;
  const date = new Date(`${value}T23:59:59.999Z`);
  return isNaN(date.getTime()) ? value : date.toISOString();
}

export function toDateInputValue(iso: string | null | undefined) {
  return iso ? iso.slice(0, 10) : "";
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(iso));
}
