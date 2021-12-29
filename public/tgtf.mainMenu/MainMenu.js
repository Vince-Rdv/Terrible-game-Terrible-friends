function MainMenu() {

    this.buttons = []
    //x,y,w,h,text,function,disabled
    this.buttons.push(new Button(50, 50, 300, 50, "Start game", function () { console.log("Start game") }, true))
    this.buttons.push(new Button(50, 130, 300, 50, "Options", function () { console.log("Options") }, false))
    this.buttons.push(new Button(50, 210, 300, 50, "Credits", function () { console.log("Credits") }, false))

    this.setup = function () {
        createCanvas(1920, 1080);
    }

    this.draw = function () {
        background(color(245, 243, 187));
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].show();
        }
        textSize(64)
        text("Terrible game", width / 2, height / 2)
        text("Terrible friends", width / 2, height / 2 + 64)
        textSize(16)
        text("Unreleased version", width / 2, height / 2 + 128)
        textAlign(LEFT)
        text("Buggy version", 10, height - 10)
    }

    function Button(x, y, w, h, t, f, d) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.t = t;
        this.f = f;
        this.d = d;

        this.show = function () {
            //Default colors
            fill(color(200, 159, 156))
            //Change if mouseOver
            if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
                fill(color(183, 127, 123))
            }
            //Change if disabled
            if (this.d) {
                fill(color(163, 105, 103))
            }

            stroke(255)
            strokeWeight(1)
            rect(this.x, this.y, this.w, this.h, 5, 5, 5, 5)
            textAlign(CENTER, BASELINE);
            textSize(this.h * 0.9)
            fill(0)
            stroke(0)
            strokeWeight(0)
            text(this.t, this.x + (this.w / 2), this.y + (this.h * 0.8))
        }
        this.function = function(){
            if(this.d){
                console.log("Disabled")
            }else{
                this.f();
            }
        }
    }

    //If mousePressed on buttons run function
    this.mousePressed = function() {
        for (var i = 0; i < this.buttons.length; i++) {
            if (
                mouseX > this.buttons[i].x &&
                mouseX < this.buttons[i].x + this.buttons[i].w &&
                mouseY > this.buttons[i].y &&
                mouseY < this.buttons[i].y + this.buttons[i].h
            ) {
                this.buttons[i].function();
            }
        }
    }

}