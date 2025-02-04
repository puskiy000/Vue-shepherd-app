import { Box, Center, Flex, Text, Button, Spinner } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import UploadModal from '../../../../../components/UploadModal';
import { useDropzone } from 'react-dropzone';
import { RiUploadCloud2Fill } from '@remixicon/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import { useFlashcardWizard } from '../../context/flashcard';
const FileName = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #585f68;
`;
const AnkiType = () => {
  const { convertAnkiToShepherd } = useFlashcardWizard();
  const [ankiFile, setAnkiFile] = useState('');
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = (e) => {
      const res = reader.result as string;
      setAnkiFile(res.split(',')[1]);
      setIsFileLoaded(true);
    };
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
      'application/anki-package': ['.apkg']
    },
    maxFiles: 1
  });
  const submitConversionHandler = async () => {
    setIsGenerating(true);
    try {
      await convertAnkiToShepherd(ankiFile);
    } catch (error) {
      setIsGenerating(false);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <Box bg="white" width="100%" mt="10px">
      <Text fontSize={'24px'} fontWeight="500" marginBottom="5px">
        Set up flashcard
      </Text>
      <Text
        fontSize={'14px'}
        fontWeight="300"
        marginBottom="5px"
        textColor={'text.300'}
      >
        Shepherd supports importing your .apkg file from Anki.
      </Text>
      <Text
        fontSize={'12px'}
        fontWeight="300"
        marginBottom="20px"
        textColor={'text.300'}
      >
        Shepherd does not support Anki flashcards with media or scientific
        equations at this time.
      </Text>
      <Center
        w="full"
        minH="65px"
        mt={3}
        p={2}
        border="2px"
        borderColor={'gray.300'}
        borderStyle="dashed"
        rounded="lg"
        cursor="pointer"
        bg={'gray.50'}
        color={'inherit'}
        marginBottom="10px"
        {...getRootProps()}
      >
        <Box>
          {file?.name ? (
            <Flex>
              <AttachmentIcon /> <FileName>{file.name}</FileName>
            </Flex>
          ) : (
            <Box>
              <Center>
                <RiUploadCloud2Fill className="h-8 w-8" color="gray.500" />
              </Center>

              <Text mb="2" fontSize="sm" fontWeight="semibold">
                Click to upload or drag and drop
              </Text>
            </Box>
          )}
        </Box>
        <input
          id="upload"
          className="hidden"
          name="upload"
          type="file"
          {...getInputProps()}
        />
      </Center>
      <Button
        variant="solid"
        colorScheme="primary"
        fontSize={'14px'}
        isDisabled={!isFileLoaded || isGenerating}
        w="full"
        onClick={submitConversionHandler}
      >
        {isGenerating ? (
          <Spinner size="sm" mr={2} />
        ) : (
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
        )}
        Generate Flashcard
      </Button>
    </Box>
  );
};

export default AnkiType;
