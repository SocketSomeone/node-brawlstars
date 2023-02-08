import { Icon } from '../interfaces';
import { Club } from './club.model';
import { BaseModel } from './base.model';
import { Brawler } from './brawler.model';
import { BrawlClient } from '../brawl.client';
import { Battle } from './battle.model';

export class Player extends BaseModel {
	public readonly tag: string;

	public readonly name: string;

	public readonly icon: Icon;

	public readonly trophies: number;

	public readonly highestTrophies: number;

	public readonly expLevel: number;

	public readonly expPoints: number;

	public readonly isQualifiedFromChampionshipChallenge: boolean;

	public readonly '3vs3Victories': number;

	public readonly soloVictories: number;

	public readonly duoVictories: number;

	public readonly bestRoboRumbleTime: number;

	public readonly bestTimeAsBigBrawler: number;

	public get totalVictories(): number {
		return this['3vs3Victories'] + this.soloVictories + this.duoVictories;
	}

	public readonly club?: Club;

	public readonly brawlers: Brawler[];

	public constructor(client: BrawlClient, raw: Player.Raw) {
		super(client);

		this.tag = raw.tag;
		this.name = raw.name;
		this.icon = raw.icon;
		this.trophies = raw.trophies;
		this.highestTrophies = raw.highestTrophies;
		this.expLevel = raw.expLevel;
		this.expPoints = raw.expPoints;
		this.isQualifiedFromChampionshipChallenge = raw.isQualifiedFromChampionshipChallenge;
		this['3vs3Victories'] = raw['3vs3Victories'];
		this.soloVictories = raw.soloVictories;
		this.duoVictories = raw.duoVictories;
		this.bestRoboRumbleTime = raw.bestRoboRumbleTime;
		this.bestTimeAsBigBrawler = raw.bestTimeAsBigBrawler;

		if ('tag' in raw.club) this.club = new Club(client, raw.club);

		this.brawlers = raw.brawlers.map(brawler => new Brawler(client, brawler));
	}

	public getClub(): Promise<Club> {
		return this.client.getClub(this.club?.tag);
	}

	public getBattles(): Promise<Battle[]> {
		return this.client.getPlayerBattlelog(this.tag).then(res => res.items);
	}
}

export namespace Player {
	export interface Raw {
		tag: string;
		name: string;
		icon: Icon;
		trophies: number;
		highestTrophies: number;
		expLevel: number;
		expPoints: number;
		isQualifiedFromChampionshipChallenge: boolean;
		'3vs3Victories': number;
		soloVictories: number;
		duoVictories: number;
		bestRoboRumbleTime: number;
		bestTimeAsBigBrawler: number;
		club?: Club.Raw;
		brawlers: Brawler.Raw[];
	}

	export function FromRaw(client: BrawlClient, raw: Raw): Player {
		return new Player(client, raw);
	}
}
