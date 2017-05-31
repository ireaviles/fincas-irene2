/* =============================== */
/* LOCAL VARIABLES */
var appversion = "1.28";


var ActualizarC = null; 
var ontactos = null; 
var Doonload = null;
var definition_url = null;
var dUI = ""; 
var dPL = ""; 
var dVE = "";
var pushNotification = null;
var registration_id = null;
var registration_platform = null;
var network_ONline = 0;
var prev_network_state = "";
var code_in_push = 1;

var IdU = "";
var IdS = "";
var Id2 = ""; //"t2zr54QxZRjl8ctM_s5i3A";
var id_contact_temp = "";
var IdC = "";
var Nombre = "";
var Saldo = "";


var debug_consola = 1;
function consola_debug(txt){ 
	if ( debug_consola==1){
		window.console && console.log(txt); 	
	}	
}

//Ire:Gabitel
/*
var def_url 		= "http://sardon.comunys.es";
var app_url 		= "http://sardon.comunys.es/procms/login.pro?app=1";
var login_sess		= "http://sardon.comunys.es/procms/app_checksess.pro";
var login_index 	= "http://sardon.comunys.es/procms/index.pro";
*/
var def_url 		= "http://proyectos.gabitelingenieros.com/";
var app_url 		= "hhttp://proyectos.gabitelingenieros.com/procms/Apps/ProyGabitel/1.0/";
var login_sess		= "http://proyectos.gabitelingenieros.com/procms/app_checksess.pro";
var login_index 	= "http://proyectos.gabitelingenieros.com/procms/index.pro";


//var url_base		= "http://proyectos.gabitelingenieros.com/procms/Apps/ProyGabitel/1.0/";
//Ire: Gabitel
/*
var url_base		= "http://sardon.comunys.es/procms/Apps/Fincas/1.5/";
var login_url 		= "http://sardon.comunys.es/procms/app_login.pro";
var login_sess		= "http://sardon.comunys.es/procms/app_checksess.pro";
*/
var url_base		= "http://proyectos.gabitelingenieros.com/procms/Apps/ProyGabitel/1.0/";
var login_url 		= "http://proyectos.gabitelingenieros.com/procms/app_login.pro";
var login_sess		= "http://proyectos.gabitelingenieros.com/procms/app_checksess.pro";

/* =============================== */
/* =============================== */
var app = {
    initialize: function(){ this.bindEvents(); },
    bindEvents: function(){
        document.addEventListener('deviceready', this.onDeviceReady, false);
		var onBackButton = function(){ 
			var ok_salir = false;
			var array_salir = ['ppal', 'login']; 
			if ( array_salir.indexOf(   $( "body" ).pagecontainer( "getActivePage" ).attr('id')   ) != -1 ){ ok_salir=true; }
			if (ok_salir) { if (navigator.app) {navigator.app.exitApp(); } else if (navigator.device) { navigator.device.exitApp(); } }
			else { navigation_adjust_back_button();	}
		}; 
		document.addEventListener("backbutton", onBackButton, false); 
    },
    onDeviceReady: function(){ 
		app.receivedEvent('deviceready'); 
		$("#errorMsg").hide(); 
		
		dUI = device.uuid;
		dPL = device.platform;
		dVE = device.version;
		$("#dui").val(dUI);
		$("#dpl").val(dPL);
		$("#dve").val(dVE);
		

	},
    receivedEvent: function(id) { }
};
/* =============================== */
/* =============================== */




/* =============================== */
/* =============================== */
/* FOTO */
function clear_pago_details(){
		$("#pago_details_to").hide();
		$("#pago_details_from").hide();
		$("#pago_details_msg").hide();
		$("#pago_details_from_int").html('');
		$("#pago_details_to_int").html('');
		$("#pago_details_msg_int").html('');
		$("#pago_details_cant_int").html('');
		$("#pago_details_date_int").html('');
		$( ".foto_adic" ).remove();
		photo_recibo.removeClass("has_photo");
		photo_recibo.attr("src", "images/ico_no_photo150.png" ); 
		$(".en_page_tbl_txt").html("Adjuntar imagen");
		$("#foto_recibo_cont").hide();
		photo_recibo.hide();		
}
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var retries = 0;
var photo_recibo = $('#foto_recibo'); 
var prev_pago_photo_id = "";
var upload_proceso = -1;
function clearCache(){ navigator.camera.cleanup(); }
function pago_details(id_pago){ 

	if ( network_ok()==false ){ return false; }
	
	if ( id_pago!==""){

			clear_pago_details();
		
			$("#pago_details_id_int").val( id_pago );
			$("#btn_takephoto").hide(); 	
			$("#btn_takephoto_td").hide();
			$("#upld_takephoto").hide();	
			$("#upld_takephoto_td").hide();
			
			if ( prev_pago_photo_id!=id_pago && prev_pago_photo_id!=="" ){ 
				photo_recibo.removeClass("has_photo"); 
				photo_recibo.attr("src", "images/ico_no_photo150.png" ); 
			}
			prev_pago_photo_id = id_pago;
		
			$.post( def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU, {	//$.post( def_url + '/actions_ses.php?debug=1&ids=' + IdS + '&idu=' + IdU, {	
				//idp: id_pago, a:'pago_details'
				idp: id_pago, a:'paymentDetails'
			}, function(respuesta) {	
				if (chkSesion(respuesta)) {
					
						respuesta = parse_respuesta_json(respuesta);
						if (respuesta.tmp_true == 'true') { 
						
							var cnt_images=0;
							
							if ( respuesta.tmp_to ){
								var nom_contacto_local_para = nombreContactoLocalTLF(respuesta.tmp_to);
								if (nom_contacto_local_para === "") { nom_contacto_local_para = respuesta.tmp_to; }
								$("#pago_details_to_int").html(nom_contacto_local_para);
								$("#pago_details_to").show();
							}
							
							if ( respuesta.tmp_from ){
								var nom_contacto_local_de = nombreContactoLocalTLF(respuesta.tmp_from);
								if (nom_contacto_local_de === "") { nom_contacto_local_de = respuesta.tmp_from; }
								$("#pago_details_from_int").html(nom_contacto_local_de);
								$("#pago_details_from").show();
							}

							$("#pago_details_cant_int").html(respuesta.tmp_cant);
							$("#pago_details_date_int").html(respuesta.tmp_fec);
							
							if ( respuesta.tmp_msg ){
								$("#pago_details_msg_int").html(respuesta.tmp_msg);
								$("#pago_details_msg").show();
							}

							if ( respuesta.tmp_more==1 ){ 
								$("#btn_takephoto").show();
								$("#btn_takephoto_td").show();
							}
							
							if ( respuesta.tmp_ver==1 ){ 									
								$(".en_page_tbl_txt").html("Pago verificado por administrador");
							}
							
							/*
							if ( respuesta.tmp_img!=="" ){ 
								photo_recibo.attr("src", respuesta.tmp_img ); //photo_recibo.src = respuesta.tmp_img; 
								photo_recibo.addClass("has_photo");
								photo_recibo.css("display","block"); //photo_recibo.style.display = 'inline-block';
							} 
							*/
							
							if ( respuesta.tmp_img_rest.length > 0 ){ 
								$("#foto_recibo_cont").show();
								$.each(respuesta.tmp_img_rest, function(k, v) {
									$( "<img class='foto_adic' onclick='open_adic(this);' src='" + v.img_r + "'>" ).insertBefore("#fin_foto"); //.insertAfter( photo_recibo );
								});
							}
							
							change_to('pago_page_details');
							
						} else {
							$('#err_back_title').html(respuesta.tmp_err);
							$('#err_back_msg').html(respuesta.tmp_mensaje);
							$('#err_back_msg_red').html("");
							change_to('err_and_back');
						}			
				}
			});		
	}
}

function open_adic(elem){ 
	loader_show(''); 
	cordova.plugins.disusered.open( $(elem).attr("src"), hide_loading, hide_loading); 
}

$(document).on("click", "#foto_recibo", function(){ photo_open(); });
function photo_open(){ 
	/* if ( photo_recibo.hasClass("has_photo") ){
		loader_show('');
		cordova.plugins.disusered.open(photo_recibo.attr("src"), hide_loading, hide_loading); 	
	} else {
		*/
		takePhoto2();
		/*
	}
	//cordova.plugins.disusered.open('https://raw.githubusercontent.com/disusered/cordova-open/test/test.png', success, error);
	*/
}
/*
function takePhoto2(){ 
	navigator.camera.getPicture(onPhotoDataSuccess2, onPhotoFail2, 
		{ 	
			quality: 90, 
			targetWidth: 2000, //900, 
			destinationType: Camera.DestinationType.DATA_URL 
		} 
	);
}

function onPhotoFail2(message) { alerta('Error', message, hacerNada); }  

*/
/*
function onPhotoDataSuccess2(imageURI) { 
	//console.log(imageURI); 
	//window_interior.executeScript({code: "   $('.logo_main').attr('src', 'data:image/jpeg;base64," + imageURI + "' ); "});  	
	//window_interior.executeScript({code: "   receive_pic('data:image/jpeg;base64," + imageURI + "');  "});  	

	// MIRAR EN LINKS_OBJ DE EDIM
	//console.log("DATA:  " + imageURI + "   ");
	//receive_pic('data:image/jpeg;base64,"' + imageURI + '"');
	//$('#received_pic').attr('src', imageURI );
	receive_pic('received_pic', imageURI);
}
function receive_pic(destino, imagedata){ 
		//var image = document.getElementById('received_pic');
		var image = document.getElementById( destino );
		image.src = "data:image/jpeg;base64," + imagedata;
}
*/

			function take_photo_app(){ 
				navigator.camera.getPicture(onPhotoDataSuccess3, onPhotoFail3, 
					{ 	
						quality: 90, targetWidth: 2000, 
						destinationType: Camera.DestinationType.FILE_URI 
					} 
				);
			}
			
			function onPhotoDataSuccess3(imageURI) { 
				receive_pic3('received_pic', imageURI);
			}				

			function receive_pic3(destino, imagedata){ 
					//var image = document.getElementById('received_pic');
					var image = document.getElementById( destino );
					image.src = imagedata;


					/*
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					if (canvas.getContext && canvas.toBlob) {
						canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
						canvas.toBlob(function (blob) {
							$('#fileupload').fileupload('add', {files: [blob]});
						}, "image/jpeg");
					}
					*/
					
					setTimeout(function(){ 

							var img = document.getElementById('received_pic');
							var canvas = document.createElement('canvas');
							canvas.width = img.width;
							canvas.height = img.height;
							if (canvas.getContext && canvas.toBlob) {
								canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
								canvas.toBlob(function (blob) {
									$('#fileupload').fileupload('add', {files: [blob]});
								}, "image/jpeg");
							}						
					
					}, 100);

			}

			function onPhotoFail3(message) { alerta('Error', message, hacerNada); }  






