import mongoose from 'mongoose';
import {v4 as uniqueId}  from 'node-uuid';
import Item from './Item';
import User from './User';

const listSchema = mongoose.Schema({
  id: {type: String, default: uniqueId, required: true, unique: true},
  name: {type: String, required: true},
  user: {type: String, ref: 'User', required: true},
  items: [Item.schema],
  templateId: {type: String}
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