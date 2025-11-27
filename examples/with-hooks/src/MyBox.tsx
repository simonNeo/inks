import { Box, BoxProps, Text } from "ink";
import { useBoxModel } from "ink-hooks";


export function MyBox(props: BoxProps) {
  const { ref, content, padding, margin, border } = useBoxModel(props);

  return (<>
    <Box ref={ref} {...props} flexDirection="column">
      <Text>margin box: {margin.width} x {margin.height}</Text>
      <Text>border box: {border.width} x {border.height}</Text>
      <Text>padding box: {padding.width} x {padding.height}</Text>
      <Text>content box: {content.width} x {content.height}</Text>
    </Box>
  </>);
}