import {
  GetBothConnectionCountsResponse,
  GetConnectionCountResponse,
} from './responses/Follow';
import {getToken} from '../data/Account';
import axios, {AxiosError} from 'axios';

// TODO: Replace with api.trainingclubapp.com
const url: string = 'http://146.190.2.76:80/v1';

export async function getBothConnectionCounts(
  accountId: string,
): Promise<GetBothConnectionCountsResponse> {
  return new Promise<GetBothConnectionCountsResponse>(
    async (resolve, reject) => {
      const token: string | null = await getToken();

      if (!token) {
        return reject('no token found on this device');
      }

      try {
        const followerCount = await axios.get<GetConnectionCountResponse>(
          `${url}/connections/follower-count/${accountId}`,
          {headers: {Authorization: `Bearer ${token}`}},
        );

        const followingCount = await axios.get<GetConnectionCountResponse>(
          `${url}/connections/following-count/${accountId}`,
          {headers: {Authorization: `Bearer ${token}`}},
        );

        const result: GetBothConnectionCountsResponse = {
          followers: followerCount.data.result,
          following: followingCount.data.result,
        };

        resolve(result);
      } catch (err) {
        return reject(err as AxiosError);
      }
    },
  );
}
