// Load some local stuff

var discord_id = localStorage.getItem("id") 
var user = {
  "id": discord_id 
}

console.log("Hello World!")
const apicheck = document.getElementById("apicheck")



//ye
var dev = {
  "id1": "309104296362901505",
  "id2": "718023501306527766"
}
var db_zookey = document.getElementById("devbox-zookey")
var db_username = document.getElementById("devbox-username")
var db_alert = document.getElementById("devbox-alert")
var db_user = document.getElementById("user")
async function testapi() { // FIXME
    /* fetch('https://robotop.xyz/api/')
  .then(response => response.json())
  .then(data => console.log(data))
  .then(apitest = data); 
  */
  let apitest = await fetch('https://robotop.xyz/api/zoo/-1').then(e => e.text()).catch(e => {return e});
  if (apitest.startsWith('{')) {
      apicheck.innerText = "API is working as intended.";
  } else {   
      apicheck.innerHTML = "The RoboTop API is having some issues.<br>There may be trouble viewing your zoo.";
  };
};





function save() {
    let n_discord_id = document.getElementById("disc-id");
    localStorage.setItem('id', n_discord_id.value)
    user.id = n_discord_id.value
    fetchZooJSON(n_discord_id.value)
}

async function findCosmetic() {
  let zoo = await fetch(`https://robotop.xyz/api/zoo/${user.id}`).then(response => response.json()).catch(e => {return e});
  let eq_name = zoo.equippedCosmetic
  return zoo
}

// SPAGHETIIIIIII CODE!!!! Sorry wylie i ruined your cool function ahahaha now its your problem
async function fetchZooJSON(person) {   
    let zoo = await fetch(`https://robotop.xyz/api/zoo/${person}`).then(response => response.json()).catch(e => {return e});
    if (zoo.exists==true&zoo.invalid==true) {
      db_username.innerText = "🔒 Your zoo is private!"
      db_alert.innerHTML = "<a href='#' onclick='window.open(`https://robotop.xyz/settings`)'>Unprivate my zoo!</a><br>"
      console.log("User's zoo is private.")
      return;
    }
    db_username.innerHTML = ` ${zoo.user.name}`
    db_user.hidden = false
    if (zoo.secretInfo) {
      db_zookey.innerHTML = "<b>Zoo Key: </b>true"
      db_username.innerHTML = ` ${zoo.user.name}`
      db_username.style.color = `#${zoo.secretInfo.color}`
    } else {
      db_zookey.innerHTML = "<b>Zoo Key: </b>false"
    }
    
    
}; 


testapi();
fetchZooJSON(user.id)