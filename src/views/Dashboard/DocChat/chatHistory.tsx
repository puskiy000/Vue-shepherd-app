import { ReactComponent as DeleteIcn } from '../../../assets/deleteIcn.svg';
import { ReactComponent as EditIcn } from '../../../assets/editIcn.svg';
import { ReactComponent as HistoryIcn } from '../../../assets/historyIcon.svg';
import CustomButton from '../../../components/CustomComponents/CustomButton';
import CustomModal from '../../../components/CustomComponents/CustomModal';
import CustomToast from '../../../components/CustomComponents/CustomToast';
import { arrangeDataByDate, getDateString } from '../../../helpers';
import {
  deleteConversationId,
  editConversationId,
  fetchStudentConversations
} from '../../../services/AI';
import {
  ChatHistoryBlock,
  ChatHistoryBody,
  ChatHistoryContainer,
  ChatHistoryDate,
  ChatHistoryHeader,
  HomeWorkHelpChatContainer2
} from './styles';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { AnyMxRecord } from 'dns';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styled from 'styled-components';

const Clock = styled.div`
  width: 20px;
  height: 20px;
  padding: 5px;
  margin: 5px;
  margin-top: 0;
`;

type Chat = {
  id: string;
  message: string;
  createdDated: string;
  title: string;
  subject: string;
  topic: string;
  level: string;
};

type GroupedChat = {
  date: string;
  messages: Chat[];
};

