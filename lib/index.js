/**
 * The vault that will contain the trackers.
 * @type {object}
 */
const vault = {};

/**
 * Selects a tracker in the vault.
 * @param {string} key
 * @return {*} tracker
 */
function find(key) {
  if (typeof vault[key] === "undefined") return null;
  return vault[key];
}

/**
 * Inserts a tracker into the vault.
 * @param {string} key
 * @param {number} interval
 * @param {function} update
 * @param {*} value
 */
function insert(key, interval, update, value = null) {
  vault[key] = {
    key,
    interval,
    update,
    value
  };
  trigger(key, interval !== 0);
}

/**
 * Removes a tracker from the vault.
 * @param {string} key
 */
function remove(key) {
  if (typeof vault[key] === "undefined") return null;
  delete vault[key];
  return true;
}

/**
 * Trigger a tracker to update its value.
 * @param {string} key
 */
async function trigger(key, automated = false) {
  if (typeof vault[key] === "undefined") return null;
  vault[key].value = await vault[key].update();
  if (automated) {
    setTimeout(() => {
      trigger(key, automated);
    }, vault[key].interval);
  }
}

module.exports = { find, insert, remove, trigger };
