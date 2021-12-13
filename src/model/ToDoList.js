import { DateTime } from 'luxon'
import mongoose from 'mongoose';
import Item from './Item';

const toDoListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const ToDoList = mongoose.model('ToDoList', toDoListSchema);
export default ToDoList;