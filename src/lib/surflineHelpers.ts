export const humanizeCompassDirection = (degrees: number): string => {
  if (degrees >= 11.25 && degrees < 33.75) {
    return "north northeast";
  } else if (degrees >= 33.75 && degrees < 56.25) {
    return "northeast";
  } else if (degrees >= 56.25 && degrees < 78.75) {
    return "east northeast";
  } else if (degrees >= 78.75 && degrees < 101.25) {
    return "east";
  } else if (degrees >= 101.25 && degrees < 123.75) {
    return "east southeast";
  } else if (degrees >= 123.75 && degrees < 146.25) {
    return "southeast";
  } else if (degrees >= 146.25 && degrees < 168.75) {
    return "south southeast";
  } else if (degrees >= 168.75 && degrees < 191.25) {
    return "south";
  } else if (degrees >= 191.25 && degrees < 213.75) {
    return "south southwest";
  } else if (degrees >= 213.75 && degrees < 236.25) {
    return "southwest";
  } else if (degrees >= 236.25 && degrees < 258.75) {
    return "west southwest";
  } else if (degrees >= 258.75 && degrees < 281.25) {
    return "west";
  } else if (degrees >= 281.25 && degrees < 303.75) {
    return "west northwest";
  } else if (degrees >= 303.75 && degrees < 326.25) {
    return "northwest";
  } else if (degrees >= 326.25 && degrees < 348.75) {
    return "north northwest";
  } else {
    return "north";
  }
};
