//hide shoping cart	
//$("#cart").hide();

$(document).ready(function(){
// hover effect for navigation bar
	$("#b-items").hover(function(){
		$("#b-items").css("color","#ff8991");
	}, function(){
		$("#b-items").css("color","white");
	});

	$("#b-recipe").hover(function(){
		$("#b-recipe").css("color","#ff8991");
	}, function(){
		$("#b-recipe").css("color","white");
	});

	$("a:contains('Home')").hover(function(){
		$("a:contains('Home')").css("color","#ff8991");
	}, function(){
		$("a:contains('Home')").css("color","white");
	});

// Button that shows cart
	$("#button-cart").hover(function(){
		$("#button-cart").css("background-color","#ff8991");
	}, function(){
		$("#button-cart").css("background-color","#8999ff");
	});
	$("#button-cart").click(function(){
		$("#cart").show(100);
		$("#cart").css("display","flex");
		$("#button-cart").css("background-color","#ff8991");
	});
// Button that hides cart
	$("#close").click(function(){
		$("#cart").hide(100);
	});
//show all items ({all products} in navigation bar)
	$("#b-items").css("cursor","pointer");

	$("#b-items").click(function(){
		$("#item-day").hide();
		$("#items-list").empty();//delete old items
		$("#items-list").hide();//hide to show again with animation
		for (let i = 0; i < items.length; i++) {
			var box = $("<div></div>");
			$("#items-list").append(box);
			box.addClass("box");
			
			var img = $("<img></img>");
			box.append(img);
			img.css("width","100%");
			img.attr("src",items[i].pic);
			
			var descr = $("<div></div>");
			descr.css({
				"width":"100%",
				"height":"70px",
				"margin":"0",
				"display":"flex",
				"justify-content":"space-around",
				"align-items":"center"
			})
			box.append(descr);
			
			var bAdd = $("<div><p>&#128722;</p></div>");
			descr.append(bAdd);
			bAdd.addClass("button-add");
			bAdd.click(function(){addToCart(items[i].iD)});
			//for the future: place here selector 
			
			descr.append(`<p>${items[i].name}<br><b>${items[i].price}&#8364;</b></p>`);
			
			if (items[i].status == "not available") {
				img.attr("src","img/warning.jpg");
			}
			
		}
		$(".box > p").css({
			"text-align":"center",
			"color":"#76569e"
		});
		$("#items-list").show(800);//shows thumbnails with delay
	});
//item of a day
	var iOfaDay = Math.floor(Math.random()*9);
	console.log (iOfaDay);
	console.log("product of a day: " + items[iOfaDay].name);
	var str = "f00"+iOfaDay;
	
	var boxPic = $("<div></div>");
	boxPic.css({
		"width":"300px",
		"margin":"0 20px 0 0"
	})
	$("#item-day > div").append(boxPic);
	var boxText = $("<div></div>");
	boxText.css({
		"width":"500px",
		"margin":"0"
	})
	$("#item-day > div").append(boxText);

	var img = $("<img></img>");
	boxPic.append(img);
	img.css("width","100%");
	img.attr("src",items[iOfaDay].pic);

	if (items[iOfaDay].status == "not available") {
		boxText.append("<p>Sorry, but "+items[iOfaDay].name+" is not in the store</p>");
	} else {
		boxText.append("<h2>"+items[iOfaDay].name+"</h2>");
		boxText.append(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing
			elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
			Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
			aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
			occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
			anim id est laborum.</p>`);
		boxText.append("<h3>Only "+items[iOfaDay].price+"&#8364; in our shop</h3>");
	}

//Add to shoping cart
	var sum = 0;
	$("#info").append(`<ul></ul>`);
	var cart = [[],[]];
	var isItemInKart = false;
	var counter = 0;

	function addToCart (val) {
		console.log(val);
		$("#info > p").remove();//delete old info		

		for (let i = 0; i < items.length; i++) {
			if (items[i].iD == val) {
				if (items[i].status != "not available") {
					sum += Number(items[i].price);
					counter++;

					for (let j = 0; j < cart[0].length; j++) {
						if (cart[0][j] == items[i].name) {
							cart[1][j]++;
							isItemInKart = true;
						}
					}
					if (!isItemInKart) {
						cart[0][cart[0].length]= items[i].name;
						cart[1][cart[1].length]= 1;
					} else {isItemInKart = false;}
				} else {alert("This product is not available!");}

			}			
		}
		$("#info > ul").empty();
		for (let j = 0; j < cart[0].length; j++) {
			$("#info > ul").append(`<li>${cart[0][j]}(${cart[1][j]})</li>`);
		}
		$("#info > p").remove();
		$("#info").append(`<p>Total: ${sum}&#8364;</p>`);
		console.log(sum);

		$("#counter").empty();
		$("#counter").append(counter);
	}
// recepies
	$("#b-recipe").css("cursor","pointer");

	$("#b-recipe").click(function(){
		$("#item-day").hide();
		$("#items-list").empty();//delete old items
		$("#items-list").hide();//hide to show again with animation

		$("#items-list").append(`<h1>Here could be recipes</h1>`);
		$("#items-list > h1").css({
			"text-align":"center",
			"width":"100%"
		});
		
		$("#items-list").show(800);
	});
});