import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';

const DB_PATH = path.join(tmpdir(), 'orders.json');

interface Order {
  id: number;
  full_name: string;
  phone: string;
  province: string;
  delivery_location: string;
  delivery_priority: string;
  total_price: number;
  product_id: string;
  quantity: number;
  status: string;
  created_at: string;
}

class JsonDatabase {
  constructor() {
    this.init();
  }

  init() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
    }
  }

  exec(sql: string) {
    // Basic SQL execution for table creation - ignored as we use JSON structure
    console.log('SQL Exec ignored (JSON fallback):', sql);
  }

  prepare(sql: string) {
    const isInsert = sql.toLowerCase().includes('insert into');
    const isSelect = sql.toLowerCase().includes('select');

    return {
      run: (...params: any[]) => {
        try {
          if (isInsert) {
            console.log('Inserting into JSON DB with params:', params);
            if (!fs.existsSync(DB_PATH)) {
              console.log('DB file missing, creating it');
              fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
            }
            const fileContent = fs.readFileSync(DB_PATH, 'utf8');
            console.log('Current DB Content length:', fileContent.length);
            const data: Order[] = JSON.parse(fileContent);
            const newOrder: Order = {
              id: Date.now(),
              full_name: params[0],
              phone: params[1],
              province: params[2],
              delivery_location: params[3],
              delivery_priority: params[4],
              total_price: params[5],
              product_id: params[6],
              quantity: params[7],
              status: 'pending',
              created_at: new Date().toISOString()
            };
            data.push(newOrder);
            fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
            console.log('Successfully wrote to DB, new order ID:', newOrder.id);
            return { lastInsertRowid: newOrder.id };
          }
          return { lastInsertRowid: 0 };
        } catch (err) {
          console.error('Error in JsonDatabase.run:', err);
          throw err;
        }
      },
      all: (): Order[] => {
        if (isSelect) {
          return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')).reverse();
        }
        return [];
      }
    };
  }
}

const db = new JsonDatabase();
export default db;
