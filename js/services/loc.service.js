export const locService = {
    getLocs,
    addLoc,
    removeLoc,
    getUserLoc,
    setUserLoc
}

import { storageService } from './storage_service.js'

const gLocs = storageService.load('locsDB') || [];
const gUserLoc = storageService.load('userLocDB') || {}
// const locs = [
//     { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
// ]

function getLocs() {
    if (!gLocs) return
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}
// connect to add marker on location.
function addLoc(info) {
    gLocs.push({ name: info.name, lat: info.lat, lng: info.lng, createdAt: Date.now() })
    storageService.save('locsDB', gLocs)

}
// connect to delete button in table.
function removeLoc(locName) {
    gLocs.find((loc, idx) => {
        if (loc.name === locName) gLocs.splice(idx, 1)
        storageService.save('locsDB', gLocs)
    })
}
// connect to getUserPos
function setUserLoc(loc) {
    gUserLoc = loc;
    storageService.save('userLocDB', gUserLoc)
}

function getUserLoc() {
    return gUserLoc;
}