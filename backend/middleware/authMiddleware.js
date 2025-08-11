// middleware/authMiddleware.js
// Middleware for protecting routes using Basic Authentication

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        // 401 Unauthorized, and tell the browser to prompt for credentials
        res.setHeader('WWW-Authenticate', 'Basic realm="Admin Access"');
        return res.status(401).json({ error: 'Not authorized, no credentials provided' });
    }

    // Get the base64 encoded credentials from the header (e.g., "Basic <base64_string>")
    const base64Credentials = authHeader.split(' ')[1];
    
    // Decode the base64 string to "username:password"
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    
    // Split the string into username and password
    const [username, password] = credentials.split(':');

    // Get the expected credentials from environment variables
    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    // Check if the provided credentials match the ones in the .env file
    if (username === expectedUsername && password === expectedPassword) {
        next(); // Credentials are valid, proceed to the next middleware/controller
    } else {
        // If they don't match, send a 401 Unauthorized error
        res.setHeader('WWW-Authenticate', 'Basic realm="Admin Access"');
        return res.status(401).json({ error: 'Not authorized, invalid credentials' });
    }
};
