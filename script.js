// Load some local stuff

var discord_id = localStorage.getItem("id") 
var user = {
  "id": discord_id 
}

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
var db_main = document.getElementById("devbox-main")
var db_timer = document.getElementById("devbox-timer")
var db_image = document.getElementById("devbox-image")
var db_shopcredits = document.getElementById("devbox-shopcredits")

async function testapi() { 
  let apitest = await fetch('https://robotop.xyz/api/zoo/-1', {
  }).then(response => response.text()).catch(e => {return e}); 
  if (apitest.startsWith("{")) {
      apicheck.innerText = "The RoboTop API is working!";
  } else {   
      apicheck.innerText = "There seems to be an issue with the RoboTop API.";
  };
};



function save() {
    let n_discord_id = document.getElementById("disc-id");
    localStorage.setItem('id', n_discord_id.value)
    user.id = n_discord_id.value
    fetchZooJSON(n_discord_id.value)
}

async function findRelicProp(relicname, property) {
  let zoo = await fetch(`https://robotop.xyz/api/zoo/${user.id}`).then(response => response.json()).catch(e => {return e});
  let eq_name = relicname
  for (let i = 0; i < zoo.relics.length; i++) {
    console.log(zoo.relics[i][property])
    if (zoo.relics[i][property]) {
      return zoo.relics[i][property]
    }
}
}

// SPAGHETIIIIIII CODE!!!! Sorry wylie i ruined your cool function ahahaha now its your problem
async function fetchZooJSON(person) {   
    let zoo = await fetch(`https://robotop.xyz/api/zoo/${person}`).then(response => response.json()).catch(e => {return e});
    let cosmetic = findRelicProp(zoo.equippedCosmetic, "emoji")
    if (zoo.exists==true&zoo.invalid==true) {
      db_username.innerText = "🔒 Your zoo is private!"
      db_alert.innerHTML = "<a href='#' onclick='window.open(`https://robotop.xyz/settings`)'>Unprivate my zoo!</a><br>"
      console.log("User's zoo is private.")
      twemoji.parse(document.body)
      return;
    }
    if (zoo.public==true) {
      db_main.hidden = false
      db_image.src = zoo.user.avatar
      db_username.innerHTML = `${cosmetic} ${zoo.user.name}`
      db_user.hidden = false
      if (zoo.secretInfo) {
        db_zookey.innerHTML = "<b>Zoo Key: </b>true"
        db_shopcredits.innerHTML = `<b>Shop Credits:</b> ${zoo.secretInfo.shopCredits}`
        db_alert.innerHTMl = `✧ ${zoo.score} total score • ${zoo.completion}% completion • ${zoo.leaders.length}/10 leaders`
        db_username.innerHTML = `${zoo.name}`
        db_username.style.color = `#${zoo.color}`
      } else {
        db_zookey.innerHTML = "<b>Zoo Key: </b>false"
      }
    
      
    }
   
    twemoji.parse(document.body)
}; 

testapi();
fetchZooJSON(user.id)

twemoji.parse(document.body)
