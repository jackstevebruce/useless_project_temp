

document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    explainReadme();
 });



 async function chatgptify(input) {
    try {
        const response = await fetch('http://localhost:3000/api/imitate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({input})
        });
        const data = await response.json();
        console.log("Response :",data)
        return data.explanation;
    } catch (error) {
        console.error('Error:', error);
        return "Sorry, I couldn't generate an explanation.";
    }
}

async function explainReadme() {
    const input = document.getElementById('user-input').value;
    try {
        const chatgptContent = await chatgptify(input);
        const reply = document.getElementById('chat-output');
        reply.innerHTML = `<h3>Explanation:</h3> <p> ${chatgptContent} </p>`;
    } catch (error) {
        console.error(error);
    }
}