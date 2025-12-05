const Article = document.getElementById("Article");

async function GetArticle() {
  const Response = await fetch("https://api.eagleepisode.com/getarticle");
  if (Response.ok) {
    const Data = await Response.text();
    Article.innerHTML = Data;
  } else {
    Article.innerHTML = "<h1 style='text-align:center;'>Error</h1>";
  }
}

GetArticle();
