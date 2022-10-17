import { BrawlClient } from '../src/brawl.client';
import { Club } from '../src/models';

describe('BrawlStars API Client', () => {
	const clubTag = '#2GUU9908V',
		playerTag = '#L2GULRVYJ';

	let club: Club;

	const client = new BrawlClient(
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImIzMjRmYmY4LTkzZDYtNDk2OS1iODc5LTlmMTRlZjBkYWMxNSIsImlhdCI6MTY2NTkyODIyNywic3ViIjoiZGV2ZWxvcGVyLzM2YzRjNGYzLTFiZmUtNjhiMS01N2ViLWJjNmYwNjc5MWQwZSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTEuMjA0LjE1MC45OCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.oZ4G2rCSCuiHM7JakIV6gO-WPEF4fW3F7qCWyxMBCJdFZtHXigJ9BI51taTgpHt7nZ3e_UplCYAYfQOxZjjTTQ'
	);

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

	it('should return info', done => {
		client.getPlayerBattlelog(playerTag).subscribe({
			next: data => {
				data;
			},
			complete: () => {
				done();
			}
		});
	});
});
