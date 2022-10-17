import { Icon } from '../interfaces';
import { BaseModel } from './base.model';
import { map, Observable } from 'rxjs';
import { BrawlClient } from '../brawl.client';

export class Club extends BaseModel {
	public readonly tag: string;

	public readonly name: string;

	public readonly description: string;

	public readonly trophies: number;

	public readonly requiredTrophies: number;

	public readonly badgeId: number;

	public readonly type: Club.Type;

	public readonly members: Club.Member[];

	public constructor(client: BrawlClient, raw: Club.Raw) {
		super(client);

		this.tag = raw.tag;
		this.name = raw.name;
		this.description = raw.description;
		this.trophies = raw.trophies;
		this.requiredTrophies = raw.requiredTrophies;
		this.badgeId = raw.badgeId;
		this.type = raw.type;
		this.members = raw.members.map(member => Club.Member.FromRaw(member));
	}

	public getMembers(): Observable<Club.Member[]> {
		return this.client.getClubMembers(this.tag).pipe(map(res => res.items));
	}
}

export namespace Club {
	export interface Raw {
		tag: string;
		name: string;
		description: string;
		trophies: number;
		requiredTrophies: number;
		badgeId: number;
		type: Type;
		members: Member.Raw[];
	}

	export function FromRaw(client: BrawlClient, raw: Raw): Club {
		return new Club(client, raw);
	}

	export enum Type {
		Open = 'open',
		Closed = 'closed',
		InviteOnly = 'inviteOnly',
		Unknown = 'unknown'
	}

	export class Member {
		public readonly tag: string;

		public readonly name: string;

		public readonly nameColor: string;

		public readonly role: Member.Role;

		public readonly trophies: number;

		public readonly icon: Icon;

		public constructor(raw: Member.Raw) {
			this.tag = raw.tag;
			this.name = raw.name;
			this.nameColor = raw.nameColor;
			this.role = raw.role;
			this.trophies = raw.trophies;
			this.icon = raw.icon;
		}
	}

	export namespace Member {
		export interface Raw {
			tag: string;
			name: string;
			nameColor: string;
			role: Role;
			trophies: number;
			icon: Icon;
		}

		export function FromRaw(raw: Raw): Member {
			return new Member(raw);
		}

		export enum Role {
			NotMember = 'notMember',
			Member = 'member',
			President = 'president',
			VicePresident = 'vicePresident',
			Senior = 'senior',
			Unknown = 'unknown'
		}
	}
}
