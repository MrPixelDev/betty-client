import { useState, MouseEvent } from "react";

export default function useShowPassword(initValue: boolean) {
  const [state, setState] = useState(initValue);
  const handleClickShowPassword = () => {
    setState((show) => !show);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return {
    state,
    handleClickShowPassword,
    handleMouseDownPassword,
  };
}
