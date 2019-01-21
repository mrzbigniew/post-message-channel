
import { PostMessageDriver } from './post-message.driver';
import { PostMessageDriverConstructor } from './post-message.driver.constructor';

export class PostMessageDriverFactory<T> {
  constructor(private drivers: Array<PostMessageDriverConstructor<T>>) { }

  public createDriver(channel: string): PostMessageDriver<T> {
    for (const driverConstructor of this.drivers) {
      try {
        return new driverConstructor(channel);
      } catch (error) { }
    }
    return undefined;
  }
}
