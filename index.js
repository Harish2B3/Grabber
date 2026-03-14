const express = require("express");

const app = express();

// Trust proxy settings are crucial for getting the correct IPv4 address
// when the server is behind a proxy like Nginx or a cloud load balancer.
app.set('trust proxy', true);

app.get("/", (req, res) => {
    let ip = req.ip;

    // Normalize IPv6-mapped IPv4 address (e.g., ::ffff:192.168.1.1)
    if (ip.includes('::ffff:')) {
        ip = ip.split(':').pop();
    }

    // Normalize local IPv6 loopback (::1) to common IPv4 loopback (127.0.0.1)
    if (ip === '::1') {
        ip = '127.0.0.1';
    }

    console.log(`[${new Date().toISOString()}] Connection from: ${ip}`);

    res.send(`thanks for visiting`);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\x1b[35m[SYSTEM]\x1b[0m Node server initialized...`);
    console.log(`\x1b[36m[SERVER]\x1b[0m Running on http://localhost:${PORT}`);
    console.log(`\x1b[32m[STATUS]\x1b[0m IPv4 Priority Extraction Enabled`);
});