import { Box } from '@mui/material';
import { ReactNode } from 'react';
import NewsNavbar from './components/navbar';

interface Props {
  children: ReactNode;
}
const NewsLayout = ({ children }: Props) => {
  return (
    <Box>
      <NewsNavbar />
      {children}
    </Box>
  );
};
export default NewsLayout;
