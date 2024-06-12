import app from './app.js'
import {sequelize} from './database/database.js'
import './models/Medic.js'
import './models/Pacient.js'
import './models/Ticket.js'

async function main(){
    try{
        await sequelize.authenticate()
        console.log('base de datos conectado');
        await sequelize.sync({force:false})
        app.listen(3000);
        console.log('Server on port 3000');
    } catch (error){
        console.error("Unable to connect to the database: ",error);
    }
}
main();