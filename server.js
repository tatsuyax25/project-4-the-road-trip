require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');

require('./config/database');

// Require controllers here

const app = express();

// Serve favicon in production if it exists
const faviconPath = path.join(__dirname, 'build', 'favicon.ico');
if (process.env.NODE_ENV === 'production') {
  try {
    if (require('fs').existsSync(faviconPath)) {
      app.use(favicon(faviconPath));
    }
  } catch (err) {
    console.error('Error loading favicon:', err.message);
  }
}
app.use(logger('dev'));
app.use(express.json());
// Serve static files from build directory
const buildPath = path.join(__dirname, 'build');
console.log('Build path:', buildPath);
const buildExists = require('fs').existsSync(buildPath);
console.log('Build directory exists:', buildExists);

if (!buildExists) {
  console.error('ERROR: Build directory not found! The React app was not built properly.');
  console.error('Make sure your Render build command is: npm install --legacy-peer-deps && npm run build');
}

app.use(express.static(buildPath));

// Configure the auth middleware
app.use(require('./config/auth')); 

// API routes must be before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/likes', require('./routes/api/likes'));

// "catch all" route - serve React app
app.get('/*', function(req, res) {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  console.log('Serving index.html from:', indexPath);
  console.log('Index.html exists:', require('fs').existsSync(indexPath));
  
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Build files not found. Make sure the app was built properly.');
  }
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});
