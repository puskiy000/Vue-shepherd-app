import { ReactComponent as CopyIcn } from '../../../assets/copy.svg';
import { ReactComponent as DeleteIcn } from '../../../assets/deleteIcn.svg';
import { ReactComponent as EditIcn } from '../../../assets/editIcn.svg';
import CustomMarkdownView from '../../../components/CustomComponents/CustomMarkdownView';
import { IconContainer, PageCount, SummaryContainer } from './styles';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';

const HighLight = ({
  hightlightedText,
  loading
}: {
  hightlightedText: any[];
  loading: boolean;
}) => {
  const [getHighIndex, setHightIndex] = useState<number>(0);

  if (loading) {
    return (
      <Box
        p={5}
        textAlign="center"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <section>
      <PageCount>
        <ChevronLeftIcon />
        {`Page ${1}`}
        <ChevronRightIcon />
      </PageCount>
      {loading && (
        <Box
          p={5}
          textAlign="center"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <Spinner />
        </Box>
      )}
      {!loading && (
        <>
          {hightlightedText.map((hightlight) => (
            <SummaryContainer
              key={hightlight?.id}
              onClick={() => setHightIndex(hightlight?.id)}
            >
              {getHighIndex === hightlight.id && (
                <IconContainer>
                  <CopyIcn />
                  <EditIcn />
                  <DeleteIcn />
                </IconContainer>
              )}
              <CustomMarkdownView source={hightlight?.highlight?.name} />
            </SummaryContainer>
          ))}
        </>
      )}
    </section>
  );
};

export default HighLight;
