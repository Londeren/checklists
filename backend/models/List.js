import mongoose from 'mongoose';
import {v4 as uniqueId}  from 'node-uuid';
import Item from './Item';

const listSchema = mongoose.Schema({
  id: {type: String, default: uniqueId, required: true},
  templateId: {type: String},
  name: {type: String},
  items: [Item.schema]
});

listSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;

    return ret;
  }
});

const List = mongoose.model('List', listSchema);

export default List;