import React from "react";

import { Container } from "./styles";

//interfaces and types
interface Props {
  active?: boolean;
}

export function Bullet({ active = false }: Props) {
  return <Container active={active} />;
}
