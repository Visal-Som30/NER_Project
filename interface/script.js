// document.getElementById('analyzeButton').addEventListener('click', () => {
//     const text = document.getElementById('inputText').value;
  
//     // Example: Mock NER results for the input text
//     const mockEntities = [
//       { entity: "John", type: "person", start: 0, end: 4 },
//       { entity: "Cambodia", type: "location", start: 19, end: 27 },
//       { entity: "2024", type: "date", start: 40, end: 44 },
//     ];
  
//     let resultHTML = text;
  
//     // Apply entity highlighting
//     mockEntities.reverse().forEach(entity => {
//       const span = `<span class="entity-${entity.type}">${entity.entity}</span>`;
//       resultHTML =
//         resultHTML.slice(0, entity.start) + span + resultHTML.slice(entity.end);
//     });
  
//     document.getElementById('outputText').innerHTML = resultHTML;
//   });

async function processNER() {
    const inputText = document.getElementById('inputText').value;
    const uploadedFile = document.getElementById('uploadPDF').files[0];

    if (!inputText && !uploadedFile) {
        alert('Please provide input text or upload a PDF file.');
        return;
    }

    let result = '';

    if (inputText) {
        // Simulate NER processing (Replace this with actual backend API call)
        result = `
            <span class="highlight-Name">John McCarthy</span> who was born on 
            <span class="highlight-Date">September 4, 1927</span> was an 
            <span class="highlight-Designation">AI pioneer</span> and 
            <span class="highlight-Subject">Artificial Intelligence</span> researcher.
        `;
    } else if (uploadedFile) {
        // Handle PDF text extraction and NER prediction
        const formData = new FormData();
        formData.append('file', uploadedFile);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload-pdf', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error || 'Error processing the PDF.');
                return;
            }

            const data = await response.json();
            const extractedText = data.text;

            // Simulate NER processing for PDF text (Replace this with actual backend NER)
            result = `
                Extracted PDF Content: <br>
                <span class="highlight-Name">John McCarthy</span> who was born on 
                <span class="highlight-Date">September 4, 1927</span> was an 
                <span class="highlight-Designation">AI pioneer</span> and 
                <span class="highlight-Subject">Artificial Intelligence</span> researcher.
            `;
        } catch (error) {
            alert('An error occurred while processing the file.');
            console.error(error);
            return;
        }
    }

    // Display results
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('results').innerHTML = result;
}

