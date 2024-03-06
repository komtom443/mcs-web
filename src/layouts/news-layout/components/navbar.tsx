import { Box } from '@mui/material';
import { useMemo } from 'react';
import CustomButton from '../../../common/non-form-element/custom-button';
import { useNavigate } from 'react-router';

interface ToolbarButton {
  title: string;
  url: string;
}
const NewsNavbar = () => {
  const navigate = useNavigate();
  const buttonLists = useMemo<ToolbarButton[]>(
    () => [
      {
        title: 'Home',
        url: '',
      },
      {
        title: 'Update',
        url: '',
      },
    ],
    []
  );
  return (
    <Box
      sx={{
        flexGrow: 1,
        // boxShadow: '0px 10px 5px inset #888, 0px -10px 5px inset #888',
        display: 'flex',
      }}
    >
      {buttonLists.map((button) => (
        <CustomButton
          enableBg={true}
          bgcolor="#81b64c"
          sx={{ borderRadius: 0 }}
          onClick={() => {
            navigate(`/news/${button.url}`);
          }}
        >
          {button.title}
        </CustomButton>
      ))}
    </Box>
  );
};
export default NewsNavbar;
