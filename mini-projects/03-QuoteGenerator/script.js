const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins"
    },
    {
        text: "Success is not final, failure is not fatal.",
        author: "Winston Churchill"
    },
    {
        text: "You miss 100% of the shots you don't take.",
        author: "Wayne Gretzky"
    },
    {
        text: "Don't let yesterday take up too much of today.",
        author: "Will Rogers"
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb"
    },
    {
        text: "Your limitation—it's only your imagination.",
        author: "Unknown"
    },
    {
        text: "Great things never come from comfort zones.",
        author: "Unknown"
    }
];

const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const copyBtn = document.getElementById('copyBtn');
const twitterBtn = document.getElementById('twitterBtn');

let currentQuote = {};

function getRandomQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    updateDisplay();
}

function updateDisplay() {
    quoteText.textContent = `"${currentQuote.text}"`;
    authorText.textContent = `- ${currentQuote.author}`;
}

function copyToClipboard() {
    const textToCopy = `"${currentQuote.text}" - ${currentQuote.author}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        showFeedback('Quote copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function shareOnTwitter() {
    const tweetText = `"${currentQuote.text}" - ${currentQuote.author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
}

function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

newQuoteBtn.addEventListener('click', getRandomQuote);
copyBtn.addEventListener('click', copyToClipboard);
twitterBtn.addEventListener('click', shareOnTwitter);

getRandomQuote();