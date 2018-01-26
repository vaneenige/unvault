class Unvault extends Map {
  /**
   * Inserts a tracker into the vault.
   * @param {string} key
   * @param {number} interval
   * @param {function} update
   * @param {object} options
   */
  insert(key, interval, update, options) {
    this.set(key, { interval, update, ...options });
    this.trigger(key, interval !== 0);
  }

  /**
   * Trigger a tracker to update its value.
   * @param {string} key
   * @param {boolean} automated
   */
  async trigger(key, automated) {
    const tracker = this.get(key);
    if (tracker === undefined) return null;

    const value = await tracker.update();
    if (this.has(key) === false) return null;

    this.set(key, { ...tracker, value });
    if (automated) {
      setTimeout(() => {
        this.trigger(key, automated);
      }, tracker.interval);
    }
  }
}

module.exports = () => new Unvault();
