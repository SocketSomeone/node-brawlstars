import { ExceptionByCode, ForbiddenException, RuntimeException } from '../../src';

describe('Exceptions', () => {
	it('should expose the message through RuntimeException.what()', () => {
		const error = new RuntimeException('Boom');

		expect(error.what()).toBe('Boom');
	});

	it('should map HTTP error codes to exception classes', () => {
		const error = new ExceptionByCode[403]('Forbidden');

		expect(error).toBeInstanceOf(ForbiddenException);
		expect(error.message).toBe('Forbidden');
	});
});
