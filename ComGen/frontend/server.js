import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

console.log('Starting server...');
console.log('Port:', port);
console.log('Directory:', __dirname);

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// Handle React routing - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server is running on http://0.0.0.0:${port}`);
  console.log(`✅ Serving from: ${join(__dirname, 'dist')}`);
}).on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});
