import { DateTime } from 'luxon'

export class User {
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

export function test() {
    
}


// const user = new User({
//     email: 'fantin@malou.io',
//     birthDate: new Date(2000, 10, 20),
//     lastName: 'Raimbault',
//     firstName: 'Fantin'
// })
// console.log(
//     user.isValid()
// )
