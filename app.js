// HTTP modülünü dahil ediyoruz.
const http = require('node:http');

// Uygulamanın çalışacağı port.
const PORT = process.env.PORT || 3000;

// HTTP sunucusunu oluşturuyoruz.
const server = http.createServer((req, res) => {

    // Health-check endpoint.
    if (req.url === '/health') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            status: 'UP',
            application: 'jenkins-cicd-demo'
        }));

        return;
    }

    // Ana endpoint.
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
        message: 'Jenkins ile Otomatik Deployment Basarili!',
        version: '2.0.0'
    }));
});

// Uygulamayı başlatıyoruz.
if (require.main === module) {
    server.listen(PORT, '0.0.0.0', () => {
        console.log(`Application running on port ${PORT}`);
    });
}

// Testlerde kullanabilmek için export ediyoruz.
module.exports = server;