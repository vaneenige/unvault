class Unvault extends Map {
  /**
   * Inserts a tracker into the vault.
   * @param {string} key
   * @param {number} interval
   * @param {function} update
   * @param {*} value
   */
  insert(key, interval, update, value = null) {
    this.set(key, { interval, update, value });
    this.trigger(key, interval !== 0);
  }

  /**
   * Trigger a tracker to update its value.
   * @param {string} key
   */
  async trigger(key, automated = false) {
    const tracker = this.get(key);
    if (tracker === undefined) return null;
    this.set(key, { ...tracker, ...{ value: await tracker.update() } });
    if (automated) {
      setTimeout(() => {
        this.trigger(key, automated);
      }, tracker.interval);
    }
  }
}

module.exports = () => new Unvault();
