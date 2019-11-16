const exe = require('./exe');
const series = require('./series');
const parallel = require('./parallel');

module.exports = {
  exe,
  series,
  parallel,
  log: console.log,
};
