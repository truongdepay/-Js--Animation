//script for index.html
$(document).ready(function(){
	$("#submit").click(function(){
		var Animation = {
			creatPoint: function(num_point, prefixDiv){
				let str = '';
				for (let i = 0; i < num_point; i++) {
					str += `<div id="${prefixDiv}${i}"></div>`;
				}
				return str;
			},
			creatCss: function(num_point, prefixDiv){
				let str = '';
				function getRandomColor() {
				  let letters = '0123456789ABCDEF';
				  let color = '#';
				  for (let i = 0; i < 6; i++) {
				    color += letters[Math.floor(Math.random() * 16)];
				  }
				  return color;
				}
				
				function getRandomTime(){
					let wh = Math.floor(Math.random() * 350) + 100;
					return wh;
				}
				for (let i = 0; i < num_point; i++) {

					str += `#${prefixDiv}${i}{
						    border-radius: 50%;
						    background-color: ${getRandomColor()};
						    position: absolute;
						    -webkit-animation-name: example_${i}; /* Safari 4.0 - 8.0 */
						    -webkit-animation-duration: ${getRandomTime()}s; /* Safari 4.0 - 8.0 */
						    -webkit-animation-iteration-count: infinite; /* Safari 4.0 - 8.0 */
						    animation-name: example_${i};
						    animation-duration: ${getRandomTime()}s;
						    animation-iteration-count: infinite;
						}`;
				}
				return str;

			},
			creatKeyframe: function(num_point){
				
				function getRandomColor() {
				  let letters = '0123456789ABCDEF';
				  let color = '#';
				  for (let i = 0; i < 6; i++) {
				    color += letters[Math.floor(Math.random() * 16)];
				  }
				  return color;
				}
				let str = '';
				for (let j = 0; j < num_point; j++) {
					str += `@-webkit-keyframes example_${j} {`;
					let sub_str = '';
					for (let i = 0; i < 100; i++) {

						let random_left = Math.floor(Math.random() * (innerWidth-1));
						let random_top = Math.floor(Math.random() * (innerHeight-1));
						if (i==0) {
							var left100 = random_left;
							var top100 = random_top;
						}
						function getRandomWH(){
							let wh = Math.floor(Math.random() * 50) + 5;
							return wh;
						}
						function getOpacity(){
							let op = Math.floor(Math.random() * 9) + 0;
							return op;
						}
						let wh = getRandomWH();
						let op = (getOpacity() == 0)?1:`0.${getOpacity()}`;
						sub_str += `${i}%   {background-color:${getRandomColor()}; left:${random_left}px; top:${random_top}px;width: ${wh}px;height: ${wh}px; opacity: ${op}}`;
						if (i == 99) {
							sub_str += `100%   {background-color:${getRandomColor()}; left:${left100}px; top:${top100}px;width: ${wh}px;height: ${wh}px; opacity: ${op}}`;
							str += sub_str;
						}
					}
					
					str += '}\n';
				}
				
				return str;
			}
		};
		var num_point = 200;
		var prefixDiv = 'div_';
		$("body").html(Animation.creatPoint(num_point, prefixDiv));
		$("style").append(Animation.creatCss(num_point, prefixDiv));
		$("style").append(Animation.creatKeyframe(num_point));
	});
});


//script for facebook_form.html
$(document).ready(function () {
    //Scrip xu ly cho form dang bai
    $("#td_form_input").focus(function () {
        $(this).addClass('form_focus');
        $(this).removeClass('form_blur');
        $(".td_box_form").addClass("td_box_form_focus");
        $("#black_body").addClass("black_body_focus");
        $(".td_option").slideDown(200);
    });
    $("#black_body").click(function () {
        $("#td_form_input").addClass('form_blur');
        $("#td_form_input").removeClass('form_focus');
        $(".td_box_form").removeClass("td_box_form_focus");
        $(this).removeClass("black_body_focus");
        $(".td_option").slideUp(200);
    });
    //Scrip xu ly button upload image
    var height_btn = $("#td_pload_image").css("height");
    var width_btn = $("#td_pload_image").css("width");
    $("input[name='thumbnail']").css({"height":height_btn, "width":width_btn});

    //script xu ly tao tag
    $("input[data-toggle=\"keyword\"]").keyup(function(event){
        let value = $(this).val();
        let name_hidden = 'input[name='+$(this).attr("name-hidden")+']';
        var value_hidden = $(name_hidden).val();
        if (value != '' && event.keyCode === 13) {
            value_hidden = (!value_hidden)?value:value_hidden+`,${value}`;
            $(name_hidden).val(value_hidden);
            let html = `<span class="p-2 m-1 bg-primary text-white rounded">${value}<a class="p-0" name-hidden="${$(this).attr("name-hidden")}" onclick="delete_tag(this)" ><i class="icon-remove p-1"></i></a></span>`
            $("#td_tag").append(html);
            $(this).val(null);
        }
    });
});
function delete_tag(elm)
{
    $(elm).parent().remove();
    let value_hidden = '';
    $("#td_tag span").each(function(){
        let value = $(this).text();
        value_hidden = (!value_hidden)?value:value_hidden+`,${value}`;
    });
    let name_hidden = 'input[name='+$(elm).attr("name-hidden")+']';
    $(name_hidden).val(value_hidden);
}
