import axios from 'axios';
import {IContentItem, IPost} from '../models/Content';
import {CreatePostResponse, GetPostsByQueryResponse} from './responses/Content';
import {getToken} from '../data/Account';
import {PrivacyLevel} from '../models/Privacy';

// TODO: Replace with api.trainingclubapp.com
const url: string = 'http://146.190.2.76:80/v1';

type CreatePostParams = {
  location?: string;
  text?: string;
  content: IContentItem[];
  tags?: string[];
  privacy?: PrivacyLevel;
};

/**
 * Returns a promise of a Post model matching the provided document ID
 *
 * @param id Document ID
 */
export async function getPostByID(id: string): Promise<IPost> {
  return new Promise<IPost>(async (resolve, reject) => {
    try {
      const result = await axios.get<IPost>(`${url}/post/id/${id}`);
      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Returns a promise of Post array matching the provided query string
 *
 * Query string should be formatted using the StringUtil
 *
 * @param query Query string
 */
export async function getPostsByQuery(
  query: string,
): Promise<GetPostsByQueryResponse> {
  return new Promise<GetPostsByQueryResponse>(async (resolve, reject) => {
    const token: string | null = await getToken();

    if (!token) {
      return reject('no token found on this device');
    }

    try {
      const result = await axios.get<GetPostsByQueryResponse>(
        `${url}/post/search${query}`,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      return resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Sends the request to create a new post document in the database
 *
 * If successful a CreatePostResponse will be returned with the post ID in the object body
 *
 * @param params CreatePostParams
 */
export async function createPost(
  params: CreatePostParams,
): Promise<CreatePostResponse> {
  return new Promise<CreatePostResponse>(async (resolve, reject) => {
    const token: string | null = await getToken();

    if (!token) {
      return reject('no token found on this device');
    }

    try {
      const result = await axios.post<CreatePostResponse>(
        `${url}/post/`,
        {...params},
        {headers: {Authorization: `Bearer ${token}`}},
      );

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
}