function sendPhoto2(){ onCapturePhoto(); }	
function onCapturePhoto(){
	
		if ( network_ok()==false ){ return false; }
		
		if ( upload_proceso == -1) {
			
				upload_proceso = 1;
				loader_show(''); /*hide_loading();*/
	
				var id_pago = $("#pago_details_id_int").val();
				if (id_pago !==""){
						//imgbase64 = photo_recibo.src;
						imgbase64 = img_64;
						$.post( def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU, {	
							a:'uimg', idp :id_pago, bb: imgbase64							
						}, function(respuesta) {	
						
							hide_loading();
							upload_proceso = -1;
						
							if (chkSesion(respuesta)) {
									respuesta = parse_respuesta_json(respuesta);
									if (respuesta.tmp_true == 'true') { 
											alerta('Gracias!', 'Imagen subida correctamente', hacerNada);	
											pago_details( id_pago );			
									} else {
										$('#err_back_title').html(respuesta.tmp_err);
										$('#err_back_msg').html(respuesta.tmp_mensaje);
										$('#err_back_msg_red').html("");
										change_to('err_and_back');
									}			
							}
						});
				} else {
					alerta('Pago no definido', e.message, hacerNada);	
				}			
		}
	
}
/* FOTO */
/* =============================== */
/* =============================== */






/* ============================================================================ */
/* ============================================================================ */
/* PARA AJAX */
function load_link(enlace, destino, form_add){
		var url_cargar 	= url_base + enlace;
		//url_cargar 		= "http://proyectos.gabitelingenieros.com/procms/Apps/ProyGabitel/1.0/_test_menu.pro";
		
		// CUSTOM VALUES
		var data_values = { 
			IdApp: getInfo("IdApp"),
			IdU: getInfo("IdU"),
			IdS: getInfo("IdS")
		};
		
		// GET FORM DATA
		if (form_add){
			data_values = form_add.serialize() + '&' + $.param(data_values);
		}

		//console.log("inicio");
		//console.log(url_cargar);
		$.ajax({
		    url: url_cargar,
			method: "POST",
			data: data_values,			
		    context: document.body,
		    success: function(responseText) {
		        $(destino).html(responseText);	//$(".content-wrapper").html(responseText);
		        reset_links_load();
				//$(".content-wrapper").find("script").each(function(i) { /* eval($(this).text()); //no hace falta */ });
				$(destino).find("script").each(function(i) { 
					//eval($(this).text()); /* no hace falta */ 
				});
		    }
		});
		//console.log("fin");
}

function reset_links_load(){
	$( "a" ).off('click').on( "click", function() {
			event.preventDefault();
		  	if ( $(this).attr('href') == "#" || $(this).attr('href') == "#collapseOne" ){ /* console.log("NADA");  */ } 
		  	else {
				console.log( $(this).attr('href') );  
			  	//alert( $(this).attr('href') );
			  	load_link( $(this).attr('href') );  	  	
		  	}
	});
}
/* ============================================================================ */
/* ============================================================================ */

function ini_reset_vars(){
		dUI = ""; 
		dPL = ""; 
		dVE = "";
		pushNotification = null;
		registration_id = null;
		registration_platform = null;
		IdU = "";
		IdS = "";
		Id2 = ""; //"t2zr54QxZRjl8ctM_s5i3A";
		IdC = "";
		Nombre = "";
		Saldo = "";
}

/* =============================== */
/* =============================== */
/* COMMON FUNCS */

function go_to_error(titu,msg,html){
		$('#err_back_title').html(titu); 
		$('#err_back_msg').html(msg); 
		$('#err_back_msg_red').html(html); 		
		change_to('err_and_back');	
}


function chkSesion(msg) {
    if (msg == "-1") { //  if (msg == "Sesi&oacute;n expirada") { //consola("Ses.Exp");
        clearInfo();
		
		alerta("Error de acceso", "Los datos introducidos no son correctos, por favor inténtelo de nuevo", hacerNada);
		Salir("");
		
		
    }
	else if ( msg == "En mantenimiento" ){
		clearInfo();
		$('#mant_back_title').html("Disculpa las molestias");
		$('#mant_back_msg').html("Estamos realizando algunas labores de mantenimiento. Por favor inténtalo de nuevo pasados unos minutos, gracias!");
		change_to('popMantenimiento', ret_false);	
	}
	else { return true; }
}


function process_resp(resp) {
    var obj = jQuery.parseJSON(resp);
    var resp_true = obj.tmp_true;
    var codigo = obj.tmp_code;
    var resason = obj.tmp_reason;
    var tmp_id = obj.tmp_id;
    var tmp_mens = obj.tmp_mensaje;
    if (codigo) {
		alerta('SMS Simulado', 'Su código de verificación es ' + codigo);
    }
    var resp_array = [resp_true, codigo, resason, tmp_id, tmp_mens];
    return resp_array;
}


function parse_respuesta_json(respuesta) {
	if (chkSesion(respuesta)) {
		var obj = jQuery.parseJSON(respuesta);
		if (obj.tmp_code) { alerta('SMS Simulado', 'Su código de verificación es ' + obj.tmp_code); }
		return obj;
	}
}

/* COMMON FUNCS */
/* =============================== */
/* =============================== */

function navigation_adjust_back_button(){
	var pag_activa = $( "body" ).pagecontainer( "getActivePage" ).attr('id');
	if ( 		pag_activa == "grp_edit_contacts" ) { goto_grp_activo(); }
	else if ( 	pag_activa == "grp_edit" ) { goto_grp_activo(); }
	else if ( 	pag_activa == "room" ) { loader_show(''); $('#listRoom').hide(); navigator.app.backHistory(); }
	else if ( 	pag_activa == "contacts" ) { showSalaH(); } 
	else { navigator.app.backHistory(); }	
}




function init_details( obj ){
			
			ini_reset_vars();
	
			var bienvenida 	= obj.Bnv;
			var tlf 		= obj.tlf;
			var name 		= obj.nam;
			var user_name 	= obj.user_name;
			var user_email 	= obj.user_email;

						
			IdU = obj.IdU;
			IdS = obj.IdS;
			
			setInfo("IdApp", "AppSardon");
			setInfo("IdU", IdU);
			setInfo("IdS", IdS);
			
			dUI = obj.dUI;
			setInfo("dUI", dUI);
			
			setInfo("Tour", bienvenida);
			setInfo("tlf", tlf);
			setInfo("name", name);
			setInfo("user_name", user_name);
			setInfo("user_email", user_email);
			
			set_bgcolor_in();
}


/*
function send_get(p_url, p_data, p_callback) {
    
	if ( network_ok()==false ){ return false; }
	
	$.ajax({
        url: p_url,
        data: p_data,
        type: 'post',
        async: 'true',
        beforeSend: function(){loader_show('');},
        complete: function(){hide_loading();},
        success: function(result) {
            if (chkSesion(result)) {
                if (result) {
                    var obj = jQuery.parseJSON(result);
                    $.each(obj, function(item, value) {
                        if ($('#' + item)) {
                            if ($('#' + item).value !== undefined) { $('#' + item).val(value); } else { $('#' + item).html(value); }
                        }
                    });
                    p_callback(result);
                }
            }
        },
        error: function(request, error) {
			$('#err_back_title').html("Error de comunicación");
			$('#err_back_msg').html("Por favor inténtelo de nuevo");
			$('#err_back_msg_red').html("");
			change_to('err_and_back');			
        }
    });
}
*/



/*
function scroll_bottom(){	
	var last_elem = $( "body" ).pagecontainer( "getActivePage" ).find(".ui-listview li").last();  
    if (last_elem.length) {
		var offset_1 = parseInt(last_elem.offset().top);			
		setTimeout(function(){ $.mobile.silentScroll(offset_1); }, 1);
    } else { 
		setTimeout(function(){ $.mobile.silentScroll( $(document).height() ); }, 1);
    }
}
*/




/*
$(document).on("pageshow", "#popMantenimiento", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#popSesionExp", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#popupDialog", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#grp_edit", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#roomInvite", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#pago_page", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#pago_page_confirm", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#recover_pwd", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#recover_pwd_ok", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#recover_pwd_success", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#account_details_success", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#err_and_back", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#err_no_net", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#account_details", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#chng_pwd", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#chng_pwd_success", function(){ ResizeMyContent_navbar(); });
*/



/*
function Contactos_Autocomp( desde_grupo ) { }
*/


/*
function loadPage(url, strlista, page, clasedec, callbackFunc) {
//url				- xxxx
//strlista		- xxxx
//page			- xxxx
//clasedec		- xxxx
//callbackFunc	- xxxx

    if ( network_ok()==false ){ return false; }
	
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
				var respuesta = xmlhttp.responseText;
                if (chkSesion(respuesta)) {
					$(strlista).html(xmlhttp.responseText);
					change_to(page, callbackFunc, strlista);
                }
            } else { hide_loading(); }
        }
    };
    //xmlhttp.open("GET", def_url + "/includes/" + url, true);
	xmlhttp.open("GET", def_url + "/" + url, true);
    loader_show(''); 
    xmlhttp.send();
}

function loadPage2(url, strDiv, updateCallback) {
//url				- xxxx
//strDiv			- xxxx
//updateCallback	- xxxx

    if ( network_ok()==false ){ return false; }
	
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
				var respuesta = xmlhttp.responseText;
                if (chkSesion(respuesta)) {
                    $(strDiv).html(xmlhttp.responseText);
					updateCallback(); //alerta("callback llamado");
                }
            }
            hide_loading();
        }
    };
		
    //xmlhttp.open("GET", def_url + "/includes/" + url, true);
	xmlhttp.open("GET", def_url + "/" + url, true);
    loader_show('');
    xmlhttp.send();
}
*/











/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */


function showSala(idc, name, saldo, idgr, idtlf, pago_directo) {
    /*
	IdC = idc;
    Nombre = name;
    Saldo = saldo;
    $('#cantidad').val('');


    $('#nomDest').html(Nombre);
    $('#titular4').html(Nombre);
    $('#saldo_room').html(saldo);
    $('#pago_from').val(IdU);
    $('#pago_cant').val('');
    $('#pago_mensaje_txt').val('');
    $('#pago_volver').val('');
    $('#pago_a_grupo').val('0');
    $('#pago_to').val(IdC);
    $('#pago_to_nm').val(Nombre);
    if (idgr && idgr !== undefined) {
        $('#input_contact_send').val(idgr);
        $('#pago_from').val(idgr);
    } else {
        $('#input_contact_send').val('');
        idgr = '';
    }
	*/
	
	//$('#listRoom').show();	
	//loadPage('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&idc=' + idc + '&idgr=' + idgr + '&a=getPayments2', '#listRoom', 'room', '', scroll_bottom);	
}



/*
function showSalaH( updat ) {
    if ($( "body" ).pagecontainer( "getActivePage" ).attr('id') != "ppal" || updat==1) {
		$("#listRoomH").fadeTo( 10 , 0);
		loadPage2('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&a=getPaymentsH&', '#listRoomH', updateSalaH);
    } else { 
		//menu_close();
	}
}

function getSaldoH(cargaPagos) {
	loadPage2('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&a=getSaldoH', '#ppal_saldo', scroll_bottom);
}
*/


function ajustar_pago_page( ui ){}



/* *************************** */
/* *************************** */
/* REGISTRO PUSH */

var push = null;

function push_register(){
			
				registration_platform = device.platform.toUpperCase(); 
				
				push = PushNotification.init({
					android: {
						senderID: "129458753417",  //Comunys project id jm.mxx
						sound: "true",
						vibrate: "true",
						forceShow: "true"
					},
					ios: {
						alert: "true",
						badge: "true",
						sound: "true"
					}
				});				
			
				push.on('registration', function(data) { // data.registrationId
					send_register( registration_platform , data.registrationId); 
					consola_debug("#601 - registrationId " + data.registrationId);
				});
				
				push.on('notification', function(data) {
						// data.message,			The text of the push message sent from the 3rd party service.
						// data.title,				The optional title of the push message sent from the 3rd party service.
						// data.count,				The number of messages to be displayed in the badge iOS or message count in the notification shade in Android.
						// data.sound,				The name of the sound file to be played upon receipt of the notification.
						// data.image,				The path of the image file to be displayed in the notification.
						// data.additionalData
						// data.additionalData	Object	An optional collection of data sent by the 3rd party push service that does not fit in the above properties.
						// data.additionalData.foreground	boolean	Whether the notification was received while the app was in the foreground
						// data.additionalData.coldstart	boolean	Will be true if the application is started by clicking on the push notification, false if the app is already started.
						
						//alerta("MSG" + data.message);
						//alerta("registration_platform " + registration_platform);
						var mensaje_pago 	= data.message;
						var mensaje_titu 	= data.title;
						
						if ( registration_platform == "IOS" ){
								if (mensaje_pago!==""){ 
										if ( mensaje_pago == "Tu teléfono ha sido verificado correctamente" ){
											//alerta('Registro confirmado', mensaje_pago, registro_confirmado_sms);
											//alerta('Registro confirmado', mensaje_pago, hacerNada);
											alerta(mensaje_titu, mensaje_pago, hacerNada);
										} else {
											//alerta('Pago recibido', mensaje_pago, update_pago_recibido);  
											//alerta('Pago recibido', mensaje_pago, hacerNada);  
											alerta(mensaje_titu, mensaje_pago, hacerNada);
										}
								}
						}
						
						if ( registration_platform == "ANDROID" ){
								var tag_usuario 	= data.additionalData.tag;   // consola("El IDU es " + e.payload.tag);
								if ( push_codes( mensaje_pago )===0 ){
										if ( tag_usuario==IdU){
												if ( mensaje_pago == "Tu teléfono ha sido verificado correctamente" ){
														//alerta('Registro confirmado', mensaje_pago, registro_confirmado_sms);
														//alerta('Registro confirmado', mensaje_pago, hacerNada);
														alerta(mensaje_titu, mensaje_pago, hacerNada);
												} else {
														//alerta('Pago recibido', mensaje_pago, hacerNada);
														alerta(mensaje_titu, mensaje_pago, hacerNada);
														//update_pago_recibido();
												}
										}
								}	
						}
					
				});
				
				push.on('error', function(e) {
					consola_debug("#601 - error " + e.message);
				});
			
				//$("#LoginPlatf").val(registration_platform);

} //push_register()


function send_register(pf, code){
		consola_debug("TO DO: send_register ");
		/*
				//if ( sess_data()===false ){ consola_debug('#sess - send_register'); return false; }
				if ( network_ok()===false ){ return false; }
		
				//consola_debug("Send registration code to server");  
				//consola_debug("Platform " + pf);  
				//consola_debug("Token    " + code);
				setInfo("IdR", code);
		
				$.post( login_sess + "?ids=" + IdS + "&idu=" + IdU , {
					a:'token', 
					idr: code, 
					pf: pf, 
					av: appversion //cp: code_in_push			
				}, function(respuesta) {
					if (respuesta == "TokenOK") { 
						hacerNada(); 
						consola_debug("token OK");  
					} 
					else {  
						//alert(" send registro error");  consola(" token NOT OK "); 
						//reg_error_count = reg_error_count + 1;
						//if ( reg_error_count < 5 ){ send_register(pf, code);  }
					}
				});
		*/
}

function push_unregister(){	
	//consola_debug("#501 - Push unregister");
	push.unregister(push_successHandler, push_errorHandler);	
}
function push_errorHandler (error) { 	consola_debug('#502 - error = ' + error); }
function push_successHandler (result) {  consola_debug('#502 - result = ' + result);  }
function push_codes( msg ){ if (msg == 'Sesión desconectada') { Salir(); return -1; } else { return 0; }  }


/* REGISTRO PUSH */
/* *************************** */
/* *************************** */








/* *************************************** */
/* ON LOAD ******************************* */


function tengo_sesion(){

		IdU = getInfo("IdU");
		IdS = getInfo("IdS");
		if (IdU && IdS) { return true; } else { return false; }
		
}


function onLoad(){

		consola("on load #333"); 
		
		$("#errorMsg").hide();
		//var temptemptemp = null;
		//$("#menu_cont").show();
	
		IdU = getInfo("IdU");
		IdS = getInfo("IdS");
		IdR = getInfo("IdR"); 	
		dUI = getInfo("dUI"); 
	
	
		//return false;
	
		
		//if (IdU && IdS && IdR && dUI) {
		if (tengo_sesion()) {
			/*
			$.post( def_url + '/actions.php', {
				a:'chksess', idu: IdU, ids: IdS, dUI: dUI, idr: IdR
			}, function(respuesta) {
				if (chkSesion(respuesta)){
						if (respuesta != "0") {
								//var obj = jQuery.parseJSON(respuesta);	
								var obj = parse_respuesta_json(respuesta);		
								init_details( obj );
	
	
								
						} else { consola("No session #101"); Salir(); }
				} else { consola("No session #103"); Salir(); }
			});
			*/
			
			alerta('Sesión expirada', 'Por favor introduzca sus datos de acceso para iniciar sesión.', hacerNada);
			
		} else { 
			consola("No session #102"); 
			Salir(); 
			//console.log(window.location);
			return false;
		}
		
	
}(function($, undefined) {
    $.expr[":"].containsNoCase = function(el, i, m) {
        var search = m[3];
        if (!search) { return false; }
        return new RegExp(search, "i").test($(el).text());
    };
    $.fn.searchFilter = function(options) {
        var opt = $.extend({ targetSelector: "", charCount: 1 }, options);
        return this.each(function(){
            var $el = $(this);
            $el.keyup(function(){
                var search = $(this).val(); var $target = $(opt.targetSelector); $target.show();
                if (search && search.length >= opt.charCount) { $target.not(":containsNoCase(" + search + ")").hide(); }
            });
        });
    }
})(jQuery);







/* *************************************** */
/* LOGIN USUARIO ************************* */
var last_click_time = new Date().getTime();
function can_submit(){
		click_time = new Date().getTime();
		if (click_time && (click_time - last_click_time) < 2000) {
			consola("click evitado");
			/*
			consola("click_time " + click_time);
			consola("last_click_time " + last_click_time);
			consola("resto " + click_time - last_click_time);
			*/
			return false;
		} else {
			last_click_time = click_time; consola("click permitido");
			return true;	
		}
}

var evento_foto = 0;
function CheckFoto(){
		var temp_msg = "";
		// Once the InAppBrowser finishes loading
		if ( evento_foto==0){
					window_interior.addEventListener( "loadstop", function() {
							// Clear out the name in localStorage for subsequent opens.
							window_interior.executeScript({ code: "localStorage.setItem( 'name', '' );" });
						
							// Start an interval
							var loop = setInterval(function() {
						
								// Execute JavaScript to check for the existence of a name in the child browser's localStorage.
									window_interior.executeScript(
									{
										code: "localStorage.getItem( 'name' )"
									},
									function( values ) {
										var name = values[ 0 ];
						
										// If a name was set, clear the interval and close the InAppBrowser.
										if ( name && (temp_msg!=name) ) {
											
											window_interior.executeScript({ code: "localStorage.setItem( 'name', '' );" });
											temp_msg = name;
											//clearInterval( loop );
											//window_interior.close();
				//							$( "h1" ).html( "Welcome " + name + "!" );
											//window_interior.executeScript({code: "   alert('" + temp_msg + "');  "});  
											takePhoto2();
											
										}
									}, 1000
								);
							});
					});		
					evento_foto = 1;			
		}

}

function monitor_eventos(){
	
					window_interior.addEventListener( "loadstart", function() {
							// Clear out the name in localStorage for subsequent opens.
							window_interior.executeScript({ code: "localStorage.setItem( 'com_code', '' );" });
						
							var loop = setInterval(function() { // Start an interval
						
									window_interior.executeScript(
									{
										code: "localStorage.getItem( 'com_code' )"
									},
									function( values ) {
										var name = values[ 0 ];
										if ( name && name!="" ) {
											
											/* DECIDIR EN FUNCION DEL CODIGO */
											if (name == "exit_app"){
												window_interior.executeScript({ code: "localStorage.setItem( 'com_code', '' );" }); 	//alerta('Código', 'exit_app', hacerNada);												
												clearInterval( loop );
												clearInfo();
												window_interior.close();
											}
											
										}
									}, 1000
								);
							});
					});	

}

function close_ventana(){
	if (window_interior) { window_interior.close(); }
}

function login_aux(msg){
	alerta('Error', msg, hacerNada);
}




var window_interior = null;


var auto_login_ok = 0;
function auto_login(){
	
		if ( network_ok()==false ){ return false; }
	
		IdU = getInfo("IdU");
		IdS = getInfo("IdS");
		
		if (IdU && IdS) { 
				var ruta_sess = login_sess + "?ids=" + IdS + "&idu=" + IdU;
				var jqxhr = $.post( 
					ruta_sess, //def_url + "/includes/entrar_app3.pro", 
					//$("#form_login").serialize(), 
					function(respuesta) {
						if (chkSesion(respuesta)) {
								//console.log("auto_resp "+respuesta);					
								if (respuesta != "-1") {
										if ( auto_login_ok==0){
											auto_login_ok = 1;
											final_login();
										}
										//setInfo("IdS", respuesta);
								} else {
										//clearInfo(); //consola("Login Error");
										//change_to('popupDialog');
								}					
						}
				});	
		}
}



function new_login(){

		var tusr = $("#login_email").val();
		var tpwd = $("#login_pwd").val();
		var ruta_login = login_url + "?user=" + tusr + "&clave=" + tpwd;
		close_keyboard();

		if ( network_ok()==false ){ return false; }
		if ( can_submit()==false ){ return false; }
		var jqxhr = $.post( 
			login_url, //def_url + "/includes/entrar_app3.pro", 
			$("#form_login").serialize(), 
			function(respuesta) {
				
				console.log(respuesta);				
				
				if (chkSesion(respuesta)) {
						if (respuesta != "0") {
								consola("login OK");
								//var obj = jQuery.parseJSON(respuesta);
								//init_details( obj );  

								var tmp_res = respuesta.split("####");
								IdS = tmp_res[0];
								IdU = tmp_res[1];
								setInfo("IdS", tmp_res[0]);
								setInfo("IdU", tmp_res[1]);
								//setInfo("IdTT", tmp_res[1]);
								final_login();
								
						} else {
								consola("Login Error");
								clearInfo(); 
								//change_to('popupDialog');
								alerta("Error de acceso", "Los datos introducidos no son correctos, por favor inténtelo de nuevo", hacerNada);
						}					
				}
				
        });
		
}

/*
function click_login(){

		var tusr = $("#txtuser1").val();
		var tpwd = $("#txtpassword").val();
		var ruta_login = login_url + "?user=" + tusr + "&clave=" + tpwd;
		close_keyboard();

		if ( network_ok()==false ){ return false; }
		if ( can_submit()==false ){ return false; }
		var jqxhr = $.post( 
			login_url, //def_url + "/includes/entrar_app3.pro", 
			$("#form_login").serialize(), 
			function(respuesta) {
				if (chkSesion(respuesta)) {
						if (respuesta != "0") {
								//consola("login OK");
								//var obj = jQuery.parseJSON(respuesta);
								//init_details( obj );  

								var tmp_res = respuesta.split("####");
								IdS = tmp_res[0];
								IdU = tmp_res[1];
								setInfo("IdS", tmp_res[0]);
								setInfo("IdU", tmp_res[1]);
								setInfo("IdTT", tmp_res[1]);
								final_login();
								
						} else {
								//consola("Login Error");
								clearInfo(); 
								change_to('popupDialog');
						}					
				}
        });
		
}
*/

