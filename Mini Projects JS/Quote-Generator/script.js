const quotes = [];
let currentQuote = null;

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const tweetBtn = document.getElementById("tweetBtn");

async function fetchQuote() {
  try {
    newQuoteBtn.disabled = true;
    newQuoteBtn.textContent = "⏳ Loading...";

    const apis = [
      "https://api.quotable.io/random",
      "https://zenquotes.io/api/random",
      "https://dummyjson.com/quotes/random",
    ];

    let response;
    let data;

    for (let apiUrl of apis) {
      try {
        response = await fetch(apiUrl);
        if (!response.ok) throw new Error("API not available");

        data = await response.json();

        // Handle different API response formats
        if (apiUrl.includes("quotable.io")) {
          if (data.content && data.author) {
            currentQuote = {
              text: data.content,
              author: data.author,
            };
            displayQuote(currentQuote);
            return;
          }
        } else if (apiUrl.includes("zenquotes.io")) {
          if (data[0] && data[0].q && data[0].a) {
            currentQuote = {
              text: data[0].q,
              author: data[0].a,
            };
            displayQuote(currentQuote);
            return;
          }
        } else if (apiUrl.includes("dummyjson.com")) {
          if (data.quote && data.author) {
            currentQuote = {
              text: data.quote,
              author: data.author,
            };
            displayQuote(currentQuote);
            return;
          }
        }
      } catch (apiError) {
        console.log(`API ${apiUrl} failed:`, apiError);
        continue;
      }
    }

    throw new Error("All APIs failed");
  } catch (error) {
    console.error("Error fetching quote:", error);
    // Use fallback quotes if all APIs fail
    const fallbackQuotes = [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
      },
      {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
      },
    ];

    const randomFallback =
      fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    currentQuote = randomFallback;
    displayQuote(currentQuote);
  } finally {
    newQuoteBtn.disabled = false;
    newQuoteBtn.innerHTML = "🔄 New Quote";
  }
}

function displayQuote(quote) {
  quoteText.style.opacity = "0";
  quoteAuthor.style.opacity = "0";

  setTimeout(() => {
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;

    quoteText.style.opacity = "1";
    quoteAuthor.style.opacity = "1";
  }, 150);
}

function tweetQuote() {
  if (currentQuote) {
    const tweetText = `"${currentQuote.text}" — ${currentQuote.author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(tweetUrl, "_blank");
  }
}

newQuoteBtn.addEventListener("click", fetchQuote);
tweetBtn.addEventListener("click", tweetQuote);

// Add smooth transition styles
quoteText.style.transition = "opacity 0.3s ease";
quoteAuthor.style.transition = "opacity 0.3s ease";

// Load initial quote
fetchQuote();
