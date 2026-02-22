import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load env vars
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI not found in .env');
    process.exit(1);
}

// Model definitions
const SettingSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: mongoose.Schema.Types.Mixed
});

const Setting = mongoose.models.Setting || mongoose.model('Setting', SettingSchema);

async function init() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

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

        console.log('Database initialization complete!');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Initialization failed:', error);
        process.exit(1);
    }
}

init();
