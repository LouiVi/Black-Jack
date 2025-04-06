"use strict"

//Create a Home object.
function Home( path, layContent )
{
		var deck = new Array();
		var cardsLeft;
		var playerCard1, playerCard2, houseCard1, houseCard2;
		var symbols = ['♤','♡','◇','♧'];
		var numbers4Calc    = ['1',"2","3","4","5","6","7","8","9","10","11","12","13","14"];
		var numbers4Show  = ["A","2","3","4","5","6","7","8","9","10","J","Q","K","A"];
		var realCards = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
		var cardsWithMoreValues = {
			A: [1,14],
			J: [11,10],
			Q: [12,10],
			K: [13,10],
		};
	
    var self = this;
		var anim = ["Rubberband", "Newspaper", "Tada", "Bounce", "FallRotate"];
    //Get page states.
    this.IsVisible = function() { return lay.IsVisible() }
    this.IsChanged = function() { return false }
    
    //Show or hide this page.
    this.Show = function( show )
    {
        if( show ) {
        	lay.Animate("FadeIn");
        	//self.Tween1();
        	//var i = setInterval(self.RunAnim, 3000);
        } else {
        	lay.Animate( "FadeOut" );
        }
    }
    
    this.Tween1 = function()
{
    var target = { x:0.5, y:0.5, sw:0.5, sh:0.5, rot:360 };
    img.Tween( target, 4500, "Elastic.InOut", 1, true, ()=>{img.Tween( target, 4500, "Bounce.InOut", 1, true, self.Tween2 )})
    
}

this.Tween2 = function()
{
    var target = { x: 0.8, y:[0.6,0.3,0.6], rot: 360*3 };
    img.Tween( target, 5000, "Bounce.InOut", 1, true, ()=>{img.Tween( target, 5000, "Elastic.InOut", 1, true, self.Tween1 )})
}

this.RunAnim = function(){
//	img.Animate( anim[utils.RandomIntegerRange(0, anim.length)] );
	img.SetImage( "Img/" + utils.RandomIntegerRange(1, 8) + ".png" );
	//self.Tween1();
}
    
    this.GetStartingHand = function(){
    	utils.Shuffle(deck);
    	playerCard1 = deck[0];
    	houseCard1 = deck[1];
    	playerCard2 = deck[2];
    	houseCard2 = deck[3];
    	deck.splice(0, 4);
    	cardsLeft = deck.length;
    	app.ShowPopup( cardsLeft );
    	return [[playerCard1, playerCard2], [houseCard1, houseCard2]];
    	//randomCard = deck[utils.RandomIntegerRange(0, cardsLeft)];
    	//return randomCard;
    }
    
    this.GetCard = function(){
    	utils.Shuffle(deck);
    	cardsLeft = deck.length;
    	randomCard = deck[utils.RandomIntegerRange(0, cardsLeft)];
    	return randomCard;
    }
    
    this.CreateCardDeck = function () {
			for(var a1 = 0; a1 < 6; a1++){
				for(var a2 = 1; a2 < numbers4Show.length ; a2++){
					for(var a3 = 0; a3 < symbols.length; a3++){
						var valor = numbers4Show[a2] + symbols[a3];
						app.ShowPopup( valor );
						deck.push(valor);
						app.WriteFile( "decks.txt", valor+"\r\n", "Append" );
					}
			  }
			}
			utils.Shuffle(deck);
			app.WriteFile( "6decks.txt", JSON.stringify(deck) );
			return deck;
		}

	this.HitMe = function ()
{
    var gsh = self.GetStartingHand();
    if(deck.length>0){
    app.ShowPopup("here");
    img.SetColor( "#cdcdcd" );
    if(gsh[0][0].split("")[1] == "♡" || gsh[0][0].split("")[1] == "◇" || gsh[0][0].split("")[2] == "♡" || gsh[0][0].split("")[2] == "◇"){
    img.SetPaintColor( "#ff3434" )
    img.SetPaintStyle( "Line" );
    img.SetLineWidth(  4)
    img.DrawRectangle( 4, 4, 328, 328 );
    img.SetPaintStyle( "Fill" )
    img.SetPaintColor( "#ffffff" )
    img.DrawRectangle( 8, 8, 324, 324 );
    img.SetPaintColor( "#ff3434" )
    }else{
    img.SetPaintColor( "#343434" )
    img.SetPaintStyle( "Line" );
    img.SetLineWidth(  4)
    img.DrawRectangle( 4, 4, 328, 328 );
    img.SetPaintStyle( "Fill" )
    img.SetPaintColor( "#ffffff" )
    img.DrawRectangle( 8, 8, 324, 324 );
     img.SetPaintColor( "#343434" )
    }
    img.SetPaintStyle( "Fill" )
    if(gsh[0][0].length === 3){
    img.SetTextSize( 60 );
    img.DrawText( gsh[0][0], 18, 220);
    }else{
    img.SetTextSize( 68);
    img.DrawText( gsh[0][0], 36, 230);
    }
    img.Save("/storage/emulated/0/Download/cards/" + gsh[0][0] + ".png", 100  );

    }else{
    self.CreateCardDeck();
    }
    if(deck.length > 0){
    
    app.ShowPopup("Your cards: " + gsh[0] + "\r\n" + "House cards: " +gsh[1]);
    	app.WriteFile( "yourcards.txt", JSON.stringify(gsh[0])+"\r\n", "Append" );
	app.WriteFile( "housecards.txt", JSON.stringify(gsh[1])+"\r\n", "Append" );
	
    }
    //app.ShowPopup();
}

    
    //Create layout for app controls.
    var lay = app.CreateLayout( "Linear", "Top,FillXY,HCenter" );
    lay.Hide();
    layContent.AddChild( lay );
    var game = app.CreateWebView( 1, -1 );
    game.LoadUrl( "game.html" );
    lay.AddChild( game )
    /*
    //Add a logo.
	var img = app.CreateImage( "Img/Hello.png", 0.25 );
	img.SetPaintColor( "#ff3434" );
	img.SetTextSize( 68);
	img.SetFontFile(  "Misc/Lobster-Regular.ttf");//Misc/SmoochSans-ExtraLight.ttf");//Misc/AtkinsonHyperlegibleNext-ExtraLight.ttf");//Misc/Oswald-Light.ttf");//Misc/LuckiestGuy-Regular.ttf" )
	img.SetAutoUpdate(true )
	img.SetPaintStyle( "Fill" ),
	img.SetPixelMode( true );
	img.SetColor( "#fff00f" );
	lay.AddChild( img );
	img.Save("/storage/emulated/0/Download/blank.png", 100  );
	
	//Create a text with formatting.
    var text = "<p><font color=#4285F4><big>Welcome</big></font></p>" + 
    "Todo: Put your home page controls here! </p>" + 
    "<p>You can add links too - <a href=https://play.google.com/store>Play Store</a></p>" +
    "<br><br><p><font color=#4285F4><big><big><b>&larr;</b></big></big> Try swiping from the " + 
    "left and choosing the <b>'New File'</b> option</font></p>";
    var txt = app.CreateText( text, 1, -1, "Html,Link" );
    txt.SetPadding( 0.03, 0.03, 0.03, 0.03 );
    txt.SetTextSize( 18 );
    txt.SetTextColor( "#444444" );
    lay.AddChild( txt );
    self.CreateCardDeck();
    setInterval(self.HitMe, 50);*/
}