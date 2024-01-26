import { FC } from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const animationKeyframes = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.2);
  }
`

const Dot = styled.div<{ delay: number; color: string }>`
  animation-name: ${animationKeyframes};
  animation-delay: ${({ delay }) => `${delay}s`};
  animation-duration: 0.4s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  height: 10px;
  width: 10px;
  background: ${({ color }) => color};
  border-radius: 50%;
`

const Loading: FC<{ color?: string }> = ({ color = '#999' }) => {
  return (
    <div
      css={{
        display: 'flex',
        gap: '8px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
      }}
    >
      <Dot delay={0} color={color} />
      <Dot delay={0.3} color={color} />
      <Dot delay={0.6} color={color} />
    </div>
  )
}

export default Loading
