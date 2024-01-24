import { ComponentProps, FC } from 'react'
import Link from 'next/link'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'

const moreBtnKeyframes = keyframes`
  from { 
    transform: translateX(0);
    opacity: 0 
  }
  
  to { 
    transform: translateX(-5vw);
    opacity: 1 
  }
`

const moreBtnArrowKeyframes = keyframes`
  0% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(5px);
  }

  40% {
    transform: translateX(0);
  }
`

const Container = styled(Link)<{ $animationDelay: number }>`
  display: inline-flex;
  text-decoration: none;
  gap: 12px;
  padding: 18px 50px;
  background: #dc8686;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1) 0s;
  box-shadow: rgba(7, 7, 7, 0.5) 0px 5px 5px 0px;
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0;
  z-index: 1;
  animation-name: ${moreBtnKeyframes};
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-delay: ${({ $animationDelay }) => `${$animationDelay}s`};
  animation-fill-mode: forwards;

  &:hover {
    background: #b06161;
  }

  @media screen and (max-width: 480px) {
    position: relative;
    width: 100%;
    padding: 8px 50px;
    justify-content: center;
    box-sizing: border-box;
    box-shadow: unset;
    animation: unset;
    opacity: 1;
    right: unset;
    bottom: unset;
  }
`

const IconWrapper = styled.span`
  animation: ${moreBtnArrowKeyframes} 2s ease-in-out 1s infinite alternate
    forwards;
`

interface MoreBtnProps extends ComponentProps<typeof Link> {
  label: string
  animationDelay: number
}

const MoreBtn: FC<MoreBtnProps> = ({ label, animationDelay, ...linkProps }) => {
  return (
    <Container $animationDelay={animationDelay} {...linkProps}>
      <span>{label}</span>
      <IconWrapper>
        <FontAwesomeIcon icon={faAnglesRight} />
      </IconWrapper>
    </Container>
  )
}

export default MoreBtn
