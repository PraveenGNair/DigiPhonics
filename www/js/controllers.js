 

scanApp.controller('LoginCtrl',function ($scope,$state,$ionicPopup,$cordovaSQLite,$firebaseAuth,$ionicLoading,$cordovaVibration,$cordovaGeolocation,$timeout) {
  $scope.data=[];


//DATA
$scope.allcompounds=[{loc_id : 'PUNCOMP',description:'Pune Compound'},{loc_id : 'SLC',description:'Solihull Compound'},{loc_id : 'HWC',description:'Halewood Compound'},{loc_id : 'HWRH',description:'Halewood Road Compound'}];

$scope.routeMapDetails=[
[{loc_id : 'PUNCOMP',description:'Pune Compound',lat:18.5204,long:73.8567,status:'Red'},{loc_id : 'SLC',description:'Solihull Compound',lat:52.4118,long:1.7776,status:'Green'},
{loc_id : 'HWC',description:'Halewood Compound',lat:53.3706,long:2.8210,status:'Blue'}],

[{loc_id : 'PBCOM',description:'Port Bury',lat:51.4742,long:2.7211,status:'Green'},{loc_id : 'GBSOU',description:'Southampton',lat:50.9097,long:50.9097,status:'Red'},
{loc_id : 'THRCOM',description:'Thurleigh',lat:52.2149,long:0.4588,status:'Blue'}],

[{loc_id : 'CBP',description:'Castle Bromwich',lat:53.3498,long:6.2603,status:'Green'},{loc_id : 'BIM',description:'Birmingham',lat:52.4862,long:1.8904,status:'Blue'},
{loc_id : 'SGH',description:'Shanghai',lat:31.2304,long:121.4737,status:'Red'}]


]
;

//Data for Vehicle Details
$scope.vehicleData=
[{orderNumber :13219988,VIN:'LA840029',model:'Evoque',color:'1AM White',derivative:'Range Rover',destination:'France',status:'Manufacturing OK',loc_id : 'PUNCOMP',description:'Pune Compound',
country:'UK',dealer:'Terry Co.',dropPoint:'New Ping Road,Zip:0453',buildDate:'02/06/2015',CPD:'03/08/2015'},
{orderNumber :13219989,VIN:'K41168',model:'Jaguar X7',color:'Silver White',derivative:'Sports Special',destination:'Port Bury',status:'Off Assembly Plant',loc_id : 'SLC',description:'Solihull Compound',
country:'CHINA',dealer:'Jerry AutoMobiles',dropPoint:'Great West 0482',buildDate:'08/05/2015',CPD:'03/07/2015'},
{orderNumber :13219990,VIN:'Y37528',model:'Jaguar XE',color:'1B Grey',derivative:'Prestige',destination:'Slovakia',status:'Manufacturing OK',loc_id : 'HWC',description:'Halewood Compound',
country:'BRAZIL',dealer:'Shawn AutoMobiles',dropPoint:'Biringham Street',buildDate:'14/04/2015',CPD:'30/06/2015'},
{orderNumber :13219991,VIN:'LA38210',model:'Land Rover',color:'Dust White',derivative:'Defender',destination:'Paris',status:'Off Assembly Plant',loc_id : 'HWRH',description:'Halewood Road Compound',
country:'UK',dealer:'Loco Dealers',dropPoint:'Great City West,452',buildDate:'24/05/2015',CPD:'31/07/2015'}];




        $scope.showvisible=false;
        $scope.visibililty=false;
        $scope.visibililtyData=false;
    
        $scope.visitbleRecord=false;

//Record vehicle into comp

$scope.comp=$scope.allcompounds[0].description;

$scope.welcomeLogin=function(){
  $state.go('login');
} 
 //Login function

  $scope.login=function(data){
 
 
if((data.username==undefined||data.username==null)|| (data.password==undefined||data.password==null)){
 var alertpop=$ionicPopup.alert({
    title:'Login Failed',
    template:'Please check your credentials.'
  });
}else{
 $ionicLoading.show({
      template: 'Loading...'
    });

firebase.auth().signInWithEmailAndPassword(data.username, data.password).then(function(result) {
 
  var user = result.User;
   $ionicLoading.hide();
   $state.go('dashboard');
  // ...
}).catch(function(error) {
   $ionicLoading.hide();
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
   var alertpop=$ionicPopup.alert({
    title:'Login Failed',
    template:'Please check your credentials.'
  });
  // ...
});
    
 
//Google authentication firebase
   /* var fbAuth = $firebaseAuth(fb);
    

 //Auth.$createUser({
    //email    : data.username,
    //password : data.password
  //}).then(function(userData) {
    //return
     fbAuth.$authWithOAuthPopup("google")
     //({
       //email    : data.username,
    //password : data.password
 // });
     .then(function(authData){
       alert('logged in as' + authData.uid);
       $state.go('dashboard');

      console.log("Authenticated successfully with payload:", authData);
    
  }).catch(function(error){

  if (error) {
       var alertpop=$ionicPopup.alert({
    title:'Login Failed',
    template:'Please check your credentials.'
  });
      console.log("Login Failed!", error);
    }
    });

/*
if(data.username=='admin'&& data.password=='123'){
  console.log("Successfully Logged IN");
  $state.go('dashboard');
}
else{
  var alertpop=$ionicPopup.alert({
    title:'Login Failed',
    template:'Please check your credentials.'
  });
}
*/
}
}
  
$scope.backtoLogin=function(){

$scope.data=undefined;


$state.go('login');
}


var validateVehicles=function(data){
  var vehicle=[];
  vehicle=$scope.vehicleData;
  var flag=false;
  var index;
if((data.text==vehicle[0].VIN)||(data.text==vehicle[1].VIN)||(data.text==vehicle[2].VIN)||(data.text==vehicle[3].VIN)){

for(var i in vehicle){
if(vehicle[i].VIN==data.text){
  index=i;
}
}
$scope.displayVehicleDetails=vehicle[index];
flag=true;
}else{

}
return true;
}

$scope.call=function(){
  var mycheck={text:'LA38210'};

 var flag= validateVehicles(mycheck);

  
}

  $scope.scanBarcode=function(){

cordova.plugins.barcodeScanner.scan(
      function (result) {

         $ionicLoading.show({
      template: 'Loading...'
    });
          if((result.text!=undefined || result.text !=null)&& result.format!=undefined){
 
     var flag=  validateVehicles(result);
      $ionicLoading.hide();
      if(flag){
          $scope.$apply(function (){
            $scope.vin=result.text;
            console.log("Scope Binded "+result.text);
            $scope.showvisible=true;
            // alert("Scanned Successfully!!");
             $scope.visibililty=false;
            $scope.visibililtyData=false;

       });
         
      }
    }
        else{
           $ionicLoading.hide();
      alert("Problem with scanning");
      console.log("Scanning issue");
    }
  
},function (error) {
         $ionicLoading.hide();
          alert("Info: " + error);
      },
      {
          "preferFrontCamera" : false, // iOS and Android
          "showFlipCameraButton" : true, // iOS and Android
          "prompt" : "Place a barcode inside the scan area", // supported on Android only
         // "formats" : "QR_CODE,PDF_417,CODE_128, CODE_39", // default: all but PDF_417 and RSS_EXPANDED
          "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
      }
    
   )
}


  

$scope.createEvent=function(){

   $state.go('login');
}

var validateStatus=function(vin){
 var vehicle=[];
  vehicle=$scope.vehicleData;
  var index;
for(var i in vehicle){
if(vehicle[i].VIN==vin){
  index=i;
}

}
if(index==undefined){
  return undefined;
}
else{
return vehicle[index].status;
}


};

$scope.eventABS=function(vin){
 $ionicLoading.show({
      template: 'Loading...'
    });

var status=validateStatus(vin);
 $ionicLoading.hide();
if (status=='Off Assembly Plant'){
   $cordovaVibration.vibrate(1000);
var alertpop=$ionicPopup.alert({
    title:'Error',
    cssClass:'myPopup',
    template:'Vehicle is not authorised for ABS.'
  });

}
else{
 firebase.database().ref('vinEvents/' + vin).set({
    VIN: vin,
    BARCODE: 'barcode',
    event : 'ABS'
  });


 $scope.visibililty=false;
$scope.visibililtyData=false;
var query="INSERT INTO vin_events (shortvin,barformat,event)  VALUES (?,?,?)";
var today=new Date();
$cordovaSQLite.execute(db,query,[vin,"BARCODE","ABS"]).then(function(result){
//alert("ABS Event Created for the Scanned Vin-"+vin);

 var alertpop=$ionicPopup.alert({
    title:'Event Created',
    template:'ABS Event Created for the Scanned Vin-'+vin
  });
 $ionicLoading.hide();
 $scope.visibililty=true;
 $state.go('viewVehicle');
console.log("Inserted ID "+result.insertId);
},function(error){
   $ionicLoading.hide();
  alert(error);
  console.log(error);
});

}

}

$scope.load=function(){
 // $state.go('viewVehicle');

 //var database = firebase.database();
 $scope.alldata=[];
  $scope.showvisible=false;
  $cordovaSQLite.execute(db,"SELECT shortvin,event FROM vin_events").then(function(result){
    if(result.rows.length>0){
      for(var i=0;i<result.rows.length;i++){
        $scope.alldata.push(result.rows.item(i));
      }
       $scope.visibililtyData=true;
       //$state.go('viewVehicle');
    }
    else{
      console.log("No data found");
    }
},function(error){
  console.log("Error "+error);

});

}


//Vehicle Record into comp


   $scope.recordData=[];
$scope.scanRecordBarcode=function(){
cordova.plugins.barcodeScanner.scan(
      function (result) {
          if((result.text!=undefined || result.text !=null)&& result.format!=undefined){
     $scope.$apply(function (){
        
      $scope.recordData.push(result.text);
      console.log("Scope Binded "+result.text);
      $scope.visibleRecord=true;
      // alert("Scanned Successfully!!");
       //$scope.visibililty=false;
      //$scope.visibililtyData=false;

        });
         
      }
        else{
      alert("Problem with scanning");
      console.log("Scanning issue");
    }
  }, 
      function (error) {
          alert("Info: " + error);
      },
      {
          "preferFrontCamera" : false, // iOS and Android
          "showFlipCameraButton" : true, // iOS and Android
          "prompt" : "Place a barcode inside the scan area", // supported on Android only
         // "formats" : "QR_CODE,PDF_417,CODE_128, CODE_39", // default: all but PDF_417 and RSS_EXPANDED
          "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
      }
   );
}


$scope.insertIntoComp=function(recordData,loc){


for(var i in recordData){

var query="INSERT INTO location_events (shortvin,location,event)  VALUES (?,?,?)";
$cordovaSQLite.execute(db,query,[recordData[i],Loc,"INTOCOMP"]).then(function(result){
//alert("ABS Event Created for the Scanned Vin-"+vin);
 //$scope.visibililty=true;
 //$state.go('viewVehicle');
console.log("Inserted ID "+result.insertId);
},function(error){
 // alert(error);
  console.log(error);
});



}

  var alertpop=$ionicPopup.alert({
    title:'Successfully Created',
    template:'Vehicles have been recorded into Compound.'
  });
}





//Build Google Map
var buildGoogleMap = function(routeMapData){
        var routeMapDetail=[];
        var infowindow;
      var i=0;
      var markers=[];
      var marker;
      var currentValue;
      var titleInfo;
      var icon="";
      var path=[];
      
     
    //sequence generator
    var seq=Math.floor((Math.random() * 3));
routeMapDetail=routeMapData[seq];
      var index=routeMapData[seq].length;  
       /* if(routeMapDetail[index-1].loc_id == currLoc) {
        $scope.isLastLocation = true;
      }
      */
          var mapOptions = {
           // zoom: 8,
            minZoom: 2, 
            maxZoom: 15 ,
            center: new google.maps.LatLng(routeMapDetail[index-1].lat,routeMapDetail[index-1].long),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        $scope.mapCanvas = new google.maps.Map(document.getElementById('map'), mapOptions);
      var map=$scope.mapCanvas;
      for(i=index;i>0;i--) {
        currentValue=new google.maps.LatLng(routeMapDetail[i-1].lat,routeMapDetail[i-1].long);
            titleInfo= routeMapDetail[i-1].description + "("+routeMapDetail[i-1].loc_id+")";
            switch (routeMapDetail[i-1].status) {
                case "Red":
                icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
                  break;
                case "Green":
                  icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
                  break;
                case "Blue":
                  icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
                  break;
                default :
                icon = "http://maps.google.com/mapfiles/ms/icons/purple-dot.png";
                break;
            }
      
     infowindow = new google.maps.InfoWindow();

      marker = new google.maps.Marker({
          position: currentValue,
          map: map,
          animation: google.maps.Animation.DROP,
          title:titleInfo,
          icon : icon
        });

       google.maps.event.addListener(marker,'click', (function(marker,titleInfo,infowindow){ 
        return function() {
           infowindow.setContent(titleInfo);
           infowindow.open(map,marker);
        };
    })(marker,titleInfo,infowindow)); 

        markers.push(marker);
        path.push(currentValue);
    }//end for loop 
       var lineSymbol = {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 4
        };
      var mapLine = new google.maps.Polyline({
          path:path,
          geodesic: true,
          
          icons : [{
              icon: lineSymbol,
            offset: '0',
              repeat: '20px'
          }],  
          strokeColor:'#0147FA',
        strokeOpacity: 0,
          strokeWeight: 3
    });

  mapLine.setMap(map);
  
      function AutoCenter() {
      //Create a new viewpoint bound
          var bounds = new google.maps.LatLngBounds();
      //Go through each...

      for(var i in markers){
         bounds.extend(markers[i].position);
      }
           /* angular.each(markers, function (index, marker) {
            bounds.extend(marker.position);
          });*/
      //Fit these bounds to the map
          map.fitBounds(bounds);
      }
        AutoCenter();
      
    };// buildGoogleMap finish
    




//Map 

$scope.getMapLocation=function(){
  $state.go('map');
}



$scope.drawMap = function(){

    $ionicLoading.show({
      template: 'Loading...'
    });

     /*$scope.init=function() {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
       /* var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });*/

       /* var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      
      //google.maps.event.addDomListener(window, 'load', initialize);
      
    
       

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      
     // };

  
}
$scope.init();*/


$timeout(function(){
  buildGoogleMap($scope.routeMapDetails);
} ,1000);


  $ionicLoading.hide();
}
});





