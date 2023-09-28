import { useCustomToast } from '../../../../../components/CustomComponents/CustomToast/useCustomToast';
import CustomSelect from '../../../../../components/CustomSelect';
import SelectComponent, { Option } from '../../../../../components/Select';
import { useFlashcardWizard } from '../../context/flashcard';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Button,
  Text,
  HStack
} from '@chakra-ui/react';
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';

const FlashCardSetupInit = ({ isAutomated }: { isAutomated?: boolean }) => {
  const {
    flashcardData,
    generateFlashcardQuestions,
    setFlashcardData,
    goToNextStep,
    isResetted
  } = useFlashcardWizard();

  const toast = useCustomToast();

  const dummyData = {
    deckname: '',
    studyType: '',
    studyPeriod: '',
    subject: '',
    topic: '',
    level: '',
    numQuestions: 0,
    timerDuration: '',
    hasSubmitted: false
  };

  const [localData, setLocalData] = useState<typeof flashcardData>(dummyData); // A local state for storing user inputs

  useEffect(() => {
    if (isResetted) {
      setLocalData(dummyData);
    }
    // eslint-disable-next-line
  }, [isResetted]);

  useEffect(() => {
    if (flashcardData.deckname) {
      setLocalData(flashcardData);
    }
    // eslint-disable-next-line
  }, []);

  const studyPeriodOptions = [
    { label: 'Daily', value: 'daily' },
    { label: 'Once a week', value: 'weekly' },
    { label: 'Twice a week', value: 'biweekly' },
    {
      label:
        localData.studyType && localData.studyType === 'quickPractice'
          ? "Doesn't repeat"
          : 'Spaced repetition',
      value:
        localData.studyType && localData.studyType === 'quickPractice'
          ? 'noRepeat'
          : 'spacedRepetition'
    }
  ];

  const levelOptions = [
    { label: 'Very Easy', value: 'kindergarten' },
    { label: 'Medium', value: 'high school' },
    { label: 'Hard', value: 'college' },
    { label: 'Very Hard', value: 'PhD' }
  ];

  const handleChange = React.useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      setLocalData((prevState) => ({ ...prevState, [name]: value }));
    },
    [setLocalData]
  );

  const isValid = useMemo(() => {
    const { timerDuration, hasSubmitted, subject, topic, ...data } = localData;
    let payload: { [key: string]: any } = { ...data };
    if (flashcardData.noteDoc) {
      return [
        localData.deckname,
        localData.numQuestions,
        localData.studyType
      ].every(Boolean);
    }
    if (isAutomated) {
      payload = { ...payload, subject };
    }

    return Object.values(payload).every(Boolean);
  }, [localData, isAutomated, flashcardData]);

  const handleDone = (success: boolean) => {
    toast({
      title: success
        ? 'Flashcard questions generated successfully'
        : 'Failed to generate flashcard questions',
      position: 'top-right',
      status: success ? 'success' : 'error',
      isClosable: true
    });
  };

  const handleSubmit = () => {
    const data = { ...flashcardData, ...localData, hasSubmitted: true };
    setFlashcardData((prevState) => ({
      ...prevState,
      ...localData,
      hasSubmitted: true
    }));
    if (isAutomated) {
      generateFlashcardQuestions(data, handleDone);
    } else {
      goToNextStep();
    }
  };

  const renderOptional = useCallback(() => {
    return (
      <>
        {' '}
        <FormControl mb={8}>
          <FormLabel fontSize="12px" lineHeight="17px" color="#5C5F64" mb={3}>
            Subject
          </FormLabel>
          <Input
            type="text"
            name="subject"
            placeholder="e.g. Chemistry"
            value={localData.subject}
            onChange={handleChange}
            _placeholder={{ fontSize: '14px', color: '#9A9DA2' }}
          />
        </FormControl>
        <FormControl mb={8}>
          <FormLabel fontSize="12px" lineHeight="17px" color="#5C5F64" mb={3}>
            Topic
          </FormLabel>
          <Input
            type="text"
            name="topic"
            placeholder="e.g. Bonds"
            value={localData.topic}
            onChange={handleChange}
            _placeholder={{ fontSize: '14px', color: '#9A9DA2' }}
          />
        </FormControl>
        <FormControl mb={8}>
          <FormLabel fontSize="12px" lineHeight="17px" color="#5C5F64" mb={3}>
            Level (optional)
          </FormLabel>
          <SelectComponent
            name="level"
            placeholder="Select Level"
            defaultValue={levelOptions.find(
              (option) => option.value === localData.level
            )}
            options={levelOptions}
            size={'md'}
            onChange={(option) => {
              const event = {
                target: {
                  name: 'level',
                  value: (option as Option).value
                }
              } as ChangeEvent<HTMLSelectElement>;
              handleChange(event);
            }}
          />
        </FormControl>
      </>
    );
  }, [localData]);

  return (
    <Box bg="white" width="100%" mt="30px">
      {isAutomated && !flashcardData?.noteDoc && renderOptional()}
      <FormControl mb={8}>
        <FormLabel fontSize="12px" lineHeight="17px" color="#5C5F64" mb={3}>
          Deckname
        </FormLabel>
        <Input
          type="text"
          name="deckname"
          placeholder="e.g. Deckname"
          value={localData.deckname}
          onChange={handleChange}
          _placeholder={{ fontSize: '14px', color: '#9A9DA2' }}
        />
      </FormControl>

      <FormControl mb={8}>
        <FormLabel fontSize="12px" lineHeight="17px" color="#5C5F64" mb={3}>
          Select study type
        </FormLabel>
        <RadioGroup
          name="studyType"
          value={localData.studyType}
          onChange={(value) => {
            if (value === 'longTermRetention') {
              handleChange({
                target: { name: 'studyPeriod', value: 'spacedRepetition' }
              } as ChangeEvent<HTMLInputElement>);
            } else {
              handleChange({
                target: { name: 'studyPeriod', value: 'noRepeat' }
              } as ChangeEvent<HTMLInputElement>);
            }
            handleChange({
              target: { name: 'studyType', value }
            } as ChangeEvent<HTMLInputElement>);
          }}
        >
          <Radio value="longTermRetention">
            <Text fontSize="14px">Long term retention</Text>
          </Radio>
          <Radio ml={'10px'} value="quickPractice">
            <Text fontSize="14px"> Quick Practice</Text>
          </Radio>
        </RadioGroup>
      </FormControl>

      {localData.studyType === 'longTermRetention' && (
        <FormControl mb={8}>
          <FormLabel fontSize="12px" lineHeight="17px" color="#5C5F64" mb={3}>
            How often would you like to study?
          </FormLabel>
          <SelectComponent
            name="studyPeriod"
            placeholder="Select study period"
            defaultValue={studyPeriodOptions.find(
              (option) => option.value === localData.studyPeriod
            )}
            tagVariant="solid"
            options={studyPeriodOptions}
            size={'md'}
            onChange={(option) => {
              const event = {
                target: {
                  name: 'studyPeriod',
                  value: (option as Option).value
                }
              } as ChangeEvent<HTMLSelectElement>;
              handleChange(event);
            }}
          />
        </FormControl>
      )}
      <FormControl mb={8}>
        <FormLabel fontSize="12px" lineHeight="17px" color="#5C5F64" mb={3}>
          Number of questions
        </FormLabel>
        <Input
          type="number"
          min={1}
          name="numQuestions"
          placeholder="Number of questions"
          value={localData.numQuestions}
          onChange={handleChange}
          _placeholder={{ fontSize: '14px', color: '#9A9DA2' }}
        />
      </FormControl>

      <HStack w="full" align={'flex-end'}>
        <Button
          variant="solid"
          isDisabled={!isValid}
          colorScheme="primary"
          size="sm"
          ml="auto"
          fontSize={'14px'}
          mt={4}
          padding="20px 25px"
          onClick={() => handleSubmit()}
        >
          <svg
            style={{ marginRight: '4px' }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6862 12.9228L10.8423 16.7979C10.7236 17.0473 10.4253 17.1533 10.1759 17.0346C10.1203 17.0082 10.0701 16.9717 10.0278 16.9269L7.07658 13.8113C6.99758 13.7279 6.89228 13.6743 6.77838 13.6594L2.52314 13.1032C2.24932 13.0673 2.05637 12.8164 2.09216 12.5426C2.10014 12.4815 2.11933 12.4225 2.14876 12.3684L4.19993 8.59893C4.25484 8.49801 4.27333 8.38126 4.25229 8.26835L3.46634 4.0495C3.41576 3.77803 3.59484 3.51696 3.86631 3.46638C3.92684 3.45511 3.98893 3.45511 4.04946 3.46638L8.26831 4.25233C8.38126 4.27337 8.49801 4.25488 8.59884 4.19998L12.3683 2.1488C12.6109 2.01681 12.9146 2.10644 13.0465 2.349C13.076 2.40308 13.0952 2.46213 13.1031 2.52318L13.6593 6.77842C13.6743 6.89233 13.7279 6.99763 13.8113 7.07662L16.9269 10.0278C17.1274 10.2177 17.136 10.5342 16.9461 10.7346C16.9038 10.7793 16.8535 10.8158 16.7979 10.8423L12.9228 12.6862C12.8191 12.7356 12.7355 12.8191 12.6862 12.9228ZM13.3502 14.5288L14.5287 13.3503L18.0643 16.8858L16.8858 18.0643L13.3502 14.5288Z"
              fill="white"
            />
          </svg>
          Generate Flashcard
        </Button>
      </HStack>
    </Box>
  );
};

export default FlashCardSetupInit;
