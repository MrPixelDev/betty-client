import { useContext, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Context } from "..";

export default function useNotistackSnackbar() {
  const { snackStore } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (snackStore.snackMessage) {
      enqueueSnackbar(snackStore.snackMessage, {
        preventDuplicate: true,
        autoHideDuration: 3000,
        variant: snackStore.variant,
      });
      snackStore.removeSnack();
    }
  }, [snackStore.snackMessage]);
}
