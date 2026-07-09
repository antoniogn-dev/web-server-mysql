import express from "express"
import empleadosRoutes from "./routes/empleados.routes.js";
import indexRoutes from "./routes/index.routes.js"
import { PORT } from "./config/config.js";
import cors from "cors";

const app = express()

app.use(cors())
app.use(express.json())

app.use(indexRoutes)
app.use("/api", empleadosRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        mensaje: "endpoint no encontrado"
    })
})

app.listen(PORT, () => {
    console.log(`Server funcionando en el puerto ${PORT}`);
    
})