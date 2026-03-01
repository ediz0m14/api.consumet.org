export * from './types';

import { IVideo } from './types';

export abstract class VideoExtractor {
  protected abstract serverName: string;
  protected abstract sources: IVideo[];
  protected readonly client = require('axios');

  abstract extract(videoUrl: URL): Promise<IVideo[]>;
}
