var players = [];

function setup() {
    createCanvas(1920, 1080);
    var sceneManager = new SceneManager();
    sceneManager.wire();
    sceneManager.showScene(MainMenu)

}

function draw() {
    sceneManager.draw();
}

function mousePressed() {
    sceneManager.handleEvent("mousePressed");
}