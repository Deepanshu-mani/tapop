const bcrypt = require('bcrypt');
const password = "securePass123"; // the plain password you want to hash

// Hash the password
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log("Hashed Password:", hashedPassword); // Log the hashed password

  // Now, simulate user login
  const userInputPassword = "securePass123"; // the password entered by the user

  bcrypt.compare(userInputPassword, hashedPassword, (err, isValid) => {
    if (err) throw err;
    console.log("Password Valid:", isValid); // Should log true
  });
});