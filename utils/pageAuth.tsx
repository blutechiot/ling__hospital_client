import { AccessLevel } from '../types';
import Router from 'next/router';

type PageAuthConfig = {
  accessLevel: AccessLevel;
};

type Claims = {
  [key: string]: any;
};

type PageAuthResult = {
  claims: Claims;
};

type PageAuth = (config: PageAuthConfig) => Promise<PageAuthResult>;

const pageAuth: PageAuth = async ({
  accessLevel,
}: PageAuthConfig) => {
  const storage = sessionStorage.getItem('access_token') ? sessionStorage : localStorage;
  const token = storage.getItem('access_token');
  const loginLocation = '/login';

  if (!token) {
    await Router.push(loginLocation);
    const claims: Claims = {};
    return { claims };
  } else {
    const claims: Claims = {};
    return { claims };
  }
};

export default pageAuth;
