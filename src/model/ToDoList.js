import { DateTime } from 'luxon'
import mongoose from 'mongoose';

const toDoListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    items: [{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }],
        validate: [items => items.length <= 10, '{PATH} exceeds the limit of {MAX} items']
    }]
})

const ToDoList = mongoose.model('ToDoList', toDoListSchema);
export default ToDoList;