import { PostMessageDriver } from './drivers/post-message.driver';
import { PostMessageDriverSubscription } from './drivers/post-message.driver.subscription';

export class PostMessageChannel<T> {
  constructor(private driver: PostMessageDriver<T>) { }

  public postMessage(message: T): void {
    this.driver.postMessage(message);
  }

  public subscribe(cbs: (message: T) => void): PostMessageDriverSubscription {
    return this.driver.subscribe(cbs);
  }

  public close() {
    this.driver.close();
  }
}
