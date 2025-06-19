import mongoose from 'mongoose';

mongoose.model('Order', {
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
});

export default mongoose.model('Order');