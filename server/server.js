const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Import here
const path = require('path');

const authRoutes = require('./routes/authRoutes'); 
const cartRoutes = require('./routes/cartRoutes');
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true                
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin', adminRoutes);

//handle undefined routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// handle throw from try catch blocks
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});