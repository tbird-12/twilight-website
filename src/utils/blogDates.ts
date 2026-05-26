export function formatBlogDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function hasDistinctUpdatedDate(
  pubDate: Date,
  updatedDate?: Date,
): updatedDate is Date {
  return Boolean(updatedDate && updatedDate.getTime() !== pubDate.getTime());
}

export function getDisplayBlogDate(pubDate: Date, updatedDate?: Date) {
  const useUpdatedDate = hasDistinctUpdatedDate(pubDate, updatedDate);
  const displayDate = useUpdatedDate ? updatedDate : pubDate;

  return {
    displayDate,
    formattedDate: formatBlogDate(displayDate),
    isUpdated: useUpdatedDate,
  };
}
