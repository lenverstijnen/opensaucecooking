import { renderHook } from "@testing-library/react-hooks";
import * as httpService from "../services/http.service";
import { useToken } from "./useToken";
import auth0react, { Auth0ContextInterface } from "@auth0/auth0-react";
import { nextTick } from "../utils/nextTick";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(),
}));

jest.mock("../services/http.service", () => ({
  setToken: jest.fn(),
}));

const renderUseToken = async () => {
  const result = renderHook(() => useToken());
  await nextTick();
  return result;
};

let useAuth0Mock: Partial<Auth0ContextInterface>;

beforeEach(() => {
  mockUseAuth0();
});

it("should set the token in the http service", async () => {
  await renderUseToken();
  expect(httpService.setToken).toBeCalledWith("1234");
});

it("should not update the second time if the user does not change", async () => {
  const { rerender } = await renderUseToken();
  rerender();
  await nextTick();
  expect(httpService.setToken).toBeCalledTimes(1);
});

it("should update the token if the user changes", async () => {
  const { rerender } = await renderUseToken();

  useAuth0Mock.user = {};

  await rerender();
  await nextTick();
  expect(httpService.setToken).toBeCalledTimes(2);
});

function mockUseAuth0() {
  createUseAuth0Mock();
  setupAuth0Spy();
}

function setupAuth0Spy() {
  jest
    .spyOn(auth0react, "useAuth0")
    .mockReturnValue(useAuth0Mock as Auth0ContextInterface);
}

function createUseAuth0Mock() {
  useAuth0Mock = {
    user: {},
    getAccessTokenSilently: jest.fn().mockResolvedValue("1234"),
  };
}
