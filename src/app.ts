import express from "express"
import "express-async-errors"

const app = express()

app.get("/planets", (request, response) => {
    response.json([
        {name: "Neptune"},
        {name: "Mars"}
    ])
})

export default app ;
