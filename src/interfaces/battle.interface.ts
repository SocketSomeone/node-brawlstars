export enum EventMode {
	SoloShowdown = 'soloShowdown',
	DuoShowdown = 'duoShowdown',
	Heist = 'heist',
	Bounty = 'bounty',
	Siege = 'siege',
	GemGrab = 'gemGrab',
	BrawlBall = 'brawlBall',
	BigGame = 'bigGame',
	BossFight = 'bossFight',
	RoboRumble = 'roboRumble',
	Takedown = 'takedown',
	LoneStar = 'loneStar',
	PresentPlunder = 'presentPlunder',
	HotZone = 'hotZone',
	SuperCityRampage = 'superCityRampage',
	Knockout = 'knockout',
	Volleyball = 'volleyballBrawl',
	BasketBrawl = 'basketBrawl',
	HoldTheTrophy = 'holdTheTrophy',
	TrophyThieves = 'trophyThieves',
	Duels = 'duels',
	Wipeout = 'wipeout',
	Payload = 'payload',
	BotDrop = 'botDrop',
	Hunters = 'hunters',
	LastStand = 'lastStand',
	Unknown = 'unknown'
}

export interface BattleEvent {
	mode: EventMode;
	id: number;
	map: string;
}

export interface Battle {
	mode: string;
	type: string;
	result: 'victory' | 'defeat';
	duration: number;
	teams?: any[][];
	players?: any[];
}

export interface BattleLog {
	battle: Battle;
	battleTime: string;
	event: BattleEvent;
}

export type BattleList = {
	items: BattleLog[];
	paging: {
		cursors: Record<string, any>;
	};
};
