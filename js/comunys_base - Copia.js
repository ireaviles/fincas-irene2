/* =============================== */
/* LOCAL VARIABLES */
var ActualizarC = null; 
var ontactos = null; 
var Doonload = null;
var definition_url = null;
var def_https = "clickoin";
var appversion = "1.28";
var dUI = ""; 
var dPL = ""; 
var dVE = "";
var pushNotification = null;
var registration_id = null;
var registration_platform = null;
var network_ONline = 0;
var prev_network_state = "";
var allow_invite = -1;
var cntpred = 0;
var lista_creada_img = 1;
var lista_creada = 0;
var code_in_push = 1;

var IdU = "";
var IdS = "";
var Id2 = ""; //"t2zr54QxZRjl8ctM_s5i3A";
var id_contact_temp = "";
var LastPagoRecibido = "";
var numele = 0;
	numele = getInfo("numele");
	if (numele === null) { numele = 0; }
var IdC = "";
var Nombre = "";
var Saldo = "";
var active_coin = "1111111111111111111111";
var active_coin_name = "Clickoin";
var active_coin_simb = "clickoins";
var active_coin_type = 1;
var coin_count = 1;
var lista_last_grupo = "";
var lista_ordenada = [];
var lista_ordenada_para = 0;
var img_64 = "";
var debug_consola = 1;
function consola_debug(txt){ 
	if ( debug_consola==1){
		window.console && console.log(txt); 	
	}	
}


var def_url 	= "http://sardon.comunys.com";
var app_url 	= "http://sardon.comunys.com/procms/login.pro?app=1";


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
		
		/* FOTO */
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
	},
    receivedEvent: function(id) { }
};
/* =============================== */
/* =============================== */



function ini_reset_vars(){
		dUI = ""; 
		dPL = ""; 
		dVE = "";
		pushNotification = null;
		registration_id = null;
		registration_platform = null;
		allow_invite = -1;
		cntpred = 0;
		lista_creada_img = 1;
		lista_creada = 0;	
		IdU = "";
		IdS = "";
		Id2 = ""; //"t2zr54QxZRjl8ctM_s5i3A";
		id_contact_temp = "";
		LastPagoRecibido = "";
		numele = 0;
			numele = getInfo("numele");
			if (numele === null) { numele = 0; }
		IdC = "";
		Nombre = "";
		Saldo = "";
		active_coin = "1111111111111111111111";
		active_coin_name = "Clickoin";
		active_coin_simb = "clickoins";
		active_coin_type = 1;
		coin_count = 1;
		lista_last_grupo = "";
		lista_ordenada = [];
		lista_ordenada_para = 0;
		img_64 = "";
		upload_proceso = -1;
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
		if ( window_interior ) { window_interior.close(); }
		go_to_error("OOOPS","Sesi&oacute;n expirada","");
//		change_to('popSesionExp', ret_false);
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

function open_adic(elem){ loader_show(''); cordova.plugins.disusered.open( $(elem).attr("src"), hide_loading, hide_loading); }

$(document).on("click", "#foto_recibo", function(){ photo_open(); });
function photo_open(){ 
	if ( photo_recibo.hasClass("has_photo") ){
		loader_show(''); /*hide_loading();*/
		cordova.plugins.disusered.open(photo_recibo.attr("src"), hide_loading, hide_loading); 	
	} else {
		takePhoto2();
	}
	//cordova.plugins.disusered.open('https://raw.githubusercontent.com/disusered/cordova-open/test/test.png', success, error);
}
function takePhoto2(){ 
	loader_show('');
	navigator.camera.getPicture(onPhotoDataSuccess2, onPhotoFail2, 
		{ 	
			quality: 85, 
			targetWidth: 1000, //900, 
			destinationType: Camera.DestinationType.DATA_URL 
		} 
	);
	hide_loading();  
}


function onPhotoDataSuccess2(imageURI) { 
	//console.log(imageURI); 
	//window_interior.executeScript({code: "   $('.logo_main').attr('src', 'data:image/jpeg;base64," + imageURI + "' ); "});  	
	window_interior.executeScript({code: "   receive_pic('data:image/jpeg;base64," + imageURI + "');  "});  	
	/*
	MIRAR EN LINKS_OBJ DE EDIM
	*/
}
function onPhotoFail2(message) { alerta('Error', message, hacerNada); }  


function onPhotoDataSuccess(imageURI) { 
	photo_recibo = $('#foto_recibo');
	photo_recibo.show();
	$("#foto_recibo_cont").show();
	
	//photo_recibo.css("display","block"); //photo_recibo.style.display = 'inline-block';
	photo_recibo.attr("src", "data:image/jpeg;base64," + imageURI ); //photo_recibo.src = "data:image/jpeg;base64," + imageURI;
	photo_recibo.addClass("has_photo photo_OK");
	img_64 = "data:image/jpeg;base64," + imageURI;
	$("#btn_takephoto").show(); 	$("#btn_takephoto_td").show(); 
	$("#upld_takephoto").show();	$("#upld_takephoto_td").show();
}
function onPhotoFail(message) { /*alerta('Error', message, hacerNada);*/ }  
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





function navigation_adjust_back_button(){
	var pag_activa = $( "body" ).pagecontainer( "getActivePage" ).attr('id');
	if ( 		pag_activa == "grp_edit_contacts" ) { goto_grp_activo(); }
	else if ( 	pag_activa == "grp_edit" ) { goto_grp_activo(); }
	else if ( 	pag_activa == "room" ) { loader_show(''); $('#listRoom').hide(); navigator.app.backHistory(); }
	else if ( 	pag_activa == "roomGr" ) { loadGrupos(); }
	else if ( 	pag_activa == "groups" ) { showSalaH(); }
	else if ( 	pag_activa == "contacts" ) { showSalaH(); } 
	else if ( 	pag_activa == "contact_find_add" ) { showSalaH(); } 
	//else if ( 	pag_activa == "pago_page_details" ) { showSalaH(); } 	
	else if ( 	pag_activa == "contacts_find" ) { hide_listContactsFind(); navigator.app.backHistory(); } 
	else { navigator.app.backHistory(); }	
}

function ActualizarContactos()
{
	if ( cntpred==1 ){ 
		EncuentraContactosExternal();
		return false; 
	}
	
	var options = new ContactFindOptions();
	options.filter="";
	options.multiple=true;	
	var fields = ["displayName","name","phoneNumbers"];  //var fields = ["phoneNumbers"]; 
	navigator.contacts.find(fields, onEncuentraContactos2 , null, options);
}



function init_details( obj ){
			
			ini_reset_vars();
	
			var bienvenida 	= obj.Bnv;
			var tlf 		= obj.tlf;
			var name 		= obj.nam;
			var user_name 	= obj.user_name;
			var user_email 	= obj.user_email;

			if (obj.allinv){ allow_invite = obj.allinv; } else { allow_invite = -1; }
			
			cntpred			= obj.cntpred; //Si tiene predefinidos, no carga de la Agenda
			if (cntpred==1){ $("#cargar_agenda").remove(); } 
			
			clearSaldo();

			IdU = obj.IdU;
			IdS = obj.IdS;
			active_coin = obj.user_coin;
			LastPagoRecibido = obj.lp;
			if (obj.cCount){ coin_count = obj.cCount; }
			
			setInfo("tlftry", "");
			setInfo("IdU", IdU);
			setInfo("IdS", IdS);
			
			dUI = obj.dUI;
			setInfo("dUI", dUI);
			
			setInfo("Tour", bienvenida);
			setInfo("tlf", tlf);
			setInfo("name", name);
			setInfo("user_name", user_name);
			setInfo("user_email", user_email);
			setInfo("active_coin", active_coin);
			
			set_bgcolor_in();
}

function checkEuro(fieldName, fieldValue) { }
function checkEuro_OLD(fieldName, fieldValue) {
	/* VALIDACION SEGUN TIPO DE MONEDA - active_coin_type
	1. Moneda normal, tipo EURO. Permite 2 decimales
	2. Moneda entera, sin decimales		
	*/
		if (fieldValue.indexOf('.') != -1) {
			fieldValue = replace(fieldValue, '.', ',');
			fieldName.value = fieldValue;
		}
    	if (fieldValue.indexOf(',') == -1) {
			if (isNaN(fieldValue) || fieldValue === "" || fieldValue.indexOf('.') != -1) { fieldName.value = "0"; fieldName.focus(); fieldName.select(); }
	    } else {
			var text1 = fieldValue.substring(fieldValue.indexOf(',') + 1, fieldValue.length);
			var text2 = fieldValue.substring(0, fieldValue.indexOf(','));
			if (isNaN(text1) || isNaN(text2) || fieldValue.indexOf('.') != -1) { fieldName.value = "0"; fieldName.focus(); fieldName.select(); }
			if (text1.length > 2) { fieldName.value = text2 + ',' + text1.substring(0, 2); }
    	}
}



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

function ChckAmount(a) { 
	var s = -1; 
	if ($.isNumeric(a)) { s = parseFloat(a); }
    return s;
}






/* =============================== */
/* =============================== */
/* VARIOS */
/*

function invitarRm(name) {
	if ( allow_invite==1 ) {
			$("#rI_txt2").html("¿Quieres recomendar a un amigo que que se una a Clickoin?");
			if (name) {
					$("#rI_txt1").show();
					$("#rI_txt1").html("Vaya, parece que <b>" + name + "</b> no está registrado en Clickoin");
					$("#rI_txt2").html("Si quieres puedes recomendarle que se una!");
			} else {
					$("#rI_txt1").hide();
					$("#rI_txt1").html("");
			}
			change_to('roomInvite');		
	}
}

*/
/* VARIOS */
/* =============================== */
/* =============================== */










function onEncuentraContactos2(contacts) {
    var tmpHTML = "";
    var tmp_nombre = "";
	var encontrado = false; 
	var strCont = ""; 
	var strPhoto = ""; 
	var tel = "";
	var telefonos_temp = "";
	
    for (var i = 0; i < contacts.length; i++) {
        
		encontrado = false; 
		strCont = ""; 
		strPhoto = "";
        
		if (contacts[i].phoneNumbers) {
			
			telefonos_temp = "";
			
            for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                tel = contacts[i].phoneNumbers[j].value;
                tel = tel.replace(/[^0-9\.]+/g, '');
                tel = fRight(tel, 9);
				
				if ( telefonos_temp.search( tel ) == -1 ){
						telefonos_temp = telefonos_temp + tel;						
						if (tel.match(/[67]([\d]{8})/)) {
							if (encontrado) { strCont += "<,>"; }
							strCont += "" + tel;
							encontrado = true;
						}					
				}

            }
        }
        if (encontrado) {
            tmp_nombre = contacts[i].displayName;
            if (tmp_nombre == "null" || !tmp_nombre) {
                if (contacts[i].name) {
                    if (contacts[i].name.formatted) {
                        tmp_nombre = contacts[i].name.formatted;
                    } else {
                        tmp_nombre = contacts[i].name.givenName;
                        if (contacts[i].name.givenName && contacts[i].name.givenName !== "") {  	tmp_nombre = contacts[i].name.givenName; }
                        if (contacts[i].name.middleName && contacts[i].name.middleName !== "") {	tmp_nombre = tmp_nombre + " " + contacts[i].name.middleName; }
                        if (contacts[i].name.familyName && contacts[i].name.familyName !== "") {	tmp_nombre = tmp_nombre + " " + contacts[i].name.familyName; }
                    }
                }
            }
            tmpHTML += contacts[i].id + "<:>" + tmp_nombre + "<:>" + strCont + "<|>";
        }
    }
	EncuentraContactos(tmpHTML);
    EncuentraContactosExternal();
}

function LimitExceed(saldo, cant, limite_inf) {
    $('#err_back_title').html("Saldo insuficiente");
    $('#err_back_msg').html("El saldo actual es: " + saldo + ' ' + active_coin_simb);
	$('#err_back_msg_red').html("");
	if (limite_inf<0){ var tmp_final = saldo - cant; $('#err_back_msg_red').html("Límite de saldo en esta moneda: " + limite_inf + "<br/>Con este pago su saldo sería de:" + tmp_final ); }
    change_to('err_and_back');
}






var validator_pago_page = null;
$(document).on("pagebeforeshow", "#pago_page", function(event, ui) { ajustar_pago_page(ui); });
$(document).on("pagecreate", "#pago_page", function(){
    validator_pago_page = $("#form_pago_page").validate({
        rules: {
            cantidad: { EuroESP: true },
            pago_mensaje_txt: { areaLen: 150 }
        },
        messages: {
            cantidad: "Indica la cantidad en formato xxx,xx",
            pago_mensaje_txt: { areaLen: "Por favor limita el mensaje a 150 caracteres" }
        },
		errorPlacement: function(label, element) { label.addClass('arrow'); label.insertAfter(element); }, wrapper: 'span', onkeyup: false,
		debug: false,		        
        submitHandler: function(form) {
            if ($('#pago_a_grupo').val() == "1") { 
				sendAmount( 1 ); //sendAmountGr();
            } else {
                sendAmount( 0 ); //sendAmount();
            }
        },
        invalidHandler: function(){ return false; }
    });
});

function pago_rapido_a_contacto(){
    $('#pago_to').val(IdC);
    $('#form_pago_confirm_grupo').hide();
    $('#form_pago_confirm_contacto').show();
   	//$('#inner_pago_contacto').show();
	//$('#inner_pago_gr').hide();
    change_to('pago_page');
}

function pago_rapido_a_grupo(){
    $('#pago_to').val(IdC);
    $('#form_pago_confirm_contacto').hide();
    $('#form_pago_confirm_grupo').show();
	//$('#inner_pago_contacto').hide();
	//$('#inner_pago_gr').show();
    change_to('pago_page');
}





function scroll_bottom(){	
	var last_elem = $( "body" ).pagecontainer( "getActivePage" ).find(".ui-listview li").last();  
    if (last_elem.length) {
		var offset_1 = parseInt(last_elem.offset().top);			
		setTimeout(function(){ $.mobile.silentScroll(offset_1); }, 1);
    } else { 
		setTimeout(function(){ $.mobile.silentScroll( $(document).height() ); }, 1);
    }
	chkLocalNames();
}


function chkLocalNames(){ 
		var list_activa = $( "body" ).pagecontainer( "getActivePage" ).find(".ui-listview");	
		var elementos 	= list_activa.find(".cntLoc").each(function(index) {
			var tlf = $(this).data("tlf");
			if (tlf !== "") {
				var nombre = $.trim(nombreContactoLocalTLF(tlf));
				if (nombre !== "") { 
					$(this).html(nombre); 
					$(this).parents(".cont_c").attr("data-filtertext", nombre);
				}
			}
		});
		list_activa.listview("refresh");	
}





$(document).on("pagecontainershow", "#login", function(){ set_bgcolor_out(); });
$(document).on("pagecontainerhide", "#login", function(){ set_bgcolor_in(); });
$(document).on("pagebeforeshow", 	"#login", function(){ reset_inputs(); });
$(document).on("pageshow", "#monedas", function(){ reset_inputs(); });

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
$(document).on("pageshow", "#bienvenida1", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#bienvenida2", function(){ ResizeMyContent_navbar(); });
$(document).on("pageshow", "#bienvenida3", function(){ ResizeMyContent_navbar(); });

$(document).on("pageshow", "#contacts_find", function(){ 
	if (cntpred==1){ //Si usa predefinidos, no carga de la Agenda
		showSalaH();
		return false; 
	} else { reset_filters(); CargarContactos_inner(); $("#listContactsFind").show();  ResizeAbsolute('listContactsFind'); 	}
	
});
function hide_listContactsFind(){ $("#listContactsFind").hide(); }
function CargarContactos(){
	//Si usa predefinidos, no carga de la Agenda
	if (cntpred==1){ return false; } 
    show_loading("Comprobando contactos...");
	hide_listContactsFind();
	change_to('contacts_find');
}



function lista_autocomp_ordenada(){
	lista_ordenada = [];
	var i = 0; var key = ""; var value = "";
	var test = ""; var cnt_nom = ""; var cnt_id = ""; var cadena_sort = "";
	
	for (i = 0, l = window.localStorage.length; i < l; i++) {
        key = window.localStorage.key(i);
        value = window.localStorage[key];
        if (key.indexOf("clk_id_") > -1) {
            test = JSON.parse(value);
            cnt_nom = test["name"];
            cnt_id = test["id"];
				//if ( cnt_id != -1){ // -1 = no esta en clickoin
				cadena_sort = normalize(cnt_nom.toLowerCase());
				lista_ordenada.push([cadena_sort, key, value]);				
				//}
        }
    }
    lista_ordenada.sort(function(a, b) { return a[0] - b[0]; });
}

function Contactos_Autocomp( desde_grupo ) {
	
	var key = ""; var value = ""; var valor = ""; var test = ""; var cnt_nom = ""; var cnt_id = ""; var cnt_tlf = ""; var cnt_tipo = ""; var nom_buscar = ""; var tlf_buscar = ""; 
	var cadena_sort = ""; var str_aux = ""; var i = 0;
	var bg_class = "menu_icon_bg"; var temporal = []; 
	var temp_listitem = "";	var temp_listitem_gr = "";	
	
	var id_grupo = "";
	if (desde_grupo==1) { 
		id_grupo = $('#input_contact_idgr').val(); 
		$('#list_pagos_gr').find("input").val(""); 	
		$('#list_pagos_gr').find("input").trigger("keyup");
	} else {
		$('#list_pagos').find("input").val(""); 	
		$('#list_pagos').find("input").trigger("keyup");		
	}

	var update_lista = 0;
	if (lista_ordenada.length === 0) { 
		lista_autocomp_ordenada(); 
		update_lista = 1;
	}
	
	if (desde_grupo==1 && (lista_last_grupo==="" || lista_last_grupo!=id_grupo ) ) { 	
		lista_last_grupo = id_grupo; 
	}	
	
	if (desde_grupo==1 && lista_last_grupo==="" ) { 
		update_lista = 1; 
		lista_last_grupo = id_grupo; 
	}	
	
	//if ( force_update==1 ){ update_lista = 1;  }
	
	if (update_lista == 1) {

			//alert('autocomp INI: ' + desde_grupo); 
			//temporal = lista_ordenada;
			
			for (i = 0, l = lista_ordenada.length; i < l; i++) {
				valor = lista_ordenada[i];
				key = valor[1];
				value = valor[2];
				if (key.indexOf("clk_id_") > -1) {
					test = JSON.parse(value);
					cnt_nom		= test["name"];
					cnt_nom_sf	= test["name_safe"];
					cnt_id 		= test["id"];
					cnt_tlf 	= test["number"];
					cnt_tipo 	= test["tp"];
					
					bg_class 	= "menu_icon_bg"; // usuario normal
					icono 		= "ico_contacto_lista";
					if (cnt_tipo!="x"){ icono = cnt_tipo; }	
		
					tlf_buscar 	= "";
					str_aux 	= "";
					if (cnt_nom != cnt_tlf) { str_aux = "<span class='num'>" + cnt_tlf + "</span>";  tlf_buscar = ' ' + cnt_tlf; }
					if (cntpred==1){ str_aux = ""; tlf_buscar = ""; }
					
					nom_buscar	= cnt_nom + tlf_buscar + ' ' + cnt_nom_sf;
										
					
					if (cnt_id == "-1") {
						
							temp_listitem += "<li data-filtertext='" + nom_buscar + "' class='big_li li_invit cont_pago ui-screen-hidden' onclick='findAddContacto(\"" + cnt_tlf + "\", 0,1);'><span class='ico'><span class='menu_icon'><span class='" + bg_class + "'><img src='images/" + icono + ".png' border='0' width='100%'></span></span></span><span class='name'><span class='name_int'><span>" + cnt_nom + "</span></span>" + str_aux + "</span></li>";	
							temp_listitem_gr += "<li data-filtertext='" + nom_buscar + "' class='big_li li_invit cont_pago ui-screen-hidden' onclick='findGrContacto_out(\"" + cnt_tlf + "\", 0,1);'><span class='ico'><span class='menu_icon'><span class='" + bg_class + "'><img src='images/" + icono + ".png' border='0' width='100%'></span></span></span><span class='name'><span class='name_int'><span>" + cnt_nom + "</span></span>" + str_aux + "</span></li>";
							
						
					} else {
						if (cnt_id != IdU) {
							
							temp_listitem += "<li data-filtertext='" + nom_buscar + "' class='big_li li_add cont_pago ui-screen-hidden' onclick='findAddContacto(\"" + cnt_tlf + "\", 0,1);'><span class='ico'><span class='menu_icon'><span class='" + bg_class + "'><img src='images/" + icono + ".png' border='0' width='100%'></span></span></span><span class='name'><span class='name_int'><span>" + cnt_nom + "</span></span>" + str_aux + "</span></li>";	
							temp_listitem_gr += "<li data-filtertext='" + nom_buscar + "' class='big_li li_add cont_pago ui-screen-hidden' onclick='findGrContacto_out(\"" + cnt_tlf + "\", 0,1);'><span class='ico'><span class='menu_icon'><span class='" + bg_class + "'><img src='images/" + icono + ".png' border='0' width='100%'></span></span></span><span class='name'><span class='name_int'><span>" + cnt_nom + "</span></span>" + str_aux + "</span></li>";
												
						}
					}
				}
			}  	
			
			$("#listContactsPago").html(temp_listitem);
			$("#listContactsPago_gr").html(temp_listitem_gr);
					
	}

	if (desde_grupo==1) {
		$("#listContactsPago_gr").listview("refresh");	
	} else {
		$("#listContactsPago").listview("refresh");		
	}	

}









/* ************************************** */
/* ************************************** */
/* OPTIMIZABLE ************************** */


function CargarContactos_inner(){
	
	if ( lista_creada == 1 ) { scroll_top(); return true; }
	
	var key = ""; var value = ""; var valor = "";
	var test = "";
	var cnt_nom = ""; var cnt_id = ""; var cnt_tlf = ""; var cnt_tipo = ""; var nom_buscar = ""; var tlf_buscar = "";
	var cadena_sort = ""; var str_aux = "";	
	var bg_class = "menu_icon_bg";
	var icono = "ico_contacto_lista";
	var tmpHTML = "";
    var temporal = [];	
	var i = 0;	
	
    for (i = 0, l = window.localStorage.length; i < l; i++) {
        key = window.localStorage.key(i);
        value = window.localStorage[key];
        if (key.indexOf("clk_id_") > -1) {
            test = JSON.parse(value);
            cnt_nom 	= test["name"];
            cnt_id 		= test["id"];
            cadena_sort = normalize(cnt_nom.toLowerCase());
            temporal.push([cadena_sort, key, value]);
        }
    }
	
	//consola("total items en lista: " + i);
    temporal.sort(function(a, b) { return a[0] - b[0]; });
    temporal.sort();
	
//    for (i = 0, l = temporal.length; i < l; i++) {
	for (i = 0, l = temporal.length; i < l; i++) {
        valor = temporal[i];
        key = valor[1];
        value = valor[2];
        if (key.indexOf("clk_id_") > -1) {
            test = JSON.parse(value);
            cnt_nom 	= test["name"];
			cnt_nom_sf	= test["name_safe"];
            cnt_id 		= test["id"];
            cnt_tlf 	= test["number"];
			cnt_tipo 	= test["tp"];
			
			bg_class	= "menu_icon_bg"; // usuario normal
			icono 		= "ico_contacto_lista";
			if (cnt_tipo!="x"){ icono = cnt_tipo; }				
			
			
			tlf_buscar 	= "";
            str_aux 	= "";
            if (cnt_nom != cnt_tlf) { str_aux = "<span class='num'>" + cnt_tlf + "</span>"; tlf_buscar = ' ' + cnt_tlf; }
			
			nom_buscar	= cnt_nom + tlf_buscar + ' ' + cnt_nom_sf;			
			
			
			
			
            if (cnt_id == "-1") {
				
				if ( allow_invite==1 ) {
						if ( lista_creada_img==1 ){
							tmpHTML += "<li data-filtertext='" + nom_buscar + "' class='big_li big_li2 li_invit cont_add2'><span class='dis_tbl'><span class='ico'><span class='menu_icon'><span class='" + bg_class + "'><img src='images/" + icono + ".png' border='0' width='100%'></span></span></span><span class='name'><span class='name_int'><span>" + cnt_nom + "</span></span>" + str_aux + "</span><span class='act_ico_inv' data-nom='" + cnt_nom + "' ><span class='bull'>&nbsp;</span></span></span></li>";	
							
						} else {
							tmpHTML += "<li data-filtertext='" + nom_buscar + "' class='big_li big_li2 li_invit cont_add2'><span class='dis_tbl'><span class='name'><span class='name_int'><span>" + cnt_nom + "</span></span>" + str_aux + "</span><span class='act_ico_inv' data-nom='" + cnt_nom + "' ><span class='bull'>&nbsp;</span></span></span></li>";	
						}					
					
				} else {
						if ( lista_creada_img==1 ){
							tmpHTML += "<li data-filtertext='" + nom_buscar + "' class='big_li big_li2 li_invit cont_add2'><span class='dis_tbl'><span class='ico'><span class='menu_icon'><span class='" + bg_class + "'><img src='images/" + icono + ".png' border='0' width='100%'></span></span></span><span class='name'><span class='name_int'><span>" + cnt_nom + "</span></span>" + str_aux + "</span></span></li>";
						} else {
							tmpHTML += "<li data-filtertext='" + nom_buscar + "' class='big_li big_li2 li_invit cont_add2'><span class='dis_tbl'><span class='name'><span class='name_int'><span>" + cnt_nom + "</span></span>" + str_aux + "</span></span></li>";	
						}					
				}
				
            } else {
                if (cnt_id != IdU) {
                    
					if ( lista_creada_img==1 ){
						tmpHTML += "<li data-filtertext='" + nom_buscar + "' class='big_li big_li2 li_add cont_add2'><span class='dis_tbl'><span class='ico'><span class='menu_icon'><span class='" + bg_class + "'><img src='images/" + icono + ".png' border='0' width='100%'></span></span></span><span class='name'><span class='name_int'><span>" + cnt_nom + "</span></span>" + str_aux + "</span><span class='act_ico' data-cnt='" + cnt_id + "' data-tlf='" + cnt_tlf + "' ><span class='plus'>&nbsp;</span></span></span></li>";
					} else {
						tmpHTML += "<li data-filtertext='" + nom_buscar + "' class='big_li big_li2 li_add cont_add2'><span class='dis_tbl'><span class='name'><span class='name_int'><span>" + cnt_nom + "</span></span>" + str_aux + "</span><span class='act_ico' data-cnt='" + cnt_id + "' data-tlf='" + cnt_tlf + "' ><span class='plus'>&nbsp;</span></span></span></li>";	
					}
					
                }
            }
        }
    }
    $("#listContactsFind").html(tmpHTML);
	lista_creada = 1;
	
	

	$( ".act_ico" ).on( "vclick", function(){
			var cnt_id = $(this).attr('data-cnt');
			var cnt_tlf = $(this).attr('data-tlf');
			chkAddContacto( cnt_id, cnt_tlf );
	});
	
	$( ".act_ico_inv" ).on( "vclick", function(){
			var cnt_nom = $(this).attr('data-nom');
			invitarRm( cnt_nom  );
	});

    scroll_top();
	
}


function nombreContactoLocal(cid) {
    for (i = 1; i <= numele; i++) {
        if (getInfo("contc_id_" + i) == cid) { return getInfo("contc_name_" + i); }
    }
    return "";
}	

function busco_por_id(search_id) {
    for (var i = 0, l = window.localStorage.length; i < l; i++) {
        var key = window.localStorage.key(i);
        var value = window.localStorage[key];
        if (key.indexOf("clk_id_") > -1) {
            var test = JSON.parse(value);
            var cnt_id = test["id"];
            if (cnt_id == search_id) { return key; }
        }
    }
    return -1;
}

/* OPTIMIZABLE ************************** */	
/* ************************************** */
/* ************************************** */










function chkAddContacto(cid, movil, tipo_busca, pago_directo) {
	$("#listContactsFind").hide();
	loader_show('');
	var nomLocal = nombreContactoLocalTLF(movil);
	if (nomLocal === "") { nomLocal = movil; }	
	showSala(cid, nomLocal, '0', null,null, pago_directo);
}

function nombreContactoLocalTLF(tlf) {
    var nombre = "";
    var cnt_get = getInfo("clk_id_" + tlf);
    if (cnt_get) {
        var test = JSON.parse(cnt_get);
        nombre = test["name"];
    }
    return nombre;
}


function findAddContactoBusGRFilter(){
    var tipo_busca = 0; 
    var usr_busca  = $('#list_pagos_gr').find("input").val(); 
	submit_pago_gr(usr_busca, tipo_busca);	
}

function findAddContactoBusFilter(){
    var tipo_busca = 0;
	var busca_mov = $('#list_pagos').find("input").val();
	findAddContacto(busca_mov, tipo_busca);
}



function loadPage(url, strlista, page, clasedec, callbackFunc) {
/*
url				- xxxx
strlista		- xxxx
page			- xxxx
clasedec		- xxxx
callbackFunc	- xxxx
*/
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
/*
url				- xxxx
strDiv			- xxxx
updateCallback	- xxxx
*/
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












/* *************************************** */
/* MIS DATOS ***************************** */

function clear_account_details(){
    $('#form_account_details')[0].reset();
    $("#chng_name").html(getInfo("name"));
    //$("#chng_username").html(getInfo("user_name"));
    //$("#chng_email").html(getInfo("user_email"));
    $("#chng_tlf").html(getInfo("tlf"));
}
$(document).on("pagebeforeshow", "#account_details", function(){ clear_account_details(); });

/* NO EN USO */
/*	
			$(document).on("pagecreate", "#account_details", function(){
				var validator_conf = $("#form_account_details").validate({
					rules: { 
						chng_name: { required: true, minlength: 1, maxlength: 100 }
					},
					messages: {
						chng_name: "Por favor introduce tu nombre"
					},
					errorPlacement: function(label, element) { label.addClass('arrow'); label.insertAfter(element); }, wrapper: 'span', onkeyup: false,
					submitHandler: function(form) {
						var new_name = $("#chng_name").val();
						var data_param = $(this.currentForm).serialize();
						var ajax_url = def_url + '/actions_ses.pro?ids=' + IdS + '&idu=' + IdU;
						send_get(ajax_url, data_param, function(respuesta) {
							var la_respuesta = process_resp(respuesta);
							respuesta = la_respuesta[0];
							var mensaje_show = "Vaya, algo no salió bien, por favor inténtalo de nuevo, gracias!";
							var mensaje_back = la_respuesta[4];
							if (mensaje_back !== "" && mensaje_back !== null) {
								mensaje_show = mensaje_back
							}
							if (respuesta == 'true') {
								setInfo("name", new_name);
								change_to('account_details_success')
							} else {
								$('#err_back_title').html("OOOPS"); 
								$('#err_back_msg').html(mensaje_show); 
								$('#err_back_msg_red').html(""); 
								change_to('err_and_back');
							}
						})
					},
					invalidHandler: function(){ return false; }
				})
			});
*/
/* MIS DATOS ***************************** */
/* *************************************** */















/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* REPASADO PHP */



/* *************************************** */
/* *************************************** */
/* GRUPOS ******************************** */

function pago_rapido_grupo(){
    var idgrp = $('#currentGrp').val();
    var grp_name = $('#currentGrp_name').val();
    var grp_sald = $('#currentGrp_sal').val();
    var grp_adm = $('#currentGrpAdmin').val();
	/*
	consola("idgrp - " + idgrp);
	consola("grp_name - " + grp_name);
	consola("grp_sald - " + grp_sald);
	consola("grp_adm - " + grp_adm);
	*/
    if (grp_adm == IdU) {
        if (grp_sald <= 0) {
		    $('#err_back_title').html("Saldo insuficiente");
            $('#err_back_msg').html("El grupo no tiene saldo suficiente para realizar pagos");
			$('#err_back_msg_red').html("");
            change_to('err_and_back', ret_false);
            //return false;
        } else {
            var id = $('#currentGrp').val();
            $('#input_contact_idgr').val(id);
            change_to('contact_find_gr');
        }
    } else {
        $('#err_back_title').html("Error de administrador");
        $('#err_back_msg').html("Únicamente el administrador del grupo puede realizar pagos");
		$('#err_back_msg_red').html("");
        change_to('err_and_back', ret_false);
        //return false;
    }
}



function showSalaGr(idc, name, saldo, grpadmin, saldo_simb) {
    $('#currentGrp').val(idc);
    $('#currentGrpAdmin').val(grpadmin);
    IdC = idc;
    Nombre = name;
    Saldo = saldo;
    $('#cantidad').val(''); //$('#cantidadGr').val('');
    $('#nomDestGr').html(name);
    $('#titular5').html(name);
		    $('#salgo_grupo').html(saldo);
			$('#saldo_simb_grupo').html(saldo_simb);

    $('.only_admin').hide();
    $('.not_admin').show();
    if (grpadmin == IdU) {
        $('.only_admin').show();
        $('.not_admin').hide();
    }
    $('#pago_from').val(IdU);
    $('#pago_cant').val('');
    $('#pago_mensaje_txt').val('');
    $('#pago_volver').val('');
    $('#pago_a_grupo').val('1');
    $('#pago_to').val(IdC);
    $('#pago_to_nm').val(Nombre);
	loadPage('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&idc=' + idc + '&a=getPagosGr2', '#listRoomGr', 'roomGr', '', scroll_bottom);
	
}


function findGrContacto(movil, idgr, tipo_busca, pago_directo) {
	
	if ( network_ok()==false ){ return false; }
	
	$('#list_pagos_gr').find("input").val(""); 	
	$('#list_pagos_gr').find("input").trigger("keyup");
	
    var busca_por = 0;
    if (tipo_busca == 1) { busca_por = 1; }

	$.post( def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU, {	
		mov: movil, tipo_b: busca_por, a:'findGrContact'
	}, function(respuesta) {	
        if (chkSesion(respuesta)) {
			
				respuesta = parse_respuesta_json(respuesta);
				if (respuesta.tmp_true == 'true') { 
					var contacto_destino = respuesta.tmp_id;
					var nom_contacto_local = nombreContactoLocalTLF(movil);
					if (nom_contacto_local === "") { nom_contacto_local = movil; }
					// function 	showSala(idc,              name,               saldo, idgr, idtlf, pago_directo)			
					showSala(contacto_destino, nom_contacto_local, '0', idgr, null,pago_directo );					
                } else {
					$('#err_back_title').html(respuesta.tmp_err);
                    $('#err_back_msg').html(respuesta.tmp_mensaje);
					$('#err_back_msg_red').html("");
                    change_to('err_and_back');
                }			

        }
    });
}


function chkAddContactoGrp(cid, movil, gid) {
	
	if ( network_ok()==false ){ return false; }
	
	$.post( def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU, {
        cnt: cid, cntGr: gid, a:'chkContactAddGrp'		
	}, function(respuesta) {		
        if (chkSesion(respuesta)) {
            if (respuesta !== '') {
                $('#currentGrp').val(respuesta);
                updateMiembrosGrupo();
            } else {
                $('#err_back_title').html("Vaya, algo no salió bien");
                $('#err_back_msg').html("Por favor inténtalo de nuevo, gracias!");
				$('#err_back_msg_red').html("");
                change_to('err_and_back');
            }
        }
    });
}

function chkDelContactoGrp(cid, movil, gid) {
	
	if ( network_ok()==false ){ return false; }
	
	$.post( def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU, {
        cnt: cid, cntGr: gid, a:'chkContactDelGrp'
    }, function(respuesta) {
        if (chkSesion(respuesta)) {
            if (respuesta !== '') {
                $('#currentGrp').val(respuesta);
                updateMiembrosGrupo();
            } else {
                $('#err_back_title').html("Vaya, algo no salió bien");
                $('#err_back_msg').html("Por favor inténtalo de nuevo, gracias!");
				$('#err_back_msg_red').html("");
                change_to('err_and_back');
            }
        }
    });
}


$(document).on("pagebeforeshow", "#grp_add", function(){ clear_grpAdd(); });
$(document).on("pagecreate", "#grp_add", function(){
    var validator_grp = $("#form_grp_add").validate({
        rules: {
            grp_name: { required: true, maxlength: 100 },
            grp_desc: { areaLen: 100 }
        },
        messages: {
            grp_name: { required: "Por favor indica un nombre para el grupo", maxlength: "Máximo 100 caracteres" },
            grp_desc: { areaLen: "Por favor limita la descripción a 100 caracteres, no te enrolles ;)" }
        },
        errorPlacement: function(label, element) { label.addClass('arrow'); label.insertAfter(element); }, wrapper: 'span', onkeyup: false,
        submitHandler: function(form) {
            var data_param = $(this.currentForm).serialize();
			var ajax_url = def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU;
            send_get(ajax_url, data_param, function(respuesta) {
				
					respuesta = parse_respuesta_json(respuesta);
					if (respuesta.tmp_true == 'true') { 
						$('#currentGrpAdmin').val(IdU);
						$('#currentGrp').val( respuesta.tmp_id );
						$("#id_grp_edit_contacts").val( respuesta.tmp_id );
						$('#currentGrp_name').val( respuesta.grp_name );
						$('#currentGrp_sal').val( respuesta.grp_saldo );
						$('#currentGrp_sal_simb').val( respuesta.grp_simb );
						grp_adm_members();
					} else {
						var error_msg = "Vaya, parece que ha habido un error, por favor inténtalo de nuevo más tarde, gracias!";
						$('#err_back_title').html("OOOPS"); $('#err_back_msg').html(error_msg); $('#err_back_msg_red').html(""); change_to('err_and_back');	
					}

            });
        },
        invalidHandler: function(){ return false; }
    });
});


function update_grp_info(gid, txt, callback_func) {
	
	if ( network_ok()==false ){ return false; }
	
    var lista_memb = "";
    var tmp_uid = "";
    var tmp_tlf = "";
    var tmp_aport = 0;
	
	var tmp_simb = "";
	
    //var ruta_url = def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&a=grp_info_update&gid=' + gid;
	var ruta_url = def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU;
    $.post(ruta_url, {
        gid: gid, a:'grp_info_update'
    }, function(respuesta) {
        if (chkSesion(respuesta)) {
            if (respuesta !== '') {
                
				setInfo(["grid_" + gid], "");
				
				//var obj = jQuery.parseJSON(respuesta);
				var obj = parse_respuesta_json(respuesta);
				
				
                $.each(obj, function(subI, subObject) {
                    if (subI == "grp_Members") {
                        $.each(subObject, function(index, value) {
                            tmp_uid = value.uid;
                            tmp_tlf = value.tlf;
                            tmp_aport = value.aport;
                            var miembro_temp = '  { "uid": "' + tmp_uid + '", "tlf": "' + tmp_tlf + '", "aport": "' + tmp_aport + '" }  ';
                            if (lista_memb === "") { lista_memb = miembro_temp; } 
							else { lista_memb = lista_memb + "," + miembro_temp; }
                        });
                    }
                });
				tmp_simb = obj.grp_simb;
                lista_final = ' {"coin": "' + tmp_simb + '",  "miembros": [  ' + lista_memb + ']}';
                
				setInfo(["grid_" + gid], lista_final);
                
				if (callback_func) { callback_func(); }
            } else { loadGrupos(); }
        }
    });
}


/*
$(document).on("pagebeforeshow", "#grp_edit", function(){});
$(document).on("pageshow", "#grp_edit", function(){});
*/
$(document).on("pagecreate", "#grp_edit", function(){
    var validator_grpEdit = $("#form_grp_edit").validate({
        rules: {
            grp_name_edit: { required: true, maxlength: 100 },
            grp_desc_edit: { areaLen: 100 }
        },
        messages: {
            grp_name_edit: {
                required: "Por favor indica un nombre para el grupo",
                maxlength: "Máximo 100 caracteres"
            },
            grp_desc_edit: {
                areaLen: "Por favor limita la descripción a 100 caracteres, no te enrolles ;)"
            }
        },
        errorPlacement: function(label, element) { label.addClass('arrow'); label.insertAfter(element); }, wrapper: 'span', onkeyup: false,
        submitHandler: function(form) {
            var data_param = $(this.currentForm).serialize();
			var ajax_url = def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU;
            send_get(ajax_url, data_param, function(respuesta) {
                var error_msg = "Vaya, parece que ha habido un error, por favor inténtalo de nuevo más tarde, gracias!";
                
				respuesta = parse_respuesta_json(respuesta);
				var tmp_name = respuesta.tmp_id; 
                var reason = respuesta.resason; 
                $('#currentGrp_name').val(tmp_name);
				if (respuesta.tmp_true == 'true') { 
					goto_grp_activo();
                } else {
					$('#err_back_title').html("OOOPS"); 
					$('#err_back_msg').html(error_msg); 
					$('#err_back_msg_red').html(""); 
					change_to('err_and_back'); 
                }				

            });
        },
        invalidHandler: function(){ return false; }
    });
});


function grp_edit_save(){ $('#form_grp_edit').submit();	}
function clear_grpEdit(){
    $('#form_grp_edit')[0].reset();
    var id = $('#currentGrp').val();
   	$("#grp_name_edit").val('');
    $("#grp_desc_edit").val('');	
    $("#id_grp_edit").val(id);
    var data_param = $('#form_grp_edit').serialize();
	var ajax_url = def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&a=grpInfo';
    send_get(ajax_url, data_param, function(respuesta) {
        var error_msg = "Vaya, parece que ha habido un error, por favor inténtalo de nuevo más tarde, gracias!";
		
				respuesta = parse_respuesta_json(respuesta);
				if (respuesta.tmp_true == 'true') { 
					$("#grp_name_edit").val(respuesta.tmp_name);
					$("#grp_desc_edit").val(respuesta.tmp_desc);
					$("#id_grp_edit_contacts").val(respuesta.tmp_id);
					change_to('grp_edit');
                } else {
					$('#err_back_title').html("OOOPS"); $('#err_back_msg').html(error_msg); $('#err_back_msg_red').html(""); change_to('err_and_back');	
                }
		
    });
}


function clear_grpAdd(){
	
	if ( network_ok()==false ){ return false; }
	
	$('#select_coin_grupo').hide();
    $('#form_grp_add')[0].reset();
    $("#grp_name").val('');
    $("#grp_desc").val('');
	
	var ruta_url = def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&a=coins_disp';	
	$.post(ruta_url, { a: null }, 
	function(respuesta) {
        if (chkSesion(respuesta)) {
					//var obj = jQuery.parseJSON(respuesta);
					var obj = parse_respuesta_json(respuesta);
					if (obj.coins) 	{ 
						tmp_coin = obj.coins;
						var tmp_options = ""; var t_id = ""; var t_tp = ""; var t_nm = "";
							$.each(tmp_coin, function(k, v) {
								t_id = v.coin_d;
								t_nm = v.coin_n;
								t_tp = v.coin_t;
								tmp_options = tmp_options + '<option value="' + t_id + '" data-tp="' + t_tp + '">' + t_nm + '</option>';
							});
						$("#coin_grp").html(tmp_options).selectmenu('refresh', true);
						//change_active_coin_sel();									
					}
					if (obj.tmp_coin_cnt) 	{	if (obj.tmp_coin_cnt>1) {$('#select_coin_grupo').show();} 	}
        }
    });
}


$(document).on("click", "#viewGrpInfo", function(){ goto_grp_info(); });
function goto_grp_info(){ if ($('#currentGrpAdmin').val() != IdU) { goto_grp_info_usr(); }  else { goto_grp_info_adm(); } }
function goto_grp_info_usr(){
    var gid = $('#currentGrp').val();
	loadPage('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&a=grp_info_adm&gid=' + gid, '#grp_info_usr_lista', 'grp_info_usr', '', hacerNada);
}

function goto_grp_info_adm(){
    var gid = $('#currentGrp').val();
	loadPage('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&a=grp_info_adm&gid=' + gid, '#grp_info_adm_lista', 'roomGr', '', goto_grp_activo);
}

function loadGrupos(){
    if ($( "body" ).pagecontainer( "getActivePage" ).attr('id') != "groups") {
        $('#currentGrp').val('');
        $('#currentGrpAdmin').val('');
        $('#currentGrp_name').val('');
        $('#currentGrp_sal').val('');
        $('#search-text-groups').val('');
		loadPage('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '' + '&a=getGroups', '#listGroups', 'groups', '', scroll_top);
    } else {
	   menu_close();
    }
}

function findGrContacto_out(movil, tipo_busca, pago_directo) {
	var idgr = lista_last_grupo;
	findGrContacto(movil, idgr, tipo_busca, pago_directo);
}

function submit_pago_gr( destino, tipo_busca ) {
    var id_grupo = $('#input_contact_idgr').val();
    findGrContacto(destino, id_grupo, tipo_busca);
    return false;
}

function updateGrpMembers(mem, grpAdmin) {
    if (grpAdmin === "") {
        $("#optadm").hide();
        $("#optadmno").show();
    } else {
        $("#optadm").show();
        $("#optadmno").hide();
    }
    $("#grpMiembros").html('');
    var grupoID = $("#id_grp_edit_contacts").val();
    var tmpHTML = "";
	
	var contacto = "";
    var pos = "";
	
    for (i = 1; i <= numele; i++) {
        contacto = getInfo("contc_id_" + i);
        pos = mem.search(contacto);
        if (pos != -1) {
            if (grpAdmin === "") {
                tmpHTML += "<li><h2>" + getInfo("contc_name_" + i) + "</h2></li>";
            } else {
                tmpHTML += "<li data-icon='delete'><a href='javascript:void(0);' onclick='chkDelContactoGrp(\"" + contacto + "\",\"\",\"" + grupoID + "\");'><h2>" + getInfo("contc_name_" + i) + "</h2></a></li>";
            }
        }
    }
    $("#grpMiembros").html(tmpHTML);
    $("#grpMiembros").listview("refresh");
}

function updateMiembrosGrupo(){
    var grupoID = $('#currentGrp').val();
    var grp_adm = $('#currentGrpAdmin').val();
    $("#listContactsGrp").html("");
    $("#listContactsGrp").listview("refresh");
    update_grp_info(grupoID, '', updateMiembrosGrupo_continua);
}

function updateMiembrosGrupo_continua(){
    var grupoID = $('#currentGrp').val();
    var grp_adm = $('#currentGrpAdmin').val();
    var tmpHTML = "";
    var en_grupo = null;
    var tmp_nom = "";
    var tmp_id = "";
    var tmp_saldo = "";
    var tmp_tlf = "";
    var temp_uid = "";
    var temp_aport = "";
    var soy_admin = 0;
    if (grp_adm == IdU) { soy_admin = 1; }
    var mostrados = [];
    var grupoLocal = getInfo(["grid_" + grupoID]);
    if (grupoLocal) {
		
		
		var temporal = "";
		var cnt_get = "";
		var test = "";
        
		var lista_de_miembros = jQuery.parseJSON(grupoLocal);
		var moneda_grupo = lista_de_miembros.coin;
        for (i = 0; i < lista_de_miembros.miembros.length; i++) {
            temp_uid = lista_de_miembros.miembros[i].uid;
            tmp_tlf = lista_de_miembros.miembros[i].tlf;
            temp_aport = lista_de_miembros.miembros[i].aport;
            tmp_saldo = parseFloat(temp_aport);
            tmp_nom = temp_uid;
            
			temporal = busco_por_id(temp_uid);
            
			if (temporal != -1) {
                cnt_get = getInfo(temporal);
                if (cnt_get) { test = JSON.parse(cnt_get); tmp_nom = test["name"]; tmp_id = test["id"]; tmp_tlf = test["number"]; }
                if (nombreContactoLocalTLF(temp_uid) !== "") { tmp_nom = nombreContactoLocalTLF(temp_uid); }
            }
            if (soy_admin == 1 && tmp_saldo === 0 && temp_uid !== "" && temp_uid != -1) {
                if (temp_uid == IdU) {
                    tmpHTML += "<li data-icon='false' class='cont_memb cnt_del cont_c'><a class='list_usr_item' href='javascript:void(0);'><span class='menu_icon'><span class='menu_icon_bg'><img src='images/ico_admin_w.png' border='0' width='100%'></span></span><span class='menu_texto'><h2>" + tmp_nom + "</h2><span class='cnt_sal'>" + temp_aport + " " + moneda_grupo + "</span></span></a></li>";
                } else {
                    tmpHTML += "<li data-icon='delete' class='cont_memb cnt_del cont_c'><a class='list_usr_item' href='javascript:void(0);' onclick='chkDelContactoGrp(\"" + temp_uid + "\",\"\",\"" + grupoID + "\");'><span class='menu_icon'><span class='menu_icon_bg'><img src='images/ico_contacto_lista.png' border='0' width='100%'></span></span><span class='menu_texto'><h2>" + tmp_nom + "</h2><span class='cnt_sal'>" + temp_aport + " " + moneda_grupo + "</span></span></a></li>";
                }
            } else {
                if (temp_uid == grp_adm) {
                    tmpHTML += "<li data-icon='false' class='cont_memb cnt_del cont_c'><a class='list_usr_item' href='javascript:void(0);'><span class='menu_icon'><span class='menu_icon_bg'><img src='images/ico_admin_w.png' border='0' width='100%'></span></span><span class='menu_texto'><h2>" + tmp_nom + "</h2><span class='cnt_sal'>" + temp_aport + " " + moneda_grupo + "</span></span></a></li>";
                } else {
                    tmpHTML += "<li data-icon='false' class='cont_memb cnt_del cont_c'><a class='list_usr_item' href='javascript:void(0);'><span class='menu_icon'><span class='menu_icon_bg'><img src='images/ico_contacto_lista.png' border='0' width='100%'></span></span><span class='menu_texto'><h2>" + tmp_nom + "</h2><span class='cnt_sal'>" + temp_aport + " " + moneda_grupo + "</span></span></a></li>";
                }
            }
            mostrados.push(temp_uid);
        }
        if (soy_admin == 1) {
            var key = null;
            var value = null;
            for (var i = 0, l = window.localStorage.length; i < l; i++) {
                key = window.localStorage.key(i);
                value = window.localStorage[key];
                if (key.indexOf("clk_id_") > -1) {
                    test = JSON.parse(value);
                    tmp_nom = test["name"];
                    tmp_id = test["id"];
                    tmp_tlf = test["number"];
					
                    if (tmp_id != "-1" && jQuery.inArray(tmp_id, mostrados) == -1) {
                        en_grupo = grupoLocal.indexOf(tmp_tlf);
                        if (en_grupo >= 0) {hacerNada();} else {
                            if (soy_admin == 1) {
                                tmpHTML += "<li data-icon='plus' class='cont_memb cnt_add cont_c'><a class='list_usr_item' href='javascript:void(0);' onclick='chkAddContactoGrp(\"" + tmp_id + "\",\"\",\"" + grupoID + "\");'><span class='menu_icon'><span class='menu_icon_bg'><img src='images/ico_contacto_lista.png' border='0' width='100%'></span></span><span class='menu_texto'><h2>" + tmp_nom + "</h2></span></a></li>";
                            }
                        }
                    }
                }
            }
        }
    }
    $("#listContactsGrp").html(tmpHTML);
    $("#listContactsGrp").listview("refresh");
}
$(document).on("pagebeforeshow", "#grp_edit_contacts", function(){ reset_filters(); updateMiembrosGrupo(); });
//$(document).on("pageshow", "#grp_edit_contacts", function(){ return false; });
//$(document).on("pagecreate", "#grp_edit_contacts", function(){});


function set_grp_act_info(idgrp, grp_name, grp_sald, grp_adm, grp_simb) {
    $('#currentGrp').val(idgrp);
    $('#currentGrp_name').val(grp_name);
    $('#currentGrp_sal').val(grp_sald);
	$('#currentGrp_sal_simb').val(grp_simb);	
    $('#currentGrpAdmin').val(grp_adm);
}

function goto_grp_activo(){
    var idgrp = $('#currentGrp').val();
    var grp_name = $('#currentGrp_name').val();
    var grp_sald = $('#currentGrp_sal').val();
	var grp_simb = $('#currentGrp_sal_simb').val();
    var grp_adm = $('#currentGrpAdmin').val();
    showSalaGr(idgrp, grp_name, grp_sald, grp_adm, grp_simb);
}

function grp_adm_edit(){ clear_grpEdit(); }
function grp_adm_members(){ var tmp_id = $('#currentGrp').val(); change_to('grp_edit_contacts'); }
function grp_ver_members(){ var tmp_id = $('#currentGrp').val(); change_to('grp_edit_contacts'); }
function grp_adm_pago(){ pago_rapido_grupo(); }


$(document).on("pageshow", "#grp_info_adm", function(){
    var gid = $('#currentGrp').val();
    update_grp_info(gid, null, null);
});
$(document).on("pageshow", "#roomGr", function(){
    var gid = $('#currentGrp').val();
    chkLocalNames();
    update_grp_info(gid, null, null);
});

/* ----------------- BORRAR GRUPO */
		var currentGrpDelId = "";
		
		function grpDel(gid) {
			currentGrpDelId = gid;
			alert("Va a eliminar el grupo: " + gid);
		}
		
		function eliminarGrupo(){
			var grupo_del = currentGrpDelId;
			if (grupo_del !== "") { 
				alert("grupo eliminado " + gid);
			}
			currentGrpDelId = "";
		}
/* ----------------- BORRAR GRUPO */


/* GRUPOS ******************************** */
/* *************************************** */
/* *************************************** */



function showSala(idc, name, saldo, idgr, idtlf, pago_directo) {
    IdC = idc;
    Nombre = name;
    Saldo = saldo;
    $('#cantidad').val('');
    if (idtlf) {
        var tmp_nombre = nombreContactoLocalTLF(idtlf);
        if (tmp_nombre !== "") { Nombre = tmp_nombre; }
    }
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
	
	$('#listRoom').show();
	
	if (pago_directo==1){
		
		/*
		if (idgr && idgr !== undefined){
			consola("directo grupo");
			grp_adm_pago();	
		} else {
			consola("directo contacto");
			pago_rapido_a_contacto();
		}		
		*/
		pago_rapido_a_contacto();
		
	} else {
		//loadPage('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&idc=' + idc + '&idgr=' + idgr + '&ac=' + active_coin + '&a=getPagos2', '#listRoom', 'room', '', scroll_bottom);
		loadPage('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&idc=' + idc + '&idgr=' + idgr + '&ac=' + active_coin + '&a=getPayments2', '#listRoom', 'room', '', scroll_bottom);
	}
    
}


/*
function sendPago_OLD(idc) {
    id_contact_temp = IdC;
	var moneda_pago = $('#coin_selector').val();
    var mensaje = encodeURIComponent($('#pago_mensaje_txt').val());
	var cantidad = $('#cantidad').val();
	var id_grupo = $('#input_contact_send').val();
	loadPage2('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&idc=' + IdC + '&can=' + cantidad + '&idgr=' + id_grupo + '&mssg=' + mensaje + '&ac=' + moneda_pago + '&a=sendPago2', '#listRoom', showSalaH);
	
}
function sendPagoGr_OLD(idc) {
	var moneda_pago = $('#coin_selector').val();
	var mensaje = encodeURIComponent($('#pago_mensaje_txt').val());
	var cantidad = $('#cantidad').val();
	loadPage2('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&idc=' + IdC + '&can=' + cantidad + '&mssg=' + mensaje + '&ac=' + moneda_pago + '&a=sendPago2', '#listRoomGr', showSalaH);
}
*/
var enviando_pago = 0;
function pago_enviado(){ enviando_pago = 0; loader_hide(); }
function sendPago(idc) {
	
	if ( network_ok()==false ){ return false; }
	
	if ( enviando_pago==1 ){ return false; }	
	show_loading("Enviando pago...");
	enviando_pago = 1;
	
	id_contact_temp = IdC;
	var moneda_pago = $('#coin_selector').val();
    var mensaje = encodeURIComponent($('#pago_mensaje_txt').val());
	var cantidad = $('#cantidad').val();
	var n_once = $('#n_once').val();
	var id_grupo = $('#input_contact_send').val();
	//loadPage2('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&idc=' + IdC + '&can=' + cantidad + '&idgr=' + id_grupo + '&mssg=' + mensaje + '&ac=' + moneda_pago + '&a=sendPago2', '#listRoom', showSalaH);

				var ruta_url = def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU;	
				$.post(ruta_url, { 
						//a:'sendPago2',	idc: IdC, 	can: cantidad,	idgr: id_grupo,	mssg: mensaje, ac: moneda_pago, n_once: n_once
						a:'sendPayment',	idc: IdC, 	can: cantidad,	idgr: id_grupo,	mssg: mensaje, ac: moneda_pago, n_once: n_once
				}, function(respuesta) {		
					if (chkSesion(respuesta)) {
								respuesta = parse_respuesta_json(respuesta);
								if (respuesta.tmp_true == 'true') { 
										pago_enviado();
										showSalaH();
								} else {
										pago_enviado();
										$('#err_back_title').html(respuesta.tmp_err);
										$('#err_back_msg').html(respuesta.tmp_mensaje);
										$('#err_back_msg_red').html("");
										change_to('err_and_back');
								}
					}
				})	;
	
}
function sendPagoGr(idc) {
	
	if ( network_ok()==false ){ return false; }
	
	if ( enviando_pago==1 ){ return false; }	
	show_loading("Enviando pago...");
	enviando_pago = 1;

	var moneda_pago = $('#coin_selector').val();
	var mensaje = encodeURIComponent($('#pago_mensaje_txt').val());
	var cantidad = $('#cantidad').val();
	var n_once = $('#n_once').val();
	//loadPage2('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&idc=' + IdC + '&can=' + cantidad + '&mssg=' + mensaje + '&ac=' + moneda_pago + '&a=sendPago2', '#listRoomGr', showSalaH);
	
				var ruta_url = def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU;	
				$.post(ruta_url, { 
						a:'sendPago2',	idc: IdC, can: cantidad, mssg: mensaje, ac: moneda_pago, n_once: n_once
				}, function(respuesta) {		
					if (chkSesion(respuesta)) {
								respuesta = parse_respuesta_json(respuesta);
								if (respuesta.tmp_true == 'true') { 
										pago_enviado();
										showSalaH();
								} else {
										pago_enviado();
										$('#err_back_title').html(respuesta.tmp_err);
										$('#err_back_msg').html(respuesta.tmp_mensaje);
										$('#err_back_msg_red').html("");
										change_to('err_and_back');
								}
					}
				});
	
}


function showSalaH( updat ) {
	if (id_contact_temp !== "") { EncuentraContactosExternal(id_contact_temp); }
    if ($( "body" ).pagecontainer( "getActivePage" ).attr('id') != "ppal" || updat==1) {
		$("#listRoomH").fadeTo( 10 , 0);
		//loadPage2('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&ac=' + active_coin + '' + '&a=getPagosH2&debug=1&', '#listRoomH', updateSalaH);
		loadPage2('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&ac=' + active_coin + '' + '&a=getPaymentsH&', '#listRoomH', updateSalaH);
    } else { menu_close(); }
}

function getSaldoH(cargaPagos) {
	loadPage2('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&ac=' + active_coin + '' + '&a=getSaldoH', '#ppal_saldo', scroll_bottom);
}


function ajustar_pago_page( ui ){
	
	if ( network_ok()==false ){ return false; }

	//SI VUELVO DE UN ERROR DE AJUSTAR PAGO
	var prevPageID = "";
	var toPageID = "";		
	if ( ui ){
		if ( ui.prevPage ) { 	prevPageID = ui.prevPage.prop("id"); }	
		if ( ui.toPage ) { 		toPageID = ui.toPage.prop("id"); }	
	}
	
	if ( prevPageID=="err_and_back" ){ 
		//console.log(prevPageID); 
		pago_rapido();
	} else {
		
				//console.log("OCULTO PAGO_PAGE"); 
				$("#pago_page .interior_page").hide();

				$('#select_coin_pago').hide();
				$('#cantidad').val(''); 
				
				var tmp_coin = ""; var tmp_coin_n = ""; var tmp_coin_s = ""; var tmp_coin_t = "";
				var pago_from 	= $('#pago_from').val();
				var pago_to 	= $('#pago_to').val();
				var titular 	= "PAGO"; //var texto_envio	= "";
				var pago_para_nom = $('#pago_to_nm').val();
				
			
				var ruta_url = def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU;	
				$.post(ruta_url, { 
					pago_from: pago_from, pago_to: pago_to, a:'pay_adjust', user_coin: active_coin		
				}, function(respuesta) {		
					if (chkSesion(respuesta)) {
								//var obj = jQuery.parseJSON(respuesta);
								var obj = parse_respuesta_json(respuesta);
								pago_error = obj.tmp_reason;
								if (pago_error === 0){
			
										if (obj.pago_from) 		{ pago_from = obj.pago_from;}
										if (obj.pago_to) 		{ pago_to = obj.pago_to;}
										
										if (obj.coins) 	{ 
											tmp_coin = obj.coins;
											var tmp_options = ""; var t_id = ""; var t_tp = ""; var t_nm = "";
												$.each(tmp_coin, function(k, v) {
													t_id = v.coin_d;
													t_nm = v.coin_n;
													t_tp = v.coin_t;
													
													if (obj.tmp_coin_act && obj.tmp_coin_act==t_id) {
														tmp_options = tmp_options + '<option selected="selected" value="' + t_id + '" data-tp="' + t_tp + '">' + t_nm + '</option>';
													} else {
														tmp_options = tmp_options + '<option value="' + t_id + '" data-tp="' + t_tp + '">' + t_nm + '</option>';
													}
													
													
													
													
												});
											$("#coin_selector").html(tmp_options).selectmenu('refresh', true);
											
											
											if (obj.tmp_coin_act) 	{ 
												change_active_coin_sel( obj.tmp_coin_act ); }
											else {
												change_active_coin_sel();
											}
											
										}
										if (obj.tmp_coin_cnt) 	{	if (obj.tmp_coin_cnt>1) {$('#select_coin_pago').show();} 	}
										if (obj.tmp_title)	{ titular = obj.tmp_title; }
										if (obj.tmp_txt)	{ texto_envio = obj.tmp_txt;}
										if (obj.n_once)		{ $('#n_once').val(obj.n_once); } else { $('#n_once').val(''); }
										
										
										
										$('#pago_rapido_title').html(titular);
										$('#destino_pago').val("Envío a: " + pago_para_nom); //$('#destino_pago').val(texto_envio + pago_para_nom);
										
										//console.log("MUESTRO PAGO_PAGE"); 
										$("#pago_page .interior_page").show();
										
								} else {
									
									/*
									AJUSTAR SEGUN LOS MENSAJES QUE VENGAN
									*/
									$('#err_back_title').html(obj.tmp_err);
									$('#err_back_msg').html(obj.tmp_mensaje);
									$('#err_back_msg_red').html("");
									change_to('err_and_back');
									
									/*
									$('#err_back_title').html("Error en el pago");
									$('#err_back_msg').html("Se ha producido un error al intentar preparar el pago, por favor inténtelo de nuevo.");
									$('#err_back_msg_red').html("");
									change_to('err_and_back', ret_false);
									*/
								}
					}
				});
		
	}
	
		

}

/* *************************** */
/* *************************** */
/* OPERACIONES CON CONTACTOS  */


function EncuentraContactos(contcs) {
	
	if ( network_ok()==false ){ return false; }
	if ( cntpred==1 ){ return false; } //Si usamos contactos predefinidos, no hay necesidad de buscar contactos
	
	$.post( def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&a=chkContactsFind3', {
		a:'chkContactsFind3', lc: contcs
	}, function(respuesta) { 		
        if (chkSesion(respuesta)) {
            
			var listContcs 	= respuesta.split('<|>');
            var local_cnt 	= "";
			var temp_safe 	= "";
			
			for (i = 0; i < listContcs.length; i++) {
                if (listContcs[i] !== "") {
                    numele 		= i + 1; 
                    eleContcs 	= listContcs[i].split('<:>');
					if ( eleContcs[5] == "-1" || eleContcs[5] == -1 ){ temp_safe = ""; } else { temp_safe = eleContcs[5]; }
                    local_cnt 	= { id: eleContcs[0], name: eleContcs[2], number: eleContcs[3], tp: eleContcs[4], name_safe: temp_safe };
                    setInfo("clk_id_" + eleContcs[3], JSON.stringify(local_cnt));
                }
            }
			chkLocalNames();
        }
    });
}

function loadContactos(){
    if ($( "body" ).pagecontainer( "getActivePage" ).attr('id') != "contacts") {
        $('#search-text-contact').val('');
		//loadPage('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&a=getContacts&debug=1', '#listContacts', 'contacts', '', chkLocalNames);
		loadPage('actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&a=getContacts', '#listContacts', 'contacts', '', chkLocalNames);
    } else {
		menu_close();
    }
}


function EncuentraContactosExternal(nuevo_cont) {
	
	if ( network_ok()==false ){ return false; }
	
	$.post( def_url + '/actions_ses.php?&ids=' + IdS + '&idu=' + IdU + '&a=chkContactsExt', { //$.post( def_url + '/actions_ses.php?debug=1&ids=' + IdS + '&idu=' + IdU + '&a=chkContactsExt', {
        lc: nuevo_cont, a:'chkContactsExt'
    }, function(respuesta) {
        if (chkSesion(respuesta)) {
            
			var listContcs 	= respuesta.split('<|>');
            var local_cnt 	= null;
			var cnt_get 	= null;
			var temp_safe	= "";
			
			for (i = 0; i < listContcs.length; i++) {
                if (listContcs[i] !== "") {
                    numele = i + 1;
                    eleContcs = listContcs[i].split('<:>');
					if ( eleContcs[5] == "-1" || eleContcs[5] == -1 ){ temp_safe = ""; } else { temp_safe = eleContcs[5]; }
                    local_cnt = { id: eleContcs[0], name: eleContcs[2], number: eleContcs[3], tp: eleContcs[4], name_safe: temp_safe };
                    cnt_get = getInfo("clk_id_" + eleContcs[3]); 
                    if (!cnt_get) { setInfo("clk_id_" + eleContcs[3], JSON.stringify(local_cnt)); }
                }
            }
			chkLocalNames();
        }
    });
    if (nuevo_cont) { id_contact_temp = ""; }
}


function findAddContacto(movil, tipo_busca, pago_directo) {
	
	if ( network_ok()==false ){ return false; }
	
	$('#list_pagos').find("input").val(""); 	
	$('#list_pagos').find("input").trigger("keyup");
	
    var busca_por = 0;
    if (tipo_busca == 1) { busca_por = 1; }
	$.post( def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU, {	
        a:'findAddContact2',
		mov: movil,
        tipo_b: busca_por
    }, function(respuesta) {
        if (chkSesion(respuesta)) {
				respuesta = parse_respuesta_json(respuesta);
				if (respuesta.tmp_true == 'true') { 
					chkAddContacto(respuesta.tmp_id, movil, busca_por, pago_directo);
                } else {
					$('#err_back_title').html(respuesta.tmp_err);
                    $('#err_back_msg').html(respuesta.tmp_mensaje);
					$('#err_back_msg_red').html("");
                    change_to('err_and_back');
                }	
        }
    });
}


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
					// e.message
					consola_debug("#601 - error " + e.message);
				});
			
				//$("#LoginPlatf").val(registration_platform);

} //push_register()


function send_register(pf, code){
	
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

function carga_webapp(){
	var app_url 	= "http://sardon.comunys.com/procms/login.pro?app=1";
	window_interior = window.open(app_url, '_self', 'location=no');
	
	//window_interior = window.open("http://sardon.comunys.com/procms/Apps/Fincas/1.5/ModObj.pro?to=10&id=&idp=7v8YEV8CcmMPZsim0nuYAw&idpro2=FT_OQzsaG3GKj4aaErJ_EA&debug=1", '_self', 'location=no');

}

function onLoad(){

    $("#errorMsg").hide();
	//var temptemptemp = null;
	//$("#menu_cont").show();

    IdU = getInfo("IdU");
    IdS = getInfo("IdS");
	IdR = getInfo("IdR"); 	
	dUI = getInfo("dUI"); 


	return false;

	console.log("load_1");
	setTimeout(function(){ 
		carga_webapp();
		console.log("load_2");
	}, 1500);

	return false;
	 


	
	/*
    if (IdU && IdS && IdR && dUI) {
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
    } else { 
		//consola("No session #102"); 
		Salir(); 
	}
	*/
	
	
	
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
/* *************************************** */
// Arguments :
//  verb : 'GET'|'POST'
//  target : an optional opening target (a name, or "_blank"), defaults to "_self"
	open_post = function(verb, url, data, target) {
	  var form = document.createElement("form");
	  form.action = url;
	  form.method = verb;
	  form.target = target || "_self";
	  if (data) {
		for (var key in data) {
		  var input = document.createElement("textarea");
		  input.name = key;
		  input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
		  form.appendChild(input);
		}
	  }
	  form.style.display = 'none';
	  document.body.appendChild(form);
	  form.submit();
	};
	/*
	open_post('POST', 'fileServer.jsp', {request: {key:"42", cols:[2, 3, 34]}});
	To open in a new window, set the target parameter :
	
	open_post('POST', someURL, someArgs, 'newwin');
	or to ensure it's a new window/tab each time :
	
	open_post('POST', someURL, someArgs, '_blank');		
	*/
/* *************************************** */
/* *************************************** */


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
var login_url 		= "http://sardon.comunys.com/procms/app_login.pro";
var login_sess		= "http://sardon.comunys.com/procms/app_checksess.pro";
var login_index 	= "http://sardon.comunys.com/procms/index.pro";

var auto_login_ok = 0;
function auto_login(){

		var ruta_sess = login_sess + "?ids=" + IdS + "&idu=" + IdU;

		if ( network_ok()==false ){ return false; }
		//if ( can_submit()==false ){ return false; }
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

function final_login(){

	window_interior = window.open(login_index, '_self', 'location=no');
	monitor_eventos();
	CheckFoto();
	push_register();

}






/* *************************************** */
/* PWD RECOVER *************************** */

$(document).on("pagebeforeshow", "#recover_pwd", function(){ $('#txtuser_rec').val(''); });
$(document).on("pagecreate", "#recover_pwd", function(){
    var validator_recover = $("#form_recover").validate({
        rules: { txtuser_rec: { required: true, phoneESP: true } },
        messages: { txtuser_rec: { required: "Por favor indica tu número de móvil", phoneESP: "El número indicado no es válido" } },
        errorPlacement: function(label, element) { label.addClass('arrow'); label.insertAfter(element); }, wrapper: 'span', onkeyup: false,
        submitHandler: function(form) {
            var tlf_sub = $("#txtuser_rec").val();
            var data_param = $(this.currentForm).serialize();
            var ajax_url = def_url + '/actions.php';
            send_get(ajax_url, data_param, function(respuesta) {
                setInfo("tlftryRec", tlf_sub);
				respuesta = parse_respuesta_json(respuesta);
				if (respuesta.tmp_true == 'true') { 
                    change_to('recover_pwd_ok');
                } else {
					$('#err_back_title').html(respuesta.tmp_err);
                    $('#err_back_msg').html(respuesta.tmp_mensaje);
					$('#err_back_msg_red').html("");
                    change_to('err_and_back');
                }
            });
        },
        invalidHandler: function(){ return false; }
    });
});

function clear_usrPWDConf(){ $('#form_recover_pwd_ok')[0].reset(); $("#tlftryRec").val(getInfo("tlftryRec")); $("#usr_new_pwd_code").val(''); $("#usr_new_pwd").val(''); $("#usr_new_pwd2").val(''); }
$(document).on("pagebeforeshow", "#recover_pwd_ok", function(){ clear_usrPWDConf(); });
$(document).on("pagecreate", "#recover_pwd_ok", function(){
    var validator_conf = $("#form_recover_pwd_ok").validate({
        rules: {
            usr_new_pwd_code: { required: true },
            usr_new_pwd: { required: true, minlength: 6, maxlength: 20 },
            usr_new_pwd2: { required: true, equalTo: "#usr_new_pwd" }
        },
        messages: {
            usr_new_pwd_code: { required: "Por favor indica el código de verificación" },
            usr_reg_pwd: "Por favor introduce una contraseña, de 6 a 20 caracteres",
            usr_reg_pwd2: "Las contraseñas no coinciden"
        },
        errorPlacement: function(label, element) { label.addClass('arrow'); label.insertAfter(element); }, wrapper: 'span', onkeyup: false,
        submitHandler: function(form) {
            var data_param = $(this.currentForm).serialize();
            var ajax_url = def_url + '/actions.php';
            send_get(ajax_url, data_param, function(respuesta) {
				respuesta = parse_respuesta_json(respuesta);
				if (respuesta.tmp_true == 'true') { 
                    change_to('recover_pwd_success');
                } else {
					$('#err_back_title').html(respuesta.tmp_err);		//$('#err_back_title').html("El código no es correcto");
                    $('#err_back_msg').html(respuesta.tmp_mensaje);		//$('#err_back_msg').html("Por favor asegúrate de introducir el código que te hemos enviado por SMS e inténtalo de nuevo, gracias!");
					$('#err_back_msg_red').html("");
                    change_to('err_and_back');
                }
            });
        },
        invalidHandler: function(){ return false; }
    });
});

/* PWD RECOVER *************************** */
/* *************************************** */





/* *************************************** */
/* PWD CHANGE **************************** */
function clear_pwd_chng(){ $('#form_chng_pwd')[0].reset(); $("#chng_new_pwd").val(''); $("#chng_new_pwd2").val(''); $("#chng_old_pwd").val(''); }
$(document).on("pagebeforeshow", "#chng_pwd", function(){ clear_pwd_chng(); });
$(document).on("pagecreate", "#chng_pwd", function(){
    var validator_conf = $("#form_chng_pwd").validate({
        rules: {
            chng_old_pwd: { required: true },
            chng_new_pwd: { required: true, minlength: 6, maxlength: 20 },
            chng_new_pwd2: { required: true, equalTo: "#chng_new_pwd" }
        },
        messages: {
            chng_old_pwd: "Por favor introduce tu contraseña actual",
            chng_new_pwd: "Por favor introduce tu nueva contraseña, de 6 a 20 caracteres",
            chng_new_pwd2: "Las contraseñas no coinciden"
        },
        errorPlacement: function(label, element) { label.addClass('arrow'); label.insertAfter(element); }, wrapper: 'span', onkeyup: false,
        submitHandler: function(form) {
            var data_param = $(this.currentForm).serialize();
            var ajax_url = def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU;
            send_get(ajax_url, data_param, function(respuesta) {
					respuesta = parse_respuesta_json(respuesta);
					if (respuesta.tmp_true == 'true') { 
						change_to('chng_pwd_success');
					} else {
						$('#err_back_title').html(respuesta.tmp_err);
						$('#err_back_msg').html(respuesta.tmp_mensaje);
						$('#err_back_msg_red').html("");
						change_to('err_and_back');
					}				
            });
        },
        invalidHandler: function(){ return false; }
    });
});

/* PWD CHANGE **************************** */
/* *************************************** */

/* SALIR */
function Salir( unreg ) { 
		if ( network_ok()==false ){ 
				clearInfo();
				change_to('login');
		} else {
				if (IdU !== "" && IdS !== "") { 
					$.post( def_url + '/actions.php', { a:'exit', idu: IdU, ids: IdS }, function(respuesta) { 
						if (respuesta == "0") { 
							clearInfo(); 
							push_unregister(); 
							change_to('login'); 
						} else { change_to('login'); } 
					}); 
				} else { change_to('login'); } 		
		}
}


/* REPASADO */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */
/* *********************************************************************************************************** */




function pago_rapido(){ change_to('contact_find_add'); }
function mis_datos(){ change_to('account_details'); }
function change_to(id, callback_func, lista) {
	
		/* Exceptions */
		if (cntpred==1 && id=='contacts_find'){ return false; }
		/* Exceptions */
	
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



/*
function encstr(str) { str = sjcl.encrypt(sha2pw, str); return str; }
function decstr(str) { str = escapeHtml(sjcl.decrypt(sha2pw, str)); return str; }
function sha256(st2) { sha2pw = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(Id2 + st2)); shasha2pw = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(sha2pw)); }
*/

function updateSalaH_CB(){ 
	$('#listRoomH').listview("refresh"); 
	getSaldoH(); 
	scroll_bottom(); 
	setTimeout(function(){ $("#listRoomH").fadeTo( 300 , 100); }, 100);	
}
function updateSalaH(){ change_to('ppal', updateSalaH_CB); }
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
function invitar(){ window.plugins.socialsharing.share('Descárgate Clickoin en ', null, null, 'https://www.clickoin.com'); }
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
function showTour(){ change_to('bienvenida1'); }
function reset_inputs(){ $('.inpt_clr').val(''); $('#txtpassword').val(''); }
function reset_filters(){ $('.search-box').val(''); $('.search-box').keyup(); }
function loader_show(txt){ 
	//setTimeout(function(){ 
		if (!txt){ txt="";} 
		$.mobile.loading( "show", { text: txt, textVisible: true, theme: "z", html: "" }); 		
	//}, 1);
}
function showMenu(elem) { menu_toggle(); }
function menu_toggle(){ $("#mypanel_menu").panel('toggle'); }
function menu_close(){ $("#mypanel_menu").panel('close'); }
function loader_hide(){ $.mobile.loading("hide"); }
function hide_loading(){ setTimeout(function(){ loader_hide(); }, 1); }
function show_loading(txt) { setTimeout(function(){ $.mobile.loading('show', { text: txt, textVisible: true, theme: 'b', html: "<span class='ui-bar ui-overlay-c ui-corner-all'><h2>" + txt + "</h2></span>" }); }, 1); }
function clearSaldo(){ $('#ppal_saldo').html(''); $('#saldo_simbl').html(''); }
function clearInfo(){ window.localStorage.clear(); IdU = ""; IdS = ""; registration_id = ""; clearSaldo(); reset_color_sch(); }
function reset_color_sch(){ $("#dynamic_css").attr("href",''); }
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
						if (IdU && IdS) {
							console.log("auto_login");
							auto_login();
						} else { 
							change_to('login'); 
						}					
					}  
        //}, 500);
    }catch(e){ setTimeout(function(){ checkConnection(); }, 500); }
}



function doOnOrientationChange(){ 
	//$('body').hide();
	menu_close(); 
	ResizeMyContent_navbar(); 
	//$('body').show();
}


$(document).ready(function(){
	
	$("#btnLogin").click(function(e) { e.preventDefault(); click_login(); });
	
	$("#mypanel_menu").panel();
	$("#menu_cont").hide();
	$.mobile.defaultPageTransition = "none";

	document.addEventListener("offline", on_off_change, false);
	document.addEventListener("online", on_off_change, false);
	
	//HIDE NAVBAR WHEN KEYBOARD IS SHOWN
	window.addEventListener('native.keyboardhide', keyboardHideHandler);
	window.addEventListener('native.keyboardshow', keyboardShowHandler);
	
    $(document).trigger( "orientationchange" );
	$(function(){ FastClick.attach(document.body); });
	
	/* *********************
	
	$('textarea[maxlength]').keyup(function(){
        var limit = parseInt($(this).attr('maxlength')); var text = $(this).val(); var chars = text.length; 
		if (chars > limit) { var new_text = text.substr(0, limit); $(this).val(new_text); }
    });	

    $("form").submit(function (){ return false; });
    $('div[data-role="page"]').on('pagebeforehide', function (event, ui) { var page = ui.nextPage; $('.buscador').hide(); });


	// Para evitar saltos de HEADER al aparecer el teclado en iOS. Da algo de flicker en dispositivos antiguos.
	$(document).on('blur', 'input, textarea', function(){ setTimeout(function(){ window.scrollTo(document.body.scrollLeft, document.body.scrollTop); }, 0); });
	
	********************* */

	// FUNCION A EJECUTAR TRAS CHANGE_TO
	$(document).on( "pagecontainerchange", function( event, ui ) { after_change(event, ui); } );	


	set_bgcolor_out();
	checkConnection();
	/* *********************
	//checkConnection(); 
	
	********************* */
	onLoad();
	
});



function after_change(event, ui){
		var prevPageID = "";
		var toPageID = "";
		if ( ui ){
			if ( ui.prevPage ) { 	prevPageID = ui.prevPage.prop("id"); }	
			if ( ui.toPage ) { 		toPageID = ui.toPage.prop("id"); }	
		}
		if (toPageID == "login"){ set_bgcolor_out(); }
		if (toPageID == "contact_find_add"){ reset_inputs(); Contactos_Autocomp(0); ResizeMyContent_navbar(); }
		if (toPageID == "contact_find_gr"){ reset_inputs(); Contactos_Autocomp(1); ResizeMyContent_navbar(); }	
}

if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
    var $viewport = $('head').children('meta[name="viewport"]');
    $(window).bind('orientationchange', function(){
		doOnOrientationChange();
        if (window.orientation == 90 || window.orientation == -90 || window.orientation == 270) { $viewport.attr('content', 'height=device-width,width=device-height,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0'); } 
		else { $viewport.attr('content', 'height=device-height,width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0');  }
    }).trigger('orientationchange');
}



