import { DateTime } from 'luxon';
import Item from '../src/model/Item';
import ToDoList from '../src/model/ToDoList';
import User from '../src/model/User';

describe('test user functions', () => {

    // afterEach(() => {
    //     jest.clearAllMocks();
    // });

    // it('should not create a todolist if he already has one', async () => {
    //     jest.spyOn(ToDoList, 'findOne').mockReturnValue(Promise.resolve({
    //         title: 'title',
    //         user: '507f191e810c19729de860ea',
    //     }))

    //     const user = new User({
    //         _id: '507f191e810c19729de860ea',
    //         name: 'name',
    //         email: 'name@email.com',
    //         birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
    //         lastName: 'Lastname',
    //         firstName: 'John',
    //         password: 'azertyuiop',
    //     });

    //     expect(
    //         await user.canCreateAToDoList()
    //     ).toBe(false);
    // });

    // it('should create a todolist if he doesnt have one', async () => {
    //     jest.spyOn(ToDoList, 'findOne').mockReturnValue(Promise.resolve(null))

    //     const user = new User({
    //         _id: '507f191e810c19729de860ea',
    //         name: 'name',
    //         email: 'name@email.com',
    //         birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
    //         lastName: 'Lastname',
    //         firstName: 'John',
    //         password: 'azertyuiop',
    //     });

    //     expect(
    //         await user.canCreateAToDoList()
    //     ).toBe(true);
    // });

    // it('should be not possible to add more than 10 items in a todolist', async () => {
    //     jest.spyOn(Item, 'find').mockReturnValue(({ count: () => 10 }))
    //     const todolist = new ToDoList({
    //         _id: '507f191e810c19729de860ea',
    //         title: 'un title',
    //     })
    //     await expect(todolist.addItem({
    //         name: 'value',
    //         content: 'lalalalalala'
    //     })).rejects.toThrow();
    // })

    // it('shouldnt be possible possible to add an item with more than 1000 characters', async () => {
    //     jest.spyOn(Item, 'find').mockReturnValue(({ count: () => 0 }))
    //     const todolist = new ToDoList({
    //         _id: '507f191e810c19729de860ea',
    //         title: 'un title',
    //     })

    //     await expect(todolist.addItem({
    //         name: 'value',
    //         content: new Array(1001).fill('a').join('')
    //     })).rejects.toThrow();
    // })

    it('shouldnt be possible to add an item until 30mins have not elapsed', async () => {
        jest.spyOn(Item, 'find').mockReturnValue(({ count: () => 0 }))
        jest.spyOn(Item, 'findOne').mockReturnValue(Promise.resolve({
            name: 'a name',
            content: 'value',
            createdAt: DateTime.now().minus({ minutes: 20 }).toJSDate(),
        }))

        const todolist = new ToDoList({
            _id: '507f191e810c19729de860ea',
            title: 'un title',
        })

        await expect(todolist.addItem({
            name: 'value',
            content: 'not possible ...'
        })).rejects.toThrow();
    })

})    
