import { BrawlClient } from '../src/brawl.client';
import { Club } from '../src/models';

describe('BrawlStars API Client', () => {
	const clubTag = '#2GUU9908V',
		playerTag = '#L2GULRVYJ';

	let club: Club;

	const client = new BrawlClient(process.env.TOKEN);

	it('should return club', done => {
		client.getClub(clubTag).subscribe(c => {
			expect(c.tag).toBe(clubTag);
			club = c;
			done();
		});
	});

	it('should return club members', done => {
		club.getMembers().subscribe(members => {
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
