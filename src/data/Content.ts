import {ImageOrVideo} from 'react-native-image-crop-picker';
import {IContentDraft} from '../models/Content';
import {Platform} from 'react-native';

/**
 * Accepts ImageOrVideo[] array and converts each object in the array
 * in to a IContentDraft item
 *
 * @param {ImageOrVideo[]} data ImageOrVideo objects to convert
 */
export async function createDraftContent(
  data: ImageOrVideo[],
): Promise<IContentDraft[]> {
  const result: IContentDraft[] = [];

  data.forEach((item, index) => {
    const uri = Platform.OS === 'android' ? item.path : item.sourceURL;

    if (uri) {
      const draftItem: IContentDraft = {
        sortOrder: index,
        contentType: item.mime.startsWith('video', 0) ? 'video' : 'image',

        original: {
          uri: uri,
          width: item.width,
          height: item.height,
        },

        draft: {
          uri: uri,
        },
      };

      result.push(draftItem);
    }
  });

  return result;
}
