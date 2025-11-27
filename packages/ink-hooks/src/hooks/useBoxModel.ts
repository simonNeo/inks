import { BoxProps, DOMElement, measureElement } from "ink";
import React, { useRef } from "react";
import { getEdge } from "../utils/edge";


// 测量Box的宽高
export function useMeasure(props: BoxProps) {
  const ref = useRef<DOMElement>(null);
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  React.useLayoutEffect(() => {
    if (ref.current) {
      setHeight(measureElement(ref.current).height)
    }
  }, [ref, props.height])
  
  React.useLayoutEffect(() => {
    if (ref.current) {
      setWidth(measureElement(ref.current).width)
    }
  }, [ref, props.width])
  
  return {
    ref,
    size: {
      width,
      height,
    }
  }
}

export function useBoxModel(props: BoxProps) {
  const { ref, size } = useMeasure(props);
  const {width: borderBoxWidth, height: borderBoxHeight} = size;
  const edge = getEdge(props);
  const marginBox = {
    width: borderBoxWidth + edge.marginLeft + edge.marginRight,
    height: borderBoxHeight + edge.marginTop + edge.marginBottom,
  }
  const paddingBox = {
    width: borderBoxWidth - edge.borderLeft - edge.borderRight,
    height: borderBoxHeight - edge.borderTop - edge.borderBottom,
  }
  const contentBox = {
    width: paddingBox.width - edge.paddingLeft - edge.paddingRight,
    height: paddingBox.height - edge.paddingTop - edge.paddingBottom,
  }

  return {
    ref,
    content: contentBox,
    padding: paddingBox,
    margin: marginBox,
    border: {
      width: borderBoxWidth,
      height: borderBoxHeight,
    },
  }
}
