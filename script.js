document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  // Function to fetch and parse RSS feed
  async function fetchRSSFeed(url) {
      try {
          console.log("Fetching RSS feed from:", url); // Log URL for debugging
          const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
          
          if (!response.ok) {
              throw new Error(`Failed to fetch RSS feed. Status: ${response.status}`);
          }

          const data = await response.json();

          if (data && data.items) {
              console.log("Fetched RSS feed successfully:", data.items);
              return data.items; // Array of articles
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
      newsContainer.innerHTML = ""; // Clear existing content

      if (articles.length === 0) {
          newsContainer.innerHTML = "<p>No news articles available at the moment.</p>";
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


  const rssFeedURL = "https://www.iol.co.za/cmlink/1.640"; // IOL Business Report

  // Fetch and display news
  fetchRSSFeed(rssFeedURL)
      .then(articles => {
          const limitedArticles = articles.slice(0, 3); // Limit to 3 articles
          renderNews(limitedArticles);
      })
      .catch(error => console.error("Error loading news:", error));
});




emailjs.init("_mdQfJhw3c7ajbNVi");

console.log("EmailJS Initialized:", emailjs);

function sendEmail(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = document.getElementById("contact-form");
  const formData = new FormData(form);

  // Validate checkboxes
  const servicesCheckboxes = form.querySelectorAll('input[name="services"]');
  let isChecked = false;

  // Check if at least one checkbox is selected
  servicesCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      isChecked = true;
    }
  });

  if (!isChecked) {
    alert("PLEASE SELECT AT LEAST ONE SERVICE BEFORE SUBMITTING.");
    return; // Stop the function if no checkbox is selected
  }

  // Prepare the email parameters to match your EmailJS template
  const emailParams = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    services: Array.from(formData.getAll("services")).join(", "),
  };

  emailjs
    .send("service_e68rjp8", "template_fa1zvu4", emailParams)
    .then(
      (response) => {
        alert("YOUR EMAIL HAS BEEN SENT SUCCESSFULLY!");
        form.reset(); // Clear the form after successful submission
      },
      (error) => {
        alert("THERE WAS AN ERROR SENDING YOUR EMAIL. PLEASE TRY AGAIN LATER");
        console.error("EmailJS Error:", error);
      }
    );
}

console.log("EmailJS Initialized:", emailjs);

// Function to handle newsletter subscription
function sendNewsletter(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = document.getElementById("newsletter-form");
  const email = document.getElementById("newsletter-email").value;

  if (!email) {
    alert("PLEASE ENTER A VALID EMAIL ADDRESS.");
    return; // Stop the function if no email is provided
  }

  // Prepare the email parameters
  const emailParams = {
    email: email,
  };

  emailjs
    .send("service_e68rjp8", "template_zdbjb7o", emailParams) // Replace with your EmailJS service and template IDs
    .then(
      (response) => {
        alert("THANK YOU FOR SUBSCRIBING TO OUR NEWSLETTER!");
        form.reset(); // Clear the form after successful submission
      },
      (error) => {
        alert("THERE WAS AN ERROR SUBSCRIBING. PLEASE TRY AGAIN LATER");
        console.error("EmailJS Error:", error);
      }
    );
}