const ChatHistory = ({
  studentId,
  setConversationId,
  conversationId,
  isSubmitted,
  setCountNeedTutor,
  setMessages,
  setDeleteConservationModal,
  deleteConservationModal,
  setSocket,
  setVisibleButton,
  setCertainConversationId,
  messages,
  setSomeBountyOpt
}: {
  studentId: string;
  setConversationId: (conversationId: string) => void;
  conversationId: string;
  isSubmitted?: boolean;
  setCountNeedTutor: any;
  setMessages: any;
  setDeleteConservationModal: any;
  deleteConservationModal: boolean;
  setSocket: any;
  setVisibleButton: any;
  setCertainConversationId: any;
  messages: any;
  setSomeBountyOpt: any;
}) => {
  // const placeholder = [
  //   {ß
  //     messages: ['No conversations — yet'],
  //     date: getDateString(new Date())
  //   }
  // ];

  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [updateChatHistory, setUpdateChatHistory] = useState({});
  const [updatedChat, setUpdatedChat] = useState('');
  const [toggleHistoryBox, setToggleHistoryBox] = useState({});
  const [groupChatsByDateArr, setGroupChatsByDateArr] = useState<GroupedChat[]>(
    []
  );
  const toast = useToast();
  const showSearchRef = useRef(null) as any;
  const [editConversation, setEditConversationId] = useState('');
  const [removeIndex, setRemoveIndex] = useState(0);
  const [currentStoredArr, setCurrentStoredArr] = useState<any>();
  const [hostoryTopics, setHistoryTopics] = useState<any>([]);
  const [selectedTopic, setSelectedTopic] = useState('Default');

  const handleClickOutside = (event) => {
    if (
      showSearchRef.current &&
      !showSearchRef.current.contains(event.target as Node)
    ) {
      setToggleHistoryBox({});
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchRef]);

  async function retrieveChatHistory(studentId: string): Promise<void> {
    setLoading(true);
    const chatHistory = await fetchStudentConversations(studentId);

    const historyWithContent: any = chatHistory
      .filter((chat) => chat.ConversationLogs.length > 0)
      .map((convo) => {
        const message = convo.ConversationLogs.at(-1)?.log?.content || '';

        return {
          id: convo.id,
          title: convo?.title,
          topic: convo?.topic,
          subject: convo?.subject,
          level: convo?.level,
          message:
            message.length < 140 ? message : message.substring(0, 139) + '...',
          createdDated: getDateString(new Date(convo.createdAt))
        };
      })
      .reverse();

    const uniqueTopicsArray = Array.from(
      new Set(historyWithContent.map((convo) => convo.subject))
    );

    setHistoryTopics(['Default', ...uniqueTopicsArray]);
    setChatHistory(historyWithContent);
    setLoading(false);
  }

  const filteredHistory = useMemo(() => {
    return selectedTopic !== 'Default'
      ? chatHistory.filter((convo) => convo.subject === selectedTopic)
      : chatHistory;
  }, [selectedTopic, chatHistory]);

  function groupChatsByDate(chatHistory: Chat[]): GroupedChat[] {
    return chatHistory?.reduce((groupedChats, chat) => {
      const currentGroup = groupedChats?.find(
        (group) => group.date === chat.createdDated
      );
      if (currentGroup) {
        currentGroup?.messages.push(chat);
      } else {
        groupedChats?.push({ date: chat.createdDated, messages: [chat] });
      }
      return groupedChats;
    }, [] as GroupedChat[]);
  }

  // const groupChatsByDateArr: GroupedChat[] = groupChatsByDate(chatHistory);

  const toggleMessage = (id) => {
    setToggleHistoryBox((prevState) => {
      const updatedState = { ...prevState };

      // Toggle the state of the clicked item
      updatedState[id] = !updatedState[id];

      // Close all previous items except the one clicked
      for (const key in updatedState) {
        if (key !== id) {
          updatedState[key] = false;
        }
      }

      return updatedState;
    });
  };

  const handleUpdateConversation = useCallback(async () => {
    try {
      const request = await editConversationId({
        editConversation,
        newTitle: updatedChat
      });
      if ([200, 201].includes(request.status)) {
        retrieveChatHistory(studentId);
        setToggleHistoryBox({});
      }
    } catch (error) {
      toast({
        render: () => (
          <CustomToast
            title="Unable to process your request at this time. Please try again later."
            status="error"
          />
        ),
        position: 'top-right',
        isClosable: true
      });
      setLoading(false);
    }
  }, [conversationId, studentId, updatedChat]);

  useEffect(() => {
    const newChatHistory: Record<string, string> = {};

    groupChatsByDateArr?.forEach((history) => {
      history.messages.forEach((message) => {
        newChatHistory[message.id] = message.title;
      });
    });
    setUpdateChatHistory(newChatHistory);
  }, [toggleHistoryBox]);

  // useEffect(() => {
  //   retrieveChatHistory(studentId);
  // }, [studentId]);

  useEffect(() => {
    if (groupChatsByDateArr.length) {
      localStorage.setItem(
        'groupChatsByDateArr',
        JSON.stringify(groupChatsByDateArr)
      );
    }
  }, [groupChatsByDateArr]);

  useEffect(() => {
    if (groupChatsByDateArr.length) {
      const storedGroup = JSON.parse(
        localStorage.getItem('groupChatsByDateArr') as any
      );
      setCurrentStoredArr(storedGroup);
    }
  }, [groupChatsByDateArr]);

  const onCloseDeleteModal = useCallback(() => {
    setDeleteConservationModal((prevState) => !prevState);
  }, [setDeleteConservationModal]);

  const handleDeleteItem = (index) => {
    const newArray = groupChatsByDateArr.filter((_, idx) => idx !== index);
    setGroupChatsByDateArr(newArray);
  };

  const onDelete = useCallback(async () => {
    setLoading(true); // Start loading state

    try {
      const response = await deleteConversationId({
        conversationId
      });

      if (response) {
        retrieveChatHistory(studentId);
        setDeleteConservationModal(false);
        setSocket(null);
        setMessages([]);
        setVisibleButton(true);
        setCertainConversationId('');
        localStorage.removeItem('conversationId');
        toast({
          render: () => (
            <CustomToast
              title="Conversation deleted successfully"
              status="success"
            />
          ),
          position: 'top-right',
          isClosable: true
        });
      }
    } catch (error) {
      toast({
        render: () => (
          <CustomToast title="Failed to fetch chat history..." status="error" />
        ),
        position: 'top-right',
        isClosable: true
      });
    } finally {
      setLoading(false); // End loading state
    }
  }, [conversationId]);

  useEffect(() => {
    // const groupedChats =
    //   storedGroupChatsArr && JSON.parse(storedGroupChatsArr ?? '');

    // if (groupedChats) {
    //   setChatHistory(groupedChats);
    // }
    retrieveChatHistory(studentId);
  }, [studentId]);

  useEffect(() => {
    if (isSubmitted) {
      retrieveChatHistory(studentId);
    }
  }, [studentId, isSubmitted]);

  // useEffect(() => {
  //   if (chatHistory?.length) {
  //     localStorage.setItem('groupChatsByDateArr', JSON.stringify(chatHistory));
  //   }
  // }, [chatHistory]);

  useEffect(() => {
    if (isSubmitted && studentId) {
      retrieveChatHistory(studentId);
    }
  }, [isSubmitted, studentId]);

  useEffect(() => {
    const groupedChats = groupChatsByDate(filteredHistory);

    setGroupChatsByDateArr(groupedChats ?? []);
  }, [filteredHistory]);

  return (
    <ChatHistoryContainer>
      <ChatHistoryHeader>
        <p>Chat history</p>
        <p>Clear history</p>
      </ChatHistoryHeader>
      <Menu>
        <p
          style={{
            fontSize: '0.875rem',
            marginBottom: '10px'
          }}
        >
          Filter history by selected subject
        </p>
        <MenuButton
          as={Button}
          variant="outline"
          rightIcon={<FiChevronDown />}
          fontSize={14}
          borderRadius="40px"
          fontWeight={400}
          width={{ sm: '400px', lg: 'auto' }}
          height="36px"
          color="text.400"
        >
          {selectedTopic || 'Select a topic'}
        </MenuButton>
        <MenuList zIndex={3}>
          {hostoryTopics
            .filter(
              (topic) => topic !== null && topic !== undefined && topic !== ''
            )
            .map((topic, index) => (
              <MenuItem
                key={index}
                _hover={{ bgColor: '#F2F4F7' }}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
      {loading && (
        <Box
          p={5}
          textAlign="center"
          margin="0 auto"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40vh',
            width: '24vw'
          }}
        >
          <Spinner />
        </Box>
      )}
      {!loading && !groupChatsByDateArr?.length && (
        <div
          style={{
            fontStyle: 'italic',
            width: '100%'
          }}
        >
          <p
            style={{
              margin: '294px 128px'
            }}
          >
            No Chat History
          </p>
        </div>
      )}

      {!loading ? (
        <>
          {groupChatsByDateArr.length > 0 &&
            groupChatsByDateArr?.map((history, index) => (
              <ChatHistoryBlock key={index}>
                <ChatHistoryDate>{history.date}</ChatHistoryDate>
                {history.messages.map((message, index) => (
                  <>
                    {!toggleHistoryBox[message.id] ? (
                      <ChatHistoryBody key={message.id}>
                        <Clock>
                          <HistoryIcn />
                        </Clock>
                        {toggleHistoryBox[message.id] ? (
                          <HomeWorkHelpChatContainer2
                            value={updateChatHistory[message.id]}
                            onChange={(event) => {
                              setUpdatedChat(event.target.value);
                              setUpdateChatHistory((prevChatHistory) => ({
                                ...prevChatHistory,
                                [message.id]: event.target.value
                              }));
                            }}
                          ></HomeWorkHelpChatContainer2>
                        ) : (
                          <p
                            onClick={() => {
                              setConversationId(message.id);
                              retrieveChatHistory(studentId);
                              setCountNeedTutor(1);
                              setLoading(false);
                              localStorage.setItem(
                                'bountyOpt',
                                JSON.stringify({
                                  subject: message.subject,
                                  topic: message.topic,
                                  level: message.level
                                })
                              );
                              setSomeBountyOpt({
                                subject: message.subject,
                                topic: message.topic,
                                level: message.level
                              });
                            }}
                          >
                            {message.title}
                          </p>
                        )}

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'inherit'
                          }}
                        >
                          {toggleHistoryBox[message.id] ? (
                            // <EditIcn onClick={handleUpdateConversation} />
                            <p onClick={handleUpdateConversation}>Save</p>
                          ) : (
                            <EditIcn
                              onClick={() => {
                                setEditConversationId(message.id);
                                toggleMessage(message.id);
                              }}
                            />
                          )}
                          {/* <EditIcn onClick={handleUpdateConversation} /> */}
                          <DeleteIcn
                            onClick={() => {
                              setDeleteConservationModal(
                                (prevState) => !prevState
                              );
                              setConversationId(message.id);
                              setRemoveIndex(index);
                            }}
                          />
                        </div>
                      </ChatHistoryBody>
                    ) : (
                      <ChatHistoryBody key={message.id} ref={showSearchRef}>
                        <Clock>
                          <HistoryIcn />
                        </Clock>
                        <HomeWorkHelpChatContainer2
                          value={updateChatHistory[message.id]}
                          onChange={(event) => {
                            setUpdatedChat(event.target.value);
                            setUpdateChatHistory((prevChatHistory) => ({
                              ...prevChatHistory,
                              [message.id]: event.target.value
                            }));
                          }}
                        ></HomeWorkHelpChatContainer2>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'inherit'
                          }}
                        >
                          <p onClick={handleUpdateConversation}>Save</p>

                          {/* <EditIcn onClick={handleUpdateConversation} /> */}
                          <DeleteIcn
                            onClick={() => {
                              setDeleteConservationModal(
                                (prevState) => !prevState
                              );
                              setConversationId(message.id);
                              setRemoveIndex(index);
                            }}
                          />
                        </div>
                      </ChatHistoryBody>
                    )}
                  </>
                ))}
              </ChatHistoryBlock>
            ))}
        </>
      ) : null}
      <CustomModal
        modalTitle=""
        isModalCloseButton
        onClose={() => setDeleteConservationModal(false)}
        isOpen={deleteConservationModal}
        modalSize="md"
        style={{ height: '260px', maxWidth: '30%' }}
        footerContent={
          <div style={{ display: 'flex', gap: '8px' }}>
            <CustomButton
              type="button"
              isCancel
              onClick={onCloseDeleteModal}
              title="Cancel"
            />
            <CustomButton type="button" onClick={onDelete} title="Confirm" />
          </div>
        }
      >
        <div
          style={{
            width: '100%'
          }}
        >
          <div
            style={{
              marginTop: '65px'
            }}
          >
            <p
              style={{
                fontSize: '1.2rem',
                color: 'black',
                textAlign: 'center',
                marginBottom: '20px',
                fontWeight: '800'
              }}
            >
              Delete conversation
            </p>
            <p
              style={{
                fontSize: '0.875rem',
                textAlign: 'center'
              }}
            >
              Are you sure you want to delete this conversation?
            </p>
          </div>
          <div></div>
        </div>
      </CustomModal>
    </ChatHistoryContainer>
  );
};

export default ChatHistory;
