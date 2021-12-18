import { DateTime } from 'luxon';
import { ApiSendEmail } from '../src/ApiSendEmail';
import Item from '../src/model/Item';
import ToDoList from '../src/model/ToDoList';
import User from '../src/model/User';

jest.setTimeout(10000)

describe('test user functions', () => {

    it('should not create a todolist if he already has one', async () => {
        jest.spyOn(ToDoList, 'findOne').mockResolvedValue({
            title: 'title',
            user: '124aze'
        })
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
            await user.canCreateAToDoList()
        ).toBe(false);
    });

    it('should create a todolist if he doesnt have one', async () => {
        jest.spyOn(ToDoList, 'findOne').mockResolvedValue(null)

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
            await user.canCreateAToDoList()
        ).toBe(true);
    });

    it('should be not possible to add more than 10 items in a todolist', async () => {
        jest.spyOn(Item, 'countDocuments').mockResolvedValue(10)
        const todolist = new ToDoList({
            _id: '507f191e810c19729de860ea',
            title: 'un title',
        })
        try {
            await todolist.addItem({
                name: 'value',
                content: 'lalalalalala'
            })
        } catch (error) {
            expect(error).toHaveProperty('message', 'Todolist is full');
        }
    })

    it('shouldnt be possible possible to add an item with more than 1000 characters', async () => {
        jest.spyOn(Item, 'countDocuments').mockResolvedValue(0)
        const todolist = new ToDoList({
            _id: '507f191e810c19729de860ea',
            title: 'un title',
        })
        try {
            await todolist.addItem({
                name: 'value',
                content: new Array(1001).fill('a').join('')
            })
        } catch (error) {
            expect(error).toHaveProperty('message', 'Item value too long');
        }
    })

    it('shouldnt be possible to add an item until 30mins have not elapsed', async () => {
        jest.spyOn(Item, 'countDocuments').mockResolvedValue(0)
        jest.spyOn(Item, 'findOne').mockResolvedValue({
            name: 'a name',
            content: 'value',
            createdAt: DateTime.now().minus({ minutes: 20 }).toJSDate(),
        })

        const todolist = new ToDoList({
            _id: '507f191e810c19729de860ea',
            title: 'un title',
        })

        try {
            await todolist.addItem({
                name: 'value',
                content: 'not possible ...'
            })
        } catch (error) {
            expect(error).toHaveProperty('message', 'Cant add item now, please wait 30 mins');
        }
    })

    it('should send email if its the eighth item in the todolist', async () => {
        jest.spyOn(Item, 'countDocuments').mockResolvedValue(7)
        jest.spyOn(Item, 'findOne').mockResolvedValue({
            name: 'a name',
            content: 'value',
            createdAt: DateTime.now().minus({ minutes: 40 }).toJSDate(),
        })
        jest.spyOn(Item.prototype, 'save').mockResolvedValue({})

        ApiSendEmail.send = jest.fn()

        const todolist = new ToDoList({
            _id: '507f191e810c19729de860ea',
            title: 'un title',
        })

        await todolist.addItem({
            name: 'value',
            content: 'not possible ...'
        })

        expect(ApiSendEmail.send).toHaveBeenCalled()
    })

    it('shouldnt send email if its other than the eighth item in the todolist', async () => {
        jest.spyOn(Item, 'countDocuments').mockResolvedValue(6)
        jest.spyOn(Item, 'findOne').mockResolvedValue({
            name: 'a name',
            content: 'value',
            createdAt: DateTime.now().minus({ minutes: 40 }).toJSDate(),
        })
        jest.spyOn(Item.prototype, 'save').mockResolvedValue({})

        ApiSendEmail.send = jest.fn()

        const todolist = new ToDoList({
            _id: '507f191e810c19729de860ea',
            title: 'un title',
        })

        await todolist.addItem({
            name: 'value',
            content: 'not possible ...'
        })

        expect(ApiSendEmail.send).not.toHaveBeenCalled()
    })

})    
