
const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        return res.status(403).json("You are not allowed to perform this action!");
    }
};

module.exports = verifyAdmin;
