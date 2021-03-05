import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import { axiosErrorHandler } from '../../utils';
import { ToiletsOverviewData } from '../../types';
import { serverUrl } from '../../constants';

type GetToiletsOverview = () => Promise<ToiletsOverviewData>;

const getToiletsOverview: GetToiletsOverview = async () => {
  try {
    const reqPath = `http://8.210.112.36:5002/toilets_overview`; // ${serverUrl}
    const getToiletsOverviewRes: AxiosResponse<ToiletsOverviewData> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getToiletsOverviewRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getToiletsOverviewRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getToiletsOverview;