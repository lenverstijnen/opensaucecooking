import app from "./app"

const port = process.env.PORT

export default app.listen(port, () =>
  console.log(`App listens on port ${port}`)
)
