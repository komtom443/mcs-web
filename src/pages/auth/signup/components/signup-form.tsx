import { Box, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import InputBox from '../../../../common/non-form-element/InputBox';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { z } from 'zod';
import StringDivider from '../../../../common/miscellaneous/string-divider';
import ky from 'ky';
import APIResponse from '../../../../services/schema/api-response';
import ConditionalCheck, {
  ConditionStepProgress,
} from '../../../../common/miscellaneous/conditional-check';
import CenterBox from '../../../../common/miscellaneous/center-box';
import CustomButton from '../../../../common/non-form-element/custom-button';
import { useNavigate } from 'react-router';
import { SignUpFormSchema } from './schema/signup-form-schema';

interface Props {
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  setFormValue: React.Dispatch<React.SetStateAction<SignUpFormSchema>>;
}
const SignUpForm = ({ setCurrentTab, setFormValue }: Props) => {
  const [formEmail, setFormEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [passwdConfirm, setPasswdConfirm] = useState<string>('');
  const [failEmail, setFailEmail] = useState<string>('');
  const navigate = useNavigate();
  const passwdCondition = useMemo<ConditionStepProgress[]>(
    () => [
      {
        title: 'Chứa ít nhất chữ cái',
        satisfy: /^(?=.*[a-zA-Z])[\S]+$/.test(passwd),
      },
      {
        title: 'Dài trong khoảng 8 đến 20 ký tự',
        satisfy: passwd.length >= 8 && passwd.length <= 20,
      },
      {
        title: 'Chứa ít nhất một chữ cái viết hoa',
        satisfy: /.*[0-9].*/.test(passwd),
      },
      {
        title: 'Chứa ít nhất một chữ số viết hoa',
        satisfy: /(?=.*[A-Z]).*/.test(passwd),
      },
      {
        title: 'Mật khẩu xác nhận trùng khớp',
        satisfy: Boolean(passwd === passwdConfirm && passwd),
      },
    ],
    [passwd, passwdConfirm]
  );

  const emailValidate = async () => {
    if (failEmail === formEmail) {
      return false;
    }
    if (formEmail.length === 0) {
      setFailEmail(formEmail);
      setEmailError('Email không được để trống!');
      return false;
    }
    const { success } = z.string().email().min(1).safeParse(formEmail);
    if (!success) {
      setFailEmail(formEmail);
      setEmailError('Email không đúng định dạng!');
      return false;
    }
    const test = await ky
      .post(`${import.meta.env.VITE_BACKEND_URL}auth/email`, {
        json: { email: formEmail, mode: 2 },
      })
      .json();
    if (!(test as APIResponse<boolean>).data) {
      setFailEmail(formEmail);
      setEmailError('Email đã bị trùng, vui lòng sử dụng email khác!');
      return false;
    }

    setEmailError('');
    return true;
  };

  const onSubmit = async () => {
    const passwdValidate = passwdCondition.every((item) => item.satisfy);

    if ((await emailValidate()) && passwdValidate) {
      setFormValue({
        email: formEmail,
        passwd,
      });
      setCurrentTab(1);
    }
  };
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        padding: '2rem',
        position: 'relative',
        '> *': {
          color: '#9e9d9c',
          fontWeight: 'bold',
        },
      }}
    >
      <Typography
        sx={{
          color: '#9e9d9c',
          textAlign: 'center',
          paddingBottom: '1rem',
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }}
      >
        ĐĂNG KÝ TÀI KHOẢN
      </Typography>
      <StringDivider inputString={'Đăng ký email'} height="3rem" mode="left" />
      <InputBox
        value={formEmail}
        setValue={setFormEmail}
        startAdornment={<EmailIcon />}
        placeholder="Email"
        onBlur={emailValidate}
      />
      <Typography sx={{ height: '1.5rem', paddingLeft: '1rem', color: 'red' }}>
        {emailError}
      </Typography>
      <StringDivider
        inputString={'Đăng ký mật khẩu'}
        height="3rem"
        mode="left"
      />
      <InputBox
        value={passwd}
        setValue={setPasswd}
        type="password"
        startAdornment={<LockIcon />}
        placeholder="Mật khẩu"
      />
      <InputBox
        value={passwdConfirm}
        setValue={setPasswdConfirm}
        type="password"
        startAdornment={<LockIcon />}
        placeholder="Xác nhận mật khẩu"
      />
      <ConditionalCheck conditions={passwdCondition} />
      <CenterBox
        sx={{
          width: '100%',
          position: 'absolute',
          left: 0,
          bottom: '2rem',
          paddingX: '4rem',
          boxSizing: 'border-box',
        }}
      >
        <CustomButton
          wrapperSx={{ paddingRight: '1rem' }}
          onClick={() => {
            navigate('/auth/login');
          }}
        >
          Quay lại
        </CustomButton>
        <CustomButton
          bgcolor="#81b64c"
          wrapperSx={{ flexGrow: 1 }}
          onClick={() => {
            onSubmit();
          }}
        >
          Tạo tài khoản
        </CustomButton>
      </CenterBox>
    </Box>
  );
};
export default SignUpForm;
