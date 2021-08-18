export const locService = {
    getLocs,
    addLoc,
    removeLoc,
    getUserLoc,
    setUserLoc,
    getGLocs,
}
import { storageService } from './storage.service.js'
let gIdx = storageService.load('gIdxDB') + 1 || 0;
let gLocs = storageService.load('locsDB') || [];
let gUserLoc = storageService.load('userLocDB') || {}


function getLocs() {
    if (!gLocs) return
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}

function addLoc(lat, lng) {
    gLocs.push({ name: gIdx, lat, lng, createdAt: new Date() })
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

function getGLocs() {
    return gLocs;
}