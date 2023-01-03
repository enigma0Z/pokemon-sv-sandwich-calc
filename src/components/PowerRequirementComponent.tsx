
import { Chip, IconButton, Paper, Typography } from '@mui/material'
import { DisplayRequirement } from '../data/Cookbook'
import { powerName } from '../data/calc'
import { AddCircle, CheckCircle, Error, RemoveCircle } from '@mui/icons-material'
import { Box } from '@mui/system'
import { useState } from 'react'

export default function PowerRequirementComponent(
  props: {
    requirements: DisplayRequirement[]
  }
) {
  const [minimized, setMinimized]: [boolean, (value: boolean) => void] = useState(false)

  return (
    <Paper
      sx={{
        width: minimized ? 'fit-content' : '18em',
        padding: '.5em',
        display: props.requirements.length > 0 ? 'block' : 'none',
        position: 'fixed',
        top: '.25em',
        right: '.25em',
        zIndex: 1000,
        borderRadius: '1em',
      }}
      elevation={4}
    >
      <Box display={'flex'} flexDirection='row'>
        <Box display={minimized ? 'none' : 'flex'} flexDirection='column'>
          {props.requirements.map(requirement => {
            return (
              <>
                <Typography
                  gutterBottom={true}
                  variant='subtitle1'
                >
                  {powerName(requirement.power)}
                </Typography>
                <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
                  {requirement.components.map(component => {
                    return (
                      <Chip 
                        sx={{ width: 'fit-content', margin: '.25em' }} 
                        size='small' 
                        label={`${component.name}: ${component.value}`} 
                        icon={component.success ? <CheckCircle /> : <Error />}
                        color={component.success ? 'success' : 'error'}
                      />
                    )
                  })}
                </Box>
              </>
            )
          })}
        </Box>
        <Box display={'flex'} flexDirection='column' justifyContent={'center'}>
          <IconButton
            onClick={() => {
              setMinimized(!minimized)
            }}
          >
            { minimized ? <AddCircle /> : <RemoveCircle /> }
          </IconButton>
        </Box>
      </Box>
    </Paper>
  )
}