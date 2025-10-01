import fp from 'fastify-plugin';
import mongoose from 'mongoose';
import config from '../config/index.js';
import { dbConfig } from '../config/database.js';

async function mongoosePlugin(fastify, options) {
  try {
    await mongoose.connect(config.MONGODB_URI, dbConfig);
    
    fastify.log.info('MongoDB connected successfully');
    fastify.decorate('mongoose', mongoose);

    fastify.addHook('onClose', async (instance) => {
      await mongoose.connection.close();
      instance.log.info('MongoDB connection closed');
    });
  } catch (err) {
    fastify.log.error('MongoDB connection error:', err);
    throw err;
  }
}

export default fp(mongoosePlugin);