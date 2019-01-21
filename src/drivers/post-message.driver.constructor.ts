import { PostMessageDriver } from './post-message.driver';

export type PostMessageDriverConstructor<T> = new (channel: string) => PostMessageDriver<T>;
