import { Box, SxProps, Theme } from '@mui/material';
import CenterBox from './center-box';
import { ReactNode } from 'react';

interface Props {
  inputString: string | ReactNode;
  height?: string | number;
  lineSx?: SxProps<Theme>;
  wrapperSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
  mode?: 'left' | 'right' | 'center';
}
const StringDivider = ({
  mode,
  inputString,
  height,
  lineSx,
  wrapperSx,
  sx,
}: Props) => {
  height = height ?? '4rem';
  mode = mode || 'center';
  return (
    <CenterBox
      sx={{
        height,
        ...wrapperSx,
      }}
    >
      <Box
        sx={{
          border: '1px solid #9e9d9c',
          ...lineSx,
          ...(mode === 'left' ? { width: '1rem' } : { flexGrow: 1 }),
        }}
      />
      <Box sx={{ marginX: '.75rem', fontSize: '1.25rem', ...sx }}>
        {inputString}
      </Box>
      <Box
        sx={{
          border: '1px solid #9e9d9c',
          ...lineSx,
          ...(mode === 'right' ? { width: '1rem' } : { flexGrow: 1 }),
        }}
      />
    </CenterBox>
  );
};
export default StringDivider;
