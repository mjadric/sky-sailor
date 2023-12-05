const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const [existingUser] = await db
      .promise()
      .query("SELECT * FROM account WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ error: "User with that email already exists." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const accountData = {
      email,
      firstName,
      lastName,
      passwordHash: hashedPassword,
    };

    await db.promise().query("INSERT INTO account SET ?", accountData);

    res.status(201).json({ message: "User successfully registered." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [results] = await db
      .promise()
      .query("SELECT * FROM account WHERE email = ?", [email]);
    console.log("Database query results:", results);

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }

    const user = results[0];

    console.log("User data from the database:", user);

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }

    const token = jwt.sign({ userId: user.email }, "secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
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
    return res.status(500).json({
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
