import express from 'express';
import mongoose from 'mongoose';
import User from './model/User';

(async () => {
    try {
        await mongoose.connect("mongodb+srv://root:root@backend-framework.sqzs7.mongodb.net/unit-test-esgi?retryWrites=true&w=majority");
    
        const server = express();
        server.get('/', (req, res) => { res.status(200).json({ status: 'ok' }) });
    
        server.listen(3000, () => console.log('Server started on port 3000'));
    } catch (e) {
        console.error(e);
    }
})()