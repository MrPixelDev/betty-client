import React, { useEffect, useState } from "react";

const useValidation = (value: any, validations: any) => {
  const [isEmpty, setEmpty] = useState(true);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
      }
    }
  }, [value, validations]);

  useEffect(() => {
    isEmpty ? setInputValid(false) : setInputValid(true);
  }, [isEmpty]);

  return {
    isEmpty,
    inputValid,
  };
};

export default function useInput(initValue: any, validations: any) {
  const [value, setValue] = useState(initValue);

  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDirty(true);
  // };

  return {
    value,
    onChange,
    ...valid,
  };
}
