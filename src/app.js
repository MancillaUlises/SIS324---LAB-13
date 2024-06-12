import express from "express";
import projectsRoutesMedics from './routes/medics.routes.js';
import projectsRoutesPacients from './routes/pacients.routes.js';
import projectsRoutesTickets from './routes/tickets.routes.js';

const app=express();

app.use(express.json())
app.use('/medics',projectsRoutesMedics)
app.use('/pacients',projectsRoutesPacients)
app.use('/tickets',projectsRoutesTickets)

export default app;