import { NextPage } from 'next';
import React from 'react';
import { pageAuth } from '../utils';
import { AccessLevel, Status } from '../types';
import { DashboardPanel } from '../panels/dashboard';

const Dashboard: NextPage = () => {
  const [authStatus, setAuthStatus] = React.useState<Status>(Status.blank);
  const [claims, setClaims] = React.useState<any>(undefined);

  React.useEffect(() => {
    // asynchronous check to validate token
    const fetchData = async () => {
      setAuthStatus(Status.inProgress);
      try {
        const allClaims = await pageAuth({
          accessLevel: AccessLevel.admin,
        });
        setClaims(allClaims.claims);
        setAuthStatus(Status.success);
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, []);
  
  return (
    <div id='dashboard'>
      {authStatus === Status.success && <DashboardPanel />}
    </div>
  );
};

export default Dashboard;