import axios, {AxiosError} from 'axios';
import {PrivacyLevel} from '../models/Privacy';

import {
  AddLikeResponse,
  CreatePostResponse,
  FileUploadResponse,
  GetPostsByQueryResponse,
  RemoveLikeResponse,
} from './responses/Content';

import {
  ContentType,
  IContentDraft,
  IContentItem,
  ILike,
  IPost,
  IUploadFile,
  IUploadFileResult,
  PostItemType,
} from '../models/Content';

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
): Promise<IUploadFileResult[]> {
  return new Promise<IUploadFileResult[]>(async (resolve, reject) => {
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

/**
 * Uploads files and uses the returned metadata to create
 * a post with the provided params
 *
 * @param caption Post caption
 * @param trainingSessionId Training Session ID
 * @param locationId Location ID
 * @param tags Tags
 * @param files Content Drafts
 * @param privacyLevel Privacy Level
 * @param token Access Token
 */
export async function createPostWithFiles(
  caption: string,
  trainingSessionId?: string,
  locationId?: string,
  tags?: string[],
  files?: IContentDraft[],
  privacyLevel?: PrivacyLevel,
  token?: string,
): Promise<CreatePostResponse> {
  return new Promise<CreatePostResponse>(async (resolve, reject) => {
    if (!token) {
      return reject('no token found on this device');
    }

    if (!files || files.length <= 0) {
      return reject('no files provided');
    }

    let uploadResult: IUploadFileResult[];

    try {
      uploadResult = await uploadFiles(files, token);
    } catch (err) {
      return reject(err);
    }

    let contentItems: IContentItem[] = [];

    uploadResult.forEach(item => {
      const match = files.find(e => e.original.filename === item.filename);

      if (match) {
        contentItems.push({
          destination: item.key,
          type:
            match.contentType === 'image'
              ? ContentType.IMAGE
              : ContentType.VIDEO,
        });
      }
    });

    try {
      const createResult = await axios.post<CreatePostResponse>(
        `${url}/content/post`,
        {
          session: trainingSessionId,
          location: locationId,
          text: caption,
          tags: tags,
          privacy: privacyLevel,
          content: contentItems,
        },
        {headers: {Authorization: `Bearer ${token}`}},
      );

      return resolve(createResult.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError.response);
      return reject(err);
    }
  });
}

/**
 * Retrieves a like document matching the provided post ID
 * attached to the request account ID
 *
 * @param postId Post ID to query (can be a post or comment)
 * @param token Access Token
 */
export async function getLike(postId: string, token?: string): Promise<ILike> {
  return new Promise<ILike>(async (resolve, reject) => {
    try {
      // /content/post/id/:postId/liked
      const result = await axios.get<ILike>(
        `${url}/content/post/id/${postId}/liked`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Creates a new like entry in the database for the provided
 * post ID and post type.
 *
 * @param postId Post ID to query
 * @param postType Post type (backend must know if it is a post or comment)
 * @param token Access Token
 */
export async function createLike(
  postId: string,
  postType: PostItemType,
  token?: string,
): Promise<AddLikeResponse> {
  return new Promise<AddLikeResponse>(async (resolve, reject) => {
    try {
      const result = await axios.post<AddLikeResponse>(
        `${url}/content/like`,
        {post: postId, type: postType},
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      return resolve(result.data);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Removes an existing like entry from the database
 *
 * This function will only query against the post collection in the database.
 *
 * @param postId Post ID to query
 * @param token Access Token
 */
export async function removePostLike(
  postId: string,
  token?: string,
): Promise<RemoveLikeResponse> {
  return new Promise<RemoveLikeResponse>(async (resolve, reject) => {
    try {
      const result = await axios.delete<RemoveLikeResponse>(
        `${url}/content/like/post/${postId}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      return resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

// TODO: Implement attempt like post function
/* export async function attemptLikePost(postId: string, token?: string): Promise<AddLikeResponse> {
  return new Promise<AddLikeResponse>(async (resolve, reject) => {

  });
}
*/
