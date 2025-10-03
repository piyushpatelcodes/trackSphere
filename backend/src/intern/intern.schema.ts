import { Schema, Document } from 'mongoose';

export const InternSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  college: { type: String },
  course: { type: String },
  skills: { type: [String] },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  projectAssigned: { type: [String] },
});

export interface Intern extends Document {
  name: string; 
  email: string;
  phone?: string;
  college?: string;
  course?: string;
  skills: string[];
  startDate: Date;
  endDate?: Date;
  projectAssigned: string[];
}
