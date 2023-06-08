import axios from 'axios';
import { PersonResponse } from './response';
import { Person } from '../interfaces/person';

const axiosInstance = axios.create({
  baseURL: 'https://randomuser.me/api',
  responseType: 'json',
  params: {
    results: 3,
    nat: 'us,dk,fr,gb'
  },
  transformResponse: [
    (data: string): Person[] => {
      const { results } = JSON.parse(data) as PersonResponse;
      return results.map((result) => ({
        firstName: result.name.first,
        lastName: result.name.last,
        gender: result.gender,
        age: result.dob.age,
        avatar: result.picture.large,
        phone: result.phone
      }));
    }
  ]
});

export default axiosInstance;
