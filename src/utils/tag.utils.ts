export namespace TagUtils {
	export function Clean(tag: string): string {
		return encodeURIComponent(`#${tag.toUpperCase().replace(/O|o/g, '0').replace(/^#/g, '')}`);
	}
}
