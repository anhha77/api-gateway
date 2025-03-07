export class PaymentSerialize {
  constructor(private readonly item: string, private readonly value: number) {}

  toString() {
    return JSON.stringify({
      item: this.item,
      value: this.value
    })
  }
}