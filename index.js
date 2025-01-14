import createServer from './app.js';
import 'dotenv/config'

const port = 3000;
const app = createServer();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});