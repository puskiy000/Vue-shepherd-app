import AdobeIcon from '../../../assets/adobedoc.svg';
import FeedIcon from '../../../assets/blue-energy.svg';
import DocIcon from '../../../assets/doc-icon.svg';
import NoteSmIcon from '../../../assets/doc-sm.svg';
import FlashcardSmIcon from '../../../assets/flashcard-sm.svg';
import ReceiptIcon from '../../../assets/flashcardIcon.svg';
import EmptyFeeds from '../../../assets/no-activity.svg';
import NoEvent from '../../../assets/no-event.svg';
import NoteIcon from '../../../assets/notes.svg';
import ReceiptSmIcon from '../../../assets/receipt-sm.svg';
import FlashcardIcon from '../../../assets/receiptIcon.svg';
import WalletIcon from '../../../assets/wallet-money.svg';
import HelpModal from '../../../components/HelpModal';
import { CustomButton } from '../layout';
import { TimeAgo } from './TimeAgo';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  VStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Spacer,
  Stack,
  Text
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { BsChevronDown, BsFiletypeDoc } from 'react-icons/bs';
import { RiCalendar2Fill } from 'react-icons/ri';
import { SlEnergy } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled(Box)``;

const Root = styled(Flex)`
  position: relative;
  margin-left: 8px;
  alignitems: flex-start;
  direction: row;
  margin: 4 0;
  &:before {
    content: '';
    position: absolute;
    left: 22px;
    top: 0;
    bottom: -15px;
    width: 1px;
    background: #e8e9ed;
    z-index: 0;
  }
  &:last-child {
    &:before {
      display: none;
    }
  }

  padding-left: 0px;
`;

const getIconByActivityType = (activityType) => {
  switch (activityType) {
    case 'documents':
      return DocIcon;
    case 'notes':
      return NoteIcon;
    case 'payments':
      return ReceiptIcon;
    case 'flashcards':
      return FlashcardIcon;
    default:
      return undefined;
  }
};

const getFileIconByActivityType = (activityType) => {
  switch (activityType) {
    case 'documents':
      return AdobeIcon;
    case 'notes':
      return NoteSmIcon;
    case 'payments':
      return ReceiptSmIcon;
    case 'flashcards':
      return FlashcardSmIcon;
    default:
      return undefined;
  }
};

function ActivityFeeds(props) {
  const { feeds, userType } = props;
  const [feedPeriod, setFeedPeriod] = useState<any>('Today');

  const [toggleHelpModal, setToggleHelpModal] = useState(false);
  const activateHelpModal = () => {
    setToggleHelpModal(true);
  };

  const getFileName = (url: string) => {
    const lastSlashIndex = url.lastIndexOf('/');
    const textAfterLastSlash = url.substring(lastSlashIndex + 1);
    return textAfterLastSlash;
  };

  return (
    <>
      <Box>
        <Flex alignItems="center">
          <HStack mb={2}>
            <Image
              src={userType === 'Student' ? FeedIcon : WalletIcon}
              alt="feed-icon"
              width={5}
            />

            <Text fontSize={16} fontWeight={500} mx={2}>
              {userType === 'Student' ? 'Activity Feed' : 'Recent Transactions'}
            </Text>
          </HStack>
          <Spacer />

          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<RiCalendar2Fill />}
              rightIcon={<BsChevronDown />}
              variant="outline"
              fontSize={14}
              fontWeight={500}
              color="#5C5F64"
              mb={2}
              h={'32px'}
            >
              {feedPeriod}
            </MenuButton>
            <MenuList minWidth={'auto'}>
              <MenuItem onClick={() => setFeedPeriod('All')}>All</MenuItem>
              <MenuItem onClick={() => setFeedPeriod('Today')}>Today</MenuItem>
              <MenuItem onClick={() => setFeedPeriod('This week')}>
                This week
              </MenuItem>
              <MenuItem onClick={() => setFeedPeriod('This month')}>
                This month
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Divider />
      </Box>

      <Box sx={{ maxHeight: '350px', overflowY: 'auto' }}>
        {feeds.data?.length > 0 ? (
          feeds.data.map((feed: any, index) => (
            <>
              <Root px={3} my={4} key={index}>
                <Image
                  src={getIconByActivityType(feed.activityType)}
                  alt="doc"
                  maxHeight={45}
                  zIndex={1}
                />
                <Stack direction={'column'} px={4} spacing={1}>
                  <Text color="text.300" fontSize={12} mb={0}>
                    <TimeAgo timestamp={feed.updatedAt} />
                  </Text>

                  <Text
                    fontWeight={400}
                    color="text.200"
                    fontSize="14px"
                    mb={0}
                  >
                    {feed.title}
                  </Text>

                  <Spacer />

                  <Box
                    width={'fit-content'}
                    height="40px"
                    borderRadius={'30px'}
                    border=" 1px dashed #E2E4E9"
                    justifyContent="center"
                    alignItems="center"
                    px={3}
                  >
                    <Flex mt={2.5} gap={1}>
                      <Text>
                        <Image
                          src={getFileIconByActivityType(feed.activityType)}
                        />
                      </Text>

                      <Text fontWeight={500} fontSize={12} color="#73777D">
                        {getFileName(feed.link)}
                      </Text>
                    </Flex>
                  </Box>
                </Stack>
              </Root>
            </>
          ))
        ) : (
          <Center h="400px">
            <Box textAlign={'center'} px={20} mt={5}>
              <VStack spacing={5}>
                <Image src={EmptyFeeds} />
                <Text fontSize={13} fontWeight={500} color="text.400">
                  {userType === 'Student'
                    ? 'Get started with our AI tools'
                    : 'No Activity yet'}
                </Text>
                {userType === 'Student' && (
                  <CustomButton
                    buttonText="Ask Shepherd"
                    w="165px"
                    onClick={activateHelpModal}
                  />
                )}
              </VStack>
            </Box>
          </Center>
        )}
      </Box>
      <HelpModal
        toggleHelpModal={toggleHelpModal}
        setToggleHelpModal={setToggleHelpModal}
      />
    </>
  );
}

export default ActivityFeeds;
