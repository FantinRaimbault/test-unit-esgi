import { DateTime } from 'luxon';
import { ApiEmailValidator } from '../src/ApiEmailValidator';
import { User } from '../src/User';

describe('test user functions', () => {


    it('should be a good user validation', () => {
        const apiEmailValidator = new ApiEmailValidator()
        apiEmailValidator.check = jest.fn((email) => true)
        const user = new User({
            email: 'fantin@malou.io',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Raimbault',
            firstName: 'Fantin',
            apiEmailValidator
        })
        expect(
            user.isValid()
        ).toBe(true);
    });
    
    // it('should be a wrong user validation because of birth date', () => {
    //     const user = new User({
    //         email: 'fantin@malou.io',
    //         birthDate: DateTime.now().minus({ years: 10 }).toJSDate(),
    //         lastName: 'Raimbault',
    //         firstName: 'Fantin'
    //     })
    //     expect(
    //         user.isValid()
    //     ).toBe(false);
    // });
    
    // it('should be a wrong user validation because of email', () => {
    //     const user = new User({
    //         email: 'fantinmalou.io',
    //         birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
    //         lastName: 'Raimbault',
    //         firstName: 'Fantin'
    //     })
    //     expect(
    //         user.isValid()
    //     ).toBe(false);
    // });
    
    // it('should be a wrong user validation because of firstName', () => {
    //     const user = new User({
    //         email: 'fantinmalou.io',
    //         birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
    //         lastName: 'Raimbault',
    //     })
    //     expect(
    //         user.isValid()
    //     ).toBe(false);
    // });
})    
