import { FC, useCallback, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import styled from '@emotion/styled'

const YoutubeIconContainer = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  font-size: 50px;

  ::before {
    content: ' ';
    height: 20px;
    width: 20px;
    background: #fff;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const ThumbnailContainer = styled.div`
  position: relative;
  height: 100%;
  cursor: pointer;
  filter: brightness(0.8);
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1) 0s;

  :hover {
    filter: brightness(1);
  }

  @media screen and (max-width: 768px) {
    filter: unset;
  }
`

interface YoutubePlayerProps {
  id: string
}

const YoutubePlayer: FC<YoutubePlayerProps> = ({ id }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const playerId = useRef(`${id}${Date.now()}`)

  const handleLoad = useCallback(() => {
    new (window as any).YT.Player(playerId.current, {
      events: {
        onReady: (e: any) => {
          // youtube iframe on mobile w/o muted cannot be autoplay
          // ref: https://developers.google.com/youtube/iframe_api_reference#Mobile_considerations

          // Video unavailable issue: https://blog.maki0419.com/2022/09/youtube-iframe-embed-Video-unavailable-Watch-on-YouTube.html
          e.target.mute()
          e.target.playVideo()
        },
      },
    })
  }, [playerId])

  const handleClickThumbnail = () => {
    setIsLoaded(true)
  }

  return (
    <>
      {isLoaded ? (
        <iframe
          id={playerId.current}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${id}?enablejsapi=1&autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleLoad}
        ></iframe>
      ) : (
        <ThumbnailContainer onClick={handleClickThumbnail}>
          <img
            // thumbnail url: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api/2068371#2068371
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            height="100%"
            width="100%"
          />
          <YoutubeIconContainer>
            <FontAwesomeIcon
              icon={faYoutube}
              style={{ position: 'relative' }}
            />
          </YoutubeIconContainer>
        </ThumbnailContainer>
      )}
    </>
  )
}

export default YoutubePlayer
