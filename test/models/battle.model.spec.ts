import { Battle, BrawlClient, BrawlMode } from '../../src';

describe('Battle model', () => {
	const client = {} as BrawlClient;

	const raw: Battle.Raw = {
		event: { id: 1, map: 'Gem Fort', mode: BrawlMode.GemGrab },
		battleTime: '20240101T010203',
		battle: {
			mode: BrawlMode.GemGrab,
			type: Battle.Type.Ranked,
			result: Battle.Result.Victory,
			duration: 90,
			players: [],
			starPlayer: {
				tag: '#STAR',
				name: 'Star Player',
				brawler: { id: 1, name: 'Shelly', power: 10, trophies: 500 }
			}
		}
	};

	it('should expose typed battle data and parsed date', () => {
		const battle = Battle.FromRaw(client, raw);

		expect(battle.mode).toBe(BrawlMode.GemGrab);
		expect(battle.result).toBe(Battle.Result.Victory);
		expect(battle.battleDate.toISOString()).toBe('2024-01-01T01:02:03.000Z');
		expect(battle.starPlayer?.name).toBe('Star Player');
	});
});
