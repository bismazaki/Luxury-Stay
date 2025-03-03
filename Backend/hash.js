const bcrypt = require("bcrypt");

bcrypt.hash("passwordadmin", 10, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Hashed Password:", hash);
});
