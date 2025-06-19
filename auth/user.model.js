import mongoose from 'mongoose';

mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

export default mongoose.model('User');