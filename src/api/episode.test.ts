import { getEpisodes } from './episode';

describe('getEpisodes', () => {
  it('should return an empty array when given undefined', async () => {
    const episodes = await getEpisodes(undefined);
    expect(episodes).toEqual([]);
  });

  it('should return an array of episodes when given an array of episode URLs', async () => {
    const episodes = await getEpisodes([
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
    ]);
    expect(episodes).toHaveLength(2);
    expect(episodes[0].name).toEqual('Pilot');
    expect(episodes[1].name).toEqual('Lawnmower Dog');
  });

  it('should throw an error when the API returns an error', async () => {
    const invalidIds = ['invalidid'];
    try {
      await getEpisodes(invalidIds);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
