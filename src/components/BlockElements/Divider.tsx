import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

class DividerProps {
  style: string = "default";
  textAlign: "right" | "left" | "center" | undefined = undefined;
  label: string = "";
}

export const Divide: React.FC<DividerProps> = (props: DividerProps) => {
  if (props.style === "chip") {
    return (
      <Divider>
        <Chip label={`${props.label}`} />
      </Divider>
    );
  }
  return <Divider>{`${props.label}`}</Divider>;
};
