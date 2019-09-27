import { exe, log } from './index';

export const sayHello = () => {
  log('Hello!');
  exe('ls -lh');
};
