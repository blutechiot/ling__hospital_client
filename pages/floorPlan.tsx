import { NextPage, NextPageContext } from 'next';
import React from 'react';
import { pageAuth } from '../utils';
import { AccessLevel, Status } from '../types';
import { FloorPlanPanel } from '../panels/floorPlan';

interface FloorPlanProps {
  floor: string | undefined;
}

const FloorPlan: NextPage<FloorPlanProps> = ({ floor }: FloorPlanProps) => {
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
    <div id='floor_plan'>
      {authStatus === Status.success && <FloorPlanPanel floor={floor} />}
    </div>
  );
};

FloorPlan.getInitialProps = async (context: NextPageContext) => {
  const { floor } = context.query;
  if (floor && typeof floor === 'string') {
    return { floor };
  }
};

export default FloorPlan;