import { DateTime } from 'luxon'
import mongoose from 'mongoose';

class UserC {
    constructor({ email, firstName, lastName, birthDate, apiEmailValidator }) {
        Object.assign(this, { email, firstName, lastName, birthDate: new Date(birthDate), apiEmailValidator })
    }

    // isValid() {
    //     return !!(this.firstName && this.lastName && this.email.match(/^\S+@\S+\.\S+$/) && this._checkAge())
    // }
    
    isValid() {
        return !!(this.firstName && this.lastName && this.apiEmailValidator.check(this.email) && this._checkAge())
    }

    _checkAge(requiredAge = 13) {
        return DateTime.fromJSDate(this.birthDate).diffNow('years').years < -requiredAge;
    }
}

const userSchema = new mongoose.Schema({
    email: String,
    birthDate: Date,
    lastName: String,
    firstName: String,
    password: String,
})

const User = mongoose.model('User', userSchema);
export default User;