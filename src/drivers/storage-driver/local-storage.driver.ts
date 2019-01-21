import { NoStorageError } from './no-storage.error';
import { StorageDriver } from './storage-driver';

export class LocalStorageDriver<T> extends StorageDriver<T> {
  constructor(channel: string) {
    if (!window.localStorage) {
      throw new NoStorageError();
    }
    super(channel, window.localStorage);
  }
}
