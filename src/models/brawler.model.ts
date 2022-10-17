import { BaseModel } from './base.model';
import { BrawlClient } from '../brawl.client';

export class Brawler extends BaseModel {
	public constructor(client: BrawlClient, raw: Brawler.Raw) {
		super(client);
	}
}

export namespace Brawler {
	export interface Raw {}

	export function FromRaw(client: BrawlClient, raw: Raw): Brawler {
		return new Brawler(client, raw);
	}
}
