import { getCharacter, getCharacters } from './character';

describe('getCharacters', () => {
  it('should return characters when given a search term', async () => {
    const characters = await getCharacters('rick');
    expect(characters.results).toBeDefined();
    expect(characters.results.length).toBeGreaterThan(0);
  });

  it('should return an error when given an invalid search term', async () => {
    try {
      await getCharacters('invalidsearchterm');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should return characters on a specific page when given a page number', async () => {
    const characters = await getCharacters('rick', 2);
    expect(characters.info.next).toContain('page=3');
  });
});

describe('getCharacter', () => {
  it('should return a character when given an id', async () => {
    const character = await getCharacter('1');
    expect(character).toBeDefined();
  });
});
