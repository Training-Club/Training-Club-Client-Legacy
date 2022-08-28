import {PrivacyLevel} from './Privacy';

export interface IPost {
  id: string;
  author: string;
  location?: string;
  text?: string;
  content: IContentItem[];
  createdAt: Date;
  editedAt?: Date;
  tags?: string[];
  privacy?: PrivacyLevel;
}

export interface IContentItem {
  destination: string;
  type: ContentType;
  latitude?: number;
  longitude?: number;
}

export interface ILike {
  id: string;
  author: string;
  post: string;
  type: PostItemType;
  likedAt: Date;
}

export interface IComment {
  id: string;
  post: string;
  author: string;
  type: PostItemType;
  text: string;
  createdAt: Date;
  editedAt?: Date;
}

export enum ContentType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export enum PostItemType {
  POST = 'POST',
  COMMENT = 'COMMENT',
}
