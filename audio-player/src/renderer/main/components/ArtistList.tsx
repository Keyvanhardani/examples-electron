import React from 'react'
import Styles from './ArtistList.scss'
import ArtistListItem from './ArtistListItem'
import Artist from '../models/Artist'

export type StateByProps = {
  artists: Artist[]
  currentArtist: Artist | null
}

export type DispatchByProps = {
  selectArtist?: (artist: Artist) => void
}

type Props = StateByProps & DispatchByProps

const ArtistList: React.FC<Props> = ({
  artists,
  currentArtist,
  selectArtist = () => {}
}) => (
  <div className={Styles.container}>
    {artists.map((artist, index) => {
      const selected = !!(currentArtist && currentArtist.name === artist.name)
      return (
        <ArtistListItem
          key={index}
          artist={artist}
          selected={selected}
          onSelect={selectArtist}
        />
      )
    })}
  </div>
)

export default ArtistList