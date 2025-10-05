import type { RawClient } from '@/domain/schemas/client';
import { cloneDeep } from 'es-toolkit';

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

  set name(name: string) {
    this.data.name = name;
  }

  get country() {
    return this.data.country;
  }

  set country(country: string) {
    this.data.country = country;
  }

  toEntity() {
    return new Client(this.data);
  }

  clone() {
    return new Client(cloneDeep(this.data));
  }
}
