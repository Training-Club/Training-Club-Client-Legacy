import axios, {AxiosError} from 'axios';
import {API_URL} from '../Constants';

import {
  GetBothConnectionCountsResponse,
  GetConnectionCountResponse,
} from './responses/Follow';

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
          `${API_URL}/connections/follower-count/${accountId}`,
          {headers: {Authorization: `Bearer ${token}`}},
        );

        const followingCount = await axios.get<GetConnectionCountResponse>(
          `${API_URL}/connections/following-count/${accountId}`,
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
