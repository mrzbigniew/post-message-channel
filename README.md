# Post Message Channel
Post Message Channel project is a simple library providing interfaces for creating broadcast channels using common web api components like LocaLStorage, SessionStorage, BroadcastChannel, window.postMessage, ServiceWorker, SharedServiceWorker and Cookies.

## Usage
Simplest way to use this library is to import and call ```getChannel``` function.

```typescript 
import { getChannel } from 'post-message-channel';

const name = 'my-channel';
const channel = getChannel<string>(name);
const subscription = channel.subscribe((message) => console.log(message));
channel.postMessage('sample message');
//...
subscription.unsubscribe();

```

## Drivers
Post message channel have build on 
### Storage 

#### Local Storage & SessionStorage

### BroadcastChannel

### window.postMessage


### ServiceWorker

### SharedServiceWorker

### Cookies
