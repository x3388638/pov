import { FC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import coverImg from '@/public/images/cover.jpg'
import { SOCIAL_MEDIA_LIST, SocialMediaInfo } from '@/app/constants'

const CoverBackground = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${coverImg.src});
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
  padding: 140px 50px 20px;
  text-align: center;
  color: #fff;
  filter: drop-shadow(0px 0px 5px black);
  overflow: hidden;

  @media screen and (max-width: 480px) {
    padding: 100px 20px 60px;
  }
`

const Header = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  display: inline-block;

  @media screen and (max-width: 480px) {
    font-size: 34px;
  }
`

const HashTag = styled.span`
  ::before {
    content: '#';
  }
`

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  fontsize: 16px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    padding: 0 40px;
  }
`

const SocialMediaItem = styled.a`
  color: #fff;
  text-decoration: none;
  background: #ffffff33;
  padding: 8px 16px;
  border-radius: 20px;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1) 0s;

  &:hover {
    border-radius: 8px;
    background: #ffffff51;
  }
`

const SocialMediaLink = ({ icon, label, link }: SocialMediaInfo) => {
  return (
    <SocialMediaItem href={link} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={icon} />
      <span style={{ paddingLeft: '8px' }}>{label}</span>
    </SocialMediaItem>
  )
}

const Cover: FC = () => {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <CoverBackground />
      <CoverContainer>
        <Link href="/">
          <Header>
            <span style={{ whiteSpace: 'nowrap' }}>Car Photography /</span>{' '}
            <span style={{ whiteSpace: 'nowrap' }}>POV Driving Video</span>
          </Header>
        </Link>
        <h2
          style={{
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
        <SocialMediaContainer>
          {SOCIAL_MEDIA_LIST.map((info, i) => {
            return <SocialMediaLink key={i} {...info} />
          })}
        </SocialMediaContainer>
      </CoverContainer>
    </div>
  )
}

export default Cover
