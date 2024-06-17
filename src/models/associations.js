import { Patient } from "./Patient.js";
import { ConsultingRoom } from "./ConsultingRoom.js";
import { Medic} from "./Medic.js";
import { Queue } from "./Queue.js";
import { Ticket } from "./Ticket.js";
import { Specialty } from "./Specialty.js";
import { Status } from "./Status.js";
import { User } from "./User.js"
import { Pay } from "./Pay.js"

//Define relationships

Medic.hasMany(ConsultingRoom, { foreignKey: 'medicId' });//esta pasa a
ConsultingRoom.belongsTo(Medic, { foreignKey: 'medicId' });//esta

Specialty.hasMany(Medic, { foreignKey: 'specialtyId' });
Medic.belongsTo(Specialty, { foreignKey: 'specialtyId' });

User.hasMany(Medic, { foreignKey: 'userId' });
Medic.belongsTo(User, { foreignKey: 'userId' });

Specialty.hasMany(Queue, { foreignKey: 'specialtyId' });
Queue.belongsTo(Specialty, { foreignKey: 'specialtyId' });

Medic.hasMany(Queue, { foreignKey: 'medicId' });
Queue.belongsTo(Medic, { foreignKey: 'medicId' });

Queue.hasMany(Ticket, { foreignKey: 'queueId' });
Ticket.belongsTo(Queue, { foreignKey: 'queueId' });

Medic.hasMany(Ticket, { foreignKey: 'medicId' });
Ticket.belongsTo(Medic, { foreignKey: 'medicId' });

ConsultingRoom.hasMany(Ticket, { foreignKey: 'consultingRoomId' });
Ticket.belongsTo(ConsultingRoom, { foreignKey: 'consultingRoomId' });

Status.hasMany(Ticket, { foreignKey: 'statusId' });
Ticket.belongsTo(Status, { foreignKey: 'statusId' });

Ticket.hasMany(Patient, { foreignKey: 'ticketId' });
Patient.belongsTo(Status, { foreignKey: 'ticketId' });

Specialty.hasMany(ConsultingRoom, { foreignKey: 'specialtyId' });
ConsultingRoom.belongsTo(Specialty, { foreignKey: 'specialtyId' });

User.hasMany(Medic, { foreignKey: 'userId' });
Medic.belongsTo(User, { foreignKey: 'userId' });

Patient.hasMany(Pay, { foreignKey: 'patientId' });
Pay.belongsTo(Patient, { foreignKey: 'patientId' });

Medic.hasMany(Pay, { foreignKey: 'medicId' });
Pay.belongsTo(Medic, { foreignKey: 'medicId' });

