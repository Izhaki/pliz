const { exe, log } = require('./index');

const sayHello = () => {
  log('Hello!');
  exe('ls -lh');
};

module.exports = {
  sayHello,
};
