import { act, renderHook } from "@testing-library/react-hooks";
import { BehaviorSubject, Observable, of, Subject, timer } from "rxjs";
import { nextTick } from "../utils/nextTick";
import { useObservable } from "./useObservable";

it("should return the initial state", () => {
  const source$ = timer(10);
  const { result } = render(source$);
  expect(result.current).toBe("initial");
});

it("should return the value when it emits right away", () => {
  const source$ = of("emitted");
  const { result } = render(source$);
  expect(result.current).toBe("emitted");
});

it("should return the value when it emits later", () => {
  const source$ = new Subject();
  const { result } = render(source$);
  act(() => {
    source$.next("emitted");
  });
  expect(result.current).toBe("emitted");
});

it("should only subscribe on initial render", () => {
  const source$ = of(1);
  spyOn(source$, "subscribe");
  const { rerender } = render(source$);
  rerender();
  expect(source$.subscribe).toBeCalledTimes(1);
});

it("should unsubscribe on unmount", () => {
  const source$ = new BehaviorSubject(1);
  const { unmount } = render(source$);
  unmount();
  expect(source$.observers.length).toBe(0);
});

function render(source$: Observable<unknown>) {
  return renderHook(() => useObservable(source$, "initial"));
}
