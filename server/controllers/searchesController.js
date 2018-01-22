const monk = require('monk');
const nconf = require('../configuration.js');
const db = monk(nconf.get('MONGODB_URL') || 'localhost/polipro');
// TODO: change in the real db

const User = db.get('users');

module.exports.postSearchesHistory = async (ctx) =>{
  if ('POST' != ctx.method) return await next();
  let shortcutsList = ctx.user.searchesHistory.push(ctx.request.body)
  await User.update({email: ctx.user.email}, {'searchesHistory': shortcutsList});
  ctx.response.body = shortcutsList;
  ctx.status=200;
};

module.exports.resetSearchesHistory = async (ctx) =>{
  if ('DELETE' != ctx.method) return await next();
  await User.update({email: ctx.user.email}, {'searchesHistory': ' '});
  ctx.response.body = shortcutsList;
  ctx.status=200;
};
