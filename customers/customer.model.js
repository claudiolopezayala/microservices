import mongoose from 'mongoose';

mongoose.model('Customer', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: true
    },
});

export default mongoose.model('Customer');