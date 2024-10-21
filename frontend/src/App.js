import React, { useState } from 'react';
import './App.css';

function App() {
    const [markdownText, setMarkdownText] = useState('');
    const [htmlContent, setHtmlContent] = useState('');

    const handleInputChange = (e) => {
      console.log("event called")
        const input = e.target.value;
        setMarkdownText(input);

        fetch('http://localhost:5000/convertText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: input }),
        })
        .then((response) => response.json())
        .then((data) => {
            setHtmlContent(data.html);
        })
        .catch((error) => {
            console.error('Error converting markdown:', error);
        });
    };

    return (
        <div className="App">
            <div className="editor">
                <h2>Markdown Editor</h2>
                <textarea
                    value={markdownText}
                    onChange={handleInputChange}
                    placeholder="Enter your markdown content here..."
                />
            </div>
            <div className="preview">
                <h2>HTML Preview</h2>
                <div
                    className="preview-content"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>
        </div>
    );
}

export default App;
