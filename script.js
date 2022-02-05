console.log("Hello World!")
const apicheck = document.getElementById("apicheck")

// Random quote generator.
//const quotes = ["r!z", "", "March", "April", "May", "June", "July"];
//
//const random = Math.floor(Math.random() * quotes.length);
//thequote.innerText = random, quotes[random];


async function testapi() { // FIXME
    /* fetch('https://robotop.xyz/api/')
  .then(response => response.json())
  .then(data => console.log(data))
  .then(apitest = data); 
  my 1 line of code is obviously superior to 4 lines (not debatable) (objective)*/
  let apitest = await fetch('https://robotop.xyz/api/', {
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  }
  }).then(response => response.text()).catch(e => {return e}); // my one line of fetch code worked making fetch superior to everything - e !

  if (apitest=="Nobody here but us foxxos...") {
      apicheck.innerText = "The API works!";
  } else {   
      apicheck.innerText = "The API doesn't work. Try turning on the Public Zoo option on https://robotop.xyz/settings";
  };
};

testapi();

// DEVELOPER VARIABLES
var discord_id = 539019682968240128;

function save() {
    let n_discord_id = document.getElementById("disc_id");
    document.cookie = `auth=${n_discord_id.value}`;
}; // doesnt <button> just do that LMFAO
// "here we observe the wylie in its natural habitat of networking code" - probably some guy at national geographic
async function fetchZooJSON() {   
    // man fetch sucks, axios is nice but thats a npm :sadge:
    let zoo = await fetch(`https://robotop.xyz/api/zoo/539019682968240128`).then(response => response.json()).catch(e => {return e});
    console.log(zoo);
}; // setting up a cors proxy, gimme a sec.

// lol it would be funny if i were to allow linking your discord via oauth2
// sounds like a lot of networking
// yeah it would be funny th- jk
