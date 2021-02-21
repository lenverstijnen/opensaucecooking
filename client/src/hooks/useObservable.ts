import { useState, useEffect } from "react";
import { Observable } from "rxjs";

export function useObservable<T>(
  source$: () => Observable<T>,
  initialValue: T,
  deps?: React.DependencyList
) {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    const { unsubscribe } = source$().subscribe((data) => {
      setData(data);
    });

    // return unsubscribe;
  }, deps);

  return data;
}
