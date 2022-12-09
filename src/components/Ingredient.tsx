import res from '../res'
import { Tooltip } from '@mui/material';

export default function sandwich(props: { name: string } ) {
  return (
    <Tooltip title={props.name}>
      <img src={res.img.ingredients[props.name.toLowerCase().replaceAll(' ', '')]} alt={props.name} />
    </Tooltip>
  )
}