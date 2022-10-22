import {IPost, IUploadFileResult} from '../../models/Content';

export type GetPostsByQueryResponse = {
  result: IPost[];
};

export type GetCommentsByPostIdResponse = {};

export type GetCommentCountResponse = {};

export type GetLikeCountResponse = {};

export type GetLikeListResponse = {};

export type CreatePostResponse = {
  message: string;
};

export type CreateCommentResponse = {};

export type AddLikeResponse = {};

export type RemoveLikeResponse = {};

export type UpdatePostResponse = {};

export type UpdateCommentResponse = {};

export type DeletePostResponse = {};

export type DeleteCommentResponse = {};

export type FileUploadResponse = {
  result: IUploadFileResult[];
};
