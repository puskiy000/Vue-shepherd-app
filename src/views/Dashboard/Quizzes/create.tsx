import { useCustomToast } from '../../../components/CustomComponents/CustomToast/useCustomToast';
import TagModal from '../../../components/TagModal';
import LoaderOverlay from '../../../components/loaderOverlay';
import ApiService from '../../../services/ApiService';
import quizStore from '../../../state/quizStore';
import { QuizData, QuizQuestion } from '../../../types';
import QuizDataProvider from './context';
import {
  ManualQuizForm,
  TextQuizForm,
  UploadQuizForm,
  TopicQuizForm
} from './forms';
// import { QuizModal } from './modal';
import { manualPreview as QuizPreviewer } from './previews';
import './styles.css';
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  TabIndicator, // useDisclosure,
  AlertStatus,
  ToastPosition
} from '@chakra-ui/react';
import { isEmpty, isNil, last, omit, pull, union } from 'lodash';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CreateQuizPage = () => {
  const TAG_TITLE = 'Tags Alert';
  const [searchParams] = useSearchParams();
  const toast = useCustomToast();
  const { isLoading, loadQuiz, fetchQuizzes } = quizStore();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [quizId, setQuizId] = useState<string | null | undefined>(null);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [openTags, setOpenTags] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string[]>(tags);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');

  const handleSetTitle = (str: string) => setTitle(str);

  const handleAddTag = () => {
    const value = inputValue.toLowerCase().trim();
    if (inputValue && !newTags.includes(value)) {
      setNewTags([...newTags, value]);
    }
    setInputValue('');
  };

  const showToast = (
    title: string,
    description: string,
    status: AlertStatus,
    position: ToastPosition = 'top-right',
    duration = 5000,
    isClosable = true
  ) => {
    toast({
      title: description ?? title,
      status: status,
      position: position,
      duration: duration,
      isClosable: isClosable
    });
  };

  const AddTags = async () => {
    setOpenTags(false);
    showToast(TAG_TITLE, 'Tag added', 'success');
    setTags(union(tags, newTags));
    setNewTags([]);
    setInputValue('');
  };

  const handleUpdateQuizQuestion = (index: number, question: QuizQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = question;

    setQuestions(updatedQuestions);
  };

  useEffect(() => {
    const queryQuizId = searchParams.get('quiz_id');

    if (
      !isEmpty(queryQuizId) &&
      !isNil(queryQuizId) &&
      queryQuizId !== null &&
      queryQuizId !== undefined
    ) {
      (async () => {
        try {
          setQuizId(queryQuizId);
          const result: any = await ApiService.getQuiz(queryQuizId as string);
          const { data }: { data: QuizData } = await result.json();

          if (data) {
            setTitle(data.title);
            setTags(data.tags);
            setQuestions(data?.questions);
          }
        } catch (error) {
          console.log('getQuiz Error =========>> ', error);
        }
      })();
    }
  }, [searchParams]);

  const addQuestion = (
    question: QuizQuestion | QuizQuestion[],
    type: 'single' | 'multiple' = 'single'
  ) => {
    if (type === 'multiple')
      return setQuestions((prevQuestions) => [
        ...prevQuestions,
        ...(question as QuizQuestion[])
      ]);
    setQuestions((prevQuestions) => {
      return [...prevQuestions, question as QuizQuestion];
    });
  };

  const handleRemoveTag = (idx: number, length = 1) => {
    const tag = tags.splice(idx, length);

    setTags((prevTags) => [...pull(prevTags, last(tag) as string)]);
  };

  const handleOpenTagsModal = () => setOpenTags(true);
  const handleCreateQuiz = async () => {
    try {
      if (isEmpty(title) || isNil(title)) {
        toast({
          position: 'top-right',
          title: `quiz title missing`,
          status: 'error'
        });
        return;
      }
      setIsLoadingButton(true);
      const result = await ApiService.createQuiz({
        title,
        questions,
        tags
      });

      const { data } = await result.json();
      setQuizId(data?._id);
      setTitle(data?.title);
      setQuestions(data?.questions);
      setTags(data?.tags);
    } catch (error) {
      console.log('handleUpdateQuiz -------->>> error ========>>> ', error);
      toast({
        position: 'top-right',
        title: `failed to create quiz`,
        status: 'error'
      });
    } finally {
      setIsLoadingButton(false);
      await fetchQuizzes();
    }
  };

  const handleUpdateQuiz = async () => {
    try {
      setIsLoadingButton(true);

      const result = await ApiService.updateQuiz(quizId as string, {
        title,
        questions: questions.map((question) => {
          return {
            ...omit(question, ['_id']),
            options: question?.options?.map((option) => {
              return omit(option, ['_id']);
            })
          };
        }) as any[],
        tags
      });
      const { data } = await result.json();

      setQuizId(data?._id);
      setTitle(data?.title);
      setQuestions(data?.questions);
      setTags(data?.tags);

      // window.location.reload();
    } catch (error) {
      console.log('handleUpdateQuiz -------->>> error ========>>> ', error);
    } finally {
      setIsLoadingButton(false);
      await fetchQuizzes();
    }
  };

  const handleLoadQuiz = () => loadQuiz(quizId);

  return (
    <>
      <Flex
        className="quiz-page-wrapper"
        width={'100%'}
        height={'100vh'}
        maxH={'calc(100vh - 80px)'}
        overflowY={'hidden'}
        flexWrap="wrap"
      >
        {isLoading && <LoaderOverlay />}

        <Box
          className="create-quiz-wrapper"
          width={['100%', '100%', '100%', '50%', '30%']}
          bg="white"
          overflowY={'auto'}
          h={'100%'}
        >
          <Text
            fontFamily="Inter"
            fontWeight="500"
            fontSize="18px"
            lineHeight="23px"
            color="#212224"
            m={8}
            mt={10}
          >
            Create Quiz
          </Text>
          <Tabs defaultIndex={3} isLazy isFitted position={'relative'}>
            <TabList display="flex">
              <Tab _selected={{ color: '#207DF7' }} flex="1">
                Upload
              </Tab>

              <Tab _selected={{ color: '#207DF7' }} flex="1">
                Topic
              </Tab>
              <Tab _selected={{ color: '#207DF7' }} flex="1">
                Text
              </Tab>
              <Tab _selected={{ color: '#207DF7' }} flex="1">
                Manual
              </Tab>
            </TabList>

            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="#207DF7"
              borderRadius="1px"
            />

            <TabPanels>
              <TabPanel>
                <UploadQuizForm
                  addQuestion={addQuestion}
                  handleSetTitle={handleSetTitle}
                />
              </TabPanel>

              <TabPanel>
                <TopicQuizForm
                  addQuestion={addQuestion}
                  handleSetTitle={handleSetTitle}
                />
              </TabPanel>
              <TabPanel>
                <TextQuizForm
                  addQuestion={addQuestion}
                  handleSetTitle={handleSetTitle}
                />
              </TabPanel>
              <TabPanel>
                <ManualQuizForm
                  openTags={handleOpenTagsModal}
                  addQuestion={addQuestion}
                  tags={tags}
                  removeTag={handleRemoveTag}
                  title={title}
                  handleSetTitle={handleSetTitle}
                  isLoadingButton={isLoadingButton}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box
          className="review-quiz-wrapper"
          width={['100%', '100%', '100%', '50%', '70%']}
          bg="#F9F9FB"
          borderLeft="1px solid #E7E8E9"
        >
          <QuizPreviewer
            onOpen={handleLoadQuiz}
            createQuiz={handleCreateQuiz}
            updateQuiz={handleUpdateQuiz}
            questions={questions}
            quizId={quizId as string}
            isLoadingButton={isLoadingButton}
            handleUpdateQuizQuestion={handleUpdateQuizQuestion}
          />
        </Box>
      </Flex>

      {openTags && (
        <TagModal
          onSubmit={AddTags}
          isOpen={openTags}
          onClose={() => {
            setNewTags([]);
            setOpenTags(false);
          }}
          tags={[]}
          inputValue={inputValue}
          handleAddTag={() => {
            if (newTags?.length <= 10) {
              handleAddTag();
            }
          }}
          newTags={newTags}
          setNewTags={(tag) => {
            if (newTags?.length <= 10) {
              setNewTags(tag);
            }
          }}
          setInputValue={(value) => {
            if (newTags?.length <= 10) {
              setInputValue(value);
            }
          }}
        />
      )}
    </>
  );
};

const CreateQuiz = () => {
  return (
    <QuizDataProvider>
      <CreateQuizPage />
    </QuizDataProvider>
  );
};

export default CreateQuiz;
