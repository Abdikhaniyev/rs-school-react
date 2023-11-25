import Head from 'next/head';
import { useRouter } from 'next/router';

import { Banner, BugButton, Characters, Detailed, Pagination, WarningSection } from '@/components';
import { getCharacter, getCharacters, getRunningQueriesThunk } from '@/redux/actions/character';
import { getEpisodes } from '@/redux/actions/episode';
import { wrapper } from '@/redux/store';
import { Character } from '@/redux/types/character';
import { PaginateResponse, ResponseError } from '@/redux/types/common';
import { Episode } from '@/redux/types/episode';

import styles from '@/styles/Layout.module.scss';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const characterId = context.params?.characterId;
  const { page } = context.query;
  const name = store.getState().layout.search;

  const {
    data: dataCharacters,
    isError: isErrorCharacters,
    error,
  } = await store.dispatch(
    getCharacters.initiate({ name, page: page ? parseInt(page as string) : 1 })
  );

  const { data: dataBannerCharacter } = await store.dispatch(getCharacter.initiate({ id: '1' }));

  const { data: dataCharacter } = await store.dispatch(
    getCharacter.initiate({ id: characterId as string })
  );

  const { data: dataEpisodes } = await store.dispatch(
    getEpisodes.initiate({ episodes: dataCharacter?.episode })
  );

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      characters: dataCharacters,
      isError: isErrorCharacters,
      error: error ?? null,
      bannerCharacter: dataBannerCharacter,
      character: dataCharacter,
      episodes: dataEpisodes,
    },
  };
});

interface PageProps {
  characters: PaginateResponse<Character[]>;
  isError: boolean;
  error?: ResponseError;
  bannerCharacter: Character;
  character: Character;
  episodes: Episode[];
}

export default function Page(props: PageProps) {
  const router = useRouter();
  const page = router.query?.page || '1';
  const { characters, isError, error, bannerCharacter, character, episodes } = props;
  return (
    <>
      <Head>
        <title>Rick and Morty App | RS School</title>
        <meta name="description" content="Rick and Morty App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/Rick_and_Morty.svg" as="image" />
      </Head>
      <main>
        <Banner character={bannerCharacter} />
        <WarningSection>
          <BugButton />
        </WarningSection>
        <div className={styles.detailed}>
          <Characters characters={characters} isError={isError} error={error} />
          <Detailed characterData={character} episodesData={episodes} />
        </div>
        {characters && characters.results && characters.info !== undefined && !isError && (
          <Pagination
            current={parseInt(page as string)}
            count={characters.info.count}
            pages={characters.info.pages}
          />
        )}
      </main>
    </>
  );
}
