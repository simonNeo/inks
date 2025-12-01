import { Box, BoxProps, render, Text } from 'ink';
import { useBoxModel } from 'ink-hooks';


function ExampleBox(props: BoxProps) {
  const { ref, content, padding, margin, border } = useBoxModel(props);

  return (
    <Box ref={ref} {...props}>
      <Text>my margin size: {margin.width} x {margin.height}</Text>
      <Text>my border size: {border.width} x {border.height}</Text>
      <Text>my padding size: {padding.width} x {padding.height}</Text>
      <Text>my content size: {content.width} x {content.height}</Text>
    </Box>
  );
}

function App() {

  return (
    <>
     <ExampleBox width={20} height={10} borderStyle={'single'} padding={1} margin={1} />
    </>
  );
}

render(<App />);

