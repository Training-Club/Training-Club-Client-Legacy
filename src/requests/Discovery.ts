import axios from 'axios';
import {API_URL} from '../Constants';
import {getProfile} from './Account';
import {getLike} from './Content';
import {GetFeedContentResponse} from './responses/Discovery';
import {IContentItem, IFeedData} from '../models/Content';

import {
  GetCommentCountResponse,
  GetLikeCountResponse,
  GetSignedContentResponse,
} from './responses/Content';

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
    let content;

    try {
      const contentResult = await axios.get<GetFeedContentResponse>(
        `${API_URL}/discovery/query?page=${page}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      content = contentResult.data;

      if (content == null) {
        return reject('content is null');
      }
    } catch (err) {
      return reject(err);
    }

    if (!content) {
      return reject('content is empty');
    }

    let result: IFeedData[] = [];

    for (const post of content.result) {
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
      let liked = false;

      // query profile data
      try {
        const profileResult = await getProfile(authorId, token);
        authorUsername = profileResult.username;
      } catch (err) {
        return reject(err);
      }

      // query like count
      try {
        const likeResult = await axios.get<GetLikeCountResponse>(
          `${API_URL}/content/post/id/${id}/likes/count`,
          {headers: {Authorization: `Bearer ${token}`}},
        );

        likes = likeResult.data.result;
      } catch (err) {
        likes = 0;
      }

      // query comment counts
      try {
        const commentResult = await axios.get<GetCommentCountResponse>(
          `${API_URL}/content/post/id/${id}/comments/count`,
          {headers: {Authorization: `Bearer ${token}`}},
        );

        comments = commentResult.data.result;
      } catch (err) {
        comments = 0;
      }

      // query image signing
      try {
        const signResult = await axios.get<GetSignedContentResponse>(
          `${API_URL}/content/post/content/${id}`,
          {headers: {Authorization: `Bearer ${token}`}},
        );

        // TODO: Update Ares to return content type
        for (const signed of signResult.data.result) {
          contentItems.push({
            type: signed.type,
            destination: signed.url,
          });
        }
      } catch (err) {
        return reject(err);
      }

      // query isLiked
      try {
        await getLike(id, token);
        liked = true;
      } catch (err) {
        liked = false;
      }

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
        isLiked: liked,
        content: contentItems,
        createdAt: createdAt,
        editedAt: editedAt,
        text: text,
        tags: tags,
      });
    }

    return resolve(result);
  });
}
