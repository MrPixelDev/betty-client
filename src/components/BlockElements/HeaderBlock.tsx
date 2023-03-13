import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Container } from "@mui/material";

interface IBlockHeaderProps {
  title: string;
}

const BlockHeader: FC<IBlockHeaderProps> = observer(
  (props: IBlockHeaderProps) => {
    return (
      <Container
        sx={{ textAlign: "center", mb: "2rem" }}
        className="block__header"
      >
        {props.title}
      </Container>
    );
  }
);

export default BlockHeader;
