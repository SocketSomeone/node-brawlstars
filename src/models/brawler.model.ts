import { BaseModel } from './base.model';
import { BrawlClient } from '../brawl.client';

export class Brawler extends BaseModel {
	public readonly id: number;

	public readonly name: string;

	public readonly starPowers: Brawler.StarPower[];

	public readonly gadgets: Brawler.Gadget[];

	public constructor(client: BrawlClient, raw: Brawler.Raw) {
		super(client);

		this.id = raw.id;
		this.name = raw.name;
		this.starPowers = raw.starPowers;
		this.gadgets = raw.gadgets;
	}
}

export namespace Brawler {
	export interface Raw {
		id: number;
		name: string;
		starPowers: StarPower[];
		gadgets: Gadget[];
	}

	export interface StarPower {
		id: number;
		name: string;
	}

	export interface Gadget {
		id: number;
		name: string;
	}

	export function FromRaw(client: BrawlClient, raw: Raw): Brawler {
		return new Brawler(client, raw);
	}
}