function final_login(){

	consola("final_login");
	change_to("base.html");
	
	/*
	window_interior = window.open(login_index, '_self', 'location=no');
	monitor_eventos();
	//CheckFoto();
	push_register();
	*/

}







/* SALIR */
function Salir( unreg ) { 
		

		console.log( get_current_page() );
		if ( get_current_page() != "index.html"){

				if ( network_ok()==false ){ 
						clearInfo();
						//change_to('index.html');
				} else {

						if (IdU !== "" && IdS !== "") { 
							
							/*
							$.post( def_url + '/actions.php', { a:'exit', idu: IdU, ids: IdS }, function(respuesta) { 
								if (respuesta == "0") { 
									clearInfo(); 
									push_unregister(); 
									change_to('index.html');
								} else { 
									change_to('index.html'); 
								} 
							}); 
							*/
							
							console.log("SALIR CON SESION 555");
							clearInfo();
							//push_unregister(); 
							change_to('index.html');
							console.log("SALIR CON SESION 555 555");

							
						} else { 
							console.log("SALIR SIN SESION 554");
							clearInfo();
							change_to('index.html'); 
						} 		
				}

		} else {
				console.log( "#4044" );			
		}
		
}


/* REPASADO */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */



function getPhoneGapPath() {
    var path = window.location.pathname;
    var sizefilename = path.length - (path.lastIndexOf("/")+1);
    path = path.substr( path, path.length - sizefilename );
    return path;
};
function get_current_page(){
	var full_ruta = window.location.pathname;	//	"/android_asset/www/index.html"
	var ruta_file = full_ruta.replace(getPhoneGapPath(), "");
	return ruta_file;
}



function change_to(pagina) {
	
	if ( pagina != get_current_page() ){

			if (tengo_sesion()){
				console.log("cambio de pagina");
				window.location = pagina;
			} else {
				
				if (pagina=="index.html"){
					window.location = pagina;
				} else {
					console.log("sin sesión");	
				}
					
			}		
	}
		
}
/*
function change_to(id, callback_func, lista) {
	
		window.location = "pages/examples/login.html";
		
		loader_show('');	
		if ($( "body" ).pagecontainer( "getActivePage" ).attr('id') != id) { 
				setTimeout(function(){ 	
						
						$( "body" ).pagecontainer( "change", "#" + id, { transition: "none" });	  					
						if ( typeof lista !== 'undefined') { $(lista).listview("refresh"); }
						if ( typeof callback_func !== 'undefined') { callback_func(); }	
						menu_close();
						hide_loading(); 
				}, 100);
		} 
		else { 
			if ( typeof lista !== 'undefined') { $(lista).listview("refresh"); }
			if ( typeof callback_func !== 'undefined') { callback_func(); }	
			menu_close();
			hide_loading(); 
		}	
}
*/



//function set_bgcolor(color){ document.body.style.backgroundColor = color; }
function set_bgcolor_out(){ $('body').addClass('bg_out'); $('body').removeClass('bg_in');  /*document.body.style.backgroundColor = "#eaac14";*/ }
function set_bgcolor_in(){  $('body').addClass('bg_in');  $('body').removeClass('bg_out'); /*document.body.style.backgroundColor = "#F2F2F2";*/ }
function fRight(str, n) {
    if (n <= 0) { return ""; } 
	else if (n > String(str).length) { return str; } 
	else { var iLen = String(str).length; return String(str).substring(iLen, iLen - n); }
}
function ret_false(){ return false; }
function escapeHtml(text) { return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); }
function hacerNada(){}
/*
function consola(txt, no_send){ 
	if (no_send==1) {} else { window.console && console.log(txt); }
}
*/
function consola(txt){ window.console && console.log(txt); }
function replace(inString, oldText, newText) { return (inString.split(oldText).join(newText)); }
function scroll_top(){ $.mobile.silentScroll(0); }
function abrirURL(url) { if (navigator.app) { navigator.app.loadUrl(url, { openExternal: true }); } else { window.open(url, '_system'); } }
function EndTour_showSala(){ /*showSalaH();*/ showSalaH(1); }
function showTour(){ /* change_to('bienvenida1'); */ }
function reset_inputs(){ $('.inpt_clr').val(''); $('#txtpassword').val(''); }
function loader_show(txt){ 
/*
	//setTimeout(function(){ 
		if (!txt){ txt="";} 
		$.mobile.loading( "show", { text: txt, textVisible: true, theme: "z", html: "" }); 		
	//}, 1);
*/	
}
function showMenu(elem) { menu_toggle(); }
function menu_toggle(){ /* $("#mypanel_menu").panel('toggle'); */ }
function menu_close(){ /*$("#mypanel_menu").panel('close'); */ }
function loader_hide(){ /* $.mobile.loading("hide"); */ }
function hide_loading(){ setTimeout(function(){ loader_hide(); }, 1); }
function show_loading(txt) { setTimeout(function(){ /* $.mobile.loading('show'); */ }, 1); }




function clearInfo(){ 
	window.localStorage.clear(); 
	IdU = ""; 
	IdS = ""; 
	registration_id = ""; 
}
function getInfo( clave ){ return window.localStorage.getItem(clave); }
function setInfo( clave, valor ){ window.localStorage.setItem(clave, valor); }
function indice_de_id(cid) { return getInfo("contc_ref_id_" + cid); }
function keyboardHideHandler(e){ $("[data-role=footer]").show(); }
function keyboardShowHandler(e){ $("[data-role=footer]").hide(); }
function close_keyboard(){ cordova.plugins.Keyboard.close(); }
function alerta(titulo, msg, callback_func){ 
		if ( !callback_func ) { callback_func = hacerNada;}
		navigator.notification.alert( msg, callback_func, titulo, 'Ok'/* buttonName */ );	
}

/*
function ResizeAbsolute(id_list) {
    var hhtml = $('html').height();
    var pageid = $( "body" ).pagecontainer( "getActivePage" ).attr('id');
    var hcontent = $('#' + pageid + ' div.ui-content').height();
    var posycontent = $('#' + pageid + ' div.ui-content').offset().top;
    var hcontentnew = hhtml - (posycontent * 2);
    var abs_altura = hhtml - posycontent;
    $('#' + id_list).css({
        'height': abs_altura + 'px'
    });
}
function ResizeMyContent(){ ResizeMyContent_navbar(); }
function ResizeMyContent_navbar(){
    var hhtml = $('html').height();
    var pageid = $( "body" ).pagecontainer( "getActivePage" ).attr('id');
    var hcontent = $('#' + pageid + ' div.ui-content').height();
	var navbar_h = $('#' + pageid + ' div[data-role="navbar"]').height();//alert("navbar_h " + navbar_h);
    var posycontent = $('#' + pageid + ' div.ui-content').offset().top;
    var hcontentnew = hhtml - (posycontent * 2);
	if( navbar_h>0 ){ 	hcontent = hcontent - navbar_h; hcontentnew = hcontentnew - navbar_h; 	}
    if (hcontent != hcontentnew) { 	
		$('#' + pageid + ' div.ui-content').css({ 'height': hcontentnew + 'px' });
	}
}
*/
var normalize = (function(){
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc", mapping = {};
    for (var i = 0, j = from.length; i < j; i++) { mapping[from.charAt(i)] = to.charAt(i); }
    return function(str) {
        var ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i))) { ret.push(mapping[c]); } else { ret.push(c); }
        }
        return ret.join('');
    };
})();



function on_off_change(){ checkConnection(); }

function network_ok(){
	if ( network_ONline == -1 ){ 
		change_to('err_no_net'); 
		return false; 
	} else { return true; }
}

function checkConnection( a ) {
	try{
		var networkState = navigator.connection && navigator.connection.type;

        //setTimeout(function(){
		//			networkState = navigator.connection && navigator.connection.type;
		
					var states = {};
					states[Connection.UNKNOWN]  = 'Unknown connection';
					states[Connection.ETHERNET] = 'Ethernet connection';
					states[Connection.WIFI]     = 'WiFi connection';
					states[Connection.CELL_2G]  = 'Cell 2G connection';
					states[Connection.CELL_3G]  = 'Cell 3G connection';
					states[Connection.CELL_4G]  = 'Cell 4G connection';
					states[Connection.CELL]     = 'Cell generic connection';
					states[Connection.NONE]     = 'No network connection';
					if ( networkState == Connection.NONE ){ // SI NO TENGO RED
						network_ONline = -1;
						//alert("network_ONline -1");
						//change_to('err_no_net'); 
					} 
					else { 
						network_ONline = 1;
						if ( tengo_sesion() ) {
							//console.log("TO DO: auto_login");
							auto_login();
						} else { 
							console.log("NO SESION: VOLVER A LOGIN");
							change_to('index.html');
						}					
					}  
        //}, 500);
    }catch(e){ setTimeout(function(){ checkConnection(); }, 500); }
}



function doOnOrientationChange(){ 
	//$('body').hide();
	//ResizeMyContent_navbar(); 
	//$('body').show();
}


$(document).ready(function(){
	
	//$("#btnLogin").click(function(e) { e.preventDefault(); click_login(); });
	//$("#mypanel_menu").panel();
	//$("#menu_cont").hide();
	//$.mobile.defaultPageTransition = "none";
	document.addEventListener("offline", on_off_change, false);
	document.addEventListener("online", on_off_change, false);
	
	//HIDE NAVBAR WHEN KEYBOARD IS SHOWN
	window.addEventListener('native.keyboardhide', keyboardHideHandler);
	window.addEventListener('native.keyboardshow', keyboardShowHandler);
	
    //$(document).trigger( "orientationchange" );
	//$(function(){ FastClick.attach(document.body); });
	// FUNCION A EJECUTAR TRAS CHANGE_TO
	//$(document).on( "pagecontainerchange", function( event, ui ) { after_change(event, ui); } );	

	checkConnection();
	onLoad();
	
});

/*
function after_change(event, ui){
		var prevPageID = "";
		var toPageID = "";
		if ( ui ){
			if ( ui.prevPage ) { 	prevPageID = ui.prevPage.prop("id"); }	
			if ( ui.toPage ) { 		toPageID = ui.toPage.prop("id"); }	
		}
		if (toPageID == "login"){ set_bgcolor_out(); }
		if (toPageID == "contact_find_add"){ 	reset_inputs(); Contactos_Autocomp(0);  ResizeMyContent_navbar();  }
		if (toPageID == "contact_find_gr"){ 	reset_inputs(); Contactos_Autocomp(1);  ResizeMyContent_navbar();  }	
}
*/

if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
    var $viewport = $('head').children('meta[name="viewport"]');
    $(window).bind('orientationchange', function(){
		doOnOrientationChange();
        if (window.orientation == 90 || window.orientation == -90 || window.orientation == 270) { $viewport.attr('content', 'height=device-width,width=device-height,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0'); } 
		else { $viewport.attr('content', 'height=device-height,width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0');  }
    }).trigger('orientationchange');
}