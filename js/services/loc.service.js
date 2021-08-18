export const locService = {
    getLocs,
    addLoc,
    removeLoc,
    getUserLoc,
    setUserLoc
}
import { storageService } from './storage.service.js'
let gIdx = storageService.load('gIdxDB') + 1 || 0;
let gLocs = storageService.load('locsDB') || [];
let gUserLoc = storageService.load('userLocDB') || {}
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

function addLoc(lat, lng) {
    gLocs.push({ name: gIdx, lat, lng, createdAt: Date.now() })
    storageService.save('locsDB', gLocs)
    storageService.save('gIdxDB', gIdx)
    gIdx++
}
// connect to delete button in table.  // NEEDS CHECKING
function removeLoc(locName) {
    gLocs.find((loc, idx) => {
        if (loc.name === locName) gLocs.splice(idx, 1)
        storageService.save('locsDB', gLocs)
    })
    gIdx--
    storageService.save('gIdxDB', gIdx)
}
// connect to getUserPos
function setUserLoc(loc) {
    gUserLoc = {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
    }
    storageService.save('userLocDB', gUserLoc)
}

function getUserLoc() {
    return gUserLoc;
}