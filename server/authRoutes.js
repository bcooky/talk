const express = require("express");
const router = express.Router();

let users = [];

router.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.json({ success: false, message: "Username already taken" });
    }
    users.push({ username, password });
    res.json({ success: true });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.json({ success: false });
    }
    res.json({ success: true, user });
});

module.exports = router;
