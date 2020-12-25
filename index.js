console.log("Kavan News Website");
//e427c160e7114dbeb3eee2edeb9562b5
let param = "";
showNews(param);

function showNews(param) {
    let category = param;

    //console.log("category: ",category);
    if (category != "") {
        category = `&category=${category}`;
    }
    let country = 'in';
    let apiKey = 'e427c160e7114dbeb3eee2edeb9562b5';
    let newsAPI = `http://newsapi.org/v2/top-headlines?country=${country}${category}&apiKey=${apiKey}`;


    // Grab the news container
    let newsAccordion = document.getElementById("newsAccordion");

    //crate a  GET request
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${newsAPI}`, true);

    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            //console.log(json.articles)

            let articles = json.articles;

            let newsHtml = '';
            for (key in articles) {
                if (articles[key].content == null) {
                    continue;
                }
                let news = `<div class="card">
                            <div class="card-header" id="heading${key}">
                                <h2 class="mb-0">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${key}"
                                        aria-expanded="true" aria-controls="collapse${key}">
                                        ${articles[key].title}
                                    </button>
                                </h2>
                            </div>

                            <div id="collapse${key}" class="collapse" aria-labelledby="headingOne"
                                data-parent="#newsAccordion">
                                <div class="card-body">${articles[key].content} <a href="${articles[key].url}" target="_blank">Read more here</a></div>
                            </div>
                        </div>`;

                newsHtml += news;
            }

            newsAccordion.innerHTML = newsHtml
        }
        else {
            console.log("some error occured");
        }
    }

    xhr.send();

}
