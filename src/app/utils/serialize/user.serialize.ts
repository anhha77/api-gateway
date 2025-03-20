export class UserSerialize {
	constructor(private name: string, private age: number) {

	}

	toString() {
		return JSON.stringify({
			name: this.name,
			age: this.age
		})
	}
}