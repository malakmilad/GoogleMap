function initMap(){
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var options = {
    center: { lat: 42.37849612102504, lng: 18.633945794390513 },
    zoom: 10,
    styles: stylesArray,
  }
  //New Map
  map = new google.maps.Map(document.getElementById("map"), options);

  //Add Markers to Array

  let MarkerArray = [{
    location: { lat: 42.37849612102504, lng: 18.633945794390513 },
    imageIcon: "C://Users//LENOVO//Downloads//Google-Map-Api-master//Google-Map-Api-master//place.png",
   
    // content: `<h2>Lustica</h2>`
  }
  ]

  // loop through marker
  for (let i = 0; i < MarkerArray.length; i++) {
    addMarker(MarkerArray[i]);

  }

  // Add Marker

  function addMarker(property) {

    const marker = new google.maps.Marker({
      position: property.location,
      map: map,
      label: {
        color: 'white',
        fontWeight: 'bold',
        text: 'Lustica Bay',
        fontSize: '20px',
        className: 'marker-position',
        
      },
      //icon: property.imageIcon
    });

    // Check for custom Icon

    if (property.imageIcon) {
      // set image icon
      marker.setIcon(property.imageIcon)
    }

    // if (property.content) {

      // const detailWindow = new google.maps.InfoWindow({
      //   content: property.content
      // });

      marker.addListener("mouseover", () => {
        detailWindow.open(map, marker);
      })

      marker.addListener("click", () => {
        map.setZoom(16);
        map.setCenter(marker.getPosition());
      });
    // }

  }
}
function calcRoute() {
  const success = (position) => {
    console.log(position)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    userlocation = latitude + ',' + longitude
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: userlocation,
        destination: "lustica",
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
  
          new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            directions: response,
            map: map,
          });
        }
      }
    )
  }
  const error = () => {
    status.textContent = 'Unable to retrieve your location';
  }
  navigator.geolocation.getCurrentPosition(success, error);
}
////////////////////////////////////////////////////////////////////////////////

var stylesArray = [
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      { color: '#ffffff' }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      { color: '#c7ddb1' }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      { color: '#cfe6bb' }
    ]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      { color: '#e6e9d7' }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      { color: '#b7e4f8' }
    ]
  },
]
