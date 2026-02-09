import { BrawlClient, Club, Pagination } from '../../src';

describe('Club model', () => {
	const memberRaw: Club.Member.Raw = {
		tag: '#PLAYER',
		name: 'Test Member',
		nameColor: '#ffffff',
		role: Club.Member.Role.Member,
		trophies: 500,
		icon: { id: '1' }
	};

	const clubRaw: Club.Raw = {
		tag: '#CLUB',
		name: 'Test Club',
		description: 'Description',
		trophies: 12345,
		requiredTrophies: 1000,
		badgeId: 10,
		type: Club.Type.Open,
		members: [memberRaw]
	};

	it('should map members when created from raw data', () => {
		const club = Club.FromRaw({} as BrawlClient, clubRaw);

		expect(club.members).toHaveLength(1);
		expect(club.members[0]).toBeInstanceOf(Club.Member);
		expect(club.members[0].name).toBe('Test Member');
	});

	it('should delegate fetching members to the client', async () => {
		const mockClient: Pick<BrawlClient, 'getClubMembers'> = {
			getClubMembers: jest.fn().mockResolvedValue({
				items: [Club.Member.FromRaw(memberRaw)],
				cursor: {} as Pagination.Query
			})
		};

		const club = new Club(mockClient as BrawlClient, clubRaw);
		const members = await club.getMembers();

		expect(mockClient.getClubMembers).toHaveBeenCalledWith('#CLUB');
		expect(members[0].tag).toBe('#PLAYER');
	});
});
