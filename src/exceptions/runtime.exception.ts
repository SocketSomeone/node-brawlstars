export class RuntimeException extends Error {
	public constructor(message = ``) {
		super(message);
	}

	public what(): string {
		return this.message;
	}
}
