export const voicemailFilename = () => {
  const now = new Date();
  return `surfmail-${now.getFullYear()}-${now.getMonth()}-${now.getDay()}.mpeg`;
};
