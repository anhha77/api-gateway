export class CustomKafkaSerializer {
  serialize(data: any): Buffer {
    return Buffer.from(JSON.stringify(data))
  }
}