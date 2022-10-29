import { BaseModel } from './base.model';
import { BrawlClient } from '../brawl.client';
import { Event } from '../interfaces';
import { Player } from './player.model';
import { BrawlMode } from '../enums';
import { DateUtils } from '../utils';

export class Battle extends BaseModel {
	public readonly event: Event;

	public readonly battleTime: string;

	public get battleDate(): Date {
		return DateUtils.FromString(this.battleTime);
	}

	public readonly mode: BrawlMode;

	public readonly type: Battle.Type;

	public readonly result: Battle.Result;

	public readonly duration?: number;

	public readonly starPlayer?: Player;

	public readonly teams?: Battle.Player[][];

	public readonly players?: Battle.Player[];

	public constructor(client: BrawlClient, raw: Battle.Raw) {
		super(client);

		this.event = raw.event;
		this.battleTime = raw.battleTime;
		Object.assign(this, raw.battle);
	}
}

export namespace Battle {
	export interface Raw {
		event: Event;

		battleTime: string;

		battle: Record<string, any>;
	}

	export function FromRaw(client: BrawlClient, raw: Raw): Battle {
		return new Battle(client, raw);
	}

	export enum Type {
		Ranked = 'ranked',
		Friendly = 'friendly'
	}

	export enum Result {
		Victory = 'victory',
		Defeat = 'defeat'
	}

	export interface Player {
		tag: string;
		name: string;
		brawler: {
			id: number;
			name: string;
			power: number;
			trophies: number;
		};
	}
}
