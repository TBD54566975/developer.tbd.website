const fs = require('fs');
const { DidDht } = require('@web5/dids');

async function createAndSaveDID() {
    try {
    
        const didDht = await DidDht.create({ publish: true });
        const exportedDid = await didDht.export();
   
        fs.writeFileSync('reusableDidDht.json', JSON.stringify(exportedDid, null, 2), 'utf8');
        console.log('DID created and saved:', didDht.uri);
    } catch (error) {
        console.error('Failed to create and save DID:', error);
    }
}

createAndSaveDID();
