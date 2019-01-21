import { PostMessageDriver } from '../post-message.driver';
import { PostMessageDriverSubscription } from '../post-message.driver.subscription';

export class BroadcastChanelDriver<T> implements PostMessageDriver<T> {
  private subscribers: Array<(message?: T) => void> = [];
  private broadcastChannelInstance: BroadcastChannel;
  private subCbs: EventListener;

  constructor(private channel: string) {
    this.broadcastChannelInstance = new BroadcastChannel(this.channel);
    this.subCbs = (event: MessageEvent) => this.notify(event.data);
    this.broadcastChannelInstance.addEventListener('message', this.subCbs);
  }

  public close(): void {
    while (this.subscribers.length) {
      this.subscribers.pop();
    }
    if (this.subCbs) {
      this.broadcastChannelInstance.removeEventListener('message', this.subCbs);
    }
  }

  public postMessage(message?: T): void {
    setTimeout(() => {
      this.broadcastChannelInstance.postMessage(message);
      this.notify(message);
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

  private notify(message: T) {
    this.subscribers.forEach(
      cbs => setTimeout(() => cbs(message))
    );
  }
}
