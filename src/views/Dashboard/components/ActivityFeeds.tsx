import React, { useState } from "react";
import {
  Flex,
  Box,
  Button,
  Spacer,
  Text,
  HStack,
  Select,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Divider,
  Stack,
  Image,
} from "@chakra-ui/react";
import { SlEnergy } from "react-icons/sl";
import { RiCalendar2Fill } from "react-icons/ri";
import { BsChevronDown, BsFiletypeDoc } from "react-icons/bs";
import FeedIcon from "../../../assets/blue-energy.svg";
import DocIcon from "../../../assets/doc-icon.svg";
import AdobeIcon from "../../../assets/adobedoc.svg";
import NoteIcon from "../../../assets/notes.svg";

function ActivityFeeds() {
  const [feedPeriod, setFeedPeriod] = useState<any>("Today");

  return (
    <>
      <Box>
        <Flex>
          <HStack>
            <img src={FeedIcon} alt="feed-icon" width={12} />

            <Text fontSize={16} fontWeight={500} mx={2}>
              Activity Feed
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
            >
              {feedPeriod}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setFeedPeriod("Today")}>Today</MenuItem>
              <MenuItem onClick={() => setFeedPeriod("This week")}>
                This week
              </MenuItem>
              <MenuItem onClick={() => setFeedPeriod("This month")}>
                This month
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Divider />
      </Box>

      <Box>
        <Flex px={3} gap={0} direction={"row"} my={2}>
          <Image src={DocIcon} alt="doc" maxHeight={45} />
          <Stack direction={"column"} px={4} spacing={1}>
            <Text color="text.300" fontSize={12} mb={0}>
              2 hrs ago
            </Text>
            <Text fontWeight={400} color="text.200" fontSize="14px" mb={0}>
              You uploaded documentationtitle.pdf to your workspace
            </Text>

            <Spacer />

            <Flex
              width={"fit-content"}
              borderRadius={"30px"}
              border=" 1px dashed #E2E4E9"
              alignItems={"center"}
              pt={2}
              px={3}
            >
              <Text>
                <Image src={AdobeIcon} />
              </Text>

              <Text fontWeight={500} fontSize={12} color="#73777D">
                Documentationtitle.pdf
              </Text>
            </Flex>
          </Stack>
        </Flex>
        <Flex px={3} gap={0} direction={"row"} my={2}>
          <Image src={NoteIcon} alt="doc" maxHeight={45} />
          <Stack direction={"column"} px={4} spacing={1}>
            <Text color="text.300" fontSize={12} mb={0}>
              7 hrs ago
            </Text>
            <Text fontWeight={400} color="text.200" fontSize="14px" mb={0}>
              You uploaded documentationtitle.pdf to your workspace
            </Text>

            <Spacer />

            <Flex
              width={"fit-content"}
              borderRadius={"30px"}
              border=" 1px dashed #E2E4E9"
              alignItems={"center"}
              pt={2}
              px={3}
            >
              <Text>
                <Image src={AdobeIcon} />
              </Text>

              <Text fontWeight={500} fontSize={12} color="#73777D">
                Documentationtitle.pdf
              </Text>
            </Flex>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}

export default ActivityFeeds;
