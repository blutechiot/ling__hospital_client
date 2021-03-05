import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import { axiosErrorHandler } from '../../utils';
import { PeopleCountSummary } from '../../types';
import { serverUrl } from '../../constants';

type GetPeopleCountSummary = () => Promise<PeopleCountSummary>;

const getPeopleCountSummary: GetPeopleCountSummary = async () => {
  try {
    const reqPath = `${serverUrl}/overview/people_count_summary`;
    const getPeopleCountSummaryRes: AxiosResponse<PeopleCountSummary> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getPeopleCountSummaryRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getPeopleCountSummaryRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getPeopleCountSummary;