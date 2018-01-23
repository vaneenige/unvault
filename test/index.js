const { expect } = require("chai");
const sinon = require("sinon");
const unvault = require("./../lib");

const key = "test";
const interval = 100;
const value = true;
let count = 0;
const update = () => (count += 1);

describe("unvault", () => {
  it("should export four functions", () => {
    expect(unvault).keys(["insert", "find", "remove", "trigger"]);
  });

  describe("insert()", () => {
    it("should insert a tracker into the vault", () => {
      unvault.insert(key, interval, update);
      expect(unvault.find(key)).to.not.be.undefined;
    });
    it(`should trigger a tracker to update its value`, () => {
      expect(unvault.find(key).value).equal(1);
    });
  });

  describe("find()", () => {
    it("should select a tracker in the vault", () => {
      const tracker = unvault.find(key);
      expect(tracker).keys(["key", "interval", "update", "value"]);
    });
    it("should return `null` if no tracker is found", () => {
      expect(unvault.find("unknown")).equal(null);
    });
  });

  describe("trigger()", () => {
    it("should trigger a tracker its update function", async () => {
      await unvault.trigger(key);
      expect(unvault.find(key).value).equal(2);
    });
    it("should return `null` if no tracker is found", async () => {
      expect(await unvault.trigger("unknown")).equal(null);
    });
  });

  describe("remove()", () => {
    it("should remove a tracker from the vault", () => {
      expect(unvault.remove(key)).equal(true);
    });
    it("should return `null` if no tracker is found", () => {
      expect(unvault.find("unknown")).equal(null);
    });
  });
});
