import { from, iif, map, Observable, of, shareReplay, switchMap, tap, throwError, timer } from 'rxjs';
import { Axios } from 'axios';
import { TagUtils } from './utils';
import { Battle, Brawler, Club, Player, ScheduledEvent } from './models';
import { Pagination } from './interfaces';
import { ExceptionByCode } from './exceptions';

export class BrawlClient extends Axios {
	private readonly cache = new Map<string, Observable<any>>();

	public constructor(token: string) {
		super({
			baseURL: 'https://api.brawlstars.com/v1',
			headers: {
				Authorization: `Bearer ${token}`,
				'User-Agent': 'node-brawlstars https://github.com/SocketSomeone/node-brawlstars',
				'Content-Type': 'application/json'
			}
		});
	}

	private readonly errorFactory = (status: number, message: string) => new ExceptionByCode[status](message);

	private fetch<T>(url: string, query: Record<string, any> = {}): Observable<T> {
		if (!this.cache.has(url)) {
			const fetch$ = from(this.get(url, { params: query })).pipe(
				tap(response => {
					const cache = response.headers['cache-control'];
					const maxAge = parseInt(cache.match(/max-age=(\d+)/)?.[1]) ?? 0;

					timer(maxAge * 1000).subscribe(() => this.cache.delete(url));
				}),
				switchMap(response =>
					iif(
						() => response.status === 200,
						of(JSON.parse(response.data)),
						throwError(() => this.errorFactory(response.status, response.data))
					)
				)
			);

			this.cache.set(url, fetch$.pipe(shareReplay(1)));
		}

		return this.cache.get(url);
	}

	public getClub(tag: string): Observable<Club> {
		return this.fetch<Club.Raw>(`/clubs/${TagUtils.Clean(tag)}`).pipe(map(raw => Club.FromRaw(this, raw)));
	}

	public getClubMembers(tag: string, options?: Pagination.Query): Observable<Pagination.Response<Club.Member>> {
		return this.fetch<Pagination.Response<Club.Member.Raw>>(`/clubs/${TagUtils.Clean(tag)}/members`, options).pipe(
			map(raw => ({ items: raw.items.map(raw => Club.Member.FromRaw(raw)), cursor: raw.cursor }))
		);
	}

	public getPlayer(tag: string): Observable<Player> {
		return this.fetch<Player.Raw>(`/players/${TagUtils.Clean(tag)}`).pipe(map(raw => Player.FromRaw(this, raw)));
	}

	public getPlayerBattlelog(tag: string, options?: Pagination.Query): Observable<Pagination.Response<Battle>> {
		return this.fetch<Pagination.Response<Battle.Raw>>(`/players/${TagUtils.Clean(tag)}/battlelog`, options).pipe(
			map(raw => ({ items: raw.items.map(raw => Battle.FromRaw(this, raw)), cursor: raw.cursor }))
		);
	}

	public getBrawlers(options?: Pagination.Query): Observable<Pagination.Response<Brawler>> {
		return this.fetch<Pagination.Response<Brawler.Raw>>('/brawlers', options).pipe(
			map(raw => ({ items: raw.items.map(raw => Brawler.FromRaw(this, raw)), cursor: raw.cursor }))
		);
	}

	public getBrawler(id: string): Observable<Brawler> {
		return this.fetch<Brawler.Raw>(`/brawlers/${id}`).pipe(map(raw => Brawler.FromRaw(this, raw)));
	}

	public getEventRotation(): Observable<ScheduledEvent> {
		return this.fetch<ScheduledEvent.Raw>('/events/rotation').pipe(map(raw => ScheduledEvent.FromRaw(raw)));
	}
}
