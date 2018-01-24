const { expect } = require("chai");
const sinon = require("sinon");
const unvault = require("./../lib");

const store = unvault();

describe("unvault", () => {
  it("should return a function", () => {
    expect(unvault).to.be.a("function");
  });

  it("should create an instance of Map", () => {
    expect(store instanceof Map).equal(true);
  });

  it("should provide two additional functions", () => {
    expect(store.insert).to.be.a("function");
    expect(store.trigger).to.be.a("function");
  });

  describe("insert()", () => {
    it("should insert a tracker into the vault", () => {
      store.insert("insert", 1000, () => true);
      expect(store.get("insert")).to.not.be.undefined;
    });
    it(`should trigger a tracker to update its value`, () => {
      expect(store.get("insert").value).equal(true);
    });
  });

  describe("trigger()", () => {
    it("should trigger a tracker its update function", async () => {
      let count = 0;
      store.insert("trigger", 0, async () => (count += 1));
      await store.trigger("trigger");
      expect(store.get("trigger").value).equal(2);
    });
    it("should return `null` if no tracker is found", async () => {
      expect(await store.trigger("unknown")).equal(null);
    });
  });
});
