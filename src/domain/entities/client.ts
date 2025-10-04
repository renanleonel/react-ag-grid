import type { RawClient } from '@/domain/types/raw-client';

export class Client {
  private readonly data: RawClient;

  constructor(data: RawClient) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  get country() {
    return this.data.country;
  }

  clone() {
    return new Client(this.data);
  }
}
