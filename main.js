(function () {
    async function getGeoLocation(obj = {label: ''}) {
        const request = async () => fetch(`https://geo.ipify.org/api/v1?apiKey=at_FmNvdOANhKZUU5TZhTCuYnX14uOI6${obj.label === 'ip' ? `&ipAddress=${obj.value}` : obj.label === 'domain' ? `&domain=${obj.value}` : ''}`)
            .then(res => res.json())
        .catch(err => console.log(err))
        const data = await request();
        const address = () => {
            return `${data.location.city}, ${data.location.country}, ${data.location.geonameId}`
        }
        const elData = {
            ip: data.ip,
            address: address(),
            timeZone: data.location.timezone,
            isp: data.isp
        }
        renderInfo(elData)
        generateMap(data.location.lat, data.location.lng)
    }
    window.addEventListener('load', getGeoLocation);

    function generateMap(lat, lon) {
        const map = document.getElementById('map');
        const mapWraper = document.querySelector('.map-wrapper');
        mapWraper.removeChild(map)
        const newMap = document.createElement('div');
        newMap.setAttribute('id', 'map');
        mapWraper.append(newMap)
        
        const myMap = L.map('map').setView([lat, lon], 17)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoaWsyMSIsImEiOiJja2tmNWcwbzkwMWNuMndxdDIzdjdsZ3BhIn0.1EK-0AP5umxco9EHBvRwlw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYXNoaWsyMSIsImEiOiJja2tmNWcwbzkwMWNuMndxdDIzdjdsZ3BhIn0.1EK-0AP5umxco9EHBvRwlw'
        }).addTo(myMap);
    
        const marker = L.marker([lat, lon], 17).addTo(myMap);
        marker.bindPopup('<b>I think you are here</b>').openPopup();
        L.circle([lat, lon], {
            color: '#ff47a3',
            fillColor: '#CA2E55',
            fillOpacity: '0.3',
            radius: 500
        }).addTo(myMap)
    }

    const renderInfo = (obj) => {
        const { ip, address, timeZone, isp } = obj;
        const elIp = document.querySelector('.ip-address .data');
        const elAddress = document.querySelector('.ip-location .data');
        const elTime = document.querySelector('.time-zone .data');
        const elIsp = document.querySelector('.isp .data');

        elIp.innerHTML = ip;
        elAddress.innerHTML = address;
        elTime.innerHTML = timeZone;
        elIsp.innerHTML = isp;
    }
    

    //Handle Search
    document.querySelector('.btn-enter').addEventListener('click', () => {
        const searchBox = document.querySelector('input.search');
        
        //Check whether it is IP or Domain
        if (/(?:\d{3}|\(\d{3}\))([.\/\.])/gi.exec(searchBox.value)) {
            console.log('its an Ip')
            const oj = {label: 'ip', value: searchBox.value}
            getGeoLocation(oj)
        }
        else if(/[A-Za-z0-9]\.[a-z]/gi.exec(searchBox.value)) {
            console.log('it is a domain address')
            const oj = {label: 'domain', value: searchBox.value}
            getGeoLocation(oj)
        }
        
    })

    function test(obj = {label: ''}) {
        console.log(`hell`)
    }

})()


    // const getLocation =  () => {
    //     if (window.navigator.geolocation) {
    //         window.navigator.geolocation.watchPosition(pose => {
    //             const { latitude, longitude } = pose.coords;
    //             console.log(latitude, longitude)
    //             generateMap(latitude, longitude)
    //         }, handleError);
    //     }
    //     else {
    //         alert('Geolocation is not supported by this browser');
    //         return;
    //     }
    // }
    // function handleError(error) {
    //     switch (error.code) {
    //         case error.PERMISSION_DENIED:
    //             console.log('User denied the permission');
    //             break;
    //         case error.POSITION_UNAVAILABEL:
    //             console.log('Location is not availabel');
    //             break;
    //         case error.TIMEOUT:
    //             console.log('Too many time is taken')
    //             break;
    //         case error.UNKNOWN_ERROR:
    //             console.log('Unknown error, please try again later');
    //             break;
    //     }
    // }
        // window.addEventListener('DOMContentLoaded', getLocation)
