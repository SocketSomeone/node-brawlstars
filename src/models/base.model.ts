import { BrawlClient } from '../brawl.client';

export abstract class BaseModel {
	protected readonly client: BrawlClient;

	protected constructor(client: BrawlClient) {
		this.client = client;
	}
}
