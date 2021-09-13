var idusuario = localStorage.getItem("idUsuario");

var uri;
var action;
var actionVerCategoria;
var urlSaveUser;
var urlSaveAction;
var idunico;
var ip;

function registerTracking(onlyClient){ //Llamada Directa
    /** Si el usuario no esta registrado se registrara **/
    if(!idusuario){
        var latitud;
        var longitud;
        var pais;
        var city;
        
        $.ajax({
            url : 'http://ip-api.com/json',
            type: "GET",
            
            success: function(data, textStatus, jqXHR)
            {
                latitud = data.lat;
                longitud = data.lon;
                pais = data.country;
                city = data.city;
                
                insertUser(idunico,"web",latitud,longitud,pais,city,ip);
            }
        });
    }else if(onlyClient !== 1){
        insertAction(idusuario,uri,action);
    }
}

function insertUser(uid,type,latitude,longitude,country,city,ip){
    var obj = new Object();
    obj.uid = uid;
    obj.type = type;
    obj.latitude = latitude;
    obj.longitude = longitude;
    obj.country = country;
    obj.city = city;
    obj.ip = ip;

    var jsonString = JSON.stringify(obj);

    $.ajax({
        url : urlSaveUser,
        type: "POST",
        data: jsonString,
        contentType: "application/json",
        dataType: "json", 

        success: function(data, textStatus, jqXHR)
        {
            if(data==uid){
                localStorage.setItem("idUsuario", uid);  
                insertAction(uid,uri,action);
                //FALTA Colocar el id de la ciudad
//                registerOnlyClient(1,uid,ip);
            }
        }
    });   
}
            
function insertAction (uid,uri,action){
    var obj = new Object();
    obj.uid = uid;
    obj.uri = uri;
    obj.action_ = action;
    obj.parameters = null;

    var jsonString = JSON.stringify(obj);
    $.ajax({
        url : urlSaveAction,
        type: "POST",
        contentType: "application/json",
        data: jsonString,
        dataType: "json",
        success: function(data, textStatus, jqXHR)
        {
            
        }
    });
}

function insertActionCategoria(id_linea,id_categoria){ //Llamada Directa
    try{
        if(id_linea>0){
            if(!idusuario){/** si no esta inertado el usuario se debe insertar **/
                registerTracking(1);

            }else{
                insertAction(idusuario,'/linea/'+id_linea,action);
            }
        }
        if(id_categoria>0){
            if(!idusuario){/** si no esta inertado el usuario se debe insertar **/
                registerTracking(1);

            }else{
                insertAction(idusuario,'/categoria/'+id_categoria,actionVerCategoria);
            }
        }
    }catch (err){
        console.log("error encio analytics "+err);
    }
}