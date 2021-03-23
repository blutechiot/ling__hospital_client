import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import queryString from 'query-string';
import { axiosErrorHandler } from '../../utils';
import { SoapChartsData, TimeScale } from '../../types';
import { serverUrl } from '../../constants';

type GetSoapChartData = (
  scale: TimeScale,
  time?: string,
) => Promise<SoapChartsData>;

const getSoapChartData: GetSoapChartData = async (scale, time) => {
  try {
    const qs = queryString.stringify({
      time_scale: scale,
      selected_day: time,
    }, {
      skipNull: true, 
    });
    const reqPath = `${serverUrl}/charts/sensor_soaps?${qs}`;
    const getSoapChartDataRes: AxiosResponse<SoapChartsData> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getSoapChartDataRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getSoapChartDataRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getSoapChartData;