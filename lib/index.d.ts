declare module 'unvault' {
  function unvault(): Unvault;

  // relevant: https://github.com/Microsoft/TypeScript/issues/5073
  namespace unvault {}

  export = unvault;
}

declare class Unvault extends Map<string, any> {
  /**
   * Inserts a tracker into the vault.
   */
  insert(key: string, interval: number, update: Function, options?: Object): void;

  /**
   * Trigger a tracker to update its value.
   */
  trigger(key: string, automated?: boolean): Promise<any>;
}
