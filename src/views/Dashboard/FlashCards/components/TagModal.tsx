import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

interface TagModalProps {
  tags: string[];
  onSubmit: (tags: string[], noteId?: string | undefined) => void;
  isOpen: boolean;
  onClose: () => void;
  inputValue?: string;
  setInputValue?: any;
  handleAddTag?: () => void;
  newTags?: string[];
  setNewTags?: any;
}

export const TagModal: React.FC<TagModalProps> = ({
  tags,
  onSubmit,
  isOpen,
  onClose,
  inputValue: propInputValue,
  setInputValue: propSetInputValue,
  handleAddTag: propHandleAddTag,
  newTags: propNewTags,
  setNewTags: propSetNewTags
}) => {
  const [inputValue, setInputValue] = useState(propInputValue || '');
  const [hasLoadedDefaultTags, setHasLoadedDefaultTags] = useState(false);
  const [newTags, setNewTags] = useState(propNewTags || tags);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tags?.length && !hasLoadedDefaultTags) {
      setNewTags(tags);
      setHasLoadedDefaultTags(true);
    }
  }, [tags, hasLoadedDefaultTags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (propSetInputValue) {
      propSetInputValue(e.target.value);
    }
  };

  const handleAddTag = () => {
    const value = inputValue.toLowerCase().trim();
    if (inputValue && !newTags.includes(value)) {
      setNewTags([...newTags, value]);
      if (propSetNewTags) {
        propSetNewTags([...newTags, value]);
      }
    }
    setInputValue('');
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = newTags.filter((t) => t !== tag);
    setNewTags(updatedTags);
    if (propSetNewTags) {
      propSetNewTags(updatedTags);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (propSetNewTags) {
        await onSubmit(propSetNewTags);
      } else {
        await onSubmit(newTags);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Tag</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingTop={'0px'}>
          <VStack width={'full'}>
            <FormControl mt="20px">
              <Input
                _placeholder={{ fontSize: '14px', color: '#9A9DA2' }}
                placeholder="Add a tag and press enter"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleAddTag();
                    event.preventDefault();
                  }
                }}
              />
            </FormControl>
            <Box
              display="flex"
              flexWrap="wrap"
              alignItems={'start'}
              width="100%"
              marginTop="10px"
              justifyItems={'start'}
            >
              {newTags.map((tag) => (
                <Tag
                  key={tag}
                  borderRadius="5"
                  background="#f7f8fa"
                  mr="5px"
                  mb="5px"
                  p="10px 20px"
                >
                  <TagLabel>{tag}</TagLabel>

                  <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                </Tag>
              ))}
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          {isLoading ? (
            <Button
              colorScheme="grey"
              onClick={handleSubmit}
              isLoading
              loadingText="Adding..."
            >
              Submit
            </Button>
          ) : (
            <Button
              isDisabled={!newTags.length}
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TagModal;
