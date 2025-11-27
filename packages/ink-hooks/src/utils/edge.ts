import { BoxProps } from "ink";

export function getEdge(props: BoxProps) {
  const { borderStyle, borderBottom, borderTop, borderLeft, borderRight } = props;
  const {padding, paddingX, paddingY, paddingTop, paddingRight, paddingBottom, paddingLeft, } = props;
  const {margin, marginX,marginY, marginTop, marginRight, marginBottom, marginLeft} = props;
  
  return {
    borderTop: !borderStyle ? 0 : borderTop === false ? 0 : 1,
    borderRight: !borderStyle ? 0 : borderRight === false ? 0 : 1,
    borderBottom: !borderStyle ? 0 : borderBottom === false ? 0 : 1,
    borderLeft: !borderStyle ? 0 : borderLeft === false ? 0 : 1,
    paddingTop: paddingTop || paddingY || padding || 0,
    paddingRight: paddingRight || paddingX || padding || 0,
    paddingBottom: paddingBottom || paddingY || padding || 0,
    paddingLeft: paddingLeft || paddingX || padding || 0,
    marginTop: marginTop || marginY || margin || 0,
    marginRight: marginRight || marginX || margin || 0,
    marginBottom: marginBottom || marginY || margin || 0,
    marginLeft: marginLeft || marginX || margin || 0,
  }
  
}



export function fullScreen() {
  process.stdout.write("\x1b[?1049h");
}

export function exitFullScreen() {
  process.stdout.write("\x1b[?1049l");
}