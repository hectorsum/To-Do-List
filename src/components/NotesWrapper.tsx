import React from 'react'
import styled from 'styled-components';
interface Props {
  children: React.ReactNode
}
export const BoxWrapper: React.FC<Props> = ({children}): JSX.Element => {
  return (
    <Box>
      {children}
    </Box>
  )
}

const Box = styled.div`
  max-height: 350px;
  overflow: auto;
`