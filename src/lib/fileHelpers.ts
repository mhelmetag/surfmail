export const voicemailFilename = () => {
  const now = new Date();
  const year = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(now);
  const month = new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(now);
  const day = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(now);
  return `surfmail-${year}-${month}-${day}.mpeg`;
};
