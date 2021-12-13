import express from 'express';
import mongoose from 'mongoose';
import User from './model/User';
import ToDoList from './model/ToDoList';
import Item from './model/Item';

(async () => {
    try {
        await mongoose.connect("mongodb+srv://root:root@backend-framework.sqzs7.mongodb.net/unit-test-esgi?retryWrites=true&w=majority", { tls: true, tlsAllowInvalidCertificates: true });

        const server = express();
        server.use(express.json());
        server.get('/', async (req, res) => { res.status(200).json({ status: 'ok' }) });

        server.post('/users', async (req, res) => {
            const newUser = new User(req.body);

            if (newUser.isValid()) {
                await newUser.save();
                res.status(200).json({ status: 'User created !', user: newUser });
            } else {
                res.status(400).json({ status: 'Invalid user' });
            }
        });

        server.post('/toDoLists/:userId', async (req, res) => {

            const user = await User.findById(req.params.userId);

            if (user) {
                if (user.isValid() && (await !user.hasATodolist())) {
                    const toDoList = new ToDoList({ ...req.body, user: user._id });
                    await toDoList.save();
                    res.status(200).json({ status: 'ToDoList created !', toDoList });
                } else {
                    res.status(400).json({ status: 'User can\'t create a todolist' });
                }
            } else {
                res.status(404).json({ status: 'User not found' });
            }
        });

        server.post('/items/:toDoList', async (req, res) => {

            const toDoList = await ToDoList.findById(req.params.toDoList);

            if (toDoList) {

                const items = await Item.find({ toDoList: toDoList._id });

                if (items.length + 1 > 10) {
                    res.status(400).json({ status: 'ToDoList can\'t have more than 10 items' });
                }

                const lastItem = items[items.length - 1];

                const differenceBetweenLastItemDateAndNow = Math.abs(Math.round((Date.now() - lastItem.createdAt.getTime()) / 1000 / 60))

                if (lastItem === undefined || differenceBetweenLastItemDateAndNow >= 30) {
                    try {
                        const item = new Item({ ...req.body, toDoList: toDoList._id });
                        await item.save();
                        res.status(200).json({ status: 'Item created !' });
                    } catch (e) {
                        res.status(200).json({ status: 'Problem with the creation of item !' });
                    }
                } else {
                    res.status(400).json({ status: `A new item can only be created if the last item is older than 30 minutes, current: ${differenceBetweenLastItemDateAndNow} minutes` });
                }
            } else {
                res.status(404).json({ status: 'toDoList not found' });
            }
        });

        server.listen(3000, () => console.log('Server started on port 3000'));
    } catch (e) {
        console.error(e);
    }
})()