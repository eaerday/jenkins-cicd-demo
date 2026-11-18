// Node.js'in test modülünü dahil ediyoruz.
const test = require('node:test');

// Test sonuçlarını karşılaştırmak için kullanıyoruz.
const assert = require('node:assert/strict');

// Uygulamamızın HTTP sunucusunu dahil ediyoruz.
const server = require('../app');

// Uygulamamızın health endpoint'ini test ediyoruz.
test('Health endpoint should return UP', async () => {

    // Test için sunucuyu boş bir portta başlatıyoruz.
    await new Promise(resolve => server.listen(0, resolve));

    try {

        // Sunucunun çalıştığı portu öğreniyoruz.
        const port = server.address().port;

        // Health endpoint'ine HTTP isteği gönderiyoruz.
        const response = await fetch(
            `http://127.0.0.1:${port}/health`
        );

        // Gelen cevabı JSON formatına çeviriyoruz.
        const data = await response.json();

        // HTTP durum kodunun 200 olduğunu doğruluyoruz.
        assert.equal(response.status, 200);

        // Uygulamanın UP durumunda olduğunu doğruluyoruz.
        assert.equal(data.status, 'UP');

    } finally {

        // Test tamamlandığında sunucuyu kapatıyoruz.
        await new Promise(resolve => server.close(resolve));
    }
});