import { DateTime } from 'luxon';
import User from '../src/model/User';

describe('test user functions', () => {

    it('should be a good user validation', () => {
        const user = new User({
            _id: '507f191e810c19729de860ea',
            name: 'name',
            email: 'name@email.com',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Lastname',
            firstName: 'John',
            password: 'azertyuiop',
        });

        expect(
            user.isValid()
        ).toBe(true);
    });

    test('age just before 13', () => {
        const user = new User({
            _id: '507f191e810c19729de860ea',
            name: 'name',
            email: 'name@email.com',
            birthDate: DateTime.now().minus({ years: 13 }).plus({ day: 1 }).toJSDate(),
            lastName: 'Lastname',
            firstName: 'John',
            password: 'azertyuiop',
        });

        expect(
            user.isValid()
        ).toBe(false);
    });

    test('age just after 13', () => {
        const user = new User({
            _id: '507f191e810c19729de860ea',
            name: 'name',
            email: 'name@email.com',
            birthDate: DateTime.now().minus({ years: 13 }).toJSDate(),
            lastName: 'Lastname',
            firstName: 'John',
            password: 'azertyuiop',
        });

        expect(
            user.isValid()
        ).toBe(true);
    });

    test('password more than 40 characters', () => {
        const user = new User({
            _id: '507f191e810c19729de860ea',
            name: 'name',
            email: 'name@email.com',
            birthDate: DateTime.now().minus({ years: 13 }).toJSDate(),
            lastName: 'Lastname',
            firstName: 'John',
            password: new Array(41).fill('a').join(''),
        });

        expect(
            user.isValid()
        ).toBe(false);
    });

    test('password under than 8 characters', () => {
        const user = new User({
            _id: '507f191e810c19729de860ea',
            name: 'name',
            email: 'name@email.com',
            birthDate: DateTime.now().minus({ years: 13 }).toJSDate(),
            lastName: 'Lastname',
            firstName: 'John',
            password: 'azertyu',
        });

        expect(
            user.isValid()
        ).toBe(false);
    });

    test('wrong email', () => {
        const user = new User({
            _id: '507f191e810c19729de860ea',
            name: 'name',
            email: 'nameemail.com',
            birthDate: DateTime.now().minus({ years: 13 }).toJSDate(),
            lastName: 'Lastname',
            firstName: 'John',
            password: 'azertyu',
        });

        expect(
            user.isValid()
        ).toBe(false);
    });
})    
