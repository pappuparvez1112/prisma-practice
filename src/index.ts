import app from "./app";

const port = process.env.port || 3003;

async function main() {
  app.listen(port, () => {
    console.log(`Server running at ${port}`);
  });
}
main();
