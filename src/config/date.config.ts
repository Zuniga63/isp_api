import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);
dayjs.extend(timezone);
dayjs.extend(utc);

export const tz = process.env.TZ || 'America/Bogota';
dayjs.tz.setDefault(tz);
