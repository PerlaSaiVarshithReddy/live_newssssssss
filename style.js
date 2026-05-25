const apiKey = "ff9ebd8e881cebb817c3847330c79526";

const newsContainer = document.getElementById("newsContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

async function fetchNews(query = "technology") {

  newsContainer.innerHTML = `
    <div class="loading">Loading news...</div>
  `;

  try {

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=${apiKey}`
    );

    const data = await response.json();

    displayNews(data.articles);

  } catch (error) {

    newsContainer.innerHTML = `
      <h2>Failed to fetch news.</h2>
    `;

    console.log(error);
  }
}

function displayNews(articles) {

  newsContainer.innerHTML = "";

  if (!articles || articles.length === 0) {

    newsContainer.innerHTML = `
      <h2>No news found.</h2>
    `;

    return;
  }

  articles.forEach(article => {

    const card = document.createElement("div");
    card.classList.add("news-card");

    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="news">

      <div class="news-content">
        <h3>${article.title}</h3>

        <p>
          ${article.description || "No description available"}
        </p>

        <a href="${article.url}" target="_blank">
          Read More
        </a>
      </div>
    `;

    newsContainer.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {

  const query = searchInput.value.trim();

  if(query !== ""){
    fetchNews(query);
  }
});

fetchNews();