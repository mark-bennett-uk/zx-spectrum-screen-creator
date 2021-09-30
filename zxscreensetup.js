window.onload = function() {
  // add data elements to udgEdit array
  for(let i = 0; i < 8; i++){
    state.udgEditArea.push([0,0,0,0,0,0,0,0]);
  }

  // add data elements to screenPixels array
  for(let i = 0; i < 768; i++){
    // character, ink, paper, bright, flash
    state.screenData.push([32,0,7,0,0]);
  }

  // create screen pixel rects
  for(let i = 0; i < 256; i++){
    for(let j = 0; j < 192; j++){
      let id = "screenpixel" + pad(i, 3) + pad(j, 3);
      drawSVGRect("screen", id, 20 + (i * 3), 20 + (j * 3), 3, 3, "rgb(206,203,206)", "none", "visible", "crispEdges");
      document.getElementById(id).addEventListener("click", function() {state.screenPixelClick(id, i, j)});
    }
  }

  // character guide lines
  for(let i = 0; i <= 32; i++){
    let id = "linevertical" + pad(i, 3);
    drawSVGLine(id, 20 + (i * 3 * 8), 20, 20 + (i * 3 * 8), 20 + 576);
  }  
  for(let i = 0; i <= 24; i++){
    let id = "linehorizontal" + pad(i, 3);
    drawSVGLine(id, 20, 20 + (i * 3 * 8), 20 + 768, 20 + (i * 3 * 8));
  }  

  // screen and border lines
  drawSVGRect("screen", "screenborder", 0, 0, 808, 616, "none", "black", "visible");
  drawSVGRect("screen", "bordermarker", 20, 20, 768, 576, "none", "black", "hidden", "crispEdges");

  // edit area pixels
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      let id = "editpixel" + i + j;
      drawSVGRect("controls", id, 844 + (i * 24), 351 + (j * 24), 24, 24, "rgb(206,203,206)", "darkgrey", "visible", "crispEdges");
      document.getElementById(id).addEventListener("click", function() {state.editPixelClick(id)});
    }
  }
  drawSVGRect("controls", "udgborder", 844, 351, 24 * 8, 24 * 8, "none", "black", "visible", "crispEdges");

  // udg graphics array
  for(let i = 0; i < 21; i++){
    for(let j = 0; j < 8; j++){
      for(let k = 0; k < 8; k++){
        let id = "udgpixel" + pad(i, 2) + j + k;
        drawSVGRect("controls", id, 10 + (i * 30) + (k * 3), 660 + (j * 3), 3, 3, "rgb(206,203,206)", "none", "visible", "crispEdges");
        document.getElementById(id).addEventListener("click", function() {state.udgPixelClick(id, i + 28 + 28 + 28 + 28, i, 0)});
      }
    }
  }
  // character set array
  for(let i = 0; i < 28; i++){
    for(let j = 0; j < 8; j++){
      for(let k = 0; k < 8; k++){
        let id = "charsetpixel" + pad(i, 2) + j + k;
        drawSVGRect("controls", id, 10 + (i * 30) + (k * 3), 690 + (j * 3), 3, 3, "rgb(206,203,206)", "none", "visible", "crispEdges");
        document.getElementById(id).addEventListener("click", function() {state.charsetPixelClick(id, i, i, 1)});
      }
    }
  }
  for(let i = 0; i < 28; i++){
    for(let j = 0; j < 8; j++){
      for(let k = 0; k < 8; k++){
        let id = "charsetpixel" + pad(i + 28, 2) + j + k;
        drawSVGRect("controls", id, 10 + (i * 30) + (k * 3), 720 + (j * 3), 3, 3, "rgb(206,203,206)", "none", "visible", "crispEdges");
        document.getElementById(id).addEventListener("click", function() {state.charsetPixelClick(id, i + 28, i, 2)});
      }
    }
  }
  for(let i = 0; i < 28; i++){
    for(let j = 0; j < 8; j++){
      for(let k = 0; k < 8; k++){
        let id = "charsetpixel" + pad(i + 28 + 28, 2) + j + k;
        drawSVGRect("controls", id, 10 + (i * 30) + (k * 3), 750 + (j * 3), 3, 3, "rgb(206,203,206)", "none", "visible", "crispEdges");
        document.getElementById(id).addEventListener("click", function() {state.charsetPixelClick(id, i + 28 + 28, i, 3)});
      }
    }
  }
  for(let i = 0; i < 28; i++){
    for(let j = 0; j < 8; j++){
      for(let k = 0; k < 8; k++){
        let id = "charsetpixel" + pad(i + 28 + 28 + 28, 2) + j + k;
        drawSVGRect("controls", id, 10 + (i * 30) + (k * 3), 780 + (j * 3), 3, 3, "rgb(206,203,206)", "none", "visible", "crispEdges");
        document.getElementById(id).addEventListener("click", function() {state.charsetPixelClick(id, i + 28 + 28 + 28, i, 4)});
      }
    }
  }
  // udg none selected
  document.getElementById("noneselectedon").addEventListener("click", function() {state.udgNoneClick()});
  document.getElementById("noneselectedoff").addEventListener("click", function() {state.udgNoneClick()});
  document.getElementById("noneselectedtext").addEventListener("click", function() {state.udgNoneClick()});

  // fetch
  document.getElementById("fetch").addEventListener("click", function() {state.fetchClick()});
  document.getElementById("fetchtext").addEventListener("click", function() {state.fetchClick()});

  // store
  document.getElementById("store").addEventListener("click", function() {state.storeClick()});
  document.getElementById("storetext").addEventListener("click", function() {state.storeClick()});

  // clear screen
  document.getElementById("clearscreen").addEventListener("click", function() {state.screenClearClick()});
  document.getElementById("clearscreentext").addEventListener("click", function() {state.screenClearClick()});

  // clear characterset including UDGsn
  document.getElementById("clearchars").addEventListener("click", function() {state.clearCharsetClick()});
  document.getElementById("clearcharstext").addEventListener("click", function() {state.clearCharsetClick()});

  // export
  document.getElementById("export1").addEventListener("click", function() {state.exportClick(1)});
  document.getElementById("export1text").addEventListener("click", function() {state.exportClick(1)});
  document.getElementById("export2").addEventListener("click", function() {state.exportClick(2)});
  document.getElementById("export2text").addEventListener("click", function() {state.exportClick(2)});

  // import
  document.getElementById("import1").addEventListener("click", function() {state.importClick(1)});
  document.getElementById("import1text").addEventListener("click", function() {state.importClick(1)});
  document.getElementById("import2").addEventListener("click", function() {state.importClick(2)});
  document.getElementById("import2text").addEventListener("click", function() {state.importClick(2)});

  // output
  document.getElementById("outputudg").addEventListener("click", function() {state.outputUDGsClick(1)});
  document.getElementById("outputudgtext").addEventListener("click", function() {state.outputUDGsClick(1)});
  document.getElementById("outputcharset").addEventListener("click", function() {state.outputCharsClick(1)});
  document.getElementById("outputcharsettext").addEventListener("click", function() {state.outputCharsClick(1)});
  document.getElementById("outputscreen").addEventListener("click", function() {state.outputScreenClick(1)});
  document.getElementById("outputscreentext").addEventListener("click", function() {state.outputScreenClick(1)});

  // ink
  document.getElementById("ink0").addEventListener("click", function() {state.setInk(0)});
  document.getElementById("ink1").addEventListener("click", function() {state.setInk(1)});
  document.getElementById("ink2").addEventListener("click", function() {state.setInk(2)});
  document.getElementById("ink3").addEventListener("click", function() {state.setInk(3)});
  document.getElementById("ink4").addEventListener("click", function() {state.setInk(4)});
  document.getElementById("ink5").addEventListener("click", function() {state.setInk(5)});
  document.getElementById("ink6").addEventListener("click", function() {state.setInk(6)});
  document.getElementById("ink7").addEventListener("click", function() {state.setInk(7)});
  document.getElementById("ink8").addEventListener("click", function() {state.setInk(8)});
  // paper
  document.getElementById("paper0").addEventListener("click", function() {state.setPaper(0)});
  document.getElementById("paper1").addEventListener("click", function() {state.setPaper(1)});
  document.getElementById("paper2").addEventListener("click", function() {state.setPaper(2)});
  document.getElementById("paper3").addEventListener("click", function() {state.setPaper(3)});
  document.getElementById("paper4").addEventListener("click", function() {state.setPaper(4)});
  document.getElementById("paper5").addEventListener("click", function() {state.setPaper(5)});
  document.getElementById("paper6").addEventListener("click", function() {state.setPaper(6)});
  document.getElementById("paper7").addEventListener("click", function() {state.setPaper(7)});
  document.getElementById("paper8").addEventListener("click", function() {state.setPaper(8)});
  // border
  document.getElementById("border0").addEventListener("click", function() {state.setBorder(0)});
  document.getElementById("border1").addEventListener("click", function() {state.setBorder(1)});
  document.getElementById("border2").addEventListener("click", function() {state.setBorder(2)});
  document.getElementById("border3").addEventListener("click", function() {state.setBorder(3)});
  document.getElementById("border4").addEventListener("click", function() {state.setBorder(4)});
  document.getElementById("border5").addEventListener("click", function() {state.setBorder(5)});
  document.getElementById("border6").addEventListener("click", function() {state.setBorder(6)});
  document.getElementById("border7").addEventListener("click", function() {state.setBorder(7)});
  // help link
  document.getElementById("help").addEventListener("click", function() {showHelp()});
  // screen options
  document.getElementById("charactergrid").addEventListener("click", function() {state.toggleCharacterGrid()});
  document.getElementById("bordermarkercontrol").addEventListener("click", function() {state.toggleBorderMarker()});
  // screen mouse hover
  document.getElementById("screen").addEventListener("mousemove", function(event) {state.screenMouseHover(event)});
  document.getElementById("screen").addEventListener("mouseout", function() {state.screenMouseLeave()});
  // bright
  document.getElementById("bright").addEventListener("click", function() {state.toggleBright()});
  // flash
  document.getElementById("flash").addEventListener("click", function() {state.toggleFlash()});
  document.getElementById("flashing").addEventListener("click", function() {state.flashToggle()});
  document.getElementById("flashing").addEventListener("mouseout", function() {state.flashOff()});
  // erase
  document.getElementById("erase").addEventListener("click", function() {state.toggleErase()});
  // import character file
  document.getElementById("getjsonfile1").addEventListener("change", function() {
    var file_to_read = document.getElementById("getjsonfile1").files[0];
    var fileread = new FileReader();
    fileread.onload = function(e) {
      var allContent = JSON.parse(e.target.result);
      if(allContent[0] == "zxcharset"){
        state.characterSet = allContent[1];
        for(let i = 0; i < 21; i++){
          state.drawCharacter(i + 144, "udg", i);
        }
        for(let i = 0; i < 112; i++){
          state.drawCharacter(i + 32, "charset", i);
        }
        state.drawAllScreen();
      }
    };
    fileread.readAsText(file_to_read);
  });
  // import screen file
  document.getElementById("getjsonfile2").addEventListener("change", function() {
    var file_to_read = document.getElementById("getjsonfile2").files[0];
    var fileread = new FileReader();
    fileread.onload = function(e) {
      var allContent = JSON.parse(e.target.result);
      if(allContent[0] == "zxscreen"){
        state.setBorder(allContent[1]);
        state.screenData = allContent[2];
        state.drawAllScreen();
      }
    };
    fileread.readAsText(file_to_read);
  });

  state.characterSet = loadCharacterSet();

  // set up application
  if(localStorage.getItem("ZXSC-flash") != null){
    if(parseInt(localStorage.getItem("ZXSC-flash")) == 1){
      state.setFlash(parseInt(localStorage.getItem("ZXSC-flash")));
    }
  }

  if(localStorage.getItem("ZXSC-bright") != null){
    if(parseInt(localStorage.getItem("ZXSC-bright")) == 1){
      state.setBright(parseInt(localStorage.getItem("ZXSC-bright")));
    }
  }

  if(localStorage.getItem("ZXSC-paper") != null){
    state.setPaper(parseInt(localStorage.getItem("ZXSC-paper")));
  }
  else{
    state.setPaper(7);
  }

  if(localStorage.getItem("ZXSC-ink") != null){
    state.setInk(parseInt(localStorage.getItem("ZXSC-ink")));
  }
  else{
    state.setInk(0);
  }

  if(localStorage.getItem("ZXSC-border") != null){
    state.setBorder(parseInt(localStorage.getItem("ZXSC-border")));
  }
  else{
    state.setBorder(7);
  }

  if(localStorage.getItem("ZXSC-charset") != null){
    state.characterSet = JSON.parse(localStorage.getItem("ZXSC-charset"));
  }

  state.udgNoneClick();
  
  if(localStorage.getItem("ZXSC-screen") != null){
    state.screenData = JSON.parse(localStorage.getItem("ZXSC-screen"));
    state.drawAllScreen();
  }
  else{
    state.screenClearClick();
  }

  state.drawCharSet();
}

