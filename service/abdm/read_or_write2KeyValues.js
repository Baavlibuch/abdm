const fs = require('fs');

// Function to read the value associated with the accessToken key from a file
function readfile(key) {
    try {
        // Read the content of the file synchronously
        const fileContent = fs.readFileSync('KeyValues.txt', 'utf8');

        // Split the content by lines
        const lines = fileContent.trim().split('\n');

        // Find the line containing the accessToken key
        const accessTokenLine = lines.find(line => line.startsWith(key));

        if (!accessTokenLine) {
            throw new Error('accessToken key not found in the file');
        }

        // Extract the value associated with the accessToken key
        const accessTokenValue = accessTokenLine.split('=')[1].trim(); // Assuming format is "accessToken = value"

        return accessTokenValue;
    } catch (err) {
        console.log(`${key} is not found`);
        throw err;
    }
}

function Write2file(key, newValue) {
    try {
        // Read the content of the file synchronously
        let fileContent = fs.readFileSync('KeyValues.txt', 'utf8');
        
        // Split the content by lines
        const lines = fileContent.split('\n');

        // Find the line containing the specified key
        const lineIndex = lines.findIndex(line => line.startsWith(`${key}=`));

        if (lineIndex !== -1) {
            // If the key exists, update its value
            lines[lineIndex] = `${key}=${newValue}`;
        } else {
            // If the key does not exist, add it to the end of the file
            lines.push(`${key}=${newValue}`);
        }

        // Join the lines back into a single string
        fileContent = lines.join('\n');

        // Write the modified content back to the file
        fs.writeFileSync('KeyValues.txt', fileContent, 'utf8');
        
        console.log(`Value for key '${key}' updated successfully.`);
    } catch (err) {
        console.error('Error updating value for key:', err);
    }
}


module.exports = { readfile, Write2file }