import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("'common drug' benefit and expiresIn should decrease", () => {
    expect(
      new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("test", 1, 2)]);
  });

  it("'common drug' benefit should decrease twice as fast when expired", () => {
    expect(
      new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()
    ).toEqual([new Drug("test", -1, 1)]);
  });

  it("'common drug' benefit should stay positive number (<= 0)", () => {
    expect(
      new Pharmacy([new Drug("test", 1, 0)]).updateBenefitValue()
    ).toEqual([new Drug("test", 0, 0)]);
  });

  it("'common drug' benefit should never be bigger than 50", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 1, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 0, 50)]);
  });

  it("'Herbal tea' benefice should increase with time ", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 1, 0)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 0, 1)]);
  });

  it("'Herbal tea' benefit should increase twice as fast when expired", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 0, 0)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -1, 2)]);
  });

  it("'Magic Pill' should never expires nor decrease in benefit ", () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 0, 2)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", 0, 2)]);
  });

  it("'Fervex' benefit should increase by 2 when there are 10 days or less before expiration", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 9, 4)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 8, 6)]);
  });

  it("'Fervex' benefit should increase by 3 when there are 5 days or less before expiration", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 5, 4)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 4, 7)]);
  });

  it("'Fervex' benefit should drop to 0 when expired", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 0, 6)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", -1, 0)]);
  });

  it("'Dafalgan' degrades in Benefit twice as fast as normal drugs", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 1, 6)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 0, 4)]);
  });
});
