import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import { axiosErrorHandler } from '../../utils';
import { FloorData } from '../../types';
import { serverUrl } from '../../constants';

type getFloorDeviceDataConfig = {
  deviceId: string;
};

type GetFloorDeviceData = (
  config: getFloorDeviceDataConfig,
) => Promise<FloorData>;

const getFloorDeviceData: GetFloorDeviceData = async({
  deviceId,
}: getFloorDeviceDataConfig) => {
  try {
    const reqPath = `${serverUrl}/floor_plan`;
    const getFloorDeviceDataRes: AxiosResponse<FloorData> = await axios.request(
      {
        method: 'POST',
        url: reqPath,
        data: {
          deviceId,
        },
      },
    );
    const status = getFloorDeviceDataRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getFloorDeviceDataRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getFloorDeviceData;