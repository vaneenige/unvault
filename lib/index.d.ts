declare module 'unvault' {
  /**
   * Selects a tracker in the vault.
   */
  function find(key: string): any;

  /**
   * Inserts a tracker into the vault.
   */
  function insert(key: string, interval: number, update: Function, value?: any): void;

  /**
   * Removes a tracker from the vault.
   */
  function remove(key: string): boolean;

  /**
   * Trigger a tracker to update its value.
   */
  function trigger(key: string, automated?: boolean): Promise<any>;
}
