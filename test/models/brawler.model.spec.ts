import { Brawler, BrawlClient } from '../../src';

describe('Brawler model', () => {
	const raw: Brawler.Raw = {
		id: 16000000,
		name: 'Shelly',
		starPowers: [
			{ id: 23000000, name: 'Shell Shock' }
		],
		gadgets: [
			{ id: 23000001, name: 'Fast Forward' }
		]
	};

	it('should map raw data into class fields', () => {
		const client = {} as BrawlClient;
		const brawler = Brawler.FromRaw(client, raw);

		expect(brawler.id).toBe(16000000);
		expect(brawler.starPowers).toHaveLength(1);
		expect(brawler.gadgets[0].name).toBe('Fast Forward');
	});
});
