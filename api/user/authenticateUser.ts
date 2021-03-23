import axios, { AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';
import { axiosErrorHandler } from '../../utils';
import { AuthResponse } from '../../types';

type AuthenticateUserConfig = {
  username: string;
  password: string;
};

type AuthenticateUser = (
  config: AuthenticateUserConfig,
) => Promise<AuthResponse>;

const serverUrl = 'http://8.210.112.36:5002';

const authenticateUser: AuthenticateUser = async({
  username,
  password,
}: AuthenticateUserConfig) => {
  try {
    const reqPath = `${serverUrl}/login`;
    const authenticateUserObject: AxiosResponse<AuthResponse> = await axios.request(
      {
        method: 'post',
        url: reqPath,
        data: {
          username,
          password,
        },
      },
    );
    const status = authenticateUserObject.status;
    if (status !== HttpStatus.OK) throw new Error('incorrect_status_code');
    return authenticateUserObject.data;
  } catch (err){
    const error = axiosErrorHandler(err);
    throw error;
  }
};

export default authenticateUser;