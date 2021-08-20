// @ts-ignore
import { Circle } from "better-react-spinkit";
import Image from "next/image";
import styled from "styled-components";

const Loading = () => {
  return (
    <StyledWrapper>
      <StyledContainer>
        <Image
          src="/images/logo.png"
          height={100}
          width={100}
          objectFit="contain"
          alt="logo"
        />

        <StyledCircle color="purple" size={60} />
      </StyledContainer>
    </StyledWrapper>
  );
};

export default Loading;

const StyledWrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const StyledContainer = styled.div`
  text-align: center;
  padding-bottom: 6.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCircle = styled(Circle)`
  margin-top: 1rem;
`;
