import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongsDetailsQuery,
  useGetSongsRelatedQuery,
} from '../redux/services/shazamCore';
const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
  } = useGetSongsDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSong,
    error,
  } = useGetSongsRelatedQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = ({ song, i }) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSong) {
    return <Loader title="Searching song details" />;
  }
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyriks:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS' ? (
            songData.sections[1].text.map((line, i) => (
              <p className="text-gray-400 text-base mt-1" key={i}>
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base mt-1">
              Sorry, no Lyrics found!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        artistId={artistId}
      />
    </div>
  );
};

export default SongDetails;
