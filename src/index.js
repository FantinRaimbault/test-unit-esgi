import express from 'express';
import mongoose from 'mongoose';
import User from './model/User';
import ToDoList from './model/ToDoList';

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
                res.status(200).json({ status: 'User created !', user: newUser  });
            } else {
                res.status(400).json({ status: 'Invalid user' });
            }     
        })

        server.post('/toDoList/:userId', async (req, res) => {
            
            const user = await User.findById(req.params.userId);

            if (user) {
                if (user.isValid() && !user.hasATodolist()) {
                    const toDoList = new ToDoList({ ...req.body, user: user._id });
                    await toDoList.save();
                    res.status(200).json({ status: 'ToDoList created !', toDoList });
                } else {
                    res.status(400).json({ status: 'User can\'t create a todolist' });
                }
            } else {
                res.status(404).json({ status: 'User not found' });
            }  
        })
    
        server.listen(3000, () => console.log('Server started on port 3000'));
    } catch (e) {
        console.error(e);
    }
})()