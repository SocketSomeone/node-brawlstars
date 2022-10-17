import { Event } from '../interfaces';
import { DateUtils } from '../utils';

export class ScheduledEvent {
	public startTime: string;

	public get startTimeDate(): Date {
		return DateUtils.fromString(this.startTime);
	}

	public endTime: string;

	public get endTimeDate(): Date {
		return DateUtils.fromString(this.startTime);
	}

	public slotId: number;

	public event: Event;

	public constructor(raw: ScheduledEvent.Raw) {
		this.startTime = raw.startTime;
		this.endTime = raw.endTime;
		this.slotId = raw.slotId;
		this.event = raw.event;
	}
}

export namespace ScheduledEvent {
	export interface Raw {
		startTime: string;
		endTime: string;
		slotId: number;
		event: Event;
	}

	export function FromRaw(raw: Raw): ScheduledEvent {
		return new ScheduledEvent(raw);
	}
}
