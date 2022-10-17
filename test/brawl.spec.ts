import { BrawlClient } from '../src/brawl.client';

describe('BrawlStars API Client', () => {
	const clubTag = '#2GUU9908V',
		playerTag = '#L2GULRVYJ';

	const client = new BrawlClient(process.env.TOKEN);

	it('should return club', done => {
		client.getClub(clubTag).subscribe(club => {
			expect(club.tag).toBe(clubTag);
			done();
		});
	});

	it('should return club members', done => {
		client.getClubMembers(clubTag).subscribe(members => {
			expect(members).toBeDefined();
			done();
		});
	});

	it('should return player', done => {
		client.getPlayer(playerTag).subscribe(p => {
			expect(p.tag).toBe(playerTag);
			done();
		});
	});
});
