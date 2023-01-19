import resources from '@/res';
import { Tooltip } from '@mui/material';
import Image from 'next/image';

export default function IngredientImage(props: {
  kind: ('ingredient' | 'seasoning'),
  tooltip?: boolean,
  name: string
}) {

  let imgResource = resources.img[props.kind][props.name.toLowerCase().replaceAll(' ', '')]
  let imgElement: JSX.Element = <Image src={imgResource} alt={props.name} />
  let output: JSX.Element = <></>

  if (props.tooltip)
    output = (
      <Tooltip title={props.name}>
        {imgElement}
      </Tooltip>
    )
  else output = imgElement
 
  return output
}