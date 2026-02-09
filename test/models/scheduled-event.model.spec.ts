import { BrawlMode, ScheduledEvent } from '../../src';

describe('ScheduledEvent model', () => {
	it('should convert start and end times to Date instances', () => {
		const raw: ScheduledEvent.Raw = {
			startTime: '20240101T010203',
			endTime: '20240101T020304',
			slotId: 1,
			event: {
				id: 123,
				mode: BrawlMode.GemGrab,
				map: 'Gem Fort'
			}
		};

		const event = ScheduledEvent.FromRaw(raw);

		expect(event.startTimeDate.toISOString()).toBe('2024-01-01T01:02:03.000Z');
		expect(event.endTimeDate.toISOString()).toBe('2024-01-01T02:03:04.000Z');
		expect(event.event.mode).toBe(BrawlMode.GemGrab);
	});
});
