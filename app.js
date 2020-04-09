window.addEventListener("load",()=>{
    var d = new Date();
	var n = d.getHours();
	if (n > 19 || n < 6)
	  // If time is after 7PM or before 6AM, apply night theme to ‘body’
	  document.body.className = "night";
	else if (n > 16 && n < 19)
	  // If time is between 4PM – 7PM sunset theme to ‘body’
	  document.body.className = "sunset";
	else
	  // Else use ‘day’ theme
	  document.body.className = "day";

    //define variables
    let long;
    let lat;
    let city='Goa,IN';
    let temperatureDegree=document.querySelector('.temp-degree');
    let temperatureDescrip=document.querySelector('.temp-descript');
    let temperatureTimezone=document.querySelector('.timezone');
    let temperatureSection=document.querySelector('.temp-section');
    let temperatureSpan=document.querySelector('.temp-section span');
    let loccity=document.querySelector('.city');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            //8c9b6b1a9e984bf2aff7a165db007883----API KEY
            //http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}----APICALL
            const api = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${long}&key=8c9b6b1a9e984bf2aff7a165db007883`;
            //const api =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=bd6440525f97e629abe50ab2762fbb78`
            //const api2 =`https://api.weatherbit.io/v2.0/current?city=Goa,IN&key=8c9b6b1a9e984bf2aff7a165db007883`;
            fetch(api)
                .then(respose =>{
                    return respose.json();
                })
                .then(result =>{
                    console.log(result);
                    
                    const desp= result.data["0"].weather.description;
                    const temperature= result.data["0"].temp
                    globalThis.celcius=temperature;
                    
                    const timezone= result.data["0"].timezone
                    const icoid=result.data["0"].weather.icon;
                    ico=icoid+".png";
                    console.log(ico);
                    const loc=result.data["0"].city_name;
                    //set DOM from api
                    temperatureDegree.textContent = temperature;
                    temperatureDescrip.textContent= desp;
                    temperatureTimezone.textContent=timezone;
                    loccity.textContent=loc;

                    document.getElementById("imageID").src=`./icons/${ico}`;
                    //document.getElementsByClassName(".yo").src=`./icons/${ico}`;
                });



        });
    }else{
        h1.textContent="This is not working because...how am I to get location ? Please allow location";
    }
    

    function units(){
        temperatureSection.addEventListener('click', ()=>{

            if(temperatureSpan.textContent === 'C'){


                temperatureSpan.textContent = 'F';
                fareh=((celcius/5)*9)+32;
                temperatureDegree.textContent=fareh;
                
            
                
            }else{

                temperatureSpan.textContent='C';
                temperatureDegree.textContent=celcius;
            }

        });

    };
units();

});

    