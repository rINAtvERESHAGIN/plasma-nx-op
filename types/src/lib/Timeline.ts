import { type Region } from './Region';

export interface Timeline {
  id: number;
  content: Region['iso_code'];
  start: string;
}
