

const app = require("./server")
const port = 8080

app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
})
