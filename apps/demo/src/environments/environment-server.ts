import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  server: true,
  type: 'development',
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
