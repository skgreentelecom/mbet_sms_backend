const express = require('express');
const router = express.Router();
const senderidController = require('../controllers/users/senderidController');
const authenticateToken = require('../middleware/auth');

/**  sender IDs */
// Route to add a new Sender ID (with JWT authentication)
router.post('/senderids', authenticateToken, senderidController.createSenderid);

// Route to view all Sender IDs (with JWT authentication)
router.get('/senderids', authenticateToken, senderidController.getAllSenderids);

// Route to view a single Sender ID by ID (with JWT authentication)
router.get('/senderids/:id', authenticateToken, senderidController.getSenderidById);

// Route to edit (update) a Sender ID (with JWT authentication)
router.put('/senderids/:id', authenticateToken, senderidController.updateSenderid);

// Route to delete a Sender ID (with JWT authentication)
router.delete('/senderids/:id', authenticateToken, senderidController.deleteSenderid);

// Route to change status
router.patch('/senderids/:id/status', authenticateToken, senderidController.updateSenderidStatus);







module.exports = router;