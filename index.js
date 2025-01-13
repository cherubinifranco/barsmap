import createServer from './app.js';

const port = 3000;
const app = createServer();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});