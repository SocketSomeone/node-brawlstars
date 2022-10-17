import { Icon } from '../interfaces';
import { Club } from './club.model';
import { BaseModel } from './base.model';
import { Brawler } from './brawler.model';

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
}

export namespace Player {
	export interface Raw {}
}
