import { BroadcastChanelDriver } from './drivers/broadcast-chanel-driver/broadcast-chanel.driver';
import { PostMessageDriverFactory } from './drivers/post-message.driver.factory';
import { LocalStorageDriver } from './drivers/storage-driver/local-storage.driver';
import { PostMessageChannel } from './post-message.channel';
import { PostMessageChannelFactory } from './post-message.channel.factory';

// tslint:disable-next-line:max-line-length
export const getChannel: <T>(name: string) => PostMessageChannel<T> = <T>(name: string): PostMessageChannel<T> => new PostMessageChannelFactory<T>(
  new PostMessageDriverFactory<T>([
    BroadcastChanelDriver,
    LocalStorageDriver
  ])
).openChannel(name);
