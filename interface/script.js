// Function to combine consecutive tokens with labels 'B' or 'I'
function combineConsecutiveTokens(jsonList) {
    let combinedTokens = [];
    let currentToken = '';
    var totalEntities = 0;
    // Iterate through the list of tokens
    for (let i = 0; i < jsonList.length; i++) {
        const token = jsonList[i];
        const word = token.word;
        const label = token.label;


        // If it's the first token or it's the same label as the previous one (B or I), combine it
        if (label === 'B' || label === 'I') {
            if (currentToken === '') {
                // Start a new combined token with the current word
                currentToken = word;
            } else {
                // Continue adding the word to the current token
                currentToken += ` ${word}`;
            }
            
        } else {
            // If the label changes or it's 'O', store the previous token if it exists
            if (currentToken !== '') {
                totalEntities += 1;
                combinedTokens.push({ word: currentToken, label: 'I' }); // Mark as 'I' since it's a continuation
                currentToken = ''; // Reset the current token
            }
            // Add the current 'O' token to the combinedTokens list
            combinedTokens.push({ word: word, label: label });

        }
    }

    // If there's a combined token remaining, push it to the result list
    if (currentToken !== '') {
        combinedTokens.push({ word: currentToken, label: 'I' }); // Mark as 'I' since it's a continuation
    }

    return [combinedTokens, totalEntities]; // Return the combined tokens and total entities
}

// Function to highlight tokens based on labels (B or I)
function highlightTokensInText(jsonList) {
    let processedHTML = ""; // Initialize an empty string for processed HTML

    // Iterate through the JSON list and add <span> for tokens with labels 'B' or 'I'
    jsonList.forEach(token => {
        const word = token.word;
        const label = token.label;

        // Wrap words with labels 'B' or 'I' in a span with the highlight class
        if (label === 'B' || label === 'I') {
            processedHTML += `<span class="highlight-Label">${word}</span> `;
        } else {
            processedHTML += `${word} `;
        }
    });

    return processedHTML.trim(); // Return the processed HTML
}

// Fetch function to make POST requests
async function predict(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Return parsed JSON response
        return await response.json();
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
}

// Main function to process NER (named entity recognition) from text or PDF input
async function processNER() {

    const inputText = document.getElementById('inputText').value;
    const uploadedFile = document.getElementById('uploadPDF').files[0];

    if (!inputText && !uploadedFile) {
        alert('Please provide input text or upload a PDF file.');
        return;
    }

    const resultsDiv = document.getElementById('results');
    const totalTokens = document.getElementById('total-token');
    resultsDiv.innerHTML = ''; // Clear previous results
    totalTokens.innerHTML = ''; // Clear previous total tokens

    const apiUrl = 'http://127.0.0.1:5000/predict';

    if (inputText) {
        // Process text input

        const postData = { text: inputText };

        try {
            const response = await predict(apiUrl, postData);
            // Combine consecutive tokens with the same label and highlight tokens
            const combinedTokens = combineConsecutiveTokens(response.prediction)[0];
            const totalEntities = combineConsecutiveTokens(response.prediction)[1];
            const highlightedText = highlightTokensInText(combinedTokens);
            resultsDiv.innerHTML = highlightedText;
            totalTokens.innerHTML = `Total entities found: ${totalEntities}`;
        } catch (error) {
            alert('An error occurred while processing the text input.');
            console.error('Text input error:', error);
        }
    } else if (uploadedFile) {
        // Handle PDF text extraction and NER prediction
        const formData = new FormData();
        formData.append('file', uploadedFile);

        try {
            const response = await fetch('http://127.0.0.1:5000/extract-text', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error || 'Error processing the PDF.');
                return;
            }

            const result = await response.json();
            const pdfText = result.text;
            
            const postData = { text: pdfText };

            try {
                const response = await predict(apiUrl, postData);
                // Combine consecutive tokens with the same label and highlight tokens
                const combinedTokens = combineConsecutiveTokens(response.prediction)[0];
                const highlightedText = highlightTokensInText(combinedTokens);
                const totalEntities = combineConsecutiveTokens(response.prediction)[1];
                resultsDiv.innerHTML = highlightedText;
                totalTokens.innerHTML = `Total entities found: <strong>${totalEntities}</strong> entities.`;
            
            } catch (error) {
                alert('An error occurred while processing the text input.');
                console.error('Text input error:', error);
            }
        } catch (error) {
            alert('An error occurred while processing the PDF file.');
            console.error('File upload error:', error);
        }
    }

    // Show the result section if not visible
    document.getElementById('resultSection').style.display = 'block';
}

// Function to handle clear user input
function clearInput() {
    document.getElementById('inputText').value = '';
    document.getElementById('uploadPDF').value = '';
    document.getElementById('modelSelection').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('total-token').innerHTML = '';
    document.getElementById('resultSection').style.display = 'none';
}