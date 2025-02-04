import React from 'react';
import { useState } from 'react';
import Chip from '../chip';
import Button from './_components/button';
import { PencilIcon } from '../../../../../../../../../../components/icons';
import useResourceStore from '../../../../../../../../../../state/resourceStore';
import { languages } from '../../../../../../../../../../helpers';
import { Box, Select } from '@chakra-ui/react';
import ApiService from '../../../../../../../../../../services/ApiService';

type Language = (typeof languages)[number];
function Input({
  actions: {
    handleSubjectChange,
    handleTopicChange,
    handleLanguageChange,
    handleLevelChange,
    onSubmit
  },
  state: { chatContext },
  showMathModeInfo,
  setShowMathModeInfo
}: {
  actions: {
    handleSubjectChange: (subject: string) => void;
    handleTopicChange: (topic: string) => void;
    handleLanguageChange: (language: any) => void;
    handleLevelChange: (level: string) => void;
    onSubmit: () => void;
  };
  state: {
    chatContext: {
      subject: string;
      topic: string;
      level: string;
      language: string;
    };
  };
  showMathModeInfo: boolean;
  setShowMathModeInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { courses: courseList, levels } = useResourceStore();
  const [currentInputType, setCurrentInputType] = useState<
    'subject' | 'topic' | 'level' | 'language'
  >('subject');
  const [isSelectingLanguage, setIsSelectingLanguage] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState<Language>(
    languages[0]
  );
  const [filterKeyword, setFilterKeyword] = useState({
    keyword: '',
    active: false
  });
  console.log(chatContext, currentInputType);
  const handleInputTypeChange = (
    type: 'subject' | 'topic' | 'level' | 'language'
  ) => {
    if (type === 'level' || type === 'language') {
      setFilterKeyword({
        keyword: '',
        active: true
      });
    } else {
      setFilterKeyword({
        keyword: '',
        active: false
      });
    }

    setCurrentInputType(type);
  };

  const setNotifyMathMode = async () => {
    const resp = await ApiService.setNotifyMathMode().catch((error) => {
      console.error('Error enabling math mode notification:', error);
    });
  };

  const handleSubmit = () => {
    if (chatContext.subject.trim() === '') return;
    setFilterKeyword({
      keyword: '',
      active: false
    });
    onSubmit();
  };

  const handleButtonClick = () => {
    if (currentInputType === 'subject') {
      if (chatContext.subject === '') return;
      setFilterKeyword({
        active: true,
        keyword: ''
      });
      handleInputTypeChange('level');
    } else if (currentInputType === 'level') {
      if (chatContext.level === '') return;
      handleInputTypeChange('topic');
    } else if (currentInputType === 'topic') {
      if (chatContext.topic === '') return;

      handleInputTypeChange('language');
    } else {
      if (chatContext.language === '' || chatContext.subject === '') return;
      handleSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <React.Fragment>
      <div
        className={`w-full h-[50px]  text-black rounded-lg  flex gap-2 items-center pr-3 relative bg-white shadow-md
        `}
      >
        {chatContext.subject.trim() !== '' && chatContext.level !== '' ? (
          <span className="text-xs absolute top-[-85%] left-[4%] flex ">
            Level -
            <span
              className="ml-1 inline-flex text-[#207DF7] gap-1 items-center cursor-pointer"
              onClick={() => {
                setCurrentInputType('level');
                setIsSelectingLanguage(false);
              }}
            >
              {' '}
              {chatContext.level}{' '}
              {<PencilIcon className="w-4 h-4" onClick={''} />}
            </span>
          </span>
        ) : null}
        {chatContext.subject.trim() !== '' &&
        (currentInputType === 'level' ||
          currentInputType === 'topic' ||
          currentInputType === 'language') ? (
          <span className="text-xs absolute top-[-48%] left-[4%] flex ">
            Subject -
            <span
              className="ml-1 inline-flex text-[#207DF7] gap-1 items-center cursor-pointer"
              onClick={() => {
                setCurrentInputType('subject');
                setIsSelectingLanguage(false);
              }}
            >
              {' '}
              {chatContext.subject}{' '}
              {<PencilIcon className="w-4 h-4" onClick={''} />}
            </span>
          </span>
        ) : null}
        {chatContext.subject.trim() !== '' &&
          chatContext.level.trim() !== '' &&
          currentInputType === 'language' && (
            <span className="text-xs  absolute top-[-10%] left-[4%] flex ">
              Topic -
              <span
                className="ml-1 inline-flex text-[#207DF7] gap-1 items-center cursor-pointer"
                onClick={() => {
                  setCurrentInputType('level');
                  setIsSelectingLanguage(false);
                }}
              >
                {' '}
                {chatContext.topic}{' '}
                {<PencilIcon className="w-4 h-4" onClick={''} />}
              </span>
            </span>
          )}

        <>
          <input
            value={(() => {
              if (currentInputType === 'subject') {
                return chatContext.subject;
              } else if (currentInputType === 'level') {
                return chatContext.level;
              } else if (currentInputType === 'language') {
                return chatContext.language;
              } else {
                return chatContext.topic;
              }
            })()}
            onChange={(e) => {
              if (currentInputType === 'subject') {
                handleSubjectChange(e.target.value);
                setFilterKeyword((p) => ({ ...p, keyword: e.target.value }));
              } else if (currentInputType === 'level') {
                handleLevelChange(e.target.value);
                setFilterKeyword((p) => ({ ...p, keyword: e.target.value }));
              } else if (currentInputType === 'language') {
                handleLanguageChange(e.target.value);
                setFilterKeyword((p) => ({ ...p, keyword: e.target.value }));
              } else {
                handleTopicChange(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            className="input flex-1 border-none bg-transparent outline-none active:outline-none active:ring-0 border-transparent focus:border-transparent focus:ring-0 placeholder:text-[#CDD1D5] placeholder:text-sm placeholder:font-normal text-[#6E7682] font-normal text-sm min-w-0"
            placeholder={
              currentInputType === 'subject'
                ? 'What subject would you like to start with?'
                : currentInputType === 'level'
                ? 'Level'
                : currentInputType === 'topic'
                ? 'What topic would you like to learn about?'
                : 'Select Language'
            }
          />
          <Button
            disabled={
              currentInputType === 'subject' &&
              chatContext.subject.trim() === ''
            }
            onClick={handleButtonClick}
            title={
              currentInputType === 'subject'
                ? 'Select Level'
                : currentInputType === 'level'
                ? 'Enter Topic'
                : currentInputType === 'topic'
                ? 'Select Language'
                : 'Submit'
            }
          />
          <AutocompleteWindow
            currentInputType={currentInputType}
            active={filterKeyword.keyword.trim() !== '' || filterKeyword.active}
            filterKeyword={filterKeyword}
            onClick={(value) => {
              if (currentInputType === 'subject') handleSubjectChange(value);
              else if (currentInputType === 'level') handleLevelChange(value);
              else if (currentInputType === 'topic') handleTopicChange(value);
              else if (currentInputType === 'language')
                handleLanguageChange(value);
            }}
            courseList={courseList}
            levels={levels}
            languages={languages}
          />
        </>

        {/* <div className="flex-1 mt-20">
            
            <button
              className={`bg-[#207DF7] text-white rounded-md w-full p-2  ${
                currentInputType === 'subject' &&
                chatContext.subject.trim() === ''
                  ? 'cursor-not-allowed grayscale'
                  : 'cursor-pointer'
              }`}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div> */}
      </div>

      <div
        className={`flex gap-1 md:gap-4 mt-4 flex-wrap ${
          currentInputType !== 'subject'
            ? ' transition-opacity opacity-0 pointer-events-none'
            : ''
        }`}
      >
        {['Math', 'Physics', 'Chemistry', 'Programming'].map((subject) => (
          <Chip
            key={subject}
            title={subject}
            onClick={() => {
              handleSubjectChange(subject);
              if (subject === 'Math') {
                setShowMathModeInfo(true);
                setNotifyMathMode();
              }
            }}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

const AutocompleteWindow = ({
  active,
  filterKeyword = {
    keyword: '',
    active: false
  },
  currentInputType,
  onClick,
  courseList,
  levels,
  languages
}: any) => {
  if (!active) return null;

  return (
    <div className="w-full p-2 absolute top-[90%] bg-white rounded-lg rounded-t-none shadow-md z-10 max-h-[20rem] overflow-y-scroll py-2 no-scrollbar">
      {currentInputType === 'subject'
        ? courseList
            ?.filter((item) =>
              item.label
                .toLowerCase()
                .includes(filterKeyword.keyword.toLowerCase())
            )
            .map((item) => (
              <AutocompleteItem
                title={item.label}
                onClick={() => {
                  onClick(item.label);
                }}
              />
            ))
        : null}
      {currentInputType === 'level'
        ? levels
            ?.filter((item) =>
              item.label
                .toLowerCase()
                .includes(filterKeyword.keyword.toLowerCase())
            )
            .sort((a, b) => a.level - b.level) // Sort by item.level in ascending order
            .map((item) => (
              <AutocompleteItem
                title={item.label}
                onClick={() => {
                  onClick(item.label);
                }}
              />
            ))
        : null}
      {currentInputType === 'language' &&
        languages.map((item) => (
          <AutocompleteItem
            key={item}
            title={item}
            onClick={() => {
              onClick(item);
            }}
          />
        ))}
      {currentInputType === 'language'
        ? languages
            ?.filter((item) =>
              item.toLowerCase().includes(filterKeyword.keyword.toLowerCase())
            )
            .map((lang: Language) => (
              <AutocompleteItem
                key={lang}
                title={lang}
                onClick={() => {
                  onClick(lang);
                }}
              />
            ))
        : null}
    </div>
  );
};

const AutocompleteItem = ({
  title,
  onClick
}: {
  title: string;
  onClick: () => void;
}) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="p-2 hover:bg-[#F9F9FB] border-l-4 border-transparent hover:border-l-4 hover:border-l-[#207DF7] cursor-pointer"
    >
      <p className="text-[#6E7682] text-sm font-medium">{title}</p>
    </div>
  );
};
export default Input;
