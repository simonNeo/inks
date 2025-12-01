import { Box, render, Text, useInput } from 'ink';
import { ScrollBox } from 'ink-scroll-box';
import type { ScrollBoxState } from 'ink-scroll-box';
import { useState } from 'react';

const largeList = Array.from({ length: 1000 }, (_, index) => `Item ${index}`);

function App() {

  const [changeResult, setChangeResult] = useState<ScrollBoxState<string> | null>(null);
  const [currentState, setCurrentState] = useState<ScrollBoxState<string> | null>(null);


  useInput((input, key) => {
    if (input === 'q' || key.escape) {
      process.exit(0);
    }
  });

  return (
    <Box flexDirection="column">
      <Text>current: {JSON.stringify(currentState)}</Text>
      <Text>emit change: {changeResult?.index}</Text>
      <ScrollBox
        enableScroll
        height={10}
        padding={1}
        onSelect={setCurrentState}
        onChange={setChangeResult}
        margin={1}
        borderStyle={'single'}
        list={largeList} // const largeList = Array.from({ length: 1000 }, (_, index) => `Item ${index}`);
        renderItem={(item, isActive) => {
          return <Text color={isActive ? 'green' : undefined}>{isActive ? '>' : ' '} {item}</Text>
        }} />
    </Box>
  );
}

render(<App />);

