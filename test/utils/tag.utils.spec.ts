import { TagUtils } from '../../src';

describe('TagUtils', () => {
	describe('Clean', () => {
		it('should convert letters to uppercase and replace "O" and "o" with "0"', () => {
			expect(TagUtils.Clean('abco')).toBe('%23ABC0');
		});

		it('should remove leading # if present', () => {
			expect(TagUtils.Clean('#abc')).toBe('%23ABC');
		});

		it('should handle already clean tags', () => {
			expect(TagUtils.Clean('123ABC')).toBe('%23123ABC');
		});

		it('should handle empty string', () => {
			expect(TagUtils.Clean('')).toBe('%23');
		});

		it('should encode special characters', () => {
			expect(TagUtils.Clean('a#b@c!')).toBe('%23A%23B%40C!');
		});
	});
});
