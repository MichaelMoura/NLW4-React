import { createContext, useState, ReactNode, useContext} from 'react';
//para testes, colocamos o Diego como parâmetro, mas podemos colocar qualquer coisa(objeto,array e etc).
type Episode = {
    title: string;
    thumbnail: string;
    members:string;
    duration: number;
    url: string;
}

type PlayerContextData = {
   episodeList: Episode[];
   currentEpisodeIndex: number;
   isPlaying: Boolean;
   isLooping: boolean;
   isShuffling: boolean;
   play: (episode: Episode) => void;
   playList: (list: Episode[], index: number) => void;
   playNext: () => void;
   playPrevious: () => void;
   setPlayingState: (episode: Boolean) => void;
   togglePlay: () =>void;
   toggleLoop: ()=>void;
   toggleShuffle: ()=> void;
   clearPlayerState: ()=> void;
   hasNext: boolean,
   hasPrevious:boolean,

}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children:ReactNode;
}

export function PlayerContextProvider({children}: PlayerContextProviderProps){
    const [episodeList,setEpisodeList] = useState([]);
    const [currentEpisodeIndex,setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping,setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
  
    function play(episode: Episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    
    function playList(List:Episode[], index: number){
        setEpisodeList(List);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }
  
    function togglePlay(){
      setIsPlaying(!isPlaying)
    }

    function toggleShuffle(){
        setIsShuffling(!isShuffling);
    }

    function toggleLoop(){
        setIsLooping(!isLooping);
    }
  

    function setPlayingState(state:boolean){
      setIsPlaying(state);
    }

    function clearPlayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }    

    const hasPrevious = currentEpisodeIndex>0;
    const hasNext = isShuffling ||(currentEpisodeIndex +1) < episodeList.length;

    function playNext(){
        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        }else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious(){
        if(hasPrevious)
            setCurrentEpisodeIndex(currentEpisodeIndex -1)
    }
  
    return(
        <PlayerContext.Provider 
        value={{
            episodeList, 
            currentEpisodeIndex, 
            play, 
            isPlaying,
            hasNext,
            hasPrevious,
            isLooping,
            isShuffling,
            playList,
            playNext,
            playPrevious,
            togglePlay, 
            toggleLoop,
            toggleShuffle,
            setPlayingState,
            clearPlayerState,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}