import React              from 'react';
import { PlaybackState }  from '../../common/Constants.js';
import AudioPlayerControl from './AudioPlayerControl.js';
import AudioPlayerToolbar from './AudioPlayerToolbar.js';
import AudioPlayerInfo    from './AudioPlayerInfo.js';

/**
 * Component for audio player controls.
 */
export default class AudioPlayer extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties。
   */
  constructor( props ) {
    super( props );

    /**
     * Function to watch the change of Store.
     * @type {Function}
     */
    this._onChangeBind = this._onChange.bind( this );
  }

  /**
   * Occurs when the component is mount.
   */
  componentDidMount() {
    this.props.context.audioPlayerStore.onChange( this._onChangeBind );
    this.props.context.musicListStore.onChange( this._onChangeBind );
  }

  /**
   * Occurs when the component is unmount.
   */
  componentWillUnmount() {
    this.props.context.audioPlayerStore.removeChangeListener( this._onChangeBind );
    this.props.context.musicListStore.removeChangeListener( this._onChangeBind );
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    const music         = this._currentMusic();
    const playbackState = this.props.context.audioPlayerStore.playbackState;

    return (
      <div className="audio-player">
        <div className="audio-player__container">
          <AudioPlayerControl
            audioPlayerAction={ this.props.context.audioPlayerAction }
            musicListAction={ this.props.context.musicListAction }
            music={ music }
            playbackState={ playbackState }
            volume={ this.props.context.audioPlayerStore.volume }
            getNextPlayMusic={ this._getNextPlayMusic.bind( this ) } />
          <AudioPlayerInfo
            audioPlayerAction={ this.props.context.audioPlayerAction }
            music={ music }
            currentTime={ this.props.context.audioPlayerStore.currentTime } />
          <AudioPlayerToolbar
            musicListAction={ this.props.context.musicListAction }
            music={ music }
            playMusic={ this.props.context.audioPlayerStore.currentMusic }
            playbackState={ playbackState } />
        </div>
      </div>
    );
  }

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange() {
    this.forceUpdate();
  }

  /**
   * Get the currently music.
   *
   * @return {Object} Success is music. Otherwise null;
   */
  _currentMusic() {
    if( this.props.context.audioPlayerStore.playbackState === PlaybackState.Stopped ) {
      return this.props.context.musicListStore.currentMusic;
    }

    return this.props.context.audioPlayerStore.currentMusic;
  }

  /**
   * Get the next play music.
   *
   * @param {Boolean} prev True if get in previous of the music. Default is false
   *
   * @return {Music} Success is music. Otherwise null.
   */
  _getNextPlayMusic( prev ) {
    let music = this._currentMusic();
    if( !( music ) ) { return null; }

    return this.props.context.musicListStore.next( music, prev );
  }
}
