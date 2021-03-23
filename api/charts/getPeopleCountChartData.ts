import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import queryString from 'query-string';
import { axiosErrorHandler } from '../../utils';
import { PeopleCountChartsData, TimeScale } from '../../types';
import { serverUrl } from '../../constants';

type GetPeopleCountChartData = (
  scale: TimeScale,
  time?: string,
) => Promise<PeopleCountChartsData>;

const getPeopleCountChartData: GetPeopleCountChartData = async (scale, time) => {
  try {
    const qs = queryString.stringify({
      time_scale: scale,
      selected_day: time,
    }, {
      skipNull: true, 
    });
    const reqPath = `${serverUrl}/charts/people_count?${qs}`;
    const getPeopleCountChartDataRes: AxiosResponse<PeopleCountChartsData> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getPeopleCountChartDataRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getPeopleCountChartDataRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getPeopleCountChartData;