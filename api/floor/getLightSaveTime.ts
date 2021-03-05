import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import { axiosErrorHandler } from '../../utils';
import { LightSaveTime } from '../../types';
import { serverUrl } from '../../constants';

type GetLightSaveTime = () => Promise<LightSaveTime>;

const getLightSaveTime: GetLightSaveTime = async () => {
  try {
    const reqPath = `${serverUrl}/light_duration`;
    const getLightSaveTimeRes: AxiosResponse<LightSaveTime> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getLightSaveTimeRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getLightSaveTimeRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getLightSaveTime;