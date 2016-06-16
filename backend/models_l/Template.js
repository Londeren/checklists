import mongoose from 'mongoose';
import {v4 as uniqueId}  from 'node-uuid';
import Item from './Item';

const templateSchema = mongoose.Schema({
  id: {type: String, default: uniqueId, required: true},
  name: {type: String},
  items: [Item.schema]
});

const Template = mongoose.model('Template', templateSchema);

export default Template;