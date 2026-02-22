import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

// Load env vars
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI not found in .env');
    process.exit(1);
}

// Model definitions (inline since we can't easily import from src in a standalone script without more setup)
const SettingSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: mongoose.Schema.Types.Mixed
});

const OrderSchema = new mongoose.Schema({
    full_name: String,
    phone: String,
    province: String,
    delivery_location: String,
    delivery_priority: String,
    total_price: Number,
    product_id: String,
    quantity: Number,
    status: { type: String, default: 'pending' },
    created_at: { type: Date, default: Date.now }
});

const Setting = mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

async function init() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected!');

        // 1. Initialize Settings (Admin Password)
        console.log('Initializing settings...');
        const existingPassword = await Setting.findOne({ key: 'admin_password' });
        if (!existingPassword) {
            await Setting.create({
                key: 'admin_password',
                value: 'saint123'
            });
            console.log('Default admin password set to: saint123');
        } else {
            console.log('Admin password already exists in DB.');
        }

        // 2. Create collections (by forcing a ping or just finishing)
        // In MongoDB collections are created when first data is inserted.
        // We've inserted a setting, so the 'settings' collection exists.

        console.log('Database initialization complete!');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Initialization failed:', error);
        process.exit(1);
    }
}

init();
