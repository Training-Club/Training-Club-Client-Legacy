import {PrivacyLevel} from './Privacy';
import {CropRect} from 'react-native-image-crop-picker';

export interface IContentDraft {
  sortOrder: number;
  contentType: 'image' | 'video';
  mime: string;

  original: {
    uri: string;
    width: number;
    height: number;
    filename: string;
  };

  draft: {
    uri: string;
    cropRect?: CropRect | null;
  };
}

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

export interface IUploadFile {
  uri: string;
  name: string;
  type: string;
}

export enum ContentType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export enum PostItemType {
  POST = 'POST',
  COMMENT = 'COMMENT',
}
