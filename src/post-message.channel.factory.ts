import { PostMessageDriverFactory } from './drivers/post-message.driver.factory';
import { PostMessageChannel } from './post-message.channel';

export class PostMessageChannelFactory<T> {
  constructor(private driverFactory: PostMessageDriverFactory<T>) { }

  public openChannel(name: string): PostMessageChannel<T> {
    return new PostMessageChannel<T>(
      this.driverFactory.createDriver(name)
    );
  }
}
