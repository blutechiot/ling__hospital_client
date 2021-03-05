import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import queryString from 'query-string';
import { axiosErrorHandler } from '../../utils';
import { IAQChartsData, TimeScale, IAQType } from '../../types';
import { serverUrl } from '../../constants';

type GetIAQChartData = (
  type: IAQType,
  scale: TimeScale,
  time?: string,
) => Promise<IAQChartsData>;

const getIAQChartData: GetIAQChartData = async (type, scale, time) => {
  try {
    const qs = queryString.stringify({
      time_scale: scale,
      selected_day: time,
    }, {
      skipNull: true, 
    });
    const reqPath = `${serverUrl}/charts/iaq/${type}?${qs}`;
    const getIAQChartDataRes: AxiosResponse<IAQChartsData> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getIAQChartDataRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getIAQChartDataRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getIAQChartData;