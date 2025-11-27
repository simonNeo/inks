import { Box, BoxProps, render, Text, useInput } from 'ink';
import { useBoxModel, useStdoutDimensions } from 'ink-hooks';
import { MyBox } from './MyBox';

function App() {

  const borderStyles: BoxProps['borderStyle'][] = [undefined, "single", "double", "round", "bold", "singleDouble", "doubleSingle", "classic", "arrow"]

  const { columns, rows } = useStdoutDimensions()

  useInput((input, key) => {
    if (key.escape || input === 'q') {
      process.exit(0);
    }
  });

  const boxProps: BoxProps = {
    borderStyle: "single",
    padding: 1,
    margin: 1,
  }

  const { ref, content, padding, margin, border } = useBoxModel(boxProps);


  return (
    <>
      <Box flexWrap='wrap'>
        {borderStyles.map((borderStyle, index) => (
          <MyBox key={index} borderStyle={borderStyle} padding={1} margin={1} />
        ))}
      </Box>
      <Text>try to resize the terminal and see the effect</Text>
      <Text>stdout dimensions1: {columns} x {rows}</Text>

      <Box flexDirection="column" width={100}>
        <Box flexDirection="column">
          <Text>render box:</Text>
          <Box ref={ref} {...boxProps} justifyContent="center" alignItems="center" flexDirection='column'>
            <Text>line one</Text>
            <Text>line two</Text>
          </Box>
        </Box>
        <Box flexDirection="column">
          <Text>Box Model:</Text>
          <Box>
            <Box borderStyle="single" paddingX={1}>
              <Box borderStyle="single" paddingX={1}>
                <Box borderStyle="single" paddingX={1}>
                  <Box width={10} height={5} justifyContent="center" alignItems="center">
                    <Text>{content.width} x {content.height}</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

        </Box>
      </Box>
    </>
  );
}

render(<App />);

