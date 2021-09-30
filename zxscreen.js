var svgns = "http://www.w3.org/2000/svg";
var svglink = "http://www.w3.org/1999/xlink";

var colours = ["rgb(0,0,0)", "rgb(0,0,206)", "rgb(206,0,0)", "rgb(206,0,206)", "rgb(0,203,0)", "rgb(0,203,206)", "rgb(206,203,0)", "rgb(206,203,206)",
  "rgb(0,0,0)", "rgb(0,0,255)", "rgb(255,0,0)", "rgb(255,0,255)", "rgb(0,255,0)", "rgb(0,251,251)", "rgb(255,251,0)", "rgb(255,251,255)",
  "darkorange"];
// 0 - 7 spectrum colours, 8 - 15 spectrum bright colours, 16 highlight colour

var flasher = setInterval(toggleFlashPixels, 320);

var state = {
  ink:             0,
  paper:           0,
  border:          0,
  bright:          0,
  flash:           0,
  flashing:        0,
  erase:           0,

  characterGrid:   0,
  borderMarker:    0,
  
  characterSet:    [],
  characterMarker: 0,
  udgEditArea:     [],
  
  screenData:      [],

  setInk: function(i){
    if(i >= 0 && i <= 8 && i != this.ink){
      this.ink = i;
      this.moveInkMarker();
      this.setEditPixelColours();
      localStorage.setItem("ZXSC-ink", this.ink);
    }
  },
  moveInkMarker: function(){
    let y = this.ink * 30;
    let e = document.getElementById("inkarrow");
    e.setAttribute("transform", "translate(0," + y + ")");
  },

  setPaper: function(i){
    if(i >= 0 && i <= 8 && i != this.paper){
      this.paper = i;
      this.movePaperMarker();
      this.setEditPixelColours();
      localStorage.setItem("ZXSC-paper", this.paper);
    }
  },
  movePaperMarker: function(){
    let y = this.paper * 30;
    let e = document.getElementById("paperarrow");
    e.setAttribute("transform", "translate(0," + y + ")");
  },
  
  setBorder: function(i){
    if(i >= 0 && i <= 7 && i != this.border){
      this.border = i;
      this.moveBorderMarker();
      this.drawBorder();
      if(this.borderMarker == 1) this.showBorderMarker();
      localStorage.setItem("ZXSC-border", this.border);
    }
  },
  moveBorderMarker: function(){
    let y = this.border * 30;
    let e = document.getElementById("borderarrow");
    e.setAttribute("transform", "translate(0," + y + ")");
  },
  drawBorder: function(){
    let colour = colours[this.border];
    document.getElementById("screenbordertop").style.fill = colour;
    document.getElementById("screenborderbottom").style.fill = colour;
    document.getElementById("screenborderleft").style.fill = colour;
    document.getElementById("screenborderright").style.fill = colour;
  },

  toggleCharacterGrid: function(){
    let e = document.getElementById("charactergrid");
    if(this.characterGrid == 0){
      e.style.fill = colours[16];
      this.characterGrid = 1;
      this.showCharacterGrid();
    }
    else{
      e.style.fill = "white";
      this.characterGrid = 0;
      this.hideCharacterGrid();
    }
  },

  toggleBorderMarker: function(){
    let e = document.getElementById("bordermarkercontrol");
    if(this.borderMarker == 0){
      e.style.fill = colours[16];
      this.borderMarker = 1;
      this.showBorderMarker();
    }
    else{
      e.style.fill = "white";
      this.borderMarker = 0;
      this.hideBorderMarker();
    }
  },

  setBright: function(){
    if(this.bright == 0){
      this.toggleBright();
    }
  },

  toggleBright: function(){
    let e = document.getElementById("bright");
    if(this.bright == 0){
      e.style.fill = colours[16];
      this.bright = 1;
    }
    else{
      e.style.fill = "white";
      this.bright = 0;
    }
    localStorage.setItem("ZXSC-bright", this.bright);
  },

  setFlash: function(){
    if(this.flash == 0){
      this.toggleFlash();
    }
  },

  toggleFlash: function(){
    let e = document.getElementById("flash");
    if(this.flash == 0){
      e.style.fill = colours[16];
      this.flash = 1;
    }
    else{
      e.style.fill = "white";
      this.flash = 0;
    }
    localStorage.setItem("ZXSC-flash", this.flash);
  },

  toggleErase: function(){
    let e = document.getElementById("erase");
    if(this.erase == 0){
      e.style.fill = colours[16];
      this.erase = 1;
    }
    else{
      e.style.fill = "white";
      this.erase = 0;
    }
  },

  showCharacterGrid: function(){
    for(let i = 0; i <= 32; i++){
      let id = "linevertical" + pad(i, 3) + "a";        
      document.getElementById(id).setAttribute("visibility", "visible");
      id = "linevertical" + pad(i, 3) + "b";        
      document.getElementById(id).setAttribute("visibility", "visible");
    }  
    for(let i = 0; i <= 24; i++){
      let id = "linehorizontal" + pad(i, 3) + "a";
      document.getElementById(id).setAttribute("visibility", "visible");
      id = "linehorizontal" + pad(i, 3) + "b";
      document.getElementById(id).setAttribute("visibility", "visible");
    }  
  },

  hideCharacterGrid: function(){
    for(let i = 0; i <= 32; i++){
      let id = "linevertical" + pad(i, 3) + "a";        
      document.getElementById(id).setAttribute("visibility", "hidden");
      id = "linevertical" + pad(i, 3) + "b";        
      document.getElementById(id).setAttribute("visibility", "hidden");
    }  
    for(let i = 0; i <= 24; i++){
      let id = "linehorizontal" + pad(i, 3) + "a";
      document.getElementById(id).setAttribute("visibility", "hidden");
      id = "linehorizontal" + pad(i, 3) + "b";
      document.getElementById(id).setAttribute("visibility", "hidden");
    }  
  },

  showBorderMarker: function(){
    let e = document.getElementById("bordermarker");
    if(this.border <= 3){
      e.setAttribute("stroke", "white");
    }
    else{
      e.setAttribute("stroke", "black");
    }
    e.setAttribute("visibility", "visible");
  },

  hideBorderMarker: function(){
    let e = document.getElementById("bordermarker");
    e.setAttribute("visibility", "hidden");
  },

  editPixelClick: function(id){
    let x = id.substr(9,1);
    let y = id.substr(10,1);
    if(this.udgEditArea[y][x] == 1){
      this.unsetEditPixel(id, x, y);
    }
    else{
      this.setEditPixel(id, x, y);
    }
  },

  setEditPixel: function(id, x, y){
    this.udgEditArea[y][x] = 1;
    let i = this.ink;
    if(i == 8) i = 0;
    document.getElementById(id).setAttribute("fill", colours[i]);
  },

  unsetEditPixel: function(id, x, y){
    this.udgEditArea[y][x] = 0;
    let p = this.paper;
    if(p == 8) p = 7;
    document.getElementById(id).setAttribute("fill", colours[p]);
  },

  setEditPixelColours: function(){
    for(let x = 0; x < 8; x++){
      for(let y = 0; y < 8; y++){
        let id = "editpixel" + x + y;
        if(this.udgEditArea[y][x] == 0){
          this.unsetEditPixel(id, x, y);
        }
        else{
          this.setEditPixel(id, x, y);
        }
      }
    }
  },

  udgPixelClick: function(id){
    document.getElementById("charactermarker").setAttribute("visibility", "visible");
    document.getElementById("noneselectedon").setAttribute("visibility", "hidden");
    document.getElementById("noneselectedoff").setAttribute("visibility", "visible");
    this.characterMarker = parseInt(id.substr(8, 2)) + 144 - 32;
    this.moveCharacterMarker((this.characterMarker - 112) * 30);
  },
  udgNoneClick: function(){
    this.characterMarker = -1;
    document.getElementById("charactermarker").setAttribute("visibility", "hidden");
    document.getElementById("noneselectedon").setAttribute("visibility", "visible");
    document.getElementById("noneselectedoff").setAttribute("visibility", "hidden");
  },
  charsetPixelClick: function(id, character, column, row){
    document.getElementById("charactermarker").setAttribute("visibility", "visible");
    document.getElementById("noneselectedon").setAttribute("visibility", "hidden");
    document.getElementById("noneselectedoff").setAttribute("visibility", "visible");
    this.characterMarker = parseInt(character);
    let x = column * 30;
    let y = row * 30;
    this.moveCharacterMarker(x, y);
  },
  moveCharacterMarker: function(x, y = 0){
    document.getElementById("charactermarker").setAttribute("transform", "translate(" + x + "," + y + ")");
  },

  drawCharSet(){
    for(let i = 0; i < 21; i++){
      state.drawCharacter(i + 144, "udg", i);
    }
    for(let i = 0; i < 112; i++){
      state.drawCharacter(i + 32, "charset", i);
    }
  },

  fetchClick: function(){
    if(this.characterMarker != -1){
      let udgNumber = parseInt(this.characterMarker);
      for(let x = 0; x < 8; x++){
        for(let y = 0; y < 8; y++){
          let pixelID = "editpixel" + x + y;
          this.udgEditArea[y][x];
          if(this.characterSet[(udgNumber * 8) + y].substr(x, 1) == '#'){
            this.setEditPixel(pixelID, x, y);
          }
          else{
            this.unsetEditPixel(pixelID, x, y);
          }
        }
      }
    }
  },

  storeClick: function(){
    if((this.characterMarker >= 0 && this.characterMarker <= 95) || this.characterMarker >= 112){
      for(let y = 0; y < 8; y++){
        let writeString = '';
        for(let x = 0; x < 8; x++){
          if(this.udgEditArea[y][x] == 1){
            writeString = writeString + '#';
          }
          else{
            writeString = writeString + ' ';
          }
        }
        this.characterSet[(this.characterMarker * 8) + y] = writeString;
      }
      if(this.characterMarker >= 112){
        this.drawCharacter(this.characterMarker + 32, "udg", this.characterMarker - 144 + 32);
      }
      else{
        this.drawCharacter(this.characterMarker + 32, "charset", this.characterMarker);
      }
      localStorage.setItem("ZXSC-charset", JSON.stringify(this.characterSet, null, 2));

      for(let cx = 0; cx < 32; cx++){
        for(let cy = 0; cy < 24; cy++){
          let sc = cy * 32 + cx;

          if(this.screenData[sc][0] == this.characterMarker + 32){
            let px = cx * 8; // top left pixel of character square
            let py = cy * 8;
            let characterID = this.screenData[sc][0] - 32;

            for(let i = 0; i < 8; i++){
              for(let j = 0; j < 8; j++){
                
                let c = colours[this.screenData[sc][2] + (this.screenData[sc][3] * 8)]
                if(this.characterSet[(characterID * 8) + j].substr(i, 1) == '#'){
                  c = colours[this.screenData[sc][1] + (this.screenData[sc][3] * 8)]
                }
                let spx = px + i;
                let spy = py + j;
                document.getElementById("screenpixel" + pad(spx, 3) + pad(spy, 3)).setAttribute("fill", c);
              }
            }
          }
        }
      }
    }
  },

  screenMouseHover: function(event){
    let cx = Math.floor((event.offsetX - 20) / 24); // convert screen pixels to spectrum character squares
    let cy = Math.floor((event.offsetY - 20) / 24);

    if(cx >= 0 && cx <= 31 && cy >= 0 && cy <= 23){
      let c = document.getElementById("characterposition");
      c.textContent = "[" + cx + "," + cy + "]";
      let sc = cy * 32 + cx;
      let a = "[" + pad(this.screenData[sc][0], 3) + " ";
      a = a + this.screenData[sc][1] + " ";
      a = a + this.screenData[sc][2] + " ";
      a = a + this.screenData[sc][3] + " ";
      a = a + this.screenData[sc][4] + "]";
      document.getElementById("characterattributes").textContent = a; 
    }
    else{
      document.getElementById("characterposition").textContent = "[-,-]";
    }
  },

  screenMouseLeave: function(){
    document.getElementById("characterattributes").textContent = "[--- - - - -]";
    document.getElementById("characterposition").textContent = "[-,-]";
  },

  drawCharacter: function(character, location, x = 0, y = 0){
    // character is spectrum character set number e.g. 32 for space or 144 for 1st UDG
    // location is zone of click, screen, udg, characterset 
    // x and y are spectrum screen pixel coordinates (255 x 191)
    let cx = Math.floor(x / 8); // convert screen pixels to spectrum character squares
    let cy = Math.floor(y / 8);
    let sc = cy * 32 + cx;
    let px = cx * 8; // top left pixel of character square
    let py = cy * 8;
    let characterID = character - 32;

    if(location == "screen"){
      for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
          let c = colours[this.paper + (this.bright * 8)];
          if(this.paper == 8) c = colours[this.screenData[sc][2] + (this.screenData[sc][3] * 8)];
          if(this.characterMarker > -1){
            if(this.characterSet[(characterID * 8) + j].substr(i, 1) == '#'){
              c = colours[this.ink + (this.bright * 8)];
              if(this.ink == 8) c = colours[this.screenData[sc][1] + (this.screenData[sc][3] * 8)];
            }
          }
          else{
            if(this.characterSet[((this.screenData[sc][0] - 32) * 8) + j].substr(i, 1) == '#'){
              c = colours[this.ink + (this.bright * 8)];
              if(this.ink == 8) c = colours[this.screenData[sc][1] + (this.screenData[sc][3] * 8)];
            }
          }
          let spx = px + i;
          let spy = py + j;
          document.getElementById("screenpixel" + pad(spx, 3) + pad(spy, 3)).setAttribute("fill", c);
        }
      }
      if(this.characterMarker > -1) this.screenData[sc][0] = parseInt(characterID) + 32;
      if(this.ink < 8) this.screenData[sc][1] = this.ink;
      if(this.paper < 8) this.screenData[sc][2] = this.paper;
      this.screenData[sc][3] = this.bright;
      this.screenData[sc][4] = this.flash;
    }
    
    if(location == "erase"){
      let sa = Math.floor(y / 8) * 256 + Math.floor(x / 8);
      for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
          let c = colours[this.paper + (this.bright * 8)];
          if(this.paper == 8) c = colours[this.screenData[sc][2] + (this.screenData[sc][3] * 8)];
          let spx = px + i;
          let spy = py + j;
          document.getElementById("screenpixel" + pad(spx, 3) + pad(spy, 3)).setAttribute("fill", c);
        }
      }
      this.screenData[sc][0] = 32;
      if(this.ink < 8) this.screenData[sc][1] = this.ink;
      if(this.paper < 8) this.screenData[sc][2] = this.paper;
      this.screenData[sc][3] = this.bright;
      this.screenData[sc][4] = this.flash;
    }

    if(location == "udg" || location == "charset"){
      for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
          let c = "rgb(206,203,206)";
          if(this.characterSet[(characterID * 8) + j].substr(i, 1) == '#'){
            c = "black";
          }
          if(location == "udg"){
            document.getElementById("udgpixel" + pad(x, 2) + j + i).setAttribute("fill", c);
          }
          else{
            document.getElementById("charsetpixel" + pad(x, 2) + j + i).setAttribute("fill", c);
          }
        }
      }
    }
  },

  screenPixelClick: function(id, x, y){
    let location = this.erase == 0 ? "screen" : "erase";
    this.drawCharacter(this.characterMarker + 32, location, x, y);
    localStorage.setItem("ZXSC-screen", JSON.stringify(this.screenData, null, 2));
  },

  screenClearClick: function(){
    let c = colours[this.paper + (this.bright * 8)];
    for(let x = 0; x < 256; x++){
      for(let y = 0; y < 192; y++){
        document.getElementById("screenpixel" + pad(x, 3) + pad(y, 3)).setAttribute("fill", c);
      }
    }
    for(let i = 0; i < 768; i++){
      this.screenData[i][0] = 32;
      this.screenData[i][1] = this.ink;
      this.screenData[i][2] = this.paper;
      this.screenData[i][3] = this.bright;
      this.screenData[i][4] = this.flash;
    }
  },

  clearCharsetClick: function(){
    this.characterSet = loadCharacterSet();
    this.drawCharSet();
    this.drawAllScreen();
  },

  exportClick: function(dataset){
    const a = document.createElement("a");
    if(dataset == 1){
      let exportData = ["zxcharset", this.characterSet];
      a.href = URL.createObjectURL(new Blob([JSON.stringify(exportData, null, 2)], {
        type: "text/plain"
      }));
      a.setAttribute("download", "zxcharsetdata.json");
    }
    if(dataset == 2){
      let exportData = ["zxscreen", this.border, this.screenData];
      a.href = URL.createObjectURL(new Blob([JSON.stringify(exportData, null, 2)], {
        type: "text/plain"
      }));
      a.setAttribute("download", "zxscreendata.json");
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  importClick: function(dataset){
    if(dataset == 1){
      document.getElementById("getjsonfile1").click();
    }
    else{
      document.getElementById("getjsonfile2").click();
    }
  },

  outputCharsClick: function(){
    let charSetCompare = loadCharacterSet();
    let o = document.getElementById("outputtext");
    o.innerHTML = '';

    o.innerHTML = o.innerHTML + '1000 LET ramtop=PEEK 23730+256*PEEK 23731\n';
    o.innerHTML = o.innerHTML + '1001 CLEAR ramtop-768\n';
    o.innerHTML = o.innerHTML + '1002 LET ramtop=PEEK 23730+256*PEEK 23731\n';
    o.innerHTML = o.innerHTML + '1003 LET chars=ramtop+1-256\n';
    o.innerHTML = o.innerHTML + '1004 POKE 23606,chars-256*INT (chars/256)\n';
    o.innerHTML = o.innerHTML + '1005 POKE 23607,INT (chars/256)\n';
    o.innerHTML = o.innerHTML + '1006 FOR i=1 TO 768\n';
    o.innerHTML = o.innerHTML + '1007 POKE ramtop+i,PEEK (15615+i)\n';
    o.innerHTML = o.innerHTML + '1008 NEXT i\n';
    let line = 1010;
    for(let c = 32; c < 165; c++){
      for(let row = 0; row < 8; row++){
        let s = '';
        let t = '';
        for(let pixel = 0; pixel < 8; pixel++){
          if(this.characterSet[((c - 32) * 8) + row].substr(pixel, 1) == '#'){
            s = s + '1';
          }
          else{
            s = s + '0';
          }
          if(charSetCompare[((c - 32) * 8) + row].substr(pixel, 1) == '#'){
            t = t + '1';
          }
          else{
            t = t + '0';
          }
        }
        if(s != t){
          let char = c;
          if(char > 143) char = char - 16;
          o.innerHTML += line++ + ' POKE chars+' + ((char * 8) + row) + ',BIN ' + s + '\n';
        }
      }
    }
  },

  outputUDGsClick: function(){
    let charSetCompare = loadCharacterSet();
    let o = document.getElementById("outputtext");
    o.innerHTML = '';
    let line = 2000;
    for(let c = 144; c < 165; c++){
      for(let row = 0; row < 8; row++){
        let s = '';
        let t = '';
        for(let pixel = 0; pixel < 8; pixel++){
          if(this.characterSet[((c - 32) * 8) + row].substr(pixel, 1) == '#'){
            s = s + '1';
          }
          else{
            s = s + '0';
          }
          if(charSetCompare[((c - 32) * 8) + row].substr(pixel, 1) == '#'){
            t = t + '1';
          }
          else{
            t = t + '0';
          }
        }
        if(s != t){
          o.innerHTML += line++ + ' POKE USR"' + String.fromCharCode(65 + c - 144) + '"+'+ row + ',BIN ' + s + '\n';
        }
      }
    }
  },

  outputScreenClick: function(){
    // get most common paper ink combination
    let counters = [];
    for(let i = 0; i < 128; i++) counters.push(0);
    for(let row = 0; row < 22; row++){
      for(let column = 0; column < 32; column++){
        let sc = row * 32 + column;
        counters[(this.screenData[sc][2] + (this.screenData[sc][1] * 8)) * (this.screenData[sc][3] + 1)]++;
      }
    }
    let mostCommon = 0;
    for(let i = 0; i < 128; i++){
      if(counters[i] > counters[mostCommon]) mostCommon = i;
    }
    let defaultBright = 0;
    if(mostCommon > 63){
      defaultBright = 1;
      mostCommon -= 64;
    }
    let defaultInk = Math.floor(mostCommon / 8);
    let defaultPaper = mostCommon - (defaultInk * 8);

    let o = document.getElementById("outputtext");
    o.innerHTML = '3000 BORDER ' + this.border + '\n';
    o.innerHTML += '3001 PAPER ' + defaultPaper + ':INK ' + defaultInk + ':BRIGHT ' + defaultBright + ':CLS\n'; 
    let line = 3002;
    let inQuotes = false;
    let lineText = '';
    let atRow = -1;
    let atColumn = -1;
    for(let row = 0; row < 22; row++){
      for(let column = 0; column < 32; column++){
        let sc = row * 32 + column;
        if(this.screenData[sc][0] != 32){
          if(atRow < 0) atRow = row;
          if(atColumn < 0) atColumn = column;
          if(this.screenData[sc][0] < 128){
            if(!inQuotes){
              lineText += ';"';
              inQuotes = true;
            }
            if(this.screenData[sc][0] == 96 || this.screenData[sc][0] == 127){
              if(this.screenData[sc][0] == 96) lineText = lineText + "£";
              if(this.screenData[sc][0] == 127) lineText = lineText + "©";
            }
            else{
              lineText += String.fromCharCode(this.screenData[sc][0]);
            }
          }
          else{
            if(inQuotes) lineText += '"';
            inQuotes = false;
            lineText += ';CHR$ ' + this.screenData[sc][0];
          }
        }
        else{
          if(lineText != ''){
            if(inQuotes) lineText += '"';
            inQuotes = false;
            o.innerHTML += line++ + ' PRINT AT ' + atRow + ','+ atColumn + lineText + '\n'; 
            lineText = '';
            atRow = -1;
            atColumn = -1;
          }
        }
      }
      if(lineText != ''){
        if(inQuotes) lineText += '"';
        inQuotes = false;
        o.innerHTML += line++ + ' PRINT AT ' + atRow + ','+ atColumn + lineText + '\n'; 
        lineText = '';
        atRow = -1;
        atColumn = -1;
      }
    }
    let counter = 0;
    lineText = '';
    for(let row = 0; row < 22; row++){
      for(let column = 0; column < 32; column++){
        let sc = row * 32 + column;
        if(this.screenData[sc][2] != defaultPaper || this.screenData[sc][1] != defaultInk || this.screenData[sc][3] != defaultBright || this.screenData[sc][4] == 1){
          let attribute = 0;
          if(this.screenData[sc][4] == 1) attribute += 128;
          if(this.screenData[sc][3] != defaultBright) attribute += 64;
          attribute += this.screenData[sc][2] * 8;
          attribute += this.screenData[sc][1];
          lineText += ':POKE ' + (22528 + sc) + ',' + attribute;
          counter++;
          if(counter == 9){
            o.innerHTML += line++ + ' ' + lineText.substring(1) + '\n';
            lineText = '';
            counter = 0;
          }
        }
      }
    }
    if(counter > 0){
      o.innerHTML += line++ + lineText.substr(1) + '\n';
    }
  },

  flashToggle: function(){
    let e = document.getElementById("flashing");
    if(e.style.fill != colours[16]){
      e.style.fill = colours[16];
      this.flashing = 1;
    }
    else{
      e.style.fill = "white";
      this.flashing = 0;
      stopFlasher();
    }
  },

  flashOff: function(){
    let e = document.getElementById("flashing");
    e.style.fill = "white";
    this.flashing = 0;
    stopFlasher();
  },

  drawAllScreen: function(){
    for(let cx = 0; cx < 32; cx++){
      for(let cy = 0; cy < 24; cy++){
    
        let sc = cy * 32 + cx;
        let px = cx * 8; // top left pixel of character square
        let py = cy * 8;
        let characterID = state.screenData[sc][0] - 32;

        for(let i = 0; i < 8; i++){
          for(let j = 0; j < 8; j++){
            let c = colours[state.screenData[sc][2] + state.screenData[sc][3] * 8];
            if(state.characterSet[(characterID * 8) + j].substr(i, 1) == '#'){
              c = colours[state.screenData[sc][1] + state.screenData[sc][3] * 8];
            }
            let spx = px + i;
            let spy = py + j;
            document.getElementById("screenpixel" + pad(spx, 3) + pad(spy, 3)).setAttribute("fill", c);
          }
        }
      }
    }
  }
}

function stopFlasher(){
  // write normal characters
  for(let cx = 0; cx < 32; cx++){
    for(let cy = 0; cy < 24; cy++){
      let sc = cy * 32 + cx;
      if(state.screenData[sc][4] == 1){
        let px = cx * 8;
        let py = cy * 8;
        for(let x = 0; x < 8; x++){
          for(let y = 0; y < 8; y++){
            let c = colours[state.screenData[sc][2] + (state.screenData[sc][3] * 8)];
            if(state.characterSet[((state.screenData[sc][0] - 32) * 8) + y].substr(x, 1) == '#'){
                c = colours[state.screenData[sc][1] + (state.screenData[sc][3] * 8)];
            }
            let spx = px + x;
            let spy = py + y;
            document.getElementById("screenpixel" + pad(spx, 3) + pad(spy, 3)).setAttribute("fill", c);
          }
        }
      }
    }
  }
}

function toggleFlashPixels(){
  if(state.flashing > 0){
    for(let cx = 0; cx < 32; cx++){
      for(let cy = 0; cy < 24; cy++){
        let sc = cy * 32 + cx;
        if(state.screenData[sc][4] == 1){
          let px = cx * 8;
          let py = cy * 8;
          for(let x = 0; x < 8; x++){
            for(let y = 0; y < 8; y++){
              let c = colours[state.screenData[sc][0 + state.flashing] + (state.screenData[sc][3] * 8)];
              if(state.characterSet[((state.screenData[sc][0] - 32) * 8) + y].substr(x, 1) == '#'){
                  c = colours[state.screenData[sc][3 - state.flashing] + (state.screenData[sc][3] * 8)];
              }
              let spx = px + x;
              let spy = py + y;
              document.getElementById("screenpixel" + pad(spx, 3) + pad(spy, 3)).setAttribute("fill", c);
            }
          }
        }
      }
    }
    if(state.flashing == 1){
      state.flashing = 2;
    }
    else{
      state.flashing = 1;
    }
  }
}

function showHelp(){
  window.open("help.html", "_blank").focus();
}

function drawSVGRect(svgid, id, x, y, w, h, fill, stroke, visibility, rendering = "auto"){
  var r = document.createElementNS(svgns, "rect");
  r.setAttributeNS(null, "id", id);
  r.setAttributeNS(null, "x", x);
  r.setAttributeNS(null, "y", y);
  r.setAttributeNS(null, "width", w);
  r.setAttributeNS(null, "height", h);
  r.setAttributeNS(null, "fill", fill);
  r.setAttributeNS(null, "stroke", stroke);
  r.setAttributeNS(null, "stroke-width", 1);
  r.setAttributeNS(null, "visibility", visibility);
  r.setAttributeNS(null, "shape-rendering", rendering);
  document.getElementById(svgid).appendChild(r);
}

function drawSVGLine(id, x1, y1, x2, y2){
  var l1 = document.createElementNS(svgns, "line");
  l1.setAttributeNS(null, "id", id + "a");
  l1.setAttributeNS(null, "x1", x1);
  l1.setAttributeNS(null, "y1", y1);
  l1.setAttributeNS(null, "x2", x2);
  l1.setAttributeNS(null, "y2", y2);
  l1.setAttributeNS(null, "stroke", "lightgrey");
  l1.setAttributeNS(null, "stroke-width", 1);
  l1.setAttributeNS(null, "visibility", "hidden");
  l1.setAttributeNS(null, "shape-rendering", "crispEdges");
  document.getElementById("screen").appendChild(l1);
  var l2 = document.createElementNS(svgns, "line");
  l2.setAttributeNS(null, "id", id + "b");
  l2.setAttributeNS(null, "x1", x1);
  l2.setAttributeNS(null, "y1", y1);
  l2.setAttributeNS(null, "x2", x2);
  l2.setAttributeNS(null, "y2", y2);
  l2.setAttributeNS(null, "stroke", "darkgrey");
  l2.setAttributeNS(null, "stroke-dasharray", "6,12,6,0")
  l2.setAttributeNS(null, "stroke-width", 1);
  l2.setAttributeNS(null, "visibility", "hidden");
  l2.setAttributeNS(null, "shape-rendering", "crispEdges");
  document.getElementById("screen").appendChild(l2);
}

function pad(number, places){
  return String(number).padStart(places, "0");
}
