import { Axios, AxiosResponse } from 'axios';
import { TagUtils } from './utils';
import { Battle, Brawler, Club, Player, ScheduledEvent } from './models';
import { Pagination } from './interfaces';
import { ExceptionByCode } from './exceptions';

export class BrawlClient extends Axios {
	private readonly cache = new Map<string, AxiosResponse<any, any>>();

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

	private async fetch<T>(url: string, query: Record<string, any> = {}): Promise<T> {
		let response: AxiosResponse<any, any>;

		if (this.cache.has(url)) {
			response = this.cache.get(url);
		} else {
			response = await this.get(url, { params: query });

			this.cache.set(url, response);

			const cache = response.headers['cache-control'];
			const maxAge = parseInt(cache.match(/max-age=(\d+)/)?.[1]) ?? 0;

			setTimeout(() => this.cache.delete(url), maxAge * 1000);
		}

		if (response.status !== 200) throw this.errorFactory(response.status, response.data);

		return JSON.parse(response.data);
	}

	public getClub(tag: string): Promise<Club> {
		return this.fetch<Club.Raw>(`/clubs/${TagUtils.Clean(tag)}`).then(raw => Club.FromRaw(this, raw));
	}

	public getClubMembers(tag: string, options?: Pagination.Query): Promise<Pagination.Response<Club.Member>> {
		return this.fetch<Pagination.Response<Club.Member.Raw>>(`/clubs/${TagUtils.Clean(tag)}/members`, options).then(
			raw => ({ items: raw.items.map(raw => Club.Member.FromRaw(raw)), cursor: raw.cursor })
		);
	}

	public getPlayer(tag: string): Promise<Player> {
		return this.fetch<Player.Raw>(`/players/${TagUtils.Clean(tag)}`).then(raw => Player.FromRaw(this, raw));
	}

	public getPlayerBattlelog(tag: string, options?: Pagination.Query): Promise<Pagination.Response<Battle>> {
		return this.fetch<Pagination.Response<Battle.Raw>>(`/players/${TagUtils.Clean(tag)}/battlelog`, options).then(
			raw => ({ items: raw.items.map(raw => Battle.FromRaw(this, raw)), cursor: raw.cursor })
		);
	}

	public getBrawlers(options?: Pagination.Query): Promise<Pagination.Response<Brawler>> {
		return this.fetch<Pagination.Response<Brawler.Raw>>('/brawlers', options).then(raw => ({
			items: raw.items.map(raw => Brawler.FromRaw(this, raw)),
			cursor: raw.cursor
		}));
	}

	public getBrawler(id: string): Promise<Brawler> {
		return this.fetch<Brawler.Raw>(`/brawlers/${id}`).then(raw => Brawler.FromRaw(this, raw));
	}

	public getEventRotation(): Promise<ScheduledEvent> {
		return this.fetch<ScheduledEvent.Raw>('/events/rotation').then(raw => ScheduledEvent.FromRaw(raw));
	}
}
