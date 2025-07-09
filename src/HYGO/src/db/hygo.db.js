import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

dotenv.config();

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// DB Connection
const hygoConnection = mongoose.createConnection(process.env.HYGO_DB_URI);

// Load models dynamically
const models = {};
const modelsPath = path.join(__dirname, '..', 'models');

const files = fs.readdirSync(modelsPath);

for (const file of files) {
  if (file.endsWith('.model.js')) {
    const fullPath = path.join(modelsPath, file);
    const moduleURL = pathToFileURL(fullPath).href;

    const schemaModule = await import(moduleURL);
    const schema = schemaModule?.default;

    // ✅ Validate the schema is a Mongoose Schema
    if (!schema || !(schema instanceof mongoose.Schema)) {
      console.warn(`[WARN] Skipped invalid schema in file: ${file}`);
      continue;
    }

    const baseName = file.replace('.model.js', '');
    const modelName = `HYGO${baseName.charAt(0).toUpperCase()}${baseName.slice(1)}`;

    models[modelName] = hygoConnection.model(modelName, schema);
  }
}

export { hygoConnection, models as hygoModels };
