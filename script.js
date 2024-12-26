document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  // Function to fetch and parse RSS feed
  async function fetchRSSFeed(url) {
      try {
          console.log("Fetching RSS feed from:", url);  // Log URL for debugging
          const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
          
          // Check if the response is okay
          if (!response.ok) {
              throw new Error(`Failed to fetch RSS feed. Status: ${response.status}`);
          }

          const data = await response.json();

          if (data && data.items) {
              console.log("Fetched RSS feed successfully:", data.items);
              return data.items;  // Array of articles
          } else {
              console.error("Invalid RSS feed structure:", data);
              return [];
          }
      } catch (error) {
          console.error("Error fetching RSS feed:", error);
          return [];
      }
  }

  // Function to render news in the layout
  function renderNews(articles) {
      newsContainer.innerHTML = "";  // Clear existing content

      if (articles.length === 0) {
          console.log("No articles to display.");
      }

      articles.forEach(article => {
          const newsItem = document.createElement("div");
          newsItem.classList.add("news-item");

          newsItem.innerHTML = `
              <h3>${article.title}</h3>
              <p>${article.description || "Read more for details."}</p>
              <a href="${article.link}" target="_blank">Read More</a>
          `;

          newsContainer.appendChild(newsItem);
      });
  }

  // URL for CNBC Finance RSS feed
  const rssFeedURL = "https://www.cnbc.com/id/15839069/device/rss/rss.html";

  // Fetch and display news
  fetchRSSFeed(rssFeedURL)
      .then(articles => {
          if (articles.length === 0) {
              console.log("No articles available to display.");
          }
          const limitedArticles = articles.slice(0, 3);  // Limit to 3 articles
          renderNews(limitedArticles);
      })
      .catch(error => console.error("Error loading news:", error));
});


  emailjs.init("ymOv2NFKSpoLpDr9y");
    
  console.log("EmailJS Initialized:", emailjs);
  
  function sendEmail(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const form = document.getElementById("contact-form");
    const formData = new FormData(form);
  
    // Prepare the email parameters to match your EmailJS template
    const emailParams = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      services: Array.from(formData.getAll("services")).join(", "),
    };
  
    emailjs
      .send("service_gwbsy3k", "template_q7z8z8s", emailParams)
      .then(
        (response) => {
          alert("Your email has been sent successfully!");
          form.reset(); // Clear the form after successful submission
        },
        (error) => {
          alert("There was an error sending your email. Please try again later.");
          console.error("EmailJS Error:", error);
        }
      );
  }
  
  console.log("EmailJS Initialized:", emailjs);