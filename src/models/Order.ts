import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    full_name: string;
    phone: string;
    province: string;
    delivery_location: string;
    delivery_priority: string;
    total_price: number;
    product_id: string;
    quantity: number;
    status: string;
    created_at: Date;
}

const OrderSchema: Schema = new Schema({
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    province: { type: String, required: true },
    delivery_location: { type: String, required: true },
    delivery_priority: { type: String, required: true },
    total_price: { type: Number, required: true },
    product_id: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    status: { type: String, default: 'pending' },
    created_at: { type: Date, default: Date.now }
}, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret: any) => {
            ret.id = ret._id.toString();
            return ret;
        }
    },

    toObject: { virtuals: true }
});


export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
