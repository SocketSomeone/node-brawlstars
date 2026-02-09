import { Battle, BrawlClient, BrawlMode, Club, Player } from '../../src';

describe('Player model', () => {
	const clubRaw: Club.Raw = {
		tag: '#CLUB',
		name: 'Club',
		description: 'Desc',
		trophies: 5000,
		requiredTrophies: 0,
		badgeId: 1,
		type: Club.Type.Open,
		members: []
	};

	const playerRaw: Player.Raw = {
		tag: '#PLAYER',
		name: 'Player',
		icon: { id: '10' },
		trophies: 10000,
		highestTrophies: 12000,
		expLevel: 10,
		expPoints: 1500,
		isQualifiedFromChampionshipChallenge: true,
		'3vs3Victories': 100,
		soloVictories: 50,
		duoVictories: 25,
		bestRoboRumbleTime: 120,
		bestTimeAsBigBrawler: 240,
		club: clubRaw,
		brawlers: [
			{
				id: 1,
				name: 'Shelly',
				starPowers: [],
				gadgets: []
			}
		]
	};

	const battleRaw: Battle.Raw = {
		event: { id: 1, map: 'Gem Fort', mode: BrawlMode.GemGrab },
		battleTime: '20240101T010203',
		battle: { mode: 'gemGrab', type: 'ranked', result: 'victory', players: [] }
	};

	let mockClient: {
		getClub: jest.Mock;
		getPlayerBattlelog: jest.Mock;
	};

	beforeEach(() => {
		mockClient = {
			getClub: jest.fn(),
			getPlayerBattlelog: jest.fn()
		};
	});

	it('should compute total victories and map nested models', () => {
		const player = Player.FromRaw(mockClient as unknown as BrawlClient, playerRaw);

		expect(player.totalVictories).toBe(175);
		expect(player.club?.name).toBe('Club');
		expect(player.brawlers[0].name).toBe('Shelly');
	});

	it('should delegate club and battle queries to the client', async () => {
		const player = new Player(mockClient as unknown as BrawlClient, playerRaw);
		mockClient.getClub.mockResolvedValue(new Club(mockClient as unknown as BrawlClient, clubRaw));
		mockClient.getPlayerBattlelog.mockResolvedValue({
			items: [Battle.FromRaw(mockClient as unknown as BrawlClient, battleRaw)],
			cursor: {}
		});

		await player.getClub();
		const battles = await player.getBattles();

		expect(mockClient.getClub).toHaveBeenCalledWith('#CLUB');
		expect(mockClient.getPlayerBattlelog).toHaveBeenCalledWith('#PLAYER');
		expect(battles[0]).toBeInstanceOf(Battle);
	});
});