/* =============================== */
/* =============================== */
/* MULTIPLES MONEDAS */
/*
function init_coins(){ set_bgcolor_in(); enable_multi_coins(); get_active_coin_info(-1); }
$(document).on("pagebeforeshow", "#ppal", function(){ init_coins(); });

var color_actual = "";
var color_schema_actual = "";
function set_coin_color(color, color_schema){
	if (color && color!=="" && color!=color_actual && color_schema!=color_schema_actual){
		color_actual = color;
		color_schema_actual = color_schema;
		var ruta_css = def_url + '/css.php?col=' + color;
		if (color_schema!==""){ ruta_css = ruta_css + "&sch=" + color_schema; }	
		ruta_css = ruta_css + "&rr=" + Math.random();
		$("#dynamic_css").attr("href",ruta_css);		
	}
}

function change_active_coin(idCoin, noback){	setInfo("active_coin", idCoin);	get_active_coin_info( noback );	 }
function change_active_coin_sel( coin_override ){	
	var idCoin = $('#coin_selector').val(); 
	if (coin_override) { idCoin = coin_override; }
	change_active_coin(idCoin, -1);  
}
function enable_multi_coins(){ if ( coin_count > 1 ) { $('.hdr_saldo_img').show(); $('.menu_monedas').show(); } else { $('.hdr_saldo_img').hide(); $('.menu_monedas').hide(); } }

function get_active_coin_info( noback ){
	
	if ( network_ok()==false ){ return false; }
	if ( !IdS || !IdU ){ return false; }
	
	active_coin = getInfo("active_coin");
	var ruta_url = def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU;	
	$.post(ruta_url, {
        a:'act_coin',
		user_coin: active_coin
    }, function(respuesta) {
	
        if (chkSesion(respuesta)) {
            if (respuesta !== '') {
						
						//var obj = jQuery.parseJSON(respuesta);
						var obj = parse_respuesta_json(respuesta);
						
						active_coin 	 = obj.tmp_id;
						active_coin_name = obj.tmp_name;
						active_coin_simb = obj.tmp_simb;
						active_coin_type = obj.tmp_frac;
						
						if ( obj.tmp_color !== "" ){ 
							var color_schema = "";
							if ( obj.tmp_sch !== "" ){ color_schema = obj.tmp_sch; }							
							set_coin_color(obj.tmp_color, color_schema); 
						}
						

						
						$('#ppal_saldo').html( obj.tmp_sald );
						$('#saldo_simbl').html( active_coin_simb );

						set_active_coin( noback );
            } else {
						$('#err_back_title').html("Error obteniendo moneda");
						$('#err_back_msg').html("Se ha producido un error inesperado obteniendo información de su moneda activa, por favor inténtelo de nuevo.");
						$('#err_back_msg_red').html("");
						change_to('err_and_back', ret_false);
						//return false;
            }
        }
    })	;
}

function set_active_coin( noback ) { 
	ajustar_rules_validation(); 
	$('.active_coin').html(active_coin_simb); 
	if ( noback != -1){  
		if ( coin_count > 1 ){ 
			loadPage('actions_ses.php?ids=' + IdS + '&idu=' + IdU  + '&ac=' + active_coin + '&a=get_coins' + '', '#listMonedas', 'monedas', '', showSalaH);  
		}
	}
}

function ajustar_rules_validation(){
	if ($( "body" ).pagecontainer( "getActivePage" ).attr('id') == "pago_page") {
			$( "#cantidad" ).rules( "remove" );
			var tipo_moneda_selected = $("#coin_selector").find(':selected').attr('data-tp');
			if (tipo_moneda_selected == 2) {
					$( "#cantidad" ).rules( "add", {
					coin_int: true,
					messages: { coin_int: "Esta moneda no admite pagos fraccionarios" }
					});	
			} else {
					$( "#cantidad" ).rules( "add", {
					EuroESP: true,
					messages: { EuroESP: "Indica la cantidad en formato xxx,xx" }
					});		
			}	
			validator_pago_page.element( "#cantidad" );
	} 
}

function loadMonedas(){
	if ( coin_count > 1 ){
		if ($( "body" ).pagecontainer( "getActivePage" ).attr('id') != "monedas") {
			$('#search-text-moneda').val('');
			loadPage('actions_ses.php?ids=' + IdS + '&idu=' + IdU  + '&ac=' + active_coin + '&a=get_coins' + '', '#listMonedas', 'monedas', '', hacerNada);
		} else {
			menu_close();
		}		
	}	
}
*/
/* MULTIPLES MONEDAS */
/* =============================== */
/* =============================== */


