import React from "react";
import { useBlocker } from "./useBlocker";

export default function usePrompt(
  message: any,
  when = true,
  onLeave?: () => void
) {
  const blocker = React.useCallback(
    (tx) => {
      if (window.confirm(message)) {
        if (onLeave) onLeave();
        tx.retry();
      }
    },
    [message]
  );

  useBlocker(blocker, when);
}
