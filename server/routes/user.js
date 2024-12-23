import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ status: true, message: 'User created successfully' });
    } catch (err) {
        console.error('Error in signup route:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        return res.status(200).json({ status: true, message: 'Login successful' });
    } catch (error) {
        console.error('Error in login route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not registered" });
        }

        // Generate JWT token with user id
        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '1h' });

        // Set up nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Use App Password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password',
            text: `Click the link to reset your password: http://localhost:5173/resetPassword/${token}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ status: true, message: "Email sent successfully" });

    } catch (error) {
        console.error("Error in forgot-password route:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.KEY);
        const userId = decoded.id;

        // Hash the new password
        const hashPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await User.findByIdAndUpdate(userId, { password: hashPassword });

        return res.status(200).json({ status: true, message: "Password updated successfully" });
    } catch (err) {
        console.error("Error in reset-password route:", err);
        return res.status(400).json({ message: "Invalid or expired token" });
    }
});
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ status: false, message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ status: false, message: 'Forbidden' });
        }
        req.userId = decoded.id;
        next();
    });
};
// Verify Route
router.get('/verify', verifyToken, (req, res) => {
    return res.json({ status: true, message: 'Authorized' });
});

router.get('/logout', (req, res) => {
    const token = req.cookies.token;
    console.log("Token before clearing:", token); // Debug
    res.clearCookie('token');
    return res.json({ status: true, message: 'Logged out' });
});
// Export the router
export { router as UserRouter };
