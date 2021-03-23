import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import { axiosErrorHandler } from '../../utils';
import { Notifications } from '../../types';
import { serverUrl } from '../../constants';

type GetNotifications = () => Promise<Notifications>;

const getNotifications: GetNotifications = async () => {
  try {
    const reqPath = `${serverUrl}/overview/notification`;
    const getNotificationsRes: AxiosResponse<Notifications> = await axios.request(
      {
        method: 'GET',
        url: reqPath,
      },
    );
    const status = getNotificationsRes.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return getNotificationsRes.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default getNotifications;