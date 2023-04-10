import { RGB } from "../color.type";
import { hexToRgb } from "../color.util";
import { describe, expect, it } from "vitest";

describe("`hexToRgb` function", () => {
  it("should return RGB", () => {
    expect(hexToRgb("#000")).toStrictEqual<RGB>({ red: 0, green: 0, blue: 0 });
    expect(hexToRgb("#000000")).toStrictEqual<RGB>({ red: 0, green: 0, blue: 0 });
    expect(hexToRgb("#FFF")).toStrictEqual<RGB>({ red: 255, green: 255, blue: 255 });
    expect(hexToRgb("#FFFFFF")).toStrictEqual<RGB>({ red: 255, green: 255, blue: 255 });
    expect(hexToRgb("#497")).toStrictEqual<RGB>({ red: 68, green: 153, blue: 119 });
    expect(hexToRgb("#4b9976")).toStrictEqual<RGB>({ red: 75, green: 153, blue: 118 });
  });

  it("should throw an error", () => {
    expect(() => hexToRgb("#")).toThrow("`#` isn't a hexadecimal color code");
    expect(() => hexToRgb("#0")).toThrow("`#0` isn't a hexadecimal color code");
    expect(() => hexToRgb("#00")).toThrow("`#00` isn't a hexadecimal color code");
    expect(() => hexToRgb("#0000")).toThrow("`#0000` isn't a hexadecimal color code");
    expect(() => hexToRgb("#00000")).toThrow("`#00000` isn't a hexadecimal color code");
    expect(() => hexToRgb("#0000000")).toThrow("`#0000000` isn't a hexadecimal color code");
    expect(() => hexToRgb("#0AG")).toThrow("`#0AG` isn't a hexadecimal color code");
    expect(() => hexToRgb("#0000AG")).toThrow("`#0000AG` isn't a hexadecimal color code");
    expect(() => hexToRgb("#0-_")).toThrow("`#0-_` isn't a hexadecimal color code");
  });
});