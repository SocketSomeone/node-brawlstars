import { BrawlClient, Club, Player, ScheduledEvent } from '../src';
import { ForbiddenException } from '../src/exceptions/forbidden.exception';

describe('BrawlClient', () => {
	let client: BrawlClient;

	beforeEach(() => {
		jest.useFakeTimers();
		client = new BrawlClient('fake-token');
	});

	it('should fetch and return a club', async () => {
		const mockClub = { name: 'Test Club', members: [] };
		client['request'] = jest.fn().mockResolvedValue({
			status: 200,
			data: JSON.stringify(mockClub),
			headers: { 'cache-control': 'max-age=60' }
		});

		const result = await client.getClub('someTag');

		expect(result).toBeInstanceOf(Club);
		expect(result.name).toBe('Test Club');
		expect(client['request']).toHaveBeenCalledWith(
			expect.objectContaining({
				method: 'get',
				url: expect.stringContaining('/clubs/'),
				params: expect.any(Object)
			})
		);
	});

	it('should fetch and return a player', async () => {
		const mockPlayer = { name: 'Test Player', club: {}, brawlers: [] };
		client['request'] = jest.fn().mockResolvedValue({
			status: 200,
			data: JSON.stringify(mockPlayer),
			headers: { 'cache-control': 'max-age=60' }
		});

		const result = await client.getPlayer('somePlayerTag');

		expect(result).toBeInstanceOf(Player);
		expect(result.name).toBe('Test Player');
	});

	it('should throw an error if API responds with non-200 status', async () => {
		client['request'] = jest.fn().mockResolvedValue({
			status: 403,
			data: { reason: 'accessDenied', message: 'Invalid authorization' },
			headers: { 'cache-control': 'max-age=60' }
		});

		await expect(client.getClub('someTag')).rejects.toThrow(ForbiddenException);
	});

	it('should fetch event rotation', async () => {
		const mockEvent = { slotId: 123 };
		client['request'] = jest.fn().mockResolvedValue({
			status: 200,
			data: JSON.stringify(mockEvent),
			headers: { 'cache-control': 'max-age=60' }
		});

		const eventRotation = await client.getEventRotation();

		expect(eventRotation).toBeInstanceOf(ScheduledEvent);
		expect(eventRotation.slotId).toBe(123);
	});

	it('should cache responses for the same URL', async () => {
		const mockData = { name: 'Cache Test', club: {}, brawlers: [] };
		const spy = jest.fn().mockResolvedValue({
			status: 200,
			data: JSON.stringify(mockData),
			headers: { 'cache-control': 'max-age=1' }
		});

		client['request'] = spy;

		await client.getPlayer('testTag');
		await client.getPlayer('testTag'); // второй раз должно идти из кэша

		expect(spy).toHaveBeenCalledTimes(1);
	});
});
