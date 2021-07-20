import { useRef, useEffect } from "react";

const useActionAfterMount = (deps: any, callback: any) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const timeout = setTimeout(() => {
        callback();
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      isMounted.current = true;
    }
  }, [deps]);
};

export default useActionAfterMount;
