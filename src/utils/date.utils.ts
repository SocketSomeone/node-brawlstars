export namespace DateUtils {
	export function fromString(date: string): Date {
		const year = date.substring(0, 4);
		const month = date.substring(4, 6);
		const day = date.substring(6, 8);
		const hour = date.substring(9, 11);
		const minute = date.substring(11, 13);
		const second = date.substring(13, 15);

		return new Date(Date.parse(`${year}-${month}-${day} ${hour}:${minute}:${second}.000Z`));
	}
}
