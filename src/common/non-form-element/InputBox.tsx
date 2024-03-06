import { Box, SxProps, TextField, Theme } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface Prop<T extends string | number> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  sx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  color?: string;
  width?: number | string;
  placeholder?: string;
  startAdornment?: string | ReactNode;
  endAdornment?: string | ReactNode;
  onBlur?: () => void;
}

const inputBoxStype = {
  paddingY: '.75rem',
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
};

const getOutline = (color: string) => ({
  '& label': {
    color,
  },
  '& label.Mui-focused': {
    color,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: color,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: color,
    },
    '&:hover fieldset': {
      borderColor: color,
    },
    '&.Mui-focused fieldset': {
      borderColor: color,
    },
  },
  svg: {
    color,
    mr: '.5rem',
  },
});
const InputBox: <T extends string | number>(args: Prop<T>) => ReactNode = ({
  value,
  type,
  setValue,
  onBlur,
  sx,
  color,
  inputSx,
  label,
  width,
  placeholder,
  startAdornment,
  endAdornment,
}) => {
  const [currentType, setCurrentType] = useState(
    type ? type : typeof value === 'number' ? 'number' : 'text'
  );
  color = color ?? '#9e9d9c';
  return (
    <Box sx={{ width: width ?? '100%', mb: '1rem', ...sx }}>
      {label && (
        <Box sx={{ width: '100%', padding: '.5rem', fontSize: '1.2rem' }}>
          {label}
        </Box>
      )}
      <Box>
        <TextField
          autoComplete="off"
          placeholder={placeholder}
          type={currentType}
          fullWidth={true}
          value={value}
          onBlur={onBlur ?? (() => {})}
          onChange={(e) => setValue(e.target.value)}
          sx={{
            padding: 0,
            input: { ...inputBoxStype, color },
            ...getOutline(color),
            ...inputSx,
          }}
          InputProps={{
            startAdornment,
            endAdornment:
              type === 'password' ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    setCurrentType(currentType === 'text' ? 'password' : 'text')
                  }
                >
                  {currentType === 'text' ? <VisibilityOff /> : <Visibility />}
                </Box>
              ) : (
                endAdornment
              ),
          }}
        />
      </Box>
    </Box>
  );
};

export default InputBox;
