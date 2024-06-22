const express = require('express');
const rootRouter = require('./routes/index');
const app = express();
const cors = require('cors')
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1",rootRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})