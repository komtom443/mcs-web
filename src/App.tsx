import { ReactNode, Suspense, useMemo } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { minimatch } from 'minimatch';

import routes from '~react-pages';
import NewsLayout from './layouts/news-layout';
import DashboardLayout from './layouts/dashboard-layout';
import { Box } from '@mui/material';

const LayoutWrapper = ({
  layout,
  children,
}: {
  layout: 0 | 1 | 2;
  children: ReactNode;
}) => {
  switch (layout) {
    case 1:
      return <NewsLayout>{children}</NewsLayout>;
    case 2:
      return <DashboardLayout>{children}</DashboardLayout>;
    default:
      return children;
  }
};
function App() {
  const location = useLocation();
  const { pathname } = location;
  const layOutTrigger = useMemo(() => {
    console.log(pathname);
    if (minimatch(pathname, '/auth/**')) {
      return 0;
    }
    if (minimatch(pathname, '/news/**')) {
      return 1;
    }
    return 2;
  }, [pathname]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LayoutWrapper layout={layOutTrigger}>{useRoutes(routes)}</LayoutWrapper>
    </Suspense>
  );
}

export default App;
