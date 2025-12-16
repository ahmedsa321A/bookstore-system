const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Import here

const authRoutes = require('./routes/authRoutes'); 
const cartRoutes = require('./routes/cartRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true                
}));

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);                 

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});