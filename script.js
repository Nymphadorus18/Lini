let currentBatch = 1;  // Start with the first file (chat1.json)
const totalBatches = 10;  // Total number of JSON files (adjust based on the number of split files)
const container = document.getElementById('chat-container');
const loadingIndicator = document.getElementById('loading');

// Function to load a single batch of messages
async function loadBatch() {
    if (currentBatch > totalBatches) {
        loadingIndicator.textContent = "All messages loaded";
        return;
    }

    loadingIndicator.style.display = 'block';
    try {
        const response = await fetch(`chat/chat${currentBatch}.json`);  // Adjusted path to chat folder
        if (!response.ok) throw new Error(`Failed to load chat${currentBatch}.json`);

        const data = await response.json();
        displayMessages(data.messages);
        currentBatch++;  // Move to the next file

    } catch (error) {
        console.error("Error loading batch:", error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// Function to display messages in the container
function displayMessages(messages) {
    const fragment = document.createDocumentFragment();
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `from-${msg.from.toLowerCase()}`);

        const content = document.createElement('div');
        content.classList.add('content');
        content.textContent = msg.text;

        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = new Date(msg.date).toLocaleString();

        messageElement.appendChild(content);
        messageElement.appendChild(timestamp);

        fragment.appendChild(messageElement);
    });

    container.appendChild(fragment);
}

// Scroll event handler to detect when we reach the bottom
function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Check if scrolled to bottom
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        console.log("Scrolled to bottom - loading more messages.");
        loadBatch();
    }
}

// Initial load and scroll handling
document.addEventListener('DOMContentLoaded', () => {
    loadBatch();
    window.addEventListener('scroll', handleScroll);
});
