import app from './app.js'
import {sequelize} from './database/database.js'
import './models/Medic.js'
import './models/Patient.js'
import './models/ConsultingRoom.js'
import './models/Queue.js'
import './models/Specialty.js'
import './models/Status.js'
import './models/Ticket.js'
import './models/associations.js'
import './models/User.js'

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