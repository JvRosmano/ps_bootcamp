import React from "react";
import styled from "styled-components";
import { Button } from "antd";

export default function Header({ Page }) {
  function handleClick() {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  }
  return (
    <HeaderWrapper>
      <Simg src={"/images/logo.png"} alt="logo" />
      <Sh1>{Page}</Sh1>
      <ButtonWrapper>
        <SButton danger onClick={handleClick}>
          Logout
        </SButton>
      </ButtonWrapper>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  max-height: 100%;
  display: flex;
  flex-direction: row;
  padding: 2vw;
`;

const Simg = styled.img`
  max-width: 30vw;
`;

const Sh1 = styled.h1`
  padding-left: 14vw;
  padding-top: 2vw;
`;

const ButtonWrapper = styled.div`
  padding-left: 14vw;
  padding-top: 2vw;
`;

const SButton = styled(Button)``;
