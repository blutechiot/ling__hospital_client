import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import { axiosErrorHandler } from '../../utils';
import { UsageOverview } from '../../types';
import { serverUrl } from '../../constants';

type GetUsage = () => Promise<UsageOverview>;

const getUsage: GetUsage = async () => {
  try {
    const reqPath = `${serverUrl}/overview/usage`;
    const getUsageRes: AxiosResponse<UsageOverview> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getUsageRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getUsageRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getUsage;