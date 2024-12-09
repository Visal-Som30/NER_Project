document.getElementById('analyzeButton').addEventListener('click', () => {
    const text = document.getElementById('inputText').value;
  
    // Example: Mock NER results for the input text
    const mockEntities = [
      { entity: "John", type: "person", start: 0, end: 4 },
      { entity: "Cambodia", type: "location", start: 19, end: 27 },
      { entity: "2024", type: "date", start: 40, end: 44 },
    ];
  
    let resultHTML = text;
  
    // Apply entity highlighting
    mockEntities.reverse().forEach(entity => {
      const span = `<span class="entity-${entity.type}">${entity.entity}</span>`;
      resultHTML =
        resultHTML.slice(0, entity.start) + span + resultHTML.slice(entity.end);
    });
  
    document.getElementById('outputText').innerHTML = resultHTML;
  });
  