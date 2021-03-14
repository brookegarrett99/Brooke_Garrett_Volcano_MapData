const key = 'pk.eyJ1IjoiYmdhcnJldHQ5OSIsImEiOiJja20yZDc2bW4xYnU3Mm5vNjNkM3h2MzgxIn0.tkcMys3h41EjoXy6YFcs4w';

const options = {
  lat: 39.329239,
  lng: -82.101257,
  zoom: 12,
  style: 'mapbox://styles/bgarrett99/ckm9fyrjm7ka317lf5vmbkfn6',
  pitch: 0
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  eruptions = loadTable('volcano_eruptions.csv','csv','header');
}


function draw() {
 clear();
  //noFill();
 stroke(255);
 strokeWeight(3);
  const zoom = myMap.zoom();
 const athens = myMap.latLngToPixel(39.3292,-82.1013);

 ellipse(athens.x,athens.y,10 * zoom,10 * zoom);

  
 if(dist(athens.x,athens.y,mouseX,mouseY)< (zoom * 10)/2){
   fill(100,100); 
  }else{
    fill(55,100);
  }
  
  //load .csv data
  for (let i = 0; i < eruptions.getRowCount(); i++) {
    const latitude = Number(eruptions.getString(i,'Latitude'));
    const longitude = Number(eruptions.getString(i,'Longitude'));
    const pos = myMap.latLngToPixel(latitude,longitude);
     const name = eruptions.getString(i,'Name');
      
    let elevation = eruptions.getString(i,'Elevation (Meters)');
    let size = eruptions.getString(i,'Elevation (Meters)');
    size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
    ellipse(pos.x,pos.y,size,size);
    
   ellipse(pos.x,pos.y,1 * myMap.zoom(),1 * myMap.zoom());
    
    if(dist(pos.x,pos.y,mouseX,mouseY) < size){
    textSize(32);
    text(name,pos.x,pos.y);
  }

    
 if(dist(pos.x,pos.y,mouseX,mouseY) < 1 * myMap.zoom()){
   // textSize(32);
    // text(address,pos.x,pos.y);
  }


    
    
}
    
  }




//resize canvas when the window is resized...
$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});


