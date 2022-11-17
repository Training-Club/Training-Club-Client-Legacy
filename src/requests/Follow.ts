import axios, {AxiosError} from 'axios';

import {
  GetBothConnectionCountsResponse,
  GetConnectionCountResponse,
} from './responses/Follow';

// TODO: Replace with api.trainingclubapp.com
// const url: string = 'http://146.190.2.76:80/v1';
const url: string = 'http://localhost:8080/v1';

/**
 * Queries both connection accounts for the provided id
 *
 * @param accountId Account ID to query
 * @param token Access Token
 */
export async function getBothConnectionCounts(
  accountId: string,
  token?: string,
): Promise<GetBothConnectionCountsResponse> {
  return new Promise<GetBothConnectionCountsResponse>(
    async (resolve, reject) => {
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
