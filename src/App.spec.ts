import { describe, beforeEach, it, expect } from "vitest";
import { GiftItem } from "./types";

describe("Gift List Logic", () => {
  let gifts: GiftItem[];

  beforeEach(() => {
    gifts = [
      { id: "1", name: "Test Gift 1", purchased: false, priority: 0 },
      { id: "2", name: "Test Gift 2", purchased: true, priority: 1 },
    ];
  });

  it("should toggle gift purchased status", () => {
    const gift = gifts[0];
    const updatedGift = { ...gift, purchased: !gift.purchased };
    expect(updatedGift.purchased).toBe(true);
  });

  it("should remove gift from list", () => {
    const filteredGifts = gifts.filter((gift) => gift.id !== "1");
    expect(filteredGifts.length).toBe(1);
    expect(filteredGifts[0].id).toBe("2");
  });

  it("should have proper type/interface", () => {
    const gift = gifts[0];
    expect(typeof gift.id).toBe("string");
    expect(typeof gift.name).toBe("string");
    expect(typeof gift.purchased).toBe("boolean");
    expect(typeof gift.priority).toBe("number");
  })
});
