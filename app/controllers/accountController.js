const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const [existingUser] = await db
      .promise()
      .query("SELECT * FROM account WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      return res.status(409).json({ success: false, error: "User already exists. Please log in." });
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
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [results] = await db
      .promise()
      .query("SELECT * FROM account WHERE email = ?", [email]);

    if (results.length === 0) {
      return res.status(401).json({ success: false, error: "Account doesn't exist" });
    }

    const user = results[0];

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: "Invalid login credentials." });
    }

    const token = jwt.sign({ userId: user.email }, "secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error." });
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
    console.error("Error adding account:", err); // Dodano ispisivanje pogreške u konzoli radi debagiranja

    res.status(500).json({
      status: "failed to add account",
      message: err.message,
    });
  }
};


module.exports = {
  userSignUp,
  userLogin,
  getAllAccounts,
  getAccountById,
  addAccount,
};
