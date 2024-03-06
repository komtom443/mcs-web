import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode | ReactNode[];
  sx?: SxProps<Theme>;
}
const CenterBox = ({ children, sx }: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(sx ?? {}),
      }}
    >
      {children}
    </Box>
  );
};
export default CenterBox;
