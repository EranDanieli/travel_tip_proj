export const mapService = {
    initMap,
    addMarker,
    panTo
}
import { locService } from './loc.service.js'

var gMap;

function initMap(lat = 32.170432, lng = 34.8426476) {
    if (locService.getUserLoc().length) {
        lat = locService.getUserLoc().lat;
        lng = locService.getUserLoc().lng;
    }
    const myLatlng = { lat, lng };
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: myLatlng,
                    zoom: 15
                })
            console.log('Map!', gMap);
            extraSteps(gMap, myLatlng);
        })
}

function extraSteps(map, myLatlng) {
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng,
    });
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        console.log('mapsMouseEvent', mapsMouseEvent)
        console.log('mapsMouseEvent', mapsMouseEvent.latLng.lat())
        console.log('mapsMouseEvent', mapsMouseEvent.latLng.lng())
        locService.addLoc(mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng())
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            `Added To Your Locations! click marker to mark`
            // ${ JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2) } 

        );
        infoWindow.open(map);
    });
}


function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBAoTXWtGi7nq1vSHstxHehONdbJ78j160';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}