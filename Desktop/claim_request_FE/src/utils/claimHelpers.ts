import { parse, differenceInHours, isValid } from "date-fns";

export const calculateClaimHours = (from: string, to: string, timeFormat = "HH:mm") => {
  const fromTime = parse(from, timeFormat, new Date());
  const toTime = parse(to, timeFormat, new Date());
  if (isValid(fromTime) && isValid(toTime) && toTime > fromTime) {
    return differenceInHours(toTime, fromTime);
  }
  return 0;
};