import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/storage.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)

    })
}

function onAddMarker() {
    console.log('Adding a marker');
    //TODO: make responsive
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
    // locService.addLoc(loc)
}

function onGetLocs() {
    let elLocs = document.querySelector('.location-table-body');
    locService.getLocs()
        .then(locs => {
           
            const strHTML = locs.map((loc) => {
                return `
                <tr>
                <td>1${loc.name}</td>
                <button> Move </button>
                <td>1${loc.lat}</td>
                <button> Move </button>
                <td>1${loc.lng}</td>
                </tr>
                `
            }).join('')
            console.log('Locations:', locs)
            elLocs.innerHTML = strHTML;
            document.querySelector('location-table-body').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            locService.setUserLoc(pos)
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}