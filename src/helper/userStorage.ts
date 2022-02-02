export class UserStorage {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  getStorage<T>(): T | null {
    const rawData = localStorage.getItem(this.key);
    const data = rawData ? JSON.parse(rawData) : null;

    return data;
  }

  setStorage<T>(data: T): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(this.key, jsonData);
  }
}
