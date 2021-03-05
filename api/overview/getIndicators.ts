import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import { axiosErrorHandler } from '../../utils';
import { IndicatorsData } from '../../types';
import { serverUrl } from '../../constants';

type GetIndicators = () => Promise<IndicatorsData>;

const getIndicators: GetIndicators = async () => {
  try {
    const reqPath = `${serverUrl}/overview/indicators`;
    const getIndicatorsRes: AxiosResponse<IndicatorsData> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getIndicatorsRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getIndicatorsRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getIndicators;