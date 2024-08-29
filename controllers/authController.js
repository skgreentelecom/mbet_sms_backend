const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role, Permission } = require('../models');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email and include role and permissions
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        as: 'role',
        include: {
          model: Permission,
          as: 'permissions',
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.roleId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Prepare user details to return (excluding password)
    const userDetails = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: {
        id: user.role.id,
        name: user.role.name,
        permissions: user.role.permissions.map(permission => ({
          id: permission.id,
          name: permission.name,
          description: permission.description,
        })),
      },
    };

    return res.json({ token, user: userDetails });
  } catch (error) {
    console.error('Error during login process:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
