import { render, Text, useInput } from 'ink';
import { useFullScreen } from 'ink-hooks';

function App() {

  const exitFullScreen = useFullScreen();
  useInput((input) => {
    if (input === 'e') {
      exitFullScreen();
    }
    if (input === 'q') {
      process.exit(0);
    }
  });

  return (
    <>
      <Text>Now, I'm in <Text bold color="blueBright">fullscreen</Text> mode</Text>
      <Text>press <Text bold color="blueBright">e</Text> to exit fullscreen mode</Text>
    </>
  );
}

render(<App />);

