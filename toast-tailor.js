var library = [];
var overlayLibrary = [];
var currpiece = {};


var toastyArray = ["https://files.tivolicloud.com/hanieh/toast-smaller.gltf", "https://files.tivolicloud.com/hanieh/toast-smaller-mediumdark.gltf", "https://files.tivolicloud.com/hanieh/toast-smaller-burnt.gltf"];
// class EvolutionaryAlgorithm {
function startEA(pop_size) {
    pop = [];
    var i = 0;
    for (i = 0; i < pop_size; i++) {
        pop.push(make_clothes());
    }

    return pop;
};

function max(array) {
    var num = Math.max.apply(Math, array);
    return num;
};



function crossover_dresses(parents) {
    var structure = Object.keys(parents[0]);
    var child = make_clothes();
    var idx;
    for (idx in structure) {
        var part = structure[idx];
        var parts = [];
        var p;
        for (p in parents) {
            parts.push(parents[p][part]);
        }
        child[part] = choose(parts);
    }
    return child;
};

function mutate_dress(outfit) {
    // at random will regenerate a section of the outfit

    var values = {
        "head": [0, 0.2, "head"],
        "spine2": [0.2, 0.3, "spine2"],
        "spine1": [0.2, 0.3, "spine1"],
        "spine": [0.2, 0.3, "spine"],
        "hips": [0.2, 0.3, "hips"],
        "leftupleg": [0, 0.2, "leftupleg"],
        "leftleg": [0, 0.2, "leftleg"],
        "leftfoot": [0, 0.1, "leftfoot"]

    };

    var structure = Object.keys(outfit);
    var part;
    // console.log(structure);
    for (id in structure) {
        part = structure[id];
        console.log(part, "---=1-2=-1=2=-=")
        if (Math.random() < 0.3){
            outfit[part] = solid_ring(values[part][0], values[part][1], values[part][2]);
        }
    }
    return outfit;
}


function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
};


function make_ring_toast(rx, ry, range, i) {

    var angleIncrement = 2 * Math.PI / range;

    var toast = {};


    toast.x = rx * Math.cos((angleIncrement * i));
    toast.y = 0;
    toast.z = rx * Math.sin((angleIncrement * i));
    toast.rx = 0;
    toast.ry = Math.sin((angleIncrement * i));
    toast.rz = 0;

    return toast;
};

function random_ring(min_rad, max_rad, min_toasts, max_toasts){
    var num_toasts = Math.floor(Math.random() * max_toasts) + min_toasts;
    var radiusX = (Math.random() * max_rad) + min_rad;
    var radiusY = (Math.random() * max_rad) + min_rad;
    var pis = (2*Math.PI)/num_toasts;
    var poses = []
    console.log(num_toasts);
    for(var i=0; i < num_toasts; i++)
    {
        var t = i*pis;
        var x = radiusX * Math.sin(t) + Math.random();
        var z = radiusY * Math.cos(t) + Math.random();
        poses.push([ x, Math.random, z]);
    }
    return poses;
}



function solid_ring(min_num, max_num, part) {
    var piece = [];
    var radiusX = (Math.random() * max_num) + min_num;
    var radiusY = Math.floor((Math.random() * max_num)) + min_num;
    console.log(radiusX);
    var range = Math.ceil(5 * Math.PI * radiusX);
    console.log(range);
    var i = 0;
    for (i = 0; i < range; i++) {
        piece.push(make_ring_toast(radiusX, radiusY, range, i));
    }
    return piece;

};


function make_clothes() {
    var outfit = {
        "head": random_ring(0, 0.2, 0, 4),
        "spine2": random_ring(0.2, 0.3, 3, 10),
        "spine1": random_ring(0.2, 0.3, 3, 10),
        "spine": random_ring(0.2, 0.3, 3,10),
        "hips": random_ring(0.2, 0.3, 2, 8),
        "leftupleg": random_ring(0, 0.2, 4, 8),
        "leftleg": random_ring(0, 0.2, 2, 8),
        "leftfoot": random_ring(0, 0.1, 0, 4)
    };
    return outfit;
};

function clearAttachments(){
    var attachments = MyAvatar.getAttachmentData();
    // for (var i = 0; i < attachments.length; i++) {
    //     MyAvatar.detachOne(attachments[i].modelURL);
    // }
    console.log(attachments);
    attachments = [];
    MyAvatar.setAttachmentData(attachments);
    console.log(MyAvatar.getAttachmentData());

}

function test() {
    var piece = make_clothes();
    // console.log(piece);

    Chat.showMessage("Starting Test");
    var pop = startEA(6);
    // console.log(pop);
    Chat.showMessage("----")
    child = crossover_dresses([pop[0], pop[1]]);
    // console.log(child);
    Chat.showMessage(child);
    Chat.showMessage("+++++");
    mutation = mutate_dress(child);
    // console.log(mutation);

    var structure = Object.keys(child);

    clearAttachments();

    currpiece = child;
    var idx;
    for (idx in structure) {
        var part = structure[idx];
        if (part == "head") {
            var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "Head",
                    translation: {"x": child[part][t].x, "y": child[part][t].y + 0.3, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);
            }
        }
        if (part == "spine2") {
            var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "Spine2",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);
            }
        }
        if (part == "spine1") {
                var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "Spine1",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

            }
        }
        if (part == "spine") {
                var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "Spine",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

            }
        }

        if (part == "hips") {
            var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "Hips",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

            }
        }
        if (part == "leftupleg") {
            var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "LeftUpLeg",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

                var toast2 = {
                    modelURL: toastyArray[toastiness],
                    jointName: "RightUpLeg",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast2.modelURL,
                    toast2.jointName,
                    toast2.translation,
                    toast2.rotation,
                    toast2.scale,
                    toast2.isSoft);

            }
        }
        if (part == "leftleg") {
                var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "LeftLeg",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

                var toast2 = {
                    modelURL: toastyArray[toastiness],
                    jointName: "RightLeg",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast2.modelURL,
                    toast2.jointName,
                    toast2.translation,
                    toast2.rotation,
                    toast2.scale,
                    toast2.isSoft);

            }
        }
        if (part == "leftfoot") {
            var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "LeftFoot",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

                var toast2 = {
                    modelURL: toastyArray[toastiness],
                    jointName: "RightFoot",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast2.modelURL,
                    toast2.jointName,
                    toast2.translation,
                    toast2.rotation,
                    toast2.scale,
                    toast2.isSoft);

            }
        }

    }

    Chat.showMessage("Done");
}




// var toolbar = Toolbars.getToolbar("com.highfidelity.interface.toolbar.system");
// icon = toolbar.addTool({
//     imageURL: "https://freesvg.org/img/1555442127.png",
//     width: 100,
//     height: 100,
//     visible:true},false);

var screenSize = Controller.getViewportDimensions();
    desktopOverlay = Overlays.addOverlay("text", {
                    text: "1",
                    width: 3 * 24,
                    height: 24,
                    x: screenSize.x/11,
                    y: 24,
                    font: { size: 24 },
                    color: {red: 50, green: 50, blue: 50},
                    alpha: 1.0,
                    backgroundAlpha: 0,
                    visible: true
                });
    overlayLibrary.push(desktopOverlay);

  desktopOverlay2 = Overlays.addOverlay("text", {
                    text: "2",
                    width: 3 * 24,
                    height: 24,
                    x: screenSize.x/11*2,
                    y: 24,
                    font: { size: 24 },
                    color: {red: 50, green: 50, blue: 50},
                    alpha: 1.0,
                    backgroundAlpha: 0,
                    visible: true
                }); 
    overlayLibrary.push(desktopOverlay2);

  desktopOverlay3 = Overlays.addOverlay("text", {
                    text: "3",
                    width: 3 * 24,
                    height: 24,
                    x: screenSize.x/11*3,
                    y: 24,
                    font: { size: 24 },
                    color: {red: 50, green: 50, blue: 50},
                    alpha: 1.0,
                    backgroundAlpha: 0,
                    visible: true
                });
    overlayLibrary.push(desktopOverlay3);

   desktopOverlay4 = Overlays.addOverlay("text", {
                    text: "4",
                    width: 3 * 24,
                    height: 24,
                    x: screenSize.x/11*4,
                    y: 24,
                    font: { size: 24 },
                    color: {red: 50, green: 50, blue: 50},
                    alpha: 1.0,
                    backgroundAlpha: 0,
                    visible: true
                });
    overlayLibrary.push(desktopOverlay4);

    desktopOverlay5 = Overlays.addOverlay("text", {
                    text: "5",
                    width: 3 * 24,
                    height: 24,
                    x: screenSize.x/11*5,
                    y: 24,
                    font: { size: 24 },
                    color: {red: 50, green: 50, blue: 50},
                    alpha: 1.0,
                    backgroundAlpha: 0,
                    visible: true
                });
    overlayLibrary.push(desktopOverlay5);

     desktopOverlay6 = Overlays.addOverlay("text", {
                    text: "6",
                    width: 3 * 24,
                    height: 24,
                    x: screenSize.x/11*6,
                    y: 24,
                    font: { size: 24 },
                    color: {red: 50, green: 50, blue: 50},
                    alpha: 1.0,
                    backgroundAlpha: 0,
                    visible: true
                });
    overlayLibrary.push(desktopOverlay6);

 desktopOverlay7 = Overlays.addOverlay("text", {
                    text: "7",
                    width: 3 * 24,
                    height: 24,
                    x: screenSize.x/11*7,
                    y: 24,
                    font: { size: 24 },
                    color: {red: 50, green: 50, blue: 50},
                    alpha: 1.0,
                    backgroundAlpha: 0,
                    visible: true
                });
    overlayLibrary.push(desktopOverlay7);

  desktopOverlay8 = Overlays.addOverlay("text", {
                    text: "8",
                    width: 3 * 24,
                    height: 24,
                    x: screenSize.x/11*8,
                    y: 24,
                    font: { size: 24 },
                    color:{red: 50, green: 50, blue: 50},
                    alpha: 1.0,
                    backgroundAlpha: 0,
                    visible: true
                });
    overlayLibrary.push(desktopOverlay8);

   desktopOverlay9 = Overlays.addOverlay("text", {
                    text: "9",
                    width: 3 * 24,
                    height: 24,
                    x: screenSize.x/11*9,
                    y: 24,
                    font: { size: 24 },
                    color: {red: 50, green: 50, blue: 50},
                    alpha: 1.0,
                    backgroundAlpha: 0,
                    visible: true
                });
    overlayLibrary.push(desktopOverlay9);

    desktopOverlay10 = Overlays.addOverlay("text", {
                    text: "0",
                    width: 3 * 24,
                    height: 24,
                    x: screenSize.x/11*10,
                    y: 24,
                    font: { size: 24 },
                    color: {red: 50, green: 50, blue: 50},
                    alpha: 1.0,
                    backgroundAlpha: 0,
                    visible: true
                });
    overlayLibrary.push(desktopOverlay10);



function wear(child){
    var structure = Object.keys(child);
    var idx;
    for (idx in structure) {
        var part = structure[idx];
        if (part == "head") {
            var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "Head",
                    translation: {"x": child[part][t].x, "y": child[part][t].y + 0.3, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);
            }
        }
        if (part == "spine2") {
            var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "Spine2",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);
            }
        }
        if (part == "spine1") {
                var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "Spine1",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

            }
        }
        if (part == "spine") {
                var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "Spine",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

            }
        }

        if (part == "hips") {
            var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "Hips",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

            }
        }
        if (part == "leftupleg") {
            var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "LeftUpLeg",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

                var toast2 = {
                    modelURL: toastyArray[toastiness],
                    jointName: "RightUpLeg",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast2.modelURL,
                    toast2.jointName,
                    toast2.translation,
                    toast2.rotation,
                    toast2.scale,
                    toast2.isSoft);

            }
        }
        if (part == "leftleg") {
                var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "LeftLeg",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

                var toast2 = {
                    modelURL: toastyArray[toastiness],
                    jointName: "RightLeg",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast2.modelURL,
                    toast2.jointName,
                    toast2.translation,
                    toast2.rotation,
                    toast2.scale,
                    toast2.isSoft);

            }
        }
        if (part == "leftfoot") {
            var toastiness = Math.floor(Math.random() * (3) );
            var t = 0;
            for (t = 0; t < child[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[toastiness],
                    jointName: "LeftFoot",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast.modelURL,
                    toast.jointName,
                    toast.translation,
                    toast.rotation,
                    toast.scale,
                    toast.isSoft);

                var toast2 = {
                    modelURL: toastyArray[toastiness],
                    jointName: "RightFoot",
                    translation: {"x": child[part][t].x, "y": child[part][t].y, "z": child[part][t].z},
                    rotation: {"x": child[part][t].rx, "y": child[part][t].ry, "z": child[part][t].rz, "w": 1},
                    scale: 0.01,
                    isSoft: false
                };
                MyAvatar.attach(toast2.modelURL,
                    toast2.jointName,
                    toast2.translation,
                    toast2.rotation,
                    toast2.scale,
                    toast2.isSoft);

            }
        }

    }
}


test();

Controller.mouseReleaseEvent.connect(function (event) {
    print(JSON.stringify(event));
    if (event.isLeftButton) {
        if (event.x > 1000) {
            console.log("KEEP");
            library.push(currpiece);
            Overlays.editOverlay(overlayLibrary[library.length-1], {
                color: { red: 255, green: 0, blue: 0 }
            });
            test();
        } else {
            console.log("DESTROY");
            test();
        }
    }
});

Controller.keyPressEvent.connect(function (event) {

    key = event.text;

    if(key == '1'){
        clearAttachments();
        wear(library[0]);
    }else if(key == '2'){
        clearAttachments();
        wear(library[1]);
    }else if(key == '3'){
        clearAttachments();
        wear(library[2]);
    }else if(key == '4'){
        clearAttachments();
        wear(library[3]);
    }else if(key == '5'){
        clearAttachments();
        wear(library[4]);
    }else if(key == '6'){
        clearAttachments();
        wear(library[5]);
    }else if(key == '7'){
        clearAttachments();
        wear(library[6]);
    }else if(key == '8'){
        clearAttachments();
        wear(library[7]);
    }else if(key == '9'){
        clearAttachments();
        wear(library[8]);
    }else if(key == '0'){
        clearAttachments();
        wear(library[9]);
    }
});