/* =============================== */
/* =============================== */
/* PAGOS */
/*
function sendAmount( a_grupo ) {
    
	if ( network_ok()==false ){ return false; }
	
	var s = 0;
    var pago_de = $('#pago_from').val();
    $.ajax({
        type: "POST",
		url: def_url + '/actions_ses.php?ids=' + IdS + '&idu=' + IdU + '&id_usr=' + pago_de + '',
        data: {
            a:'chkSaldoLimit',
			id_usr: pago_de,
            fAction: "",
			coin_sel: $('#coin_selector').val()
        }
    }).done(function(respuesta) {
        if (chkSesion(respuesta)) {
			
				if (respuesta !== '') {
					
							//var obj = jQuery.parseJSON(respuesta);
							var obj = parse_respuesta_json(respuesta);
							
							var s_saldo = obj.s_saldo;
							var s_limit = obj.s_limit;
							
							var mi_saldo 		= parseFloat(replace(s_saldo, ',', '.'));
							var quiero_pagar 	= ChckAmount(replace($('#cantidad').val(), ',', '.'));
							var limite_inf 		= parseFloat(replace(s_limit, ',', '.'));
							
							//alert(quiero_pagar);
							
							if (quiero_pagar > 0) {
								
								var tmp_saldo_final = mi_saldo - quiero_pagar;
								if (tmp_saldo_final < limite_inf) { //if (tmp_saldo_final < 0) {  //if (quiero_pagar > mi_saldo) { 
									LimitExceed(mi_saldo, quiero_pagar, limite_inf);
									return false;
								} else {									
									if ( a_grupo == 1 ){
											$('#informSendGr').html($('#cantidad').val());
											$('#mensDestGr').html($('#pago_mensaje_txt').val());						
									} else {
											$('#informSend').html($('#cantidad').val());
											$('#mensDest').html($('#pago_mensaje_txt').val());						
									}
									change_to('pago_page_confirm');
								}
							} else {
								$('#err_back_title').html("Error");
								$('#err_back_msg').html("Cantidad errónea");
								$('#err_back_msg_red').html("");
								$('#cantidad').val('');
								change_to('err_and_back', ret_false);
								//return false
							}							
								
				} else {			
					$('#err_back_title').html("Error");
					$('#err_back_msg').html("Cantidad errónea"); 
					$('#err_back_msg_red').html("");
					$('#cantidad').val('');
					change_to('err_and_back', ret_false);
					//return false			
				}
        }
    });
    return false;
}
*/
/* PAGOS */
/* =============================== */
/* =============================== */



