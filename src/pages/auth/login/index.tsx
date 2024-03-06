import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { defaultShadow } from '../../../enums/css-attribute';
import InputBox from '../../../common/non-form-element/InputBox';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import CustomButton from '../../../common/non-form-element/custom-button';
import LoginCarousel from './components/login-carousel';
import LoginDecor from './components/login-decor';
import CenterBox from '../../../common/miscellaneous/center-box';
import { z } from 'zod';
import ky from 'ky';
import APIResponse from '../../../services/schema/api-response';
import { useNavigate } from 'react-router';

// dotenv.config();
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [loginError, setLoginError] = useState<string>('');

  const loginPackage = z.object({
    email: z.string().email().min(1).max(100),
    passwd: z.string().min(1).max(100),
  });

  const loginFunction = async () => {
    const zodValidate = loginPackage.safeParse({ email, passwd });
    console.log(zodValidate);

    if (!zodValidate.success) {
      setLoginError('Vui lòng không bỏ trống và điền đúng định dạng');
      return;
    }
    console.log();

    ky.post(`${import.meta.env.VITE_BACKEND_URL}auth/login`, {
      json: { email, passwd, mode: 1 },
    })
      .json()
      .then((value) => {
        const data = value as APIResponse<{ access_token: string }> | undefined;
        if (!data || data.code !== 200) {
          throw new Error();
        }
        if (!data.data) {
          setLoginError('Email hoặc mật khẩu không đúng!');
          return;
        }
      })
      .catch(() => {
        setLoginError('Có lỗi xảy ra vui lòng thử lại!');
      });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        paddingY: '4rem',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
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
          boxShadow: defaultShadow,
          borderRadius: '1rem',
          zIndex: '3',
        }}
      >
        <Box
          sx={{
            width: '500px',
            bgcolor: '#262421',
            height: 'calc(100% - 3rem)',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
            boxSizing: 'border-box',
            padding: '40px',
          }}
        >
          <Box
            sx={{
              width: '420px',
              height: '280px',
              border: '1px solid #9e9d9c',
              boxSizing: 'border-box',
              overflow: 'hidden',
              borderRadius: '.750rem',
            }}
          >
            <LoginCarousel />
          </Box>
          <LoginDecor />

          <InputBox
            value={email}
            setValue={setEmail}
            placeholder="Email"
            startAdornment={<PersonIcon />}
          />
          <InputBox
            value={passwd}
            setValue={setPasswd}
            sx={{ mb: '0rem' }}
            type="password"
            placeholder="Password"
            startAdornment={<LockIcon />}
          />

          <Box sx={{ display: 'flex', marginY: '.5rem' }}>
            <FormControl sx={{ width: '200px' }}>
              <FormControlLabel
                sx={{ span: { color: '#9e9d9c' } }}
                control={
                  <Checkbox defaultChecked sx={{ svg: { color: '#9e9d9c' } }} />
                }
                label="Ghi nhớ mật khẩu"
              />
            </FormControl>
            <CenterBox sx={{ width: '220px', justifyContent: 'right' }}>
              <Typography
                sx={{
                  color: '#9e9d9c',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Quên mật khẩu
              </Typography>
            </CenterBox>
          </Box>
          <CenterBox sx={{ height: '3rem', color: 'red', alignItems: 'top' }}>
            {loginError}
          </CenterBox>
          <CustomButton bgcolor="#81b64c" onClick={loginFunction}>
            Đăng nhập
          </CustomButton>
          <CustomButton
            sx={{ mt: 'calc(.5rem + 5px)' }}
            bgcolor="#81b64c"
            onClick={() => {
              navigate('/auth/signup');
            }}
          >
            Đăng ký
          </CustomButton>
        </Box>
        <CenterBox
          sx={{
            width: '100%',
            height: '3rem',
            bgcolor: '#211f1c',
            borderBottomLeftRadius: '1rem',
            borderBottomRightRadius: '1rem',
            color: '#9e9d9c',
            textAlign: 'center',
          }}
        >
          <Typography>Powered by Vite</Typography>
        </CenterBox>
      </Box>
    </Box>
  );
};

export default LoginPage;
