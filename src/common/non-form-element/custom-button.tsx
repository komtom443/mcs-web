import { Box, Button, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';
import Color from 'colorjs.io';

interface Prop {
  mb?: string;
  mt?: string;
  ml?: string;
  mr?: string;
  children: string | ReactNode;
  onClick: () => void;
  bgcolor?: string;
  textColor?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  wrapperSx?: SxProps<Theme>;
  enableBg?: boolean;
}
const CustomButton = ({
  mb,
  mt,
  ml,
  mr,
  sx,
  children,
  bgcolor,
  textColor,
  disabled,
  wrapperSx,
  onClick,
  enableBg,
}: Prop) => {
  bgcolor = bgcolor ?? 'gray';
  textColor = textColor ?? 'white';
  const bgcolorObj = new Color(bgcolor ?? 'gray');
  bgcolorObj.lch.l -= 20;

  return (
    <Box
      sx={{
        ...(mt ? { mt } : {}),
        ...(mb ? { mb } : {}),
        ...(ml ? { ml } : {}),
        ...(mr ? { mr } : {}),
        ...(enableBg && { bgcolor: '#262421' }),
        ...wrapperSx,
      }}
    >
      <Button
        disabled={disabled}
        fullWidth={true}
        sx={{
          minHeight: '2.5rem',
          bgcolor,
          color: textColor,
          transition: '.5s',
          '&:hover': {
            bgcolor,
            color: textColor,
            boxShadow: 'none',
            transform: 'translateY(5px)',
          },
          ...(disabled
            ? { transform: 'translateY(5px)', boxShadow: 'none' }
            : { boxShadow: `0px 5px 0px ${bgcolorObj.toString()}` }),
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          ...sx,
        }}
        onClick={onClick}
      >
        {children}
      </Button>
    </Box>
  );
};

export default CustomButton;
