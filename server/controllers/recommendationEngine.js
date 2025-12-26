const { getContentBasedRecommendations } = require('../services/recommendationService');

// This controller handles the GET /api/recommendations route
async function getRecommendations(req, res) {
    try {
        // assuming authMiddleware sets req.user.id
        const customerId = req.user.id;

        const recommendations = await getContentBasedRecommendations(customerId);

        res.json({
            recommendations: recommendations.map(book => ({
                isbn: book.ISBN,
                title: book.title,
                price: book.price,
                category: book.category,
                reason: "Similar to your previous purchases"
            }))
        });
    } catch (err) {
        console.error("Error in recommendationEngine:", err);
        res.status(500).json({ error: "Failed to generate recommendations" });
    }
}

module.exports = { getRecommendations };
