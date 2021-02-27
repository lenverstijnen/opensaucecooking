import { useState, useEffect, useRef } from "react";
import { Observable, Subscription } from "rxjs";

export function useObservable<T>(source$: Observable<T>, initialValue: T) {
  const [data, setData] = useState(initialValue);
  const ref = useRef<Subscription>();

  useEffect(() => {
    ref.current = source$.subscribe((data) => {
      setData(data);
    });

    return () => ref.current?.unsubscribe();
  }, []);

  return data;
}
