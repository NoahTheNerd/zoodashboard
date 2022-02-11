//////////////////////////////////////////////////////////////
// for people looking over this code (looking at you colon) //
// im sorry in advance                                      //
//////////////////////////////////////////////////////////////

// Load some local stuff

var discord_id = localStorage.getItem("id")
var user = {
  "id": discord_id
}

var audioNotification = new Audio("assets/audio/notif.wav")


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

var db_timerrescue = document.getElementById("devbox-timerrescue")
var db_timerquest = document.getElementById("devbox-timerquest")

var db_image = document.getElementById("devbox-image")

var db_shopcredits = document.getElementById("devbox-shopcredits")

async function testapi() {
  let apitest = await fetch('https://robotop.xyz/api/zoo/-1', {
  }).then(response => response.text()).catch(e => { return e });
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
  let zoo = await fetch(`https://robotop.xyz/api/zoo/${user.id}`).then(response => response.json()).catch(e => { return e });
  let eq_name = relicname
  for (let i = 0; i < zoo.relics.length; i++) {
    console.log(zoo.relics[i][property])
    if (zoo.relics[i][property]) {
      return zoo.relics[i][property]
    }
  }
}

// credits to colon
function unix2clock(ms, timeIfLong) {
  if (timeIfLong && ms >= 86399000) return cv.Time(ms, 1)
  let secs = Math.ceil(Math.abs(ms) / 1000)
  if (secs < 0) secs = 0
  let days = Math.floor(secs / 86400)
  if (days) secs -= days * 86400
  let timestamp = `${ms < 0 ? "-" : ""}${days ? `${days}d + ` : ""}${[Math.floor(+secs / 3600), Math.floor(+secs / 60) % 60, +secs % 60].map(v => v < 10 ? "0" + v : v).filter((v, i) => v !== "00" || i > 0).join(":")}`
  if (timestamp.length > 5) timestamp = timestamp.replace(/^0+/, "")
  return timestamp
}

// SPAGHETIIIIIII CODE!!!! Sorry wylie i ruined your cool function ahahaha now its your problem
async function fetchZooJSON(person) {
  let zoo = await fetch(`https://robotop.xyz/api/zoo/${person}`).then(response => response.json()).catch(e => { return e });
  let cosmetic = findRelicProp(zoo.equippedCosmetic, "emoji")
  db_user.hidden = true
  if (zoo.exists == true & zoo.invalid == true) {
    db_username.innerText = "🔒 Your zoo is private!"
    db_alert.innerHTML = "<a href='https://robotop.xyz/settings/' target='_blank')'>Unprivate my zoo!</a><br>"
    console.log("User's zoo is private.")
    twemoji.parse(document.body)
    return;
  }

  if (zoo.public) {
    db_main.hidden = false
    db_user.hidden = false
    db_image.src = zoo.user.avatar
    db_username.innerHTML = `${cosmetic} ${zoo.user.name}`
    
    if (zoo.secretInfo) {
      db_zookey.innerHTML = "<b>🔑 API Key: </b>Equipped"

      db_shopcredits.innerHTML = `<b>Shop Credits:</b> ${zoo.secretInfo.shopCredits}`
      db_alert.innerText = `✧ ${zoo.score} total score • ${zoo.completion}% completion • ${zoo.leaders.length}/10 leaders`
      db_username.innerHTML = `${zoo.name}`
      db_username.style.color = `#${zoo.color}`
      db_main.style.borderLeftColor = `#${zoo.color}`
      
      timer(zoo.secretInfo.rescueCooldown, db_timerrescue, "<b>Next Rescue: </b>", audioNotification.play())
      timer(zoo.secretInfo.questEnd, db_timerquest, "<b>Quest End: </b>", audioNotification.play())
    } else {
      db_zookey.innerHTML = "<b>🔑 API Key: </b>Not Equipped"
    }


  }

  twemoji.parse(document.body)
};

async function timer(timestamp, element, prefix, endfunction) {
  setInterval(() => {
    element.innerHTML = `${prefix}${unix2clock(timestamp-Date.now())}`
    if (timestamp-Date.now()<1) {
      endfunction
    }
  }, 1000)
}


testapi();
fetchZooJSON(user.id)



twemoji.parse(document.body)