import { map, sum } from "./module";

describe("sum", () => {
  it("1 + 2 = 3", () => {
    expect(sum(1, 2)).toEqual(3);
  });
  it("3 + (-1) = 2", () => {
    expect(sum(3, -1)).toEqual(2);
  });
});

describe("map", () => {
  it("should be new empty array, if we send empty array", () => {
    const input: Array<any> = [];
    const result = map(input, () => {
      1;
    });
    expect(result).not.toBe(input);
    expect(typeof result).toEqual("object");
    expect(Array.isArray(result)).toEqual(true);
    expect(result).toHaveLength(0);
  });
  it("length array should be equal length send arrray", () => {
    const input: Array<any> = [1, 2, 3];
    const result = map(input, () => {
      return;
    });
    expect(result).toHaveLength(input.length);
  });
  it("function should be called times like a length array", () => {
    const input: Array<any> = [1, 2, 3];
    const f = vi.fn();
    const result = map(input, f);
    expect(f).toHaveBeenCalledTimes(input.length);
  });
});
