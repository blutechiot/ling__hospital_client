import { NextPage, NextPageContext } from 'next';
import React from 'react';
import { pageAuth } from '../utils';
import { AccessLevel, Status, CategoryOptionsValue } from '../types';
import { ChartPanel } from '../panels/chart';

interface ChartProps {
  category: CategoryOptionsValue | undefined;
}

const Chart: NextPage<ChartProps> = ({ category }: ChartProps) => {
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
    <div id='chart'>
      {authStatus === Status.success && <ChartPanel category={category} />}
    </div>
  );
};

Chart.getInitialProps = async (context: NextPageContext) => {
    const { category } = context.query;
    if (category && typeof category === 'string') {
      return { category: category as CategoryOptionsValue };
    }
  };

export default Chart;