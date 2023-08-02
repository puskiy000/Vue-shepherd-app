import GoogleIcon from '../assets/google.svg';
import { Box, Button } from '@chakra-ui/react';
import * as React from 'react';
import { StepWizardChildProps } from 'react-step-wizard';

type Props = {
  canGoNext: boolean;
  showOAuthButton?: boolean;
  handleAuth?: () => void;
} & Partial<StepWizardChildProps>;

const OnboardNav: React.FC<Props> = ({
  previousStep,
  showOAuthButton = false,
  nextStep,
  currentStep,
  canGoNext,
  handleAuth
}) => {
  return (
    <Box
      display={'flex'}
      flexDirection="column"
      gap={4}
      marginTop={45}
      justifyContent="flex-end"
    >
      <Button
        variant="solid"
        colorScheme={'primary'}
        type="submit"
        isDisabled={!canGoNext}
        size={'lg'}
      >
        Next
      </Button>

      {showOAuthButton && (
        <Button
          variant="solid"
          bg="#F2F2F3"
          onClick={() => handleAuth && handleAuth()}
          colorScheme={'primary'}
          type="submit"
          size={'lg'}
          color="#000"
          leftIcon={<img src={GoogleIcon} alt="" />}
        >
          Continue With Google
        </Button>
      )}
      {currentStep !== undefined && currentStep > 1 && (
        <Button onClick={previousStep} variant="link">
          Previous
        </Button>
      )}
    </Box>
  );
};

export default OnboardNav;
