import { BrawlClient } from '../../src';
import { BaseModel } from '../../src/models/base.model';

class ConcreteModel extends BaseModel {
	public constructor(client: BrawlClient) {
		super(client);
	}

	public getClient(): BrawlClient {
		return this.client;
	}
}

describe('BaseModel', () => {
	it('should retain the provided client reference', () => {
		const mockClient = {} as BrawlClient;
		const model = new ConcreteModel(mockClient);

		expect(model.getClient()).toBe(mockClient);
	});
});
