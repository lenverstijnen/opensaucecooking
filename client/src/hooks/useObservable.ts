import { useState, useEffect, useRef } from "react";
import { Observable, Subscription } from "rxjs";

export function useObservable<T>(
  source$: Observable<T> | undefined,
  initialValue: T
) {
  const [data, setData] = useState(initialValue);
  const ref = useRef<Subscription>();

  useEffect(() => {
    if (source$) {
      ref.current = source$.subscribe((data) => {
        setData(data);
      });

      return () => ref.current?.unsubscribe();
    }
  }, []);

  return data;
}
