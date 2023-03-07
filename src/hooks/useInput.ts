import React, { useEffect, useState } from "react";

const useValidation = (value: any, validations: any) => {
  const [isEmpty, setEmpty] = useState(true);
  const [isEmail, setEmail] = useState(true);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "isEmail":
          setEmail(
            value.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          );
          break;
      }
    }
  }, [value, validations]);

  useEffect(() => {
    isEmpty ? setInputValid(false) : setInputValid(true);
  }, [isEmpty]);

  useEffect(() => {
    isEmail ? setInputValid(true) : setInputValid(false);
  }, [isEmail]);

  return {
    isEmpty,
    isEmail,
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
