import mongoose from 'mongoose';
import { ApiSendEmail } from '../ApiSendEmail';
import Item from './Item';

const toDoListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

toDoListSchema.methods.addItem = async function (item) {
    const nbItems = await Item.countDocuments({ toDoList: this._id })
    if (nbItems >= 10) {
        throw new Error('Todolist is full')
    }
    if (item?.content?.length > 1000) {
        throw new Error('Item value too long')
    }
    if (nbItems === 7)  {
        const { user: { email } } = await this.populate('user')
        ApiSendEmail.send(email, 'you can only add two additional elements')
    }

    if (nbItems > 0) {
        const lastItem = await Item.findOne({ toDoList: this._id }, {}, { sort: { 'created_at': -1 } })
        const differenceBetweenLastItemDateAndNow = Math.abs(Math.round((Date.now() - lastItem.createdAt.getTime()) / 1000 / 60))
        if (differenceBetweenLastItemDateAndNow <= 30) {
            throw new Error('Cant add item now, please wait 30 mins')
        }
    }
    return new Item({ ...item, toDoList: this._id }).save();
}

const ToDoList = mongoose.model('ToDoList', toDoListSchema);
export default ToDoList;