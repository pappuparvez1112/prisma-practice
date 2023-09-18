import app from "./app";

const port = process.env.port || 5000;

async function main() {
  app.listen(port, () => {
    console.log(`Server running at ${port}`);
  });
}
main();
