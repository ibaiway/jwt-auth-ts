import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = process.env.PORT || 9000;

app.get("/", (req: Request, res: Response) => {
  res.send("Well done!");
});

app.listen(PORT, (): void => {
  console.log(`The application is listening on port ${PORT}!`);
});
