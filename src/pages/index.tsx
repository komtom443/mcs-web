import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('auth/login');
  }, [navigate]);
  return <div>Dashboard</div>;
};
export default Dashboard;
