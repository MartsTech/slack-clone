import { NoSsr } from "@material-ui/core";
// @ts-ignore
import { Circle } from "better-react-spinkit";
import Image from "next/image";
import styled from "styled-components";

const Loading = () => {
  return (
    <NoSsr>
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
    </NoSsr>
  );
};

export default Loading;

const StyledWrapper = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;

const StyledContainer = styled.div`
  padding-bottom: 6.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCircle = styled(Circle)`
  margin-top: 1rem;
`;
