//medic
import express from "express";
import MedicRoutes from './routes/medics.routes.js'
import StatusRoutes from './routes/status.routes.js'
import SpecialtyRoutes from './routes/specialty.routes.js'
import TicketRoutes from './routes/tickets.routes.js'
import PatientRoutes from './routes/patients.routes.js'
import ConsultingRoom from './routes/consultingRoom.routes.js'
import Queue from './routes/queue.routes.js'
import User from './routes/users.routes.js'
import Login from './routes/login.routes.js'
import Pay from './routes/pays.routes.js'

const app=express();
app.use(express.json())

app.use('/medic',MedicRoutes)
app.use('/status',StatusRoutes)
app.use('/specialty',SpecialtyRoutes)
app.use('/ticket',TicketRoutes)
app.use('/patient',PatientRoutes)
app.use('/queue',Queue)
app.use('/consultingRoom',ConsultingRoom)
app.use('/user',User)
app.use('/login',Login)
app.use('/pay',Pay)
export default app;