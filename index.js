
// function that gets all children form a prent object and removes them 
function removeAllChildrenNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
} 

// called upon window loading
window.addEventListener('load', function() {

    // called when the #searchBtn button is clicked
    this.document.querySelector('#searchBtn').addEventListener('click', function() {

        // resets the search result display
        removeAllChildrenNodes(document.querySelector("#searchResult"));

        // stores the value typed into the search bar and adds it to the fetch APIs target url
        let searchQuery = document.querySelector("#searchQuery").value;
        const url = "https://images-api.nasa.gov/search?q=" + encodeURIComponent(searchQuery);

        // fetch API calls a GET http request by default and in this case retreives a json object from the target url
        fetch(url)
        .then(response => response.json())
        .then(item => {

            // looping throught each item stored within the json object
            for (var i = 0; i < item.collection.items.length; i++) {

                // only works for images and video, audio does not contain links array
                if(item.collection.items[i].links) {

                    // building html elements and appending it to the index.html document
                    // using setAttribute to parse data from fetch response into html elements
                    result = document.createElement("div");
                    document.querySelector('#searchResult').appendChild(result);

                    img = document.createElement('img');
                    result.appendChild(img);
                    img.setAttribute('src', item.collection.items[i].links[0].href);
                    img.setAttribute('alt', item.collection.items[i].data[0].title);

                    div = document.createElement('div');
                    div.setAttribute('id', 'descriptionBox');
                    result.appendChild(div);

                    title = document.createElement('h1');
                    div.appendChild(title);
                    title.textContent = item.collection.items[i].data[0].title;

                    date = document.createElement('h2');
                    div.appendChild(date);
                    date.textContent = item.collection.items[i].data[0].date_created;

                    description = document.createElement('p');
                    div.appendChild(description);
                    description.textContent = item.collection.items[i].data[0].description;
                }
            }
        })
        // error handling
        .catch(error => console.log('Media not found: ' + error));
    });
});