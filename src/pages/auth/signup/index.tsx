import { Box } from '@mui/material';
import { defaultShadow } from '../../../enums/css-attribute';
import { useState } from 'react';
import ProgressBar from './components/progress-bar';
import SignUpBasicForm from './components/basic-form';
import SignUpForm from './components/signup-form';
import { SignUpFormSchema } from './components/schema/signup-form-schema';

const SignupPage = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [formValue, setFormValue] = useState<SignUpFormSchema>({
    email: '',
    passwd: '',
  });
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
        paddingBottom: '4rem',
      }}
    >
      <Box
        sx={{
          background: `url('https://www.chess.com/bundles/web/images/web/chessboard-background.346891ba.png')`,
          backgroundSize: 'cover',
          position: 'absolute',
          width: '100%',
          height: '75%',
          bottom: 0,
          zIndex: '2',
        }}
      />
      <Box
        sx={{
          height: '100%',
          width: '500px',
          zIndex: '3',
        }}
      >
        <ProgressBar
          totalTab={3}
          currentTab={currentTab}
          setTab={setCurrentTab}
          enableNextStep
        />
        <Box
          sx={{
            boxShadow: defaultShadow,
            borderRadius: '1rem',
            height: 'calc(100% - 4rem)',
            bgcolor: '#262421',
            width: '500px',
            overflowX: 'hidden',
          }}
        >
          <Box
            sx={{
              transition: '.5s',
              transform: `translateX(${-500 * currentTab}px)`,
              height: '100%',
              width: '1500px',
              display: 'flex',
              '> *': {
                width: '500px',
                height: '100%',
              },
            }}
          >
            <SignUpForm
              setFormValue={setFormValue}
              setCurrentTab={setCurrentTab}
            />
            <SignUpBasicForm />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SignupPage;
