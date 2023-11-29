export async function createTextRecord(web5) {
// Create a plain text record
const { record } = await web5.dwn.records.create({
    data: "Hello Web5",
    message: {
        dataFormat: 'text/plain'
    }
});

return record;
}

export async function createJsonRecord(web5) {
// Create a JSON record
const { record } = await web5.dwn.records.create({
    data: {
        content: "Hello Web5",
        description: "Keep Building!"
    },
    message: {
        dataFormat: 'application/json'
    }
});

return record;
}

export async function uploadImage(event) {
    // Create a blob record
    async function upload(event) {
        const blob = new Blob(event.currentTarget.files, { type: "image/png" });
        const { record } = await web5.dwn.records.create({
            data: blob,
            message: {
                dataFormat: "image/png"
            }
        });
        return record;
    }
    return upload(event);
}


export async function uploadFile(event) {
    // Create a file record
    async function upload(event) {
        const file = event.currentTarget.files[0];
        const { status: fileStatus, record } = await web5.dwn.records.create({
            data: file,
            message: {
                schema: "https://schema.org/path/to/schema",
                dataFormat: "application/octet-stream"
            }
        });
        return record;
    }
    return upload(event);
}

export async function createMixedRecord(username, messageText, imageFile) {
    // Create a mixed record
    async function createMessage(username, messageText, imageFile) {
        let base64Image = null;
        
        if (imageFile) {
            const binaryImage = await imageFile.arrayBuffer();
            base64Image = btoa(
                new Uint8Array(binaryImage).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                )
            );
        }

        const messageData = {
            username,
            message: messageText,
            image: base64Image
        };

        const { record } = await web5.dwn.records.create({
            data: messageData,
            message: {
                schema: "http://schema-registry.org/message",
                dataFormat: "application/json"
            },
        });
        return record;
    }
    return createMessage(username, messageText, imageFile);
}