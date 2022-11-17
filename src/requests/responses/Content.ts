import {
  IPost,
  ISignedContentItem,
  IUploadFileResult,
} from '../../models/Content';

export type GetPostsByQueryResponse = {
  result: IPost[];
};

export type GetSignedContentResponse = {
  result: ISignedContentItem[];
};

export type GetCommentsByPostIdResponse = {};

export type GetCommentCountResponse = {
  result: number;
};

export type GetLikeCountResponse = {
  result: number;
};

export type GetLikeListResponse = {};

export type CreatePostResponse = {
  message: string;
};

export type CreateCommentResponse = {};

export type AddLikeResponse = {
  message: string;
};

export type RemoveLikeResponse = {};

export type UpdatePostResponse = {};

export type UpdateCommentResponse = {};

export type DeletePostResponse = {};

export type DeleteCommentResponse = {};

export type FileUploadResponse = {
  result: IUploadFileResult[];
};
