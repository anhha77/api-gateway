export class UserSerialize {
	constructor(private readonly name: string, private readonly age: number) {

	}

	toString() {
		return JSON.stringify({
			name: this.name,
			age: this.age
		})
	}
}