import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/storage.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onRemoveLoc = onRemoveLoc;

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
    let lastLoc = locService.getGLocs()[locService.getGLocs().length - 1]
    console.log('lastLoc', lastLoc)
    mapService.addMarker({ lat: lastLoc.lat, lng: lastLoc.lng });
}

function onGetLocs() {
    let elLocs = document.querySelector('.location-table-body');
    locService.getLocs()
        .then(locs => {
            const strHTML = locs.map((loc) => {
                return `
                <tr>
                <td>Id:${loc.name}</td>
                <td>Lat:${loc.lat}</td>
                <td>Lng:${loc.lng}</td>
                <td>Created:${loc.createdAt}</td>
                <button> Go </button>
                <button onclick="onRemove(${loc.name})"> Delete </button>
                </tr>
                `
            }).join('')
            console.log('Locations:', locs)
            elLocs.innerHTML = strHTML;
            // document.querySelector('location-table-body').innerText = JSON.stringify(locs)
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

function onRemoveLoc(locName) {
    console.log('locName', locName)
        // removeLoc(locName)  why not defined god fucking damnit

}