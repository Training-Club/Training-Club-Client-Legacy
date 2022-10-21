import axios from 'axios';
import {PrivacyLevel} from '../models/Privacy';
import {
  IContentDraft,
  IContentItem,
  IPost,
  IUploadFile,
} from '../models/Content';

import {
  CreatePostResponse,
  FileUploadResponse,
  GetPostsByQueryResponse,
} from './responses/Content';

// TODO: Replace with api.trainingclubapp.com
// const url: string = 'http://146.190.2.76:80/v1';
const url: string = 'http://localhost:8080/v1';

type CreatePostParams = {
  location?: string;
  text?: string;
  content: IContentItem[];
  tags?: string[];
  privacy?: PrivacyLevel;
  token?: string;
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
  token?: string,
): Promise<GetPostsByQueryResponse> {
  return new Promise<GetPostsByQueryResponse>(async (resolve, reject) => {
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
    if (!params.token) {
      return reject('no token found on this device');
    }

    try {
      const result = await axios.post<CreatePostResponse>(
        `${url}/post/`,
        {...params},
        {headers: {Authorization: `Bearer ${params.token}`}},
      );

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Sends a form data request to upload files
 *
 * @param items
 * @param token
 */
export async function uploadFiles(
  items: IContentDraft[],
  token?: string,
): Promise<any> {
  return new Promise<string[]>(async (resolve, reject) => {
    if (!token) {
      return reject('no token found on this device');
    }

    if (!items || items.length <= 0) {
      return reject('no items provided');
    }

    let formData = new FormData();

    items.forEach(item => {
      const uploadFile: IUploadFile = {
        uri: item.draft.uri,
        name: item.original.filename,
        type: item.mime,
      };

      formData.append('upload[]', uploadFile);
    });

    try {
      const result = await axios.post<FileUploadResponse>(
        `${url}/fileupload/upload`,
        formData,
        {
          onUploadProgress: e => console.log(e),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      resolve(result.data.result);
    } catch (err) {
      reject(err);
    }
  });
}
