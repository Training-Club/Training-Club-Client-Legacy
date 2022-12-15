import {ImageOrVideo} from 'react-native-image-crop-picker';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import {IContentDraft} from '../models/Content';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import {nanoid} from 'nanoid/non-secure';

/**
 * Accepts ImageOrVideo[] array and converts each object in the array
 * in to a IContentDraft item
 *
 * @param {ImageOrVideo[]} data ImageOrVideo objects to convert
 */
export async function createDraftContent(
  data: ImageOrVideo[],
): Promise<IContentDraft[]> {
  return new Promise<IContentDraft[]>(async (resolve, reject) => {
    const result: IContentDraft[] = [];

    for (const item of data) {
      const index = data.indexOf(item);
      const uri = Platform.OS === 'android' ? item.path : item.sourceURL;

      if (uri) {
        let tempUri: string = uri;

        if (isConvertableVideoFormat(uri)) {
          try {
            tempUri = await encodeVideoFile(uri);
          } catch (err) {
            return reject('failed to encode videos: ' + err);
          }
        }

        const draftItem: IContentDraft = {
          sortOrder: index,
          contentType: item.mime.startsWith('video', 0) ? 'video' : 'image',
          mime: item.mime,

          original: {
            uri: uri,
            width: item.width,
            height: item.height,
            filename: item.filename ?? '',
          },

          draft: {
            uri: tempUri,
          },
        };

        result.push(draftItem);
      }
    }

    return resolve(result);
  });
}

/**
 * Returns true if the provided file path is a file format that needs to be
 * converted using ffmpeg bindings.
 *
 * @param path File path
 */
export function isConvertableVideoFormat(path: string): boolean {
  const suffix = path.toLowerCase().split('.').pop();

  if (!suffix) {
    return false;
  }

  return suffix === 'qt' || suffix === 'mov';
}

/**
 * Accepts an input path and converts the file type to mp4 file format for storage
 *
 * Performing this function calls ffmpeg bindings and if used incorrectly can drain the user
 * battery.
 *
 * @param inputPath File path
 */
export async function encodeVideoFile(inputPath: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    const convertable = isConvertableVideoFormat(inputPath);

    if (!convertable) {
      return reject('invalid file format');
    }

    const outputPath = `${RNFS.DocumentDirectoryPath}`;
    const outputFile = `/${nanoid(6)}.mp4`;

    await RNFS.mkdir(outputPath);

    const session = await FFmpegKit.execute(
      `-i ${inputPath} -c:v copy -c:a copy ${
        outputPath + outputFile
      }`,
    );

    const returnCode = await session.getReturnCode();

    if (ReturnCode.isSuccess(returnCode)) {
      return resolve(outputPath + outputFile);
    } else if (ReturnCode.isCancel(returnCode)) {
      return reject('operation cancelled');
    } else {
      return reject('an error occurred, see console output');
    }
  });
}

/**
 * Helper function to determine where in a carousel scrollview
 * the user is currently viewing.
 *
 * @param x Current scroll position
 * @param contentSize Total card count
 * @param cardWidth Card width
 * @param cardGap Card gap/padding
 */
export function getCurrentContentCarouselIndex(
  x: number,
  contentSize: number,
  cardWidth: number,
  cardGap: number,
): number {
  for (let i = 0; i < contentSize; i++) {
    const calculatedSize = cardWidth * i + cardGap * i;

    if (x <= calculatedSize) {
      return i + 1;
    }
  }

  return contentSize;
}
