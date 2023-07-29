export const voicemailFilename = () => {
  const now = new Date();
  return `surfmail-${now.getFullYear()}-${now.getDate()}-${now.getDay()}.mpeg`;
};
