export namespace Pagination {
	export interface Query {
		before?: string;
		after?: string;
		limit?: number;
	}

	export interface Response<T> {
		items: T[];
		cursor: Query;
	}
}
