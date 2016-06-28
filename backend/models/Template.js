import mongoose from 'mongoose';
import {v4 as uniqueId}  from 'node-uuid';
import Item from './Item';

const templateSchema = mongoose.Schema({
  id: {type: String, default: uniqueId, required: true},
  name: {type: String},
  items: [Item.schema]
});

templateSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret._id;
    delete ret.__v;

    return ret;
  }
});

const Template = mongoose.model('Template', templateSchema);

export default Template;