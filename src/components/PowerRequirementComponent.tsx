import { Chip, IconButton, Paper, Typography } from '@mui/material'
import { DisplayRequirement } from '../data/Cookbook'
import { powerName } from '../data/calc'
import { AddCircle, CheckCircle, Error, RemoveCircle } from '@mui/icons-material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'

export default function PowerRequirementComponent(
  props: {
    requirements: DisplayRequirement[]
  }
) {
  const [minimized, setMinimized]: [boolean, (value: boolean) => void] = useState(false)
  const [sticky, setSticky] = useState(false)

  const scrollListener = () => {
    if (window.pageYOffset > 64) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  useEffect(() => {
    console.log('<PowerRequirementComponent> Add scroll event listener', window.addEventListener('scroll', scrollListener))

    return () => {
      console.log('<PowerRequirementComponent> Remove scroll event listener', window.removeEventListener('scroll', scrollListener))
    }
  }, [])


  return (
    <Paper
      sx={{
        // width: minimized ? 'fit-content' : '18em',
        width: 'fit-content',
        maxWidth: '18em',
        padding: '.5em',
        display: props.requirements.length > 0 ? 'block' : 'none',
        position: sticky ? 'fixed' : 'absolute',
        top: sticky ? '16px' : '80px',
        right: '16px',
        // right: '1em',
        zIndex: 1000,
        borderRadius: minimized ? '4em' : '1em',
      }}
      elevation={4}
    >
      <Box display={'flex'} flexDirection='row'>
        <Box display={minimized ? 'none' : 'flex'} flexDirection='column' flexBasis={'100%'}>
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
                        key={component.name}
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