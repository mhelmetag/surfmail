export const voicemailFilename = () => {
  // Use Pacific timezone
  const now = new Date();
  return `surfmail-${now.getFullYear()}-${now.getMonth()}-${now.getDay()}.mpeg`;
};
