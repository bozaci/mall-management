import { generatePastDay } from '../../utils/generate-past-day';

export const pastDays = {
  '30d': new Date(generatePastDay(30)),
  '60d': new Date(generatePastDay(60)),
  '90d': new Date(generatePastDay(90)),
  '1y': new Date(generatePastDay(365)),
};
