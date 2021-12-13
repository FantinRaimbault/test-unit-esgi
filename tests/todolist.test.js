import { DateTime } from 'luxon';
import ToDoList from '../src/model/ToDoList';
import User from '../src/model/User';

describe('test user functions', () => {

    test('User has already a todolist', async () => {
        jest.spyOn(ToDoList, 'findOne').mockReturnValue(Promise.resolve({
            title: 'title',
            user: '507f191e810c19729de860ea',
            items: [{
                name: 'a name',
                value: 'value'
            }]
        }))

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
            await user.hasATodolist()
        ).toBe(true);
    });

})    
