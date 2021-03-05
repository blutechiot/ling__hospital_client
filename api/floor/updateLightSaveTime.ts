import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import { axiosErrorHandler } from '../../utils';
import { serverUrl } from '../../constants';

type UpdateLightSaveTime = (
  turn_on: string,
  turn_off: string,
) => Promise<null>;

const updateLightSaveTime: UpdateLightSaveTime = async (turn_on, turn_off) => {
  try {
    const reqPath = `${serverUrl}/light_duration`;
    const updateLightSaveTimeRes: AxiosResponse<null> = await axios.request(
      {
        method: 'post',
        url: reqPath,
        data: {
          turn_on,
          turn_off,
        }
      },
    );
    const status = updateLightSaveTimeRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return updateLightSaveTimeRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default updateLightSaveTime;