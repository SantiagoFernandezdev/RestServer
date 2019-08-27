// =========== PORT =========
process.env.PORT = process.env.PORT || 3200;
// ==========================

// =========== ambiente =====
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ==========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '69651486049-7fs6v4s5mv79ffjep54beks1jutc5tsq.apps.googleusercontent.com';

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// =========== BaseDatos ====
let urlDB;
if (process.env.NODE_ENV === 'dev') {
     urlDB = 'mongodb://localhost:27017/cafe';
} else {
     urlDB = process.env.MONGO_URL;
}
process.env.urlDB = urlDB;
// ===========================