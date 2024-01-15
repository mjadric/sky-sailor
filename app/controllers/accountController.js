const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const isInvalidDomain = email.endsWith('@sky-sailor.com');
    if (isInvalidDomain) {
      return res.status(400).json({ success: false, error: "Invalid email address." });
    }

    const isEmailAlreadyRegistered = async (email) => {
      try {
        const [result] = await db
          .promise()
          .query("SELECT * FROM account WHERE email = ?", [email]);
    
        return result.length > 0;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    
    const isEmailTaken = await isEmailAlreadyRegistered(email);

    if (isEmailTaken) {
      return res.status(409).json({ success: false, error: "Email is already registered. Please log in." });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const [result] = await db
      .promise()
      .query("INSERT INTO account (email, passwordHash, firstName, lastName) VALUES (?, ?, ?, ?)", [email, passwordHash, firstName, lastName]);

    if (result.affectedRows === 1) {
      res.status(201).json({ success: true, message: "User registered successfully." });
    } else {
      res.status(500).json({ success: false, error: "Registration failed. Please try again." });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [adminResults] = await db
      .promise()
      .query("SELECT * FROM adminaccount WHERE email = ?", [email]);

    let user;

    if (adminResults.length > 0) {
      const admin = adminResults[0];

      if (admin.active) {
        return res.status(401).json({ success: false, error: "Account is inactive" });
      }

      user = admin;
    } else {
      const [userResults] = await db
        .promise()
        .query("SELECT * FROM account WHERE email = ?", [email]);

      if (userResults.length > 0) {
        user = userResults[0];
      } else {
        return res.status(401).json({ success: false, error: "Account doesn't exist" });
      }
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: "Invalid login credentials." });
    }

    const role = adminResults.length > 0 ? 'admin' : 'user';

    const token = jwt.sign({ userId: user.email, role }, "shared_secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};

const lastResetTimes = new Map(); 
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const lastResetTime = lastResetTimes.get(email);

    if (lastResetTime && Date.now() - lastResetTime < 24 * 60 * 60 * 1000) {
      return res.status(400).json({ success: false, error: 'You can only reset your password once in a day.' });
    }

    const [userResults] = await db.promise().query('SELECT * FROM account WHERE email = ?', [email]);

    if (userResults.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await db.promise().query('UPDATE account SET passwordHash = ? WHERE email = ?', [newPasswordHash, email]);

    lastResetTimes.set(email, Date.now());

    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


const getAllAccounts = async (req, res) => {
  try {
    const [data] = await db.promise().query("SELECT * FROM ACCOUNT");

    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        accounts: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get all accounts",
      message: err.message,
    });
  }
};

const getAccountById = async (req, res) => {
  try {
    const [data] = await db
      .promise()
      .query(`SELECT * FROM ACCOUNT WHERE account_ID = ${req.params.id}`);

    if (data.length === 0) {
      return res.status(404).json({
        status: "failed to get account",
        message: "Account not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        account: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get account",
      message: err.message,
    });
  }
};

const addAccount = async (req, res) => {
  try {
    const [data] = await db
      .promise()
      .query("INSERT INTO ACCOUNT SET ?", req.body);

    res.status(200).json({
      status: "success",
      data: {
        account: data,
      },
    });
  } catch (err) {
    console.error("Error adding account:", err); 

    res.status(500).json({
      status: "failed to add account",
      message: err.message,
    });
  }
};

const getAccount = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, error: 'Unauthorized: No user data available' });
  }

  try {
    console.log('User ID from token:', user.userId);

    const [data] = await db.promise().query(`
      SELECT account_ID, firstName, lastName, email, phoneNumber
      FROM account
      WHERE email = ?
    `, [user.userId]);

    console.log('Fetched data:', data);

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User data not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        account: data[0],
      },
    });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};


const authenticateToken = async (req, res, next) => {
  const tokenHeader = req.headers['authorization'];

  if (!tokenHeader) {
    return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
  }

  const token = tokenHeader.split(' ')[1];

  console.log('Received Token:', token);

  try {
    const user = await jwt.verify(token, 'shared_secret_key');
    req.user = user;
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err);
    return res.status(403).json({ success: false, error: 'Forbidden: Invalid token' });
  }
};

const updatePhoneNumber = async (req, res) => {
try {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, error: 'Unauthorized: No user data available' });
  }

  const newPhoneNumber = req.body.phoneNumber;

  const existingUser = await getUserByEmail(user.userId);

  if (!existingUser) {
    console.error('User not found in the database');
    return res.status(404).json({ success: false, message: 'User not found in the database' });
  }

  await db.promise().query(
    'UPDATE account SET phoneNumber = ? WHERE email = ?',
    [newPhoneNumber, user.userId]
  );

  console.log('Phone number updated successfully');
  return res.json({ success: true, message: 'Phone number updated successfully' });
} catch (error) {
  console.error('Error updating phone number:', error);
  return res.status(500).json({ success: false, error: 'Internal server error' });
}
};

const getUserByEmail = async (email) => {
try {
  const [results] = await db.promise().query("SELECT * FROM account WHERE email = ?", [email]);
  return results.length > 0 ? results[0] : null;
} catch (error) {
  console.error('Error getting user by email:', error);
  return null;
}
};

module.exports = {
  userSignUp,
  login,
  getAllAccounts,
  getAccountById,
  addAccount,
  resetPassword,
  getAccount,
  updatePhoneNumber,
  authenticateToken
};
