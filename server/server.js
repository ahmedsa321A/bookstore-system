const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());  
app.use(cors());

const authRoutes = require('./routes/authRoutes'); 
app.use('/api/auth', authRoutes);                 
app.use(cookieParser());
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});