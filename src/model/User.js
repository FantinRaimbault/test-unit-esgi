import { DateTime } from 'luxon'
import mongoose from 'mongoose';
import ToDoList from './ToDoList';

const userSchema = new mongoose.Schema({
    email: String,
    birthDate: Date,
    lastName: String,
    firstName: String,
    password: String,
})

userSchema.methods.isValid = function () {
    return !!(this.firstName
        && this.lastName
        && this.email.match(/^\S+@\S+\.\S+$/)
        && DateTime.fromJSDate(this.birthDate).diffNow('years').years < - 13
        && this.password.length > 7
        && this.password.length < 41)
}

userSchema.methods.canCreateAToDoList = async function () {
    const toDoList = await ToDoList.findOne({ user: this._id })
    return (this.isValid() && !toDoList)
}

const User = mongoose.model('User', userSchema);
export default User;