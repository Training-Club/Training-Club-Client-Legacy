import axios from 'axios';
import {GetFeedContentResponse} from './responses/Discovery';
import {ContentType, IContentItem, IFeedData} from '../models/Content';
import {
  GetCommentCountResponse,
  GetLikeCountResponse,
  GetSignedContentResponse,
} from './responses/Content';
import {getProfile} from './Account';

// TODO: Replace with api.trainingclubapp.com
// const url: string = 'http://146.190.2.76:80/v1';
const url: string = 'http://localhost:8080/v1';

/**
 * Queries feed content
 *
 * @param page Page (determined by the ScrollView)
 * @param token Access Token
 */
export async function getFeedContent(
  page: number,
  token?: string,
): Promise<IFeedData[]> {
  return new Promise<IFeedData[]>(async (resolve, reject) => {
    try {
      const contentResult = await axios.get<GetFeedContentResponse>(
        `${url}/discovery/query?page=${page}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      if (contentResult.status !== 200) {
        return reject('failed to query posts');
      }

      let result: IFeedData[] = [];

      for (const post of contentResult.data.result) {
        const id = post.id;
        const authorId = post.author;
        const createdAt = post.createdAt;
        const editedAt = post.editedAt;
        const text = post.text;
        const tags = post.tags;

        let contentItems: IContentItem[] = [];
        let authorUsername: string;
        let avatarUri: string;
        let likes = 0;
        let comments = 0;

        try {
          const profileResult = await getProfile(authorId, token);
          authorUsername = profileResult.username;
        } catch (err) {
          return reject(err);
        }

        try {
          const likeResult = await axios.get<GetLikeCountResponse>(
            `${url}/content/post/id/${id}/likes/count`,
            {headers: {Authorization: `Bearer ${token}`}},
          );

          likes = likeResult.data.result;
        } catch (err) {
          likes = 0;
        }

        try {
          const commentResult = await axios.get<GetCommentCountResponse>(
            `${url}/content/post/id/${id}/comments/count`,
            {headers: {Authorization: `Bearer ${token}`}},
          );

          comments = commentResult.data.result;
        } catch (err) {
          likes = 0;
        }

        try {
          const signResult = await axios.get<GetSignedContentResponse>(
            `${url}/content/post/content/${id}`,
            {headers: {Authorization: `Bearer ${token}`}},
          );

          // TODO: Update Ares to return content type
          for (const signed of signResult.data.result) {
            contentItems.push({
              type: ContentType.IMAGE,
              destination: signed.url,
            });
          }
        } catch (err) {
          return reject(err);
        }

        // TODO: Get is post liked here
        // TODO: GET training session here
        // TODO: GET location here
        // TODO: GET avatar uri here

        avatarUri = '';

        result.push({
          id,
          author: {
            id: authorId,
            username: authorUsername,
            avatarUri: avatarUri,
          },
          likes: likes,
          comments: comments,
          content: contentItems,
          createdAt: createdAt,
          editedAt: editedAt,
          text: text,
          tags: tags,
        });
      }

      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}
