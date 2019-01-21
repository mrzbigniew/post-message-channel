import { PostMessageDriver } from '../post-message.driver';
import { PostMessageDriverSubscription } from '../post-message.driver.subscription';

export abstract class StorageDriver<T> implements PostMessageDriver<T> {
  private subscribers: Array<(message: T) => void> = [];
  private storageCbs: (e: StorageEvent) => void;

  constructor(private channel: string, private storageInstance: Storage) {
    this.init();
  }

  public postMessage(message?: T): void {
    setTimeout(() => {
      const strMessage = JSON.stringify([message]);
      this.storageInstance.setItem(this.channel, strMessage);
      this.notify(strMessage);
    });
  }

  public subscribe(cbs: (message?: T) => void): PostMessageDriverSubscription {
    this.subscribers.push(cbs);
    return new PostMessageDriverSubscription(() => {
      this.subscribers = this.subscribers.filter(
        curCbs => curCbs !== cbs
      );
    });
  }

  public close() {
    while (this.subscribers.length) {
      this.subscribers.pop();
    }
    if (this.storageCbs) {
      window.removeEventListener('storage', this.storageCbs);
    }
  }

  private notify(message: string) {
    this.subscribers.forEach(
      cbs => setTimeout(() => cbs(JSON.parse(message)[0]))
    );
  }

  private init() {
    this.storageCbs = (e: StorageEvent) => e.key === this.channel ? this.notify(e.newValue) : null;
    window.addEventListener('storage', this.storageCbs);
  }
}
