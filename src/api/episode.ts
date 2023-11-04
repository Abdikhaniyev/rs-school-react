const EPISODES_ENDPOINT = `${import.meta.env.VITE_API_HOST}/episode`;

const getEpisodes = async (episodes: (string | undefined)[]) => {
  const ids = episodes?.map((episode) => episode?.split('/').pop()).join(',');
  const response = await fetch(`${EPISODES_ENDPOINT}/${ids}`);
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  if (!Array.isArray(data)) {
    return [data];
  } else {
    return data;
  }
};

export { getEpisodes };
