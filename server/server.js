const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Import here
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});