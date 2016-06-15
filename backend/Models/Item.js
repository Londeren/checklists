import mongoose from 'mongoose';
import {v4 as uniqueId}  from 'node-uuid';

const itemSchema = mongoose.Schema({
  id: {type: String, default: uniqueId, required: true},
  name: {type: String},
  done: {type: Boolean}
});

const Item = mongoose.model('Item', itemSchema);

export default Item;