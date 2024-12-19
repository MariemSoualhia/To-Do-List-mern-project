const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Enregistrer un utilisateur
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "Email déjà utilisé" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ message: "Utilisateur créé", user });
};

// Connexion utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};
const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // Récupère l'utilisateur connecté depuis le middleware auth
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération du profil utilisateur.",
      });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
