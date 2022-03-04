import React from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

export function useBlocker(blocker: any, when = true) {
  const { navigator } = React.useContext(NavigationContext) as any;

  React.useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}
