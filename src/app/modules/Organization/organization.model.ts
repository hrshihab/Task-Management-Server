import { Schema, model } from 'mongoose';
import { TOrganization } from './organization.interface';

const organizationSchema = new Schema<TOrganization>({
  name: { type: String, unique: true, trim: true, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Organization = model<TOrganization>(
  'Organization',
  organizationSchema,
);
