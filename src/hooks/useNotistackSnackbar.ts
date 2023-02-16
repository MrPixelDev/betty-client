import { useEffect } from "react";
import SomeStore from "../store/store";
import { useSnackbar } from "notistack";
import AuthStore from "../store/authStore";

export default function useNotistackSnackbar(store: SomeStore | AuthStore) {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (store.error) {
      enqueueSnackbar(store.error, { variant: "error" });
      store.setError("");
    }
  }, [store.error]);
}
