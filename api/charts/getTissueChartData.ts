import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import queryString from 'query-string';
import { axiosErrorHandler } from '../../utils';
import { TissueChartsData, TimeScale } from '../../types';
import { serverUrl } from '../../constants';

type GetTissueChartData = (
  scale: TimeScale,
  time?: string,
) => Promise<TissueChartsData>;

const getTissueChartData: GetTissueChartData = async (scale, time) => {
  try {
    const qs = queryString.stringify({
      time_scale: scale,
      selected_day: time,
    }, {
      skipNull: true, 
    });
    const reqPath = `${serverUrl}/charts/tissue?${qs}`;
    const getTissueChartDataRes: AxiosResponse<TissueChartsData> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getTissueChartDataRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getTissueChartDataRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getTissueChartData;