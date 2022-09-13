import {ImageOrVideo} from 'react-native-image-crop-picker';
import {IContentDraft} from '../models/Content';

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
    if (item.sourceURL) {
      const draftItem: IContentDraft = {
        sortOrder: index,

        original: {
          uri: item.sourceURL,
          width: item.width,
          height: item.height,
        },

        draft: {
          uri: item.sourceURL,
        },
      };

      result.push(draftItem);
    }
  });

  return result;
}