/* =============================== */
/* =============================== */
/* REGISTRO USUARIOS */
/*
var validator_usr = null;
function clear_usrReg(){ 
	if (validator_usr) { validator_usr.resetForm(); } 
	$('#form_usr_reg')[0].reset(); 
}
$(document).on("pagebeforeshow", "#newUsrReg", function(){ clear_usrReg(); });
$(document).on("pagecreate", "#newUsrReg", function(){
    validator_usr = $("#form_usr_reg").validate({
        rules: {
            usr_reg_tlf: {
                required: true,
                phoneESP: true,
                remote: {
                    url: def_url + "/chk_tlf.php",
                    type: "post", 
                    data: { tlf: 1 }
                }
            },

//            usr_reg_usernam: {
//                required: true,
//                alphanumeric: true,
//                minlength: 6,
//                maxlength: 20,
//                remote: {
//                    url: def_url + "/chk_user.pro",
//                    type: "post"
//                }
//            },

            usr_reg_email: {
                required: true,
                maxlength: 100,
                email: true,
                remote: {
					url: def_url + "/chk_email.php",	//url: def_url + "/chk_email.pro",
                    type: "post",
                    data: { email: 1 }
                }
            },
            usr_reg_pwd: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            usr_reg_pwd2: {
                required: true,
                equalTo: "#usr_reg_pwd"
            }
        },
        messages: {
            usr_reg_tlf: {
                required: "Por favor indica tu número de móvil",
                phoneESP: "El número indicado no es válido",
                remote: jQuery.validator.format("Este número ya se ha utilizado")
            },

//            usr_reg_usernam: {
//                required: "Por favor elige un nombre de usuario",
//                alphanumeric: "Por favor solo utiliza letras y/o números",
//                minlength: "Utiliza entre 6 y 20 caracteres",
//                maxlength: "Utiliza entre 6 y 20 caracteres",
//                remote: jQuery.validator.format("Este usuario ya se ha utilizado")
//            },

            usr_reg_email: {
                maxlength: "El email no puede tener más de 100 caracteres",
                required: "Por favor introduce un email",
                email: "Por favor introduce un email válido",
                remote: jQuery.validator.format("Este email de usuario ya se ha utilizado")
            },
            usr_reg_pwd: "Por favor introduce una contraseña, de 6 a 20 caracteres",
            usr_reg_pwd2: "Las contraseñas no coinciden"
        },
        errorPlacement: function(label, element) { label.addClass('arrow'); label.insertAfter(element); }, wrapper: 'span', onkeyup: false,
        submitHandler: function(form) {
            var tlf_sub = $("#usr_reg_tlf").val();
            var data_param = $(this.currentForm).serialize();
			var ajax_url = def_url + '/actions.php';
            send_get(ajax_url, data_param, function(respuesta) {
					setInfo("tlftry", tlf_sub);
					respuesta = parse_respuesta_json(respuesta);
					if (respuesta.tmp_true == 'true') { 
						change_to('user_add_conf');
					} else {
						$('#err_back_title').html(respuesta.tmp_err);
						$('#err_back_msg').html(respuesta.tmp_mensaje);
						$('#err_back_msg_red').html("");
						change_to('err_and_back');
					}
            });			
        },
        invalidHandler: function(){ return false; }
    });
	
});





function clear_usrRegConf(){ $('#form_usr_reg_confirm')[0].reset(); $("#tlftry").val(getInfo("tlftry")); $("#usr_reg_code").val(''); }
$(document).on("pagebeforeshow", "#user_add_conf", function(){ clear_usrRegConf(); });
$(document).on("pagecreate", "#user_add_conf", function(){
    var validator_conf = $("#form_usr_reg_confirm").validate({
        rules: { usr_reg_code: { required: true } },
        messages: { usr_reg_code: { required: "Por favor indica tu número de móvil" } },
        errorPlacement: function(label, element) { label.addClass('arrow'); label.insertAfter(element); }, wrapper: 'span', onkeyup: false,
        submitHandler: function(form) {
            var data_param = $(this.currentForm).serialize();
			var ajax_url = def_url + '/actions.php';
            send_get(ajax_url, data_param, function(respuesta) {
					respuesta = parse_respuesta_json(respuesta);
					if (respuesta.tmp_true == 'true') { 
						change_to('user_add_ok');
					} else {
						$('#err_back_title').html(respuesta.tmp_err);
						$('#err_back_msg').html(respuesta.tmp_mensaje);
						$('#err_back_msg_red').html("");
						change_to('err_and_back');
					}
            });
        },
        invalidHandler: function(){ return false; }
    });
});
*/
/* REGISTRO USUARIOS */
/* =============================== */
/* =============================== */
