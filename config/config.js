// =========== PORT =========
process.env.PORT = process.env.PORT || 3200;
// ==========================

// =========== ambiente =====
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ==========================

// =========== BaseDatos ====
let urlDB;
if (process.env.NODE_ENV === 'dev') {
     urlDB = 'mongodb://localhost:27017/cafe';
} else {
     urlDB = process.env.MONGO_URL;
}
process.env.urlDB = urlDB;
// ===========================