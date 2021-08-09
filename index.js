const fs = require('fs');
const sslCertificate = require('get-ssl-certificate-next');

(async () => {
    const data = fs.readFileSync(0, 'utf-8');
    const rows = data.split('\n');

    console.log('domain,validFrom,validTo');

    for (const row of rows) {
        try {
            const cert = await sslCertificate.get(row);
            const validFrom = new Date(cert.valid_from);
            const validTo = new Date(cert.valid_to);
            console.log(`${row},${validFrom.toISOString()},${validTo.toISOString()}`);
        } catch (err) {
            console.error(err);
        }
    }
})();
