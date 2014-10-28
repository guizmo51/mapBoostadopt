var valuesFR = {};
var modelData = {};
var markerList = [];
var nextId='';
    if($.cookie('firstVisit')==undefined){
		$('#modalFirstTime').modal({
  backdrop: 'static',
  keyboard: false
})
		$('#modalFirstTime').modal('show');
	}
$('.fb-share').click(function(e) {
        e.preventDefault();
        window.open($(this).attr('href'), 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
    });
    var progress = document.getElementById('progress');
		var progressBar = document.getElementById('progress-bar');
		function split_img_string(img_url, format){
		
		
		//On va injecter un caract
    if(img_url==null){
      var url = "/img/woman.png";
    }else{
      var img=img_url.split("/");
    var concat=";";
    var fin=img[(img.length)-1];
    var tab=img.pop();
    Array.isArray()
    img.toString();
    var url = img.join('/');
    url=url+"/thumb"+format+"_"+fin+".jpg";
    }
		
	
		
				return url;
		
	} 
function resize(){
  
    if($(window).width()>=980){
        $('#map').css("height", ($(window).height()));    
       
    }else{
        $('#map').css("height", ($(window).height()));    
       
    }

}
function tplRow(data){
	
	if(data.sex=='1'){
var classSex="girl";		
		}else{
			var classSex="boy";	
			}
  return '<div class="well post-container"><div class="post-thumb"><img  onError="this.src=\'/img/woman.png\';"  class="img-rounded" src="'+split_img_string(data.cover,1)+'"/></div><div class="post-content"><h3 class="post-title openProfile '+classSex+'"  data-attribute-aid="'+data.id+'">'+data.pseudo+'</h3><p>'+data.age+' ans - <span  class="label label-default openCity" data-attribute-city="'+data.city+'">'+data.city+'</h4></p></div></div>';
 
}

function tplGenerator(){
  var html="";

  for(var i =0; i<5; i++ ){
    html+=tplRow(data);
  }

  return html;
}
 		function createCustomPanel(){
 			myControl = document.createElement("div");
     myControl.id = "panel";
     myControl.style.position = "absolute";
     myControl.style.zIndex = "50";
     myControl.style.width = "";
     myControl.style.height = "70%";
     myControl.style.top = "15px";
     myControl.style.right = "10px";
    
      myControl.style.float = "right";
        myControl.style.overflowY = "auto";
      myControl.innerHTML = '';
      document.getElementById('map').appendChild(myControl);
      resize();

 		}
	function createCustomAlert(){
		myAlert = document.createElement("div");
		myAlert.id = "panel";
		myAlert.style.left = "100px";
  myAlert.style.position = "absolute";		
		myAlert.style.zIndex = "50";
		      myAlert.innerHTML = '<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Astuce </strong> Vous pouvez visualiser tous les profils d\'une commune via la recherche (en haut à droite) ou en cliquant sur la ville associée à un profil (à droite) </div>';
		
		document.getElementById('map').appendChild(myAlert);
		
		} 		
 		
 		
    function fillRowWithData(data){
    
			if(data.sex=="1"){
					var classSex="girl";		
			}else{
				var classSex="boy";	
			}
      return "<tr><td class=\"post-container\"><div class=\"post-thumb\"><img class=\"img-rounded\"   onError=\"this.src='/img/woman.png';\"  src='"+split_img_string(data.cover,1)+"' /></div><div class=\"post-content\"><h3 class=\"post-title openProfile "+classSex+"\"  data-attribute-aid=\""+data.id+"\">"+data.pseudo+"</h3><p>"+data.age+" ans</p></div></td></tr>";
    }
    function profileDataGenerator(data){
    	var html ='';
   	html +="<table class=\"table table-striped table-bordered\">";
      html+="<tr><td>Lien AdopteUnMec</td><td>"+renderLinkAUM(data.id, data.country)+"</td></tr>";
       $.each(data, function(key, value){
       	
        html+=renderItem(key,value, data.sex);
        
          
      });
      html += '</table>';
      return html;
    }

function renderLinkAUM(id, country){
			var base = "";	
			
			if(country=="de"){
					base = "http://www.adoptaguy.de/profile/";
			}else if(country=="it"){
				
				base = "http://www.adottaunragazzo.it/profile/";
				}else{
					base = "http://www.adopteunmec.com/profile/";
					}
		return "<a href=\""+base+""+id+"\" target=\"_blank\">Voir son profil</a>";
	}
function addTrYourAdd(){
	
	
return '<tr><td align="center" colspan="2"><a href="mailto:sabrina.webdev@gmail.com?subject=Contact%20pour%20publicité" class="btn btn-success btn-lg"><span class="glyphicon glyphicon-info-sign"></span>  Votre publicité ici ? Contactez-nous !</a></td></tr>';
	
	}

function addTrAdBoost(){
var buttonAd = '<tr><td align="center" colspan="2"><a href="http://www.boostadopt.com" target="_blank" class="btn btn-danger btn-lg"><span class="glyphicon glyphicon-heart"></span> Pour booster vos visites sur Adopte !</a></td></tr>';
return buttonAd;
	}
    function fillTableWithList(data){
        var html = "<table class=\"table table-striped table-bordered\">";
        
       html+=addTrYourAdd();
        $.each(data, function(key, value){
          html+=fillRowWithData(value);
        	if(key%20==0 && key>2){
        		
        		 html+=addTrAdBoost();		
        	}
        })
        html+="</table>";

	$("#cityModalTitle").html(data[0].city);
        $("#tableListProfiles").html(html);
        $('#myModal').modal('show');
    }

		function updateProgressBar(processed, total, elapsed, layersArray) {
			if (elapsed > 1000) {
				// if it takes more than a second to load, display the progress bar:
				progress.style.display = 'block';
				progressBar.style.width = Math.round(processed/total*100) + '%';
			}

			if (processed === total) {
				// all markers processed - hide the progress bar:
				progress.style.display = 'none';
			}
		}
function openProfile(aid){
$.getJSON('/api/viewProfile/?id='+aid+'&callback=?', function(data){
        if(typeof data[0] =="object"){

        				 $("#profileData").html(profileDataGenerator(data[0]));
          	$('#modalProfile').modal('show');
        				
        				
        }else{
        
$('#modalHelp').modal('show');
        	}
        
      });	
	
	}

 function removePanel(){
 
  $("#panel").remove();
 }

function renderItem(key, value, sex){
      var html = '';
      var valEnd = '';
      if(jQuery.inArray(key, modelData.hide) < 0){
        if(typeof modelData.dataFR[key] =='object'){
          if(typeof modelData.dataFR[key].both == "object"){
           
           var objVal = modelData.dataFR[key].both;
            

          }else{
            if(sex=='1'){
              var typeSex = 'girl';
            }else {
               var typeSex = 'boy';
            }
            
              var objVal = modelData.dataFR[key][typeSex];
            
          }
          
          if(typeof objVal == 'object'){
           
            if(typeof value == "object"){
              valEnd = '<ul>';
              $.each(value, function(key,val){

                valEnd+='<li>'+objVal[val]+'</li>';
                
              });
          valEnd += '</ul>';
            }else{

              valEnd=objVal[value];
            }
            
     
           
          }
          

        }else{
          if(key == 'pics'){
            
            if( typeof value == 'object'){
              valEnd = '<ul>';
              $.each(value, function(key,val){

                valEnd+='<li><img src="'+split_img_string(val,1)+'" class="img-rounded"   onError="this.src=\'/img/woman.png\';" /></li>';
                
              });
          valEnd += '</ul>';
            }else{
              valEnd = value;
            }
           
            
          }else if(key == 'cover'){
              if(typeof value != "undefined"){
                valEnd = '<img src="'+split_img_string(value,2)+'" class="img-rounded"   onError="this.src=\'/img/woman.png\';" />'; 
              }
          }
          else{
            if(typeof value != "undefined"){
               valEnd = value;
            }
           
          }
          
        }
        html+="<tr><td>"+key+"</td><td>"+valEnd+"</td></tr>";

      }
      
      return html;
    }
	

	function closeModalHelp(){
		
		 $('#modalHelp').modal('hide');
		}
	
	
   MQA.EventUtil.observe(window, 'load', function() {
	




$(".trackClick").on("click",function(){  $('#modalHelp').modal('hide');});
//Click on Twitter event's
twttr.events.bind('click', function(event) {
   $('#modalHelp').modal('hide');
});

//Click on FB like
FB.Event.subscribe('edge.create', function(response) {
     $('#modalHelp').modal('hide');
});
$('#modalHelp').on('hidden.bs.modal', function () {
	
	$.getJSON('/api/viewProfile/?id='+nextId+'&callback=?', function(data){
        if(typeof data[0] =="object"){

        				 $("#profileData").html(profileDataGenerator(data[0]));
          	$('#modalProfile').modal('show');
        				
        				
        }else{
        
$('#modalHelp').modal('show');
        	}
        
      });
});
     //$('#map').css("height", ($(window).height() ));
$(window).on("resize", resize);
resize();

         var map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [ 46.483112, 3.133014 ],
            zoom: 6
    });
        
    // Load markers 
    //map.setSize();
    createCustomPanel();
    createCustomAlert();
		$.getJSON('/javascripts/final.json', function(cities){
              
              
            /* For AutoComplete Plugin */
            globalCities = $.map(cities, function(item) {

            return {label:item.city, value: item.city}
          });
             $( "#inputSearchCity" ).autocomplete( {source:globalCities , minLength: 3,  select: function(event, ui) {
             
                  $.getJSON('/api/getGirlsOfCities/?city='+ui.item.value+'', function(data){
                      if(data.length > 0 ){
                        fillTableWithList(data);
                      }
                  });
         }});

          $.each(cities,function(key, obj){
           
              if(typeof obj.gps != "undefined"){

        var title = obj.city;
        for(var x=0; x<obj.count; x++){
				if(obj.gps.lat!=""){
				 var marker = L.marker(L.latLng(obj.gps.lat, obj.gps.lng), { title: title, custom:obj.count });
      marker.bindPopup(title);
      markerList.push(marker);
				}else{
					//console.log(obj.city);
				}
         
     
        }
     
              }
               
   
          });
          
           var markers = L.markerClusterGroup({ chunkedLoading: true, chunkProgress: updateProgressBar });
                L.control.locate().addTo(map);

              markers.addLayers(markerList);
            var layer = map.addLayer(markers);
            map.on('moveend', function() {
       var inBounds = [], bounds = map.getBounds();
       markers.eachLayer(function(marker) {
          if (bounds.contains(marker.getLatLng())) {
              inBounds.push({city:marker.options.title, count:marker.options.custom});
          }

    }); 
       
       var currentCities=[];
          for (var i=0; i<5; i++){
            currentCities.push(inBounds[Math.floor((Math.random() * inBounds.length))]);
      }
      fillListWithCities(currentCities);
     
    });
        
        });
       

$.getJSON('/javascripts/valuesFR.json', function(data){
  
modelData = {'dataFR': data, 'hide':['online','last_cnx', 'last_cnx_label', 'in_contact', 'points', 'can_mail', 'is_faked', 's_blocked']};
});
          $('#myModal').on('show.bs.modal', function () {
    $('.modal .modal-body').css('overflow-y', 'auto'); 
    $('.modal .modal-body').css('max-height', $(window).height() * 0.7);
});
var globalCities ;

    $("#panel").on('click', ".openCity" , function() {
     
     
      
      
 $.getJSON('/api/getGirlsOfCities/?city='+$(this).attr('data-attribute-city')+'', function(data){
 		if(data.length > 0 ){
                        fillTableWithList(data);
                      }
 	});      
      
      

});     

$("#panel").on('click', ".openProfile" , function() {
    nextId=$(this).attr('data-attribute-aid');
      $.getJSON('/api/viewProfile/?id='+$(this).attr('data-attribute-aid')+'&callback=?', function(data){
        if(typeof data[0] =="object"){
        		
        				 $("#profileData").html(profileDataGenerator(data[0]));
          	$('#modalProfile').modal('show');
        				
        				
				
           
        }else{
$('#modalHelp').modal('show');      	
        	}
        
      });

}); 
$("#myModal").on('click', ".openProfile" , function() {
  nextId=$(this).attr('data-attribute-aid');
      $.getJSON('/api/viewProfile/?id='+$(this).attr('data-attribute-aid')+'&callback=?', function(data){
        if(typeof data[0] =="object"){

        				 $("#profileData").html(profileDataGenerator(data[0]));
          	$('#modalProfile').modal('show');
        				
        				
        }else{
        
$('#modalHelp').modal('show');
        	}
        
      });

}); 
          

          /*AutoComplete*/
         
          /* EndAutoComplete*/
        	$.ajaxSetup({ cache: false });
        	var fillListWithCities = function(cities){
            var girlsArray=[];
            $("#panel").html('');
           
				$.each(cities, function(key,obj){
          if(typeof obj != "undefined"){

            $.getJSON('/api/profile/?city='+obj.city+'&count='+obj.count+'',function(content){
          var data= content[0];
       
          var top = key+(key*25);
          if(jQuery.inArray(data.id, girlsArray)<0){
             girlsArray.push(data.id)
      $("#panel").append(tplRow(data));
          }

            });
          }
					
				});
resize();
			}
        	

   
       
   $("#modalBienvenueConfirmFalse").on('click',function(){
	
	 window.history.back();
	
	});	
$("#modalBienvenueConfirmTrue").on('click',function(){
	
	 $('#modalFirstTime').modal('hide');
	 $.cookie('firstVisit', 'HelloWorld');
	
	});	

 


   });

