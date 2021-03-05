import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import queryString from 'query-string';
import { axiosErrorHandler } from '../../utils';
import { SanitizerChartsData, TimeScale } from '../../types';
import { serverUrl } from '../../constants';

type GetSanitizerChartData = (
  scale: TimeScale,
  time?: string,
) => Promise<SanitizerChartsData>;

const getSanitizerChartData: GetSanitizerChartData = async (scale, time) => {
  try {
    const qs = queryString.stringify({
      time_scale: scale,
      selected_day: time,
    }, {
      skipNull: true, 
    });
    const reqPath = `${serverUrl}/charts/sanitizer?${qs}`;
    const getSanitizerChartDataRes: AxiosResponse<SanitizerChartsData> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getSanitizerChartDataRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getSanitizerChartDataRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getSanitizerChartData;