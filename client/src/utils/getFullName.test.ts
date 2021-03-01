import { getFullName } from "./getFullName";

it("should get full name from only first name", () => {
  expect(
    getFullName({
      firstName: "John",
    })
  ).toBe("John");
});

it("should get full name from only last name", () => {
  expect(
    getFullName({
      lastName: "Doe",
    })
  ).toBe("Doe");
});

it("should get full name from nothing", () => {
  expect(getFullName({})).toBe("");
});

it("should get full name from both", () => {
  expect(
    getFullName({
      firstName: "John",
      lastName: "Doe Doe",
    })
  ).toBe("John Doe Doe");
});

it("should get full name from lastName and an empty string", () => {
  expect(
    getFullName({
      firstName: "",
      lastName: "Doe",
    })
  ).toBe("Doe");
});
