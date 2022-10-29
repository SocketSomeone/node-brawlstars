import { BrawlMode } from '../enums';

export interface Event {
	id: number;
	mode: BrawlMode;
	map: string;
}
