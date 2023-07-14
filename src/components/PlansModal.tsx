import userStore from '../state/userStore';
import { CustomButton } from '../views/Dashboard/layout';
import { StarIcon } from './icons';
import { SelectedNoteModal } from './index';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { getAuth } from 'firebase/auth';
import { Fragment, useState, useEffect } from 'react';
import { PiCheckCircleFill } from 'react-icons/pi';
import Typewriter from 'typewriter-effect';

interface ToggleProps {
  setTogglePlansModal: (state: boolean) => void;
  togglePlansModal: boolean;
}

const PlansModal = ({ setTogglePlansModal, togglePlansModal }: ToggleProps) => {
  const [showSelected, setShowSelected] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('Basic');
  const { user }: any = userStore();

  const actions1 = [
    {
      id: 0,
      title: 'Basic',
      price: 0,
      features: [
        { id: 1, text: 'Up to 10 flashcard decks' },
        { id: 2, text: 'Up to 10 flashcard decks' },
        { id: 3, text: 'Up to 10 flashcard decks' },
        { id: 4, text: 'Up to 10 flashcard decks' }
      ]
    },
    {
      id: 1,
      title: 'Intermediate',
      price: 10,
      features: [
        { id: 1, text: 'Up to 10 flashcard decks' },
        { id: 2, text: 'Up to 10 flashcard decks' },
        { id: 3, text: 'Up to 10 flashcard decks' },
        { id: 4, text: 'Up to 10 flashcard decks' }
      ]
    },
    {
      id: 2,
      title: 'Premium',
      price: 100,
      showModal: true,
      features: [
        { id: 1, text: 'Up to 10 flashcard decks' },
        { id: 2, text: 'Up to 10 flashcard decks' },
        { id: 3, text: 'Up to 10 flashcard decks' },
        { id: 4, text: 'Up to 10 flashcard decks' }
      ]
    }
  ];

  //   useEffect(() => {
  //     const { currentUser } = getAuth();
  //     currentUser?.displayName &&
  //       setUser({ displayName: currentUser?.displayName });
  //   }, []);
  const handleClose = () => {
    setTogglePlansModal(false);
  };

  const handleShowSelected = () => {
    setShowSelected(true);
  };

  return (
    <>
      {togglePlansModal && (
        <Transition.Root show={togglePlansModal} as={Fragment}>
          <Dialog as="div" className="relative z-[800]" onClose={() => null}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white mt-10 text-left shadow-xl transition-all sm:w-full sm:max-w-5xl">
                    <div>
                      <div className="flex justify-between align-middle border-b pb-2 px-2">
                        <div className="flex items-center space-x-2 p-3 pb-2">
                          Plans
                        </div>
                        <button
                          onClick={handleClose}
                          className="inline-flex h-6 space-x-1 items-center rounded-full bg-gray-100 px-2 py-1 mt-4 mb-2 mr-4 text-xs font-medium text-secondaryGray hover:bg-orange-200 hover:text-orange-600"
                        >
                          <span>Close</span>
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <Box p={10}>
                        <Box>
                          <Text fontSize={24} fontWeight={600} color="text.200">
                            Select your Plan
                          </Text>
                          <Text fontSize={14} fontWeight={500} color="text.400">
                            Upgrade your plan to unlock the full power of your
                            AI study tools
                          </Text>
                        </Box>

                        <div className="overflow-hidden py-6  bg-white sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 space-y-2">
                          {actions1.map((action) => (
                            <div
                              key={action.title}
                              //   onClick={() => {
                              //     if (action.showModal) handleShowSelected();
                              //   }}
                              className="group cursor-pointer relative transform  bg-white border-1 rounded-lg  border-gray-300 p-4 hover:border-blue-500  focus:border-blue-500 hover:drop-shadow-lg "
                            >
                              <Flex gap={2} mb={4}>
                                <Text fontSize={14} fontWeight={500}>
                                  {action.title}
                                </Text>
                                {currentPlan === action.title && (
                                  <Text
                                    padding={'2px 8px'}
                                    bgColor="#F4F5F6"
                                    color="text.400"
                                    fontSize={12}
                                    fontWeight={500}
                                    borderRadius="4px"
                                  >
                                    Current Plan
                                  </Text>
                                )}
                              </Flex>
                              <Flex gap={1} alignItems="center" mb={4}>
                                <Text fontSize={24} fontWeight={600}>
                                  ${`${action.price}`}
                                </Text>

                                <Text fontSize={12} color="text.400">
                                  /Month
                                </Text>
                              </Flex>

                              <Stack spacing={3} mt={2} mb={4}>
                                {action.features?.map((ft) => (
                                  <Flex gap={2} alignItems="center" key={ft.id}>
                                    <PiCheckCircleFill
                                      color="#66BD6A"
                                      size="18px"
                                    />
                                    <Text fontSize={14} color="text.300">
                                      {ft.text}
                                    </Text>
                                  </Flex>
                                ))}
                              </Stack>
                              {action.price > 0 && (
                                <CustomButton
                                  width="full"
                                  padding="10px 60px"
                                  my={3}
                                  buttonText="Subscribe Now"
                                />
                              )}
                            </div>
                          ))}
                        </div>

                        <Text
                          textAlign="center"
                          my={2}
                          fontSize={14}
                          fontWeight={500}
                          color="text.300"
                        >
                          For more details & enquiries?{' '}
                          <span className="text-blue-600">Contact Support</span>
                        </Text>
                      </Box>

                      {/* <div className="overflow-hidden sm:w-[80%] w-full mx-auto p-6 pt-3  bg-white sm:grid sm:grid-cols-3 justify-items-center sm:gap-x-4 sm:space-y-0 space-y-2">
                        {actions2.map((action) => (
                          <div
                            onClick={() => {
                              if (action.showModal) handleShowSelected();
                            }}
                            key={action.title}
                            className="group cursor-pointer relative transform  bg-white border-1 rounded-lg  border-gray-300 p-4 focus-within:border-blue-500 hover:border-blue-500"
                          >
                            <div>
                              <img src={action.imageURL} alt={action.title} />
                            </div>
                            <div className="mt-4">
                              <button className="text-base font-semibold leading-6 text-orange-400">
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                {action.title}
                              </button>
                              <Text className="mt-2 text-sm text-secondaryGray">
                                {action.description}
                              </Text>
                            </div>
                          </div>
                        ))}
                      </div> */}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};

export default PlansModal;
