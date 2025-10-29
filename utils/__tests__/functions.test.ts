import { getDaysLeft } from "../functions";

describe("getDaysLeft", () => {
  it("should return the correct number of days between two dates", () => {
    const date1 = new Date("2023-01-01");
    const date2 = new Date("2023-01-05");
    expect(getDaysLeft(date1, date2)).toBe(4);
  });

  it("should return 0 if the dates are the same", () => {
    const date1 = new Date("2023-01-01");
    const date2 = new Date("2023-01-01");
    expect(getDaysLeft(date1, date2)).toBe(0);
  });

  it("should handle negative differences", () => {
    const date1 = new Date("2023-01-05");
    const date2 = new Date("2023-01-01");
    expect(getDaysLeft(date1, date2)).toBe(-4);
  });
});
