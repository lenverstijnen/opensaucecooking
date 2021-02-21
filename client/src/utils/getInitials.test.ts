import { getInitials } from "./getInitials";

it("should get initials", () => {
  expect(getInitials()).toBe("");
  expect(getInitials("Jamie")).toBe("J");
  expect(getInitials(undefined, "Oliver")).toBe("O");
  expect(getInitials("Jamie", "Oliver")).toBe("JO");
});
