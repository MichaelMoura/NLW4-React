import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { convertDurationToTime } from '../utils/convertDurationToTimeString';
import { api } from '../services/api';
import Head from 'next/head';

import styles from './home.module.scss';
import { PlayerContext, usePlayer } from '../contexts/PlayerContext';

//tipagem de uma propriedade
//no TS, precisamos explicar o tipo do nosso array, como no java
//também podemos falar o que tem dentro do nosso array de objeto
type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  members: string,
  publishedAt: string,
  duration:number,
  durationAsString: string,
  published: string,
  url: string
}


type HomeProps = {
  latestEpisodes: Episode[],
  allEpisodes: Episode[];
}
export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const {playList} = usePlayer();

  const episodeList = [...latestEpisodes,...allEpisodes];

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | podcastr</title>
      </Head>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <Image 
                width={192} 
                height={192} 
                src={episode.thumbnail} 
                alt={episode.title}
                objectFit='cover' />

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type='button' onClick={() => playList(episodeList,index)}>
                  <img src="/play-green.svg" alt="Tocar episodio"/>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos Episódios</h2>
        
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrante</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode,index) =>{
              return (
                <tr key={episode.id}>
                  <td style={{width:72}}>
                    <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    objectFit='cover' />
                  </td>

                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{width:100}}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type='button' onClick={() => playList(episodeList,index + latestEpisodes.length)}>
                      <img src='/play-green.svg' alt='tocar episódio'/>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </section>
    </div>
  )
}

//tipagem da minha função
//estamos passando os parametros da nossa função
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail, 
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration:Number(episode.file.duration),
      durationAsString: convertDurationToTime(Number(episode.file.duration)),
      url: episode.file.url,
    }
  })
  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}