import { Schema, model } from "mongoose";
import { TimestampedEntity } from "../../types";
import StudentLead from "./StudentLead";
import TutorLead from "./TutorLead";

export interface User extends TimestampedEntity {
    name: {
        first: string,
        last: string
    };
    email: string;
    firebaseId: string;
    avatar?: string;
    tutorLead?: typeof TutorLead;
    studentLead?: typeof StudentLead;
    attachLeads: () => Promise<User>
}

const schema = new Schema<User>({
    name: {
        type: new Schema({
            first: String,
            last: String
        }), required: true
    },
    email: { type: String, required: true, unique: true },
    firebaseId: { type: String, required: true },
    avatar: { type: String, required: false }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

schema.virtual('tutorLead');
schema.virtual('studentLead');
schema.virtual('type');

schema.methods.attachLeads = async function (cb: any) {
    const tutorLead = await TutorLead.findOne({email: this.email});
    this.tutorLead = tutorLead;

    const studentLead = await StudentLead.findOne({email: this.email});
    this.studentLead = studentLead;

    this.type = 'student';
    if (this.tutorLead) {
        this.type = 'tutor';
    }
    
    return this;
}

export default model<User>('User', schema);