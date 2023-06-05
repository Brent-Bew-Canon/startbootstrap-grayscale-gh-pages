let sqft = document.getElementById('sqft')
let airport = document.getElementById('airport')
let submit = document.getElementById('btn-submit')
let drone = document.getElementById('drone')
let hdr = document.getElementById('hdr')
let tour = document.getElementById('tour')
let pTag = document.getElementById('display')
let numPhotos = 0
let flightRes = ""
let equipment = ""
let camera = ""
let fly = ""
let virt = ""
let display = ""

//for event listeners
let content = document.getElementById('content')
let photoForm = document.getElementById('photo-form')
let masthead = document.getElementById('masthead')
let newSearch = document.getElementById('new-search')
let newSearch2 = document.getElementById('newSearch')
let results = document.getElementById('results')
let photos = document.getElementById('num-photos')
let pList = document.getElementById('packing-list')
let retrictions = document.getElementById('flight-restrictions')
let droneCard = document.getElementById('drone-card')

let camList = [
    "Camera",
    "Tripod",
    "SD Cards",
    "Wide-Angle Lens",
    "Shutter Remote",
    "External Battery",
    "Battery Charger"
]

let droneList = [
    "Camera Drone"
]

let tourList = [
    "360 Camera",
    "360 Tripod",
]

const init = (e) => {
    e.preventDefault()
    sqftCalc(sqft.value);
    flight(airport.value);
    equip();
    logEquip();
    finalLog();;
}


//Final Log
function finalLog() {
    if (fly == "") {

        display = equipment;
    } else {

        display = `${equipment} For the drone shots, you should expect a ${flightRes}.`
    }
}


// Log Equipment
function logEquip() {
    if (fly == "" && virt == "") {
        equipment = `You need to take ${numPhotos} photos and bring your Camera and Tripod.`
    } else if (fly == "" && virt !== "") {
        equipment = `You need to take ${numPhotos} photos and bring your Camera, Tripod, and ${virt}.`

    } else if (fly !== "" && virt !== "") {
        equipment = `You need to take ${numPhotos} photos and bring your Camera, Tripod, ${fly}, and ${virt}.`
    }
    else if (fly !== "" && virt == "") {
        equipment = `You need to take ${numPhotos} photos and bring your Camera, Tripod, and ${fly}.`
    }
}

// Equipment Calculation
function equip() {
    if (hdr.checked === true) {
        camera = camList
    }
    else {
        camera = ""
    }
    if (drone.checked === true) {
        fly = droneList
    }
    else {
        fly = ""
    }

    if (tour.checked == true) {
        virt = tourList
    } else {
        virt = ""
    }
    return (virt)
}

// Square Ft Calculation
function sqftCalc(footage) {
    if (hdr.checked == true) {
        if (footage < 2000) {
            numPhotos = 20
        } else if (footage < 3000) {
            numPhotos = 30
        }
        else if (footage < 4000) {
            numPhotos = 40
        }
        else if (footage < 5000) {
            numPhotos = 50
        }
        else if (footage < 6000) {
            numPhotos = 60
        }
        else {
            numPhotos = 100
        }
    } else {
        numPhotos = ""
    }

}
// Airport Calculation
function flight(a) {
    if (a < 1) {
        flightRes = "No Fly Zone"
    } else if (a < 2) {
        flightRes = "100ft cieling"
    }
    else if (a < 3) {
        flightRes = "200ft cieling"
    }
    else if (a < 4) {
        flightRes = "300ft cieling"
    }
    else {
        flightRes = "400ft cieling, no restrictions"
    }
}



// Show Results Page 
function showResults() {
    photoForm.setAttribute('style', 'display: none;')
    masthead.setAttribute('style', 'display: none;')
    results.setAttribute('style', 'display: block;')
    // content.innerHTML = display
    photos.innerHTML = `You need to take ${numPhotos} photos.`
}

//loop over equipment to make packing list
function createList() {
    if (camera) {
        camList.forEach(cam => {
            let listItem = document.createElement("li")
            listItem.innerHTML = cam
            listItem.setAttribute('class', 'card-text')
            pList.appendChild(listItem)
        });
    }

    if (fly) {
        droneList.forEach(dronie => {
            let listItem = document.createElement("li")
            listItem.innerHTML = dronie
            listItem.setAttribute('class', 'card-text')
            pList.appendChild(listItem)
        })
        retrictions.innerHTML = `For the drone shots, you should expect a ${flightRes}.`

        droneCard.setAttribute('style', 'display: block;')
    }

    if (virt) {
        tourList.forEach(t => {
            let listItem = document.createElement("li")
            listItem.innerHTML = t
            listItem.setAttribute('class', 'card-text')
            pList.appendChild(listItem)
        })
    }
}

function showMain() {
    photoForm.setAttribute('style', 'display: block;')
    masthead.setAttribute('style', 'display: block;')
    results.setAttribute('style', 'display: none;')
    droneCard.setAttribute('style', 'display: none;')
}

function deleteList() {
    let liArray = document.querySelectorAll('#packing-list li')
    liArray.forEach(li => {
        li.remove()
    })
}

submit.addEventListener("click", async function (e) {
    init(e);
    showResults();
    createList();
    window.scrollTo(0, 0)
})

newSearch.addEventListener("click", function () {
    deleteList();
    showMain();
    window.scrollTo(0, 0)
})
newSearch2.addEventListener("click", function () {
    deleteList();
    showMain();
    window.scrollTo(0, 0)
})




