const CHARACTERS_ENDPOINT = `${import.meta.env.VITE_API_HOST}/character`;

const getCharacters = async (search: string, page?: number) => {
  const response = await fetch(`${CHARACTERS_ENDPOINT}?name=${search}&page=${page ?? 1}`);
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  return data;
};

const getCharacter = async (id: string) => {
  const response = await fetch(`${CHARACTERS_ENDPOINT}/${id}`);
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  return data;
};

export { getCharacters, getCharacter };
