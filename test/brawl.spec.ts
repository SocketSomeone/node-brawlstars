import { BrawlClient } from '../src/brawl.client';
import { TagUtils } from '../src';

describe('BrawlStars API Client', () => {
	const clubTag = '#2GUU9908V',
		playerTag = '#L2GULRVYJ';

	const client = new BrawlClient(process.env.TOKEN);

	it('should return club', async () => {
		const club = await client.getClub(clubTag);

		expect(club.tag).toBe(clubTag);
	});

	it('should return club members', async () => {
		const members = await client.getClubMembers(clubTag);

		expect(members).toBeDefined();
	});

	it('should return player', async () => {
		const player = await client.getPlayer(playerTag);

		expect(player.tag).toBe(playerTag);
	});

	it('should return battlelogs', async () => {
		const logs = await client.getPlayerBattlelog(playerTag);

		expect(logs).toBeDefined();
		expect(Array.isArray(logs.items)).toBeTruthy();
	});
});
