import React from 'react'
import { Box } from './Buttons/Box'

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