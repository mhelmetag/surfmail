export const voicemailFilepath = () => {
  const now = new Date();
  return `./recordings/surfmail-${now.getFullYear()}-${now.getDate()}-${now.getDay()}.mpeg`;
};
