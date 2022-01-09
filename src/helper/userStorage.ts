export class UserStorage {
  getStorage<T>(key: string): T | null {
    const rawData = localStorage.getItem(key);
    const data = rawData ? JSON.parse(rawData) : null;

    return data;
  }
}
