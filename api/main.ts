import "module-alias/register";
import { createFlickrApi } from "@api";

const app = createFlickrApi("59e9561e02d8a39f946bc73f01d4d6d1");
const { PORT } = process.env;
const port = !!PORT ? (parseInt(PORT, undefined) || 3000) : 3000;

app.listen(port, "0.0.0.0", (err: Error) => {
  if (err) {
    throw err;
  }
  console.log(`Start server at port ${port}`);
});