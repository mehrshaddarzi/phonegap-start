document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
	
	window.plugins.sim.getSimInfo(successCallback, errorCallback);
	
	/*function successCallback(result) {
		if("cards" in result) {
			return result['cards'][0]['phoneNumber']; 
		} else {
			return "NO";
		}
	}
	
	function errorCallback(error) {
		//alert(JSON.stringify(error));
	}
	
	
    /*  Jquery */
    jQuery(document).ready(function($) {

        var ajax_url = 'http://mznapp.irwebdesign.ir/wp-admin/admin-ajax.php';
        var loading = '<div id="load-index" class="loader loader--style3" title="2"> <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="45px" height="45px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/> </path> </svg></div>';
        var imie = device.uuid;
		//alert(JSON.stringify(device));
		//var is_similator = device.isVirtual ? "yes" : "no";
        //var mobile_number = '+989111111111';
        var app_main = jQuery("div#app_text");


        /*input numeric*/
        $(document).on('keyup', 'input[data-put=number]', function(event) {
            var v = this.value;
            if($.isNumeric(v) === false) {
                //chop off the last char entered
                this.value = this.value.slice(0,-1);
            }
        });



        function show_loading(){
            app_main.html(loading);
        }



        function navigation_menu(){
			
			
			function successCallback(result) {
					if("cards" in result) {
						
						 jQuery.ajax({
                url: ajax_url,
                type: 'post',
                dataType : "json",
                data: {
                    'action':'index_list_page',
                    'imie': imie,
                    'mobile': result['cards'][0]['phoneNumber'],
                },
                success:function(data) {

                    var html = '';

						if(data.error =="yes") {
                        var title = 'نتایج رزمایش';
                        var link = "result";
                        //var link = "vote";
						} else {
                        var title = 'شرکت در رزمایش';
                        var link = "vote";
						}
						
						 if(data.show_vote =="yes") {
								html += '<a class="home-btn btn btn-default" data-wow-duration="1s" data-wow-delay="0s" href="#" role="button" data-type-vote="' + link + '"><span data-type-vote="yes">' + title + '</span></a>';
						}

						html += '<a class="home-btn btn btn-default" data-wow-duration="1s" data-wow-delay="0.5s" href="#" id="show-list-news" role="button">اخبار و رویداد ها </a><a class="home-btn btn btn-default" data-wow-duration="1s" data-wow-delay="0.5s" href="#" id="show_contact" role="button">ارتباط با ما </a><a class="home-btn btn btn-default wow fadeInUp" data-wow-duration="1s" data-wow-delay="1s" href="#" id="href-exit" role="button"> خروج </a>';

						jQuery("div#app_text").html(html);
						

                },
                error: function(jqXHR, textStatus, errorThrown){
                    // if(jqXHR.status==0) {alert(" fail to connect, please check your connection settings");}
                    jQuery("div#app_text").html('<div class="panel text-center" style="padding:25px;"> <i class="fa fa-exclamation-triangle"></i> خطای برقراری ارتباط با اینترنت <br> <div style="font-size:11px; margin-top:5px;"> لطفا اتصال به اینترنت خود را چک کنید و سپس وارد اپلیکیشن شوید</div> </div>');
                }
            });
						
					} else {

					jQuery("div#app_text").html('<div class="panel text-center" style="padding:25px;"> <i class="fa fa-exclamation-triangle"></i> خطای حق دسترسی <br> <div style="font-size:11px; margin-top:5px;"> شما حق دسترسی به استفاده از اپلیکیشن را ندارید</div> </div>');

					}
				}
			

        }



        /* Start Loader */
        setTimeout(function() {
            //navigation_menu();
            jQuery('.id_logo').fadeIn('slow');
        }, 2000);

        setTimeout(function() {
            //navigation_menu();
            jQuery('.footer').fadeIn('slow');
        }, 5000);


        setTimeout(function() {

            $('.id_logo').animate({ 'marginTop': '-5%' }, 1000);
            $('.id_logo img').animate({ 'marginTop': '-1%' }, 3000);
        }, 6000);

        setTimeout(function() {
            show_loading()
            navigation_menu();
        }, 10000);





        function show_post_all(){
            jQuery.ajax({
                url: ajax_url,
                type: 'post',
                dataType : "json",
                data: {
                    'action':'showpost',
                },
                success:function(data) {
                    var html = '';

                    for (var i = 0; i < data['text'].length; i++) {

                        html += '<div class="panel panel-default">';
                        html += '<div class="panel-body text-right">';
                        html += '<h1 class="wow fadeInUp" style="font-weight: bold;font-size: 18px;line-height: 30px;" data-show-one-post="' + data['text'][i]['id'] + '">';
                        html += data['text'][i]['title'];
                        html += '</h1>';
                        html += '<span class="text-danger" style="display:block; margin-bottom:8px;"><i class="fa fa-calendar"></i> ';
                        html += data['text'][i]['time'];
                        html += '</span>';

                        if(data['text'][i]['img'] == "" || data['text'][i]['img'] == null)
                        {} else {
                            html += ' <div class="text-center" data-show-one-post="' + data['text'][i]['id'] + '" style="margin:30px auto;"> <img src="' + data['text'][i]['img'] + '" style="margin: 0px auto;border-radius: 5px;" class="img-responsive"> </div>';
                        }

                        html += '<span cstyle="display: block;font-size: 12px;line-height: 25px;" data-show-one-post="' + data['text'][i]['id'] + '">';
                        html += data['text'][i]['short'];
                        html += '</span>';
                        html += '<div class="pull-left"> <a class="btn btn-danger" href="#" role="button" data-show-one-post="' + data['text'][i]['id'] + '" style=" border: 0px; font-size: 11px;margin-top: 45px;">متن کامل خبر <i class="fa fa-angle-left"></i></a></div> </div> </div> <div class="clearfix"></div>';
                    }

                    html += '<div style="margin:5px 0px;"><a class="home-btn btn btn-default" href="#" id="back_to_home" role="button"> بازگشت </a></div>';
                    jQuery("div#app_text").html(html);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    // if(jqXHR.status==0) {alert(" fail to connect, please check your connection settings");}
                    jQuery("div#app_text").html('<div class="panel text-center" style="padding:25px;"> <i class="fa fa-exclamation-triangle"></i> خطای برقراری ارتباط با اینترنت <br> <div style="font-size:11px; margin-top:5px;"> لطفا اتصال به اینترنت خود را چک کنید و سپس وارد اپلیکیشن شوید</div> </div>');
                }
            });
        }



        function show_result(){
            jQuery.ajax({
                url: ajax_url,
                type: 'post',
                dataType : "json",
                data: {
                    'action':'show_result',
                },
                success:function(data) {
                    var html = data.text;
                    html += '<div style="margin:5px 0px;"><a class="home-btn btn btn-default" href="#" id="back_to_home" role="button"> بازگشت </a></div>';
                    jQuery("div#app_text").html(html);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    // if(jqXHR.status==0) {alert(" fail to connect, please check your connection settings");}
                    jQuery("div#app_text").html('<div class="panel text-center" style="padding:25px;"> <i class="fa fa-exclamation-triangle"></i> خطای برقراری ارتباط با اینترنت <br> <div style="font-size:11px; margin-top:5px;"> لطفا اتصال به اینترنت خود را چک کنید و سپس وارد اپلیکیشن شوید</div> </div>');
                }
            });
        }

        /* Show Post List */
        jQuery(document).on("click", "a[id=show-list-news]", function (e) {
            e.preventDefault();
            show_loading();
            show_post_all();
        });


        /*contact Us*/
        jQuery(document).on("click", "a[id=show_contact]", function (e) {
            e.preventDefault();
            show_loading();

            jQuery.ajax({
                url: ajax_url,
                type: 'post',
                dataType : "json",
                data: {
                    'action':'showcontact',
                },
                success:function(data) {
                    var html = data.text;
                    html += '<div style="margin:5px 0px;"><a class="home-btn btn btn-default" href="#" id="back_to_home" role="button"> بازگشت </a></div>';
                    jQuery("div#app_text").html(html);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    // if(jqXHR.status==0) {alert(" fail to connect, please check your connection settings");}
                    jQuery("div#app_text").html('<div class="panel text-center" style="padding:25px;"> <i class="fa fa-exclamation-triangle"></i> خطای برقراری ارتباط با اینترنت <br> <div style="font-size:11px; margin-top:5px;"> لطفا اتصال به اینترنت خود را چک کنید و سپس وارد اپلیکیشن شوید</div> </div>');
                }
            });
        });
		
		
        /*Show One Post click*/
        jQuery(document).on("click", "[data-show-one-post]", function (e) {
            e.preventDefault();
            show_loading();

            var post_id = jQuery(this).attr('data-show-one-post');
            jQuery.ajax({
                url: ajax_url,
                type: 'post',
                dataType : "json",
                data: {
                    'action':'get_one_post',
                    'p':post_id,
                },
                success:function(data) {
                    var html = '';

                    html += '<div class="panel panel-default">';
                    html += '<div class="panel-body text-right">';
                    html += '<h1 style="font-weight: bold;font-size: 18px;line-height: 30px;">';
                    html += data['title'];
                    html += '</h1>';
                    html += '<span class="text-danger" style="display:block; margin-bottom:8px;"><i class="fa fa-calendar"></i> ';
                    html += data['time'];
                    html += '</span>';

                    if(data['img'] == "" || data['img'] == null)
                    {} else {
                        html += ' <div class="text-center" style="margin:30px auto;"> <img src="' + data['img'] + '" style="margin: 0px auto;border-radius: 5px;" class="img-responsive"> </div>';
                    }

                    html += '<span style="display: block;font-size: 12px;line-height: 25px;">';
                    html += data['content'];
                    html += '</span>';
                    html += '<div class="pull-left"> </div> </div> </div> <div class="clearfix"></div>';

                    html += '<div style="margin:5px 0px;"><a class="home-btn btn btn-default" href="#" id="show-list-news" role="button"> بازگشت به لیست اخبار </a></div>';
                    html += '<div style="margin:5px 0px;"><a class="home-btn btn btn-default" href="#" id="back_to_home" role="button"> بازگشت به منو </a></div>';
                    jQuery("div#app_text").html(html);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    // if(jqXHR.status==0) {alert(" fail to connect, please check your connection settings");}
                    jQuery("div#app_text").html('<div class="panel text-center" style="padding:25px;"> <i class="fa fa-exclamation-triangle"></i> خطای برقراری ارتباط با اینترنت <br> <div style="font-size:11px; margin-top:5px;"> لطفا اتصال به اینترنت خود را چک کنید و سپس وارد اپلیکیشن شوید</div> </div>');
                }
            });

        });


        /*Submit vote to database*/
        jQuery(document).on("click", "input[id=add-vote-submit]", function (e) {
            e.preventDefault();

            jQuery("body").overhang({type: "info", html: true, message: "لطفا کمی صبر نمائید ...", duration: 20000});

            var name = jQuery("input[name=mzn_name]").val();
            var mobile = jQuery("input[name=mzn_mobile]").val();
            var codemeli = jQuery("input[name=mzn_codemeli]").val();
            var nahieh = jQuery("select[name=mzn_nahieh]").val();

            if(name =="" || mobile =="" || codemeli == "") {

                jQuery("body").overhang({type: 'error', html: true, message: 'لطفا تمامی فیلد ها را پر نمایید', upper: true});

            } else {
				
				
				function successCallback(result) {
					if("cards" in result) {
						
						jQuery.ajax({
                    url: ajax_url,
                    type: 'post',
                    dataType : "json",
                    data: {
                        'action':'vote_to_db',
                        'device_mobile':result['cards'][0]['phoneNumber'],
                        'imie_device':imie,
                        'name':name,
                        'mobile':mobile,
                        'codemeli':codemeli,
                        'city':nahieh,
                    },
                    success:function(data) {

                        if(data.error =="yes") {
                            jQuery("body").overhang({type: 'error', html: true, message: data.text, upper: true});
                        } else {
                            jQuery("body").overhang({type: 'success', html: true, message: 'اطلاعات شما با موفقیت ثبت گردید', upper: true});
                            show_loading();
                            show_result();
                        }

                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        // if(jqXHR.status==0) {alert(" fail to connect, please check your connection settings");}
                        jQuery(".overhang").remove();
                        jQuery("div#app_text").html('<div class="panel text-center" style="padding:25px;"> <i class="fa fa-exclamation-triangle"></i> خطای برقراری ارتباط با اینترنت <br> <div style="font-size:11px; margin-top:5px;"> لطفا اتصال به اینترنت خود را چک کنید و سپس وارد اپلیکیشن شوید</div> </div>');
                    }
                });
						
						
					}
				}
				
				
				
				
				
				
				

                

            }



        });


        /*Show Result Nazarsanji*/
        jQuery(document).on("click", "a[data-type-vote=result]", function (e) {
            e.preventDefault();
            show_loading();
            show_result();
        });


        /* Show add vote From */
        jQuery(document).on("click", "a[data-type-vote=vote]", function (e) {
            e.preventDefault();
            show_loading();

            jQuery.ajax({
                url: ajax_url,
                type: 'post',
                dataType : "json",
                data: {
                    'action':'add_vote'
                },
                success:function(data) {
                    var html = data.text;
                    html += '<div style="margin:5px 0px;"><a class="home-btn btn btn-default" href="#" id="back_to_home" role="button"> بازگشت </a></div>';
                    jQuery("div#app_text").html(html);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    // if(jqXHR.status==0) {alert(" fail to connect, please check your connection settings");}
                    jQuery("div#app_text").html('<div class="panel text-center" style="padding:25px;"> <i class="fa fa-exclamation-triangle"></i> خطای برقراری ارتباط با اینترنت <br> <div style="font-size:11px; margin-top:5px;"> لطفا اتصال به اینترنت خود را چک کنید و سپس وارد اپلیکیشن شوید</div> </div>');
                }
            });
        });


        /* Back To Home */
        jQuery(document).on("click", "[id=back_to_home]", function (e) {
            e.preventDefault();
            show_loading();
            navigation_menu();
        });


        /*Exit href*/
        jQuery(document).on("click", "a[id=href-exit]", function (e) {
            e.preventDefault();

            jQuery("body").overhang({
                type: "confirm",
                primary: "#40D47E",
                accent: "#27AE60",
                yesMessage:"بله",
                noMessage:"خیر",
                yesColor: "#3498DB",
                message: "آیا مایل به خروج از نرم افزار هستید ؟",
                callback: function (value) {
                    if (value === true) {

                        if (typeof cordova !== 'undefined') {
                            if (navigator.app) {
                                navigator.app.exitApp();
                            }
                            else if (navigator.device) {
                                navigator.device.exitApp();
                            }
                        } else {
                            window.close();
                        }

                    }
                }
            });

        });



    });
}//lets end cordova`s device ready

