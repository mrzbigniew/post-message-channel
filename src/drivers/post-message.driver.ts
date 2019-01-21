import { PostMessageDriverSubscription } from './post-message.driver.subscription';

export interface PostMessageDriver<T> {
  close(): void;
  subscribe(cbs: (message?: T) => void): PostMessageDriverSubscription;
  postMessage(message?: T): void;
}
