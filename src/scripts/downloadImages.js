const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Set up the input query and API key
// const query = "";
const apiKey = 'AIzaSyCrOu5AFBeNnWtxvCc9wnP8V0fhM8RgsCM'; // DELETE ME
const cx = 'e43c8824bbf994c00'; // DELETE ME

const getStarships = async () => {
  try {
    // in a larger project, we would add url values to .env file
    let nextPage = `https://swapi.dev/api/starships`;
    let starships = [];
    while (nextPage) {
      const response = await fetch(nextPage);

      if (!response.ok) throw new Error('Error fetching data');

      const { next, results } = await response.json();
  
      starships = [...starships, ...results];
      nextPage = next;
    } 
    console.log(starships.length);
    return(starships);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    } else {
      console.log(err);
    }   
  }
};


const getPilots = async () => {
  try {
    // in a larger project, we would add url values to .env file
    let nextPage = `https://swapi.dev/api/people`;
    let pilots = [];
    while (nextPage) {
      const response = await fetch(nextPage);

      if (!response.ok) throw new Error('Error fetching data');

      const { next, results } = await response.json();
  
      pilots = [...pilots, ...results];
      nextPage = next;
    } 
    console.log(pilots.length);
    return(pilots);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    } else {
      console.log(err);
    }   
  }
};


const getImages = async () => {
  // const resources = await getStarships();
  const resources = await getPilots(); 
  resources.forEach((resource) => {
    const url = resource.url;
    const regex = /\d+(?=\/$)/; // match one or more digits at the end of the string
    const match = url.match(regex); // returns an array containing the match or null
    const id = parseInt(match[0]); // convert the matched string to a number
    const query = resource.name + " star wars wiki fan image jpg";
    // Make a request to the Google Images API with the query and API key
    axios.get(`https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&num=1&searchType=image&key=${apiKey}`)
    .then(response => {
      // Extract the URL of the first image result
      const imageUrl = response.data.items[0].link;

      // Download the image to a local folder

      const dirName = path.resolve(process.cwd(), '../assets/pilots');

      const filePath = path.join(dirName, `${id}.jpg`);
      console.log(filePath);
      const writer = fs.createWriteStream(filePath);

      axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream'
      }).then(response => {
        response.data.pipe(writer);

        writer.on('finish', () => {
          console.log(`Successfully downloaded ${id}.jpg`);
        });

        writer.on('error', err => {
          console.error(`Error downloading ${id}.jpg: ${err.message}`);
        });
  });
})
.catch(error => {
  console.error(`Error: ${error.message}`);
});
});
}

getImages();
