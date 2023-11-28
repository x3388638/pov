import { FC } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import coverImg from '@static/images/cover.jpg'
import { SOCIAL_MEDIA_LIST, SocialMediaInfo } from './constants'


const CoverBackground = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${coverImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(1px);
`

const CoverContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 300px;
  box-sizing: border-box;
  padding: 15vh 50px 20px;
  text-align: center;
  color: #fff;
  filter: drop-shadow(0px 0px 5px black);
`

const HashTag = styled.span`
  ::before {
    content: '#';
  }
`

const SocialMediaLink = ({ icon, label, link }: SocialMediaInfo) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      css={{ color: '#fff' }}
    >
      <FontAwesomeIcon icon={icon} /> {label}
    </a>
  )
}

const Cover: FC = () => {
  return (
    <div
      css={{
        position: 'relative',
      }}
    >
      <CoverBackground />
      <CoverContainer>
        <h1 css={{ fontSize: '36px', fontWeight: 'bold' }}>
          <span css={{ whiteSpace: 'nowrap' }}>Car Photography /</span>{' '}
          <span css={{ whiteSpace: 'nowrap' }}>POV Driving Video</span>
        </h1>
        <h2
          css={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          <HashTag>拍車景點</HashTag>
          <HashTag>台灣風景</HashTag>
          <HashTag>停車場導覽</HashTag>
          <HashTag>第一人稱開車視角</HashTag>
          <HashTag>公路美景</HashTag>
        </h2>
        <div
          css={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          {SOCIAL_MEDIA_LIST.map((info, i) => {
            return <SocialMediaLink key={i} {...info} />
          })}
        </div>
      </CoverContainer>
    </div>
  )
}

export default Cover
