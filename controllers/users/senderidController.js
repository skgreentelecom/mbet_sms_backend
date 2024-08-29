// controllers/senderidController.js

const { Senderid } = require('../../models');

// Add a new Sender ID
exports.createSenderid = async (req, res) => {
    try {
      const { name, desc } = req.body;
  
      // Attempt to create a new Sender ID
      const newSenderid = await Senderid.create({ name, desc });
      res.status(201).json(newSenderid);
  
    } catch (error) {
      // Handle validation errors (including empty strings)
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.errors.map(e => e.message) });
      }
  
      // Handle unique constraint error
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'The name must be unique. This name already exists.' });
      }
  
      // Handle other errors
      res.status(500).json({ error: 'An error occurred while creating the Sender ID' });
    }
};

// View all Sender IDs
exports.getAllSenderids = async (req, res) => {
  try {
    const senderids = await Senderid.findAll();
    res.status(200).json(senderids);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the Sender IDs' });
  }
};

// View a single Sender ID by ID
exports.getSenderidById = async (req, res) => {
  try {
    const { id } = req.params;
    const senderid = await Senderid.findByPk(id);
    if (!senderid) {
      return res.status(404).json({ error: 'Sender ID not found' });
    }
    res.status(200).json(senderid);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the Sender ID' });
  }
};

// Edit (Update) a Sender ID
exports.updateSenderid = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, desc } = req.body;
  
      // Fetch the existing Sender ID
      const senderid = await Senderid.findByPk(id);
      if (!senderid) {
        return res.status(404).json({ error: 'Sender ID not found' });
      }
  
      // Check if name is provided and is not empty
      if (name === undefined || name.trim() === '') {
        return res.status(400).json({ error: 'The name field is required and cannot be empty' });
      }
  
      // Ensure the name is unique (only if it is being updated)
      if (name !== senderid.name) {
        const existingSenderid = await Senderid.findOne({ where: { name } });
        if (existingSenderid) {
          return res.status(400).json({ error: 'The name must be unique. This name already exists.' });
        }
      }
  
      // Update the Sender ID
      await senderid.update({ name, desc });
      res.status(200).json(senderid);
  
    } catch (error) {
      // Handle Sequelize validation errors
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.errors.map(e => e.message) });
      }
  
      // Handle other errors
      res.status(500).json({ error: 'An error occurred while updating the Sender ID' });
    }
  };

// Delete a Sender ID
exports.deleteSenderid = async (req, res) => {
  try {
    const { id } = req.params;
    const senderid = await Senderid.findByPk(id);
    if (!senderid) {
      return res.status(404).json({ error: 'Sender ID not found' });
    }
    await senderid.destroy();
    res.status(200).json({ message: 'Sender ID deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the Sender ID' });
  }
};


exports.updateSenderidStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Validate status
      if (status !== 'active' && status !== 'inactive') {
        return res.status(400).json({ error: 'Status must be either "active" or "inactive"' });
      }
  
      // Find the SenderID by ID
      const senderid = await Senderid.findByPk(id);
      if (!senderid) {
        return res.status(404).json({ error: 'Sender ID not found' });
      }
  
      // Update the status
      await senderid.update({ status });
  
      // Respond with updated SenderID
      res.status(200).json(senderid);
  
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the Sender ID status' });
    }
  };
