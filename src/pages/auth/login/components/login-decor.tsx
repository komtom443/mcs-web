import { Box } from '@mui/material';

const LoginDecor = () => {
  return (
    <Box
      sx={{
        height: '4rem',
        display: 'flex',
        // bgcolor: '#9e9d9c',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          height: '1px',
          bgcolor: '#9e9d9c',
          width: 'calc(50% - 75px)',
        }}
      />
      <Box
        sx={{
          width: '150px',
          color: '#9e9d9c',
          textWrap: 'nowrap',
          fontSize: '1.5rem',
          textAlign: 'center',
        }}
      >
        Đăng nhập
      </Box>
      <Box
        sx={{
          height: '1px',
          bgcolor: '#9e9d9c',
          width: 'calc(50% - 75px)',
        }}
      />
    </Box>
  );
};
export default LoginDecor;
