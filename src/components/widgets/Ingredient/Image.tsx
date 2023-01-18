import { Tooltip } from '@mui/material';

export default function IngredientImage(props: {
  kind: ('ingredient' | 'seasoning'),
  tooltip?: boolean,
  name: string
}) {
  let img: JSX.Element = <img src={`/img/${props.kind}s/${props.name.toLowerCase().replaceAll(' ', '')}.png`} alt={props.name} />
  let output: JSX.Element = <></>

  if (props.tooltip)
    output = (
      <Tooltip title={props.name}>
        {img}
      </Tooltip>
    )
  else output = img
 
  return output
}