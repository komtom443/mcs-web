import { Box } from '@mui/material';
import CenterBox from './center-box';
import { ReactNode, useMemo } from 'react';

interface Props {
  currentStep: number;
  totalStep: number;
  bgcolor?: string;
}
const StepProgress = ({ currentStep, totalStep, bgcolor }: Props) => {
  currentStep = currentStep > totalStep ? totalStep : currentStep;
  bgcolor = bgcolor ?? '#9e9d9c';
  const progress = useMemo<ReactNode[]>(() => {
    const response = [];
    for (let i = 1; i < totalStep; i++) {
      response.push(
        <Box
          key={`step_progress_${i}`}
          sx={{
            width: '3px',
            height: '1.5rem',
            bgcolor: '#9e9d9c',
            position: 'absolute',
            top: 0,
            left: `calc(100% / ${totalStep / i})`,
          }}
        />
      );
    }
    return response;
  }, [totalStep]);
  return (
    <CenterBox
      sx={{
        paddingX: '.5rem',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '1.5rem',
          borderRadius: '.75rem',
          boxSizing: 'border-box',
          border: '3px solid #9e9d9c',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '1.5rem',
            bgcolor,
            transition: '.5s',
            transform: `translateX(calc(-100% / ${
              totalStep / (totalStep - currentStep)
            }))`,
          }}
        />
        {progress}
      </Box>
    </CenterBox>
  );
};
export default StepProgress;
