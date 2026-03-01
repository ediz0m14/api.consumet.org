import { VideoExtractor, IVideo } from '../models';

class StreamWishExtractor extends VideoExtractor {
  protected override serverName = 'StreamWish';
  protected override sources: IVideo[] = [];

  extract = async (videoUrl: URL): Promise<IVideo[]> => {
    try {
      const { data } = await this.client.get(videoUrl.href);
      // Este código busca el link real del video (.m3u8 o .mp4) oculto
      const source = data.match(/file:\s*"([^"]+)"/)?.[1];
      
      if (source) {
        this.sources.push({
          url: source,
          isM3U8: source.includes('.m3u8'),
          quality: 'default',
        });
      }
      return this.sources;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
}

export default StreamWishExtractor;
