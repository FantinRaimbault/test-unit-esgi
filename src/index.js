import express from 'express';
import mongoose from 'mongoose';
import User from './model/User';

(async () => {
    try {
        await mongoose.connect("mongodb+srv://root:root@backend-framework.sqzs7.mongodb.net/unit-test-esgi?retryWrites=true&w=majority", { tls: true, tlsAllowInvalidCertificates: true });
    
        const server = express();
        server.use(express.json())
        server.get('/', (req, res) => { res.status(200).json({ status: 'ok' }) });

        server.post('/users', (req, res) => { 
            const newUser = new User(req.body);

            if (!newUser.isValid()) {
                newUser.save()
                res.status(200).json({ status: 'User created !' })
            } else {
                res.status(400).json({ status: 'Invalid user' })
            }     
        });
    
        server.listen(3000, () => console.log('Server started on port 3000'));
    } catch (e) {
        console.error(e);
    }
})()