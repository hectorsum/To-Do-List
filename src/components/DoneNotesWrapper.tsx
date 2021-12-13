import React from 'react'
import styled from 'styled-components';
import { Box } from './Buttons/Box';
export const DoneNotesWrapper: React.FC = ({ children }): JSX.Element => {
  return (
    <Box>
      {children}
    </Box>
  )
}

