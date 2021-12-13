import { DateTime } from 'luxon'
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    content: { type: String, max: 1000, required: true },
    toDoList: { type: mongoose.Schema.Types.ObjectId, ref: 'ToDoList', required: true },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;