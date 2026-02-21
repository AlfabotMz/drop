import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(process.cwd(), 'orders.json');

class JsonDatabase {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
    }
  }

  exec(sql) {
    // Basic SQL execution for table creation - ignored as we use JSON structure
    console.log('SQL Exec ignored (JSON fallback):', sql);
  }

  prepare(sql) {
    const isInsert = sql.toLowerCase().includes('insert into');
    const isSelect = sql.toLowerCase().includes('select');

    return {
      run: (...params) => {
        if (isInsert) {
          const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
          const newOrder = {
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
          return { lastInsertRowid: newOrder.id };
        }
        return { lastInsertRowid: 0 };
      },
      all: () => {
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
