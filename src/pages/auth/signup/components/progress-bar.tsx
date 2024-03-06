import { Box } from '@mui/material';
import { useMemo } from 'react';

interface Props {
  currentTab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
  totalTab: number;
  enableNextStep?: boolean;
}
const CustomLine = () => (
  <Box sx={{ border: '1px solid #9e9d9c', width: 'calc(40% - 5rem)' }}></Box>
);
const ProgressBar = ({
  currentTab,
  totalTab,
  setTab,
  enableNextStep,
}: Props) => {
  if (currentTab >= totalTab) {
    setTab(totalTab - 1);
  } else {
    if (currentTab < 0) {
      setTab(0);
    }
  }
  const tabList = useMemo(() => {
    const res = [];
    for (let i = 0; i < (totalTab ?? 0); i++) {
      res.push(i);
    }
    return res;
  }, [totalTab]);
  return (
    <Box
      sx={{
        height: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CustomLine />
      <Box
        sx={{
          marginX: '.5rem',
          width: '10rem',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {tabList.map((tab) => (
            <Box
              key={`progress-bar-${tab}`}
              sx={{
                marginX: '.75rem',
                borderRadius: '50%',
                boxSizing: 'border-box',
                ...(tab === currentTab
                  ? {
                      bgcolor: '#9e9d9c',
                      width: '3rem',
                      color: 'black',
                      fontSize: '1.75rem',
                      fontWeight: 'bold',
                      height: '3rem',
                    }
                  : {
                      border: '2px solid #9e9d9c',
                      color: '#9e9d9c',
                      width: '2rem',
                      height: '2rem',
                    }),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: '.5s',
                transform: `translateX(${2.75 - 3.5 * (currentTab ?? 0)}rem)`,
                cursor:
                  currentTab > tab || enableNextStep
                    ? 'pointer'
                    : 'context-menu',
              }}
              onClick={() => {
                if (currentTab > tab || enableNextStep) {
                  setTab(tab);
                }
              }}
            >
              {tab + 1}
            </Box>
          ))}
        </Box>
      </Box>
      <CustomLine />
    </Box>
  );
};
export default ProgressBar;
