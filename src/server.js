import app from './app';

const port = 3001;

app.listen(port, () => {
  console.log(`\nCTRL + Click em http://localhost:${port}\n`);
});

