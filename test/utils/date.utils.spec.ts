import { DateUtils } from '../../src';


describe('DateUtils', () => {
	describe('FromString', () => {
		it('should parse valid date strings correctly', () => {
			const date = DateUtils.FromString('20240426T153045');
			expect(date.toISOString()).toBe('2024-04-26T15:30:45.000Z');
		});

		it('should handle midnight time correctly', () => {
			const date = DateUtils.FromString('20240101T000000');
			expect(date.toISOString()).toBe('2024-01-01T00:00:00.000Z');
		});

		it('should handle missing time part gracefully', () => {
			const date = DateUtils.FromString('20241231');
			expect(date.toString()).toBe('Invalid Date');
		});
	});
});
