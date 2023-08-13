import { SimpleGrid } from '@chakra-ui/react';
import styled from 'styled-components';

export const HomeWorkHelpContainer = styled.section`
  display: flex;
  height: 100%;
  position: fixed;
  width: 100%;
`;

export const HomeWorkHelpHistoryContainer = styled.section`
  // width: 29%;
  // height: 100vh;
  // padding-right: 10px;
  // background: #fff;
  // overflow-y: scroll;
  max-width: 25%;
  height: 100vh;
  background: rgb(255, 255, 255);
  overflow-y: scroll;
  mzrgin: 0 auto;
  margin: 0px 20px;
  position: absolute;
  left: 15px;
`;

export const HomeWorkHelpChatContainer = styled.section`
  flex-grow: 1;
  width: 65%;
  position: fixed;
`;

export const TutorsBackIcn = styled.div`
  border-bottom: 1px solid #eeeff2;
  width: 100%;
  padding: 12px 30px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const ViewTutorSection = styled.div`
  width: 100%;
  height: 100%;
`;

export const PreviouslyText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #212224;
  padding: 22px 120px;

  @media only screen and (max-width: 768px) {
    padding: 22px 30px;
  }
`;
export const DiscoverMore = styled.p`
  color: #207df7;
  padding: 42px 120px;
  font-weight: 500;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    padding: 42px 30px;
  }
`;

export const SimpleGridContainer = styled(SimpleGrid)`
  padding: 0 120px;

  @media only screen and (max-width: 768px) {
    padding: 0 26px;
  }
`;
