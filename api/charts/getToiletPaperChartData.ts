import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import queryString from 'query-string';
import { axiosErrorHandler } from '../../utils';
import { ToiletPaperChartsData, TimeScale } from '../../types';
import { serverUrl } from '../../constants';

type GetToiletPaperChartData = (
  scale: TimeScale,
  time?: string,
) => Promise<ToiletPaperChartsData>;

const getToiletPaperChartData: GetToiletPaperChartData = async (scale, time) => {
  try {
    const qs = queryString.stringify({
      time_scale: scale,
      selected_day: time,
    }, {
      skipNull: true, 
    });
    const reqPath = `${serverUrl}/charts/toilet_papers?${qs}`;
    const getToiletPaperChartDataRes: AxiosResponse<ToiletPaperChartsData> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getToiletPaperChartDataRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getToiletPaperChartDataRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getToiletPaperChartData;