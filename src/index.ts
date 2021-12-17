import 'module-alias/register';
import Server from "./app";

const app = new Server();

app.start();