require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connexion réussie à MongoDB !'))
  .catch((err) => console.error('❌ Erreur MongoDB :', err));
