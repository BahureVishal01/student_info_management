const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const router = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    res.send('HEllo world');
})

app.use('/api', router);

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! server Shutting down...');
  console.error(err.stack);
  process.exit(1); 
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


