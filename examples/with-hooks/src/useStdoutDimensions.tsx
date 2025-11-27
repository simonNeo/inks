import { render, Text, useInput } from 'ink';
import { useStdoutDimensions } from 'ink-hooks';

function App() {

  const { columns, rows } = useStdoutDimensions()
  useInput((input, key) => {
    if (key.escape || input === 'q') {
      process.exit(0);
    }
  });

  return (
    <>
      <Text>stdout dimensions: <Text bold color="blueBright">{columns} x {rows}</Text></Text>
      <Text>try to resize the terminal and see the effect</Text>
    </>
  );
}

render(<App />);

