import { from, iif, map, Observable, of, shareReplay, switchMap, tap, throwError, timer } from 'rxjs';
import type { BattleList } from './interfaces/battle.interface';
import { Axios } from 'axios';
import { TagUtils } from './utils';
import { Club, Player } from './models';
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

	private fetch<T>(url: string): Observable<T> {
		if (!this.cache.has(url)) {
			const fetch$ = from(this.get(url)).pipe(
				tap(response => {
					const cache = response.headers['cache-control'];
					const maxAge = parseInt(cache.match(/max-age=(\d+)/)?.[1]) ?? 0;

					if (maxAge > 0) {
						timer(maxAge * 1000).subscribe(() => this.cache.delete(url));
					}
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

	public getClubMembers(tag: string): Observable<Pagination.Response<Club.Member>> {
		return this.fetch<Pagination.Response<Club.Member.Raw>>(`/clubs/${TagUtils.Clean(tag)}/members`).pipe(
			map(raw => ({ items: raw.items.map(Club.Member.FromRaw), cursor: raw.cursor }))
		);
	}

	public getPlayer(tag: string): Observable<Player> {
		return this.fetch<Player.Raw>(`/players/${TagUtils.Clean(tag)}`).pipe(map(raw => Player.FromRaw(this, raw)));
	}

	public getPlayerBattlelog(tag: string): Observable<BattleList> {
		return this.fetch(`/players/${TagUtils.Clean(tag)}/battlelog`);
	}
}
