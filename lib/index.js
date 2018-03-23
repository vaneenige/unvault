class Unvault extends Map {
  /**
   * Inserts a tracker into the vault.
   * @param {string} key
   * @param {number} interval
   * @param {function} update
   * @param {object} options
   */
  async insert(key, interval, update, options) {
    this.set(key, Object.assign({ interval, update }, options));
    return this.trigger(key, interval !== 0);
  }

  /**
   * Trigger a tracker to update its value.
   * @param {string} key
   * @param {boolean} automated
   */
  async trigger(key, automated) {
    const tracker = this.get(key);
    if (tracker === undefined) return null;

    if (
      typeof tracker.lifetime !== 'undefined' &&
      (tracker.lifetime -= tracker.interval) <= -tracker.interval
    ) {
      this.delete(key);
      return null;
    }

    const value = await tracker.update(key);
    if (this.has(key) === false) return null;

    this.set(key, Object.assign(tracker, { value }));
    if (automated) {
      setTimeout(() => {
        this.trigger(key, automated);
      }, tracker.interval);
    }
    return value;
  }
}

module.exports = () => new Unvault();
