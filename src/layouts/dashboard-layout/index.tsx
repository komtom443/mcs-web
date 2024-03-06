import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const DashboardLayout = ({ children }: Props) => {
  return <Box>Layout 2{children}</Box>;
};
export default DashboardLayout;
