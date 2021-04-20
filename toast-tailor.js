var library = [];
var overlayLibrary = [];
var currpiece = {};
var combineList = [];

var toastyArray = ["https://files.tivolicloud.com/hanieh/toast-smaller.gltf", "https://files.tivolicloud.com/hanieh/toast-smaller-mediumdark.gltf", "https://files.tivolicloud.com/hanieh/toast-smaller-burnt.gltf", "https://files.tivolicloud.com/hanieh/toast-smaller-smaller-burnt.gltf", "https://files.tivolicloud.com/hanieh/toast-smaller-smaller.gltf", "https://files.tivolicloud.com/hanieh/toast-smaller-smaller-medium.gltf "];
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
    var toast;
    // console.log(structure);
    for (id in structure) {
        part = structure[id];
        console.log(part, "---=1-2=-1=2=-=")
        if (Math.random() < 0.2){
            outfit[part] = solid_ring(values[part][0], values[part][1], values[part][2]);
        }
        if (Math.random() < 0.8){
            for(var i=0; i<outfit[part].length; i++){
                toast = outfit[part][i];
                toast.x += Math.random()*0.001;
                toast.y += Math.random()*0.001;
                toast.z += Math.random()*0.001;
                toast.rx += Math.random()*0.05;
                toast.ry += Math.random()*0.05;
                toast.rz += Math.random()*0.05;
                toast.toastiness = Math.floor(Math.random()*toastyArray.length());
            }
        }
    }
    return outfit;
}


function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
};


function make_ring_toast(rx, ry, range, i, toastiness) {

    var angleIncrement = 2 * Math.PI / range;

    var toast = {};


    toast.x = rx * Math.cos((angleIncrement * i));
    toast.y = 0;
    toast.z = rx * Math.sin((angleIncrement * i));
    toast.rx = 0;
    toast.ry = Math.sin((angleIncrement * i));
    toast.rz = 0;
    toast.toastiness = toastiness

    return toast;
};

function random_ring(min_rad, max_rad, min_toasts, max_toasts){
    var num_toasts = Math.floor(Math.random() * max_toasts) + min_toasts;
    var radiusX = (Math.random() * max_rad) + min_rad;
    var radiusY = (Math.random() * max_rad) + min_rad;
    console.log(radiusX, radiusY)
    var pis = (4*Math.PI)/num_toasts;
    var poses = []
    console.log(num_toasts);
    var toast = {};
    for(var i=0; i < num_toasts; i++)
    {

        var t = i*pis;
        toast.x = radiusX * Math.sin(t);
        toast.y = 0;
        toast.z = radiusY * Math.cos(t);
        toast.rx = 0;
        toast.ry = Math.cos((t));
        toast.rz = 0;
        toast.toastiness = Math.floor(Math.random() * toastyArray.length());

        poses.push(toast);
    }
    return poses;
}



function solid_ring(min_num, max_num, part) {
    var currpiece = [];
    var radiusX = (Math.random() * max_num) + min_num;
    var radiusY = Math.floor((Math.random() * max_num)) + min_num;
    console.log(radiusX);
    var range = Math.ceil(5 * Math.PI * radiusX);
    console.log(range);
    var i = 0;
    var toastiness = Math.floor(Math.random() * (3) );
    for (i = 0; i < range; i++) {
        currpiece.push(make_ring_toast(radiusX, radiusY, range, i, toastiness));
    }
    return currpiece;

};


function make_clothes() {

    var values = {
        "head": [0.1, 0.2, "head"],
        "spine2": [0.2, 0.3, "spine2"],
        "spine1": [0.2, 0.3, "spine1"],
        "spine": [0.2, 0.3, "spine"],
        "hips": [0.2, 0.3, "hips"],
        "leftupleg": [0.1, 0.2, "leftupleg"],
        "leftleg": [0.1, 0.2, "leftleg"],
        "leftfoot": [0.1, 0.1, "leftfoot"]

    };

    var outfit = {}

    if (Math.random() < 0.5){
        outfit.head = solid_ring(values["head"][0], values["head"][1], values["head"][2]);
    }else{
        outfit.head = random_ring(0.2, 0.2, 0, 4);
    }

    if (Math.random() < 0.5){
        outfit.spine2 = solid_ring(values["spine2"][0], values["spine2"][1], values["spine2"][2]);
    }else{
        outfit.spine2 = random_ring(0.2, 0.3, 3, 10);
    }

    if (Math.random() < 0.5){
        outfit.spine1 = solid_ring(values["spine1"][0], values["spine1"][1], values["spine1"][2]);
    }else{
        outfit.spine1 = random_ring(0.2, 0.3, 3, 10);
    }

    if (Math.random() < 0.5){
        outfit.spine = solid_ring(values["spine"][0], values["spine"][1], values["spine"][2]);
    }else{
        outfit.spine = random_ring(0.2, 0.3, 3, 10);
    }
    if (Math.random() < 0.5){
        outfit.hips = solid_ring(values["hips"][0], values["hips"][1], values["hips"][2]);
    }else{
        outfit.hips = random_ring(0.2, 0.3, 4, 8);
    }

    if (Math.random() < 0.5){
        outfit.leftupleg = solid_ring(values["leftupleg"][0], values["leftupleg"][1], values["leftupleg"][2]);
    }else{
        outfit.leftupleg = random_ring(0.2, 0.2, 4, 8);
    }
    if (Math.random() < 0.5){
        outfit.leftleg = solid_ring(values["leftleg"][0], values["leftleg"][1], values["leftleg"][2]);
    }else{
        outfit.leftleg = random_ring(0.2, 0.2, 4, 8);
    }
    if (Math.random() < 0.5){
        outfit.leftfoot = solid_ring(values["leftfoot"][0], values["leftfoot"][1], values["leftfoot"][2]);
    }else{
        outfit.leftfoot = random_ring(0.1, 0.1, 0, 4);
    }


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

function gen_outfit(){
    if(combineList.length == 0 ){
        return make_clothes()
    }
    return mutate_dress(crossover_dresses(combineList))


}

function test() {





    currpiece = gen_outfit();

    var structure = Object.keys(currpiece);

    clearAttachments();
    var idx;
    for (idx in structure) {
        var part = structure[idx];
        if (part == "head") {
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "Head",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y + 0.3, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "Spine2",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "Spine1",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "Spine",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "Hips",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "LeftUpLeg",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "RightUpLeg",
                    translation: {"x": -currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": -currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "LeftLeg",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "RightLeg",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "LeftFoot",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "RightFoot",
                    translation: {"x": -currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": -currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
   desktopOverlay4 = Overlays.addOverlay("text", {
                    text: "4",
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
    overlayLibrary.push(desktopOverlay4);

    desktopOverlay5 = Overlays.addOverlay("text", {
                    text: "5",
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
    overlayLibrary.push(desktopOverlay5);

     desktopOverlay6 = Overlays.addOverlay("text", {
                    text: "6",
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
    overlayLibrary.push(desktopOverlay6);

 desktopOverlay7 = Overlays.addOverlay("text", {
                    text: "7",
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
    overlayLibrary.push(desktopOverlay7);

  desktopOverlay8 = Overlays.addOverlay("text", {
                    text: "8",
                    width: 3 * 24,
                    height: 24,
                    x: screenSize.x/11*7,
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
                    x: screenSize.x/11*8,
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
                    x: screenSize.x/11*9,
                    y: 24,
                    font: { size: 24 },
                    color: {red: 50, green: 50, blue: 50},
                    alpha: 1.0,
                    backgroundAlpha: 0,
                    visible: true
                });
    overlayLibrary.push(desktopOverlay10);



function wear(currpiece){
    var structure = Object.keys(currpiece);
    var idx;
    for (idx in structure) {
        var part = structure[idx];
        if (part == "head") {
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "Head",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y + 0.3, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "Spine2",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "Spine1",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "Spine",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "Hips",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "LeftUpLeg",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "RightUpLeg",
                    translation: {"x": -currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": -currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "LeftLeg",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "RightLeg",
                    translation: {"x": -currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": -currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
            var t = 0;
            for (t = 0; t < currpiece[part].length; t++) {
                var toast = {
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "LeftFoot",
                    translation: {"x": currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
                    modelURL: toastyArray[currpiece[part][t].toastiness],
                    jointName: "RightFoot",
                    translation: {"x": -currpiece[part][t].x, "y": currpiece[part][t].y, "z": currpiece[part][t].z},
                    rotation: {"x": -currpiece[part][t].rx, "y": currpiece[part][t].ry, "z": currpiece[part][t].rz, "w": 1},
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
    if(!event.isShifted){
        if(key == '4'){
            clearAttachments();
            wear(library[0]);
        }else if(key == '5'){
            clearAttachments();
            wear(library[1]);
        }else if(key == '6'){
            clearAttachments();
            wear(library[2]);
        }else if(key == '7'){
            clearAttachments();
            wear(library[3]);
        }else if(key == '8'){
            clearAttachments();
            wear(library[4]);
        }else if(key == '9'){
            clearAttachments();
            wear(library[5]);
        }else if(key == '0'){
            clearAttachments();
            wear(library[6]);
        }
    }else{
        if(key == '$' && library.length > 0){
            Overlays.editOverlay(overlayLibrary[0], {
                color: { red: 255, green: 255, blue: 0 }
            });

            combineList.push(library[0]);
        }else if(key == '%'&& library.length > 1){
            Overlays.editOverlay(overlayLibrary[1], {
                color: { red: 255, green: 255, blue: 0 }
            });
            combineList.push(library[1]);
        }else if(key == '^'&& library.length > 2){
            Overlays.editOverlay(overlayLibrary[2], {
                color: { red: 255, green: 255, blue: 0 }
            });
            combineList.push(library[2]);
        }else if(key == '&'&& library.length > 3){
            Overlays.editOverlay(overlayLibrary[3], {
                color: { red: 255, green: 255, blue: 0 }
            });
            combineList.push(library[3]);
        }else if(key == '*'&& library.length > 4){
            Overlays.editOverlay(overlayLibrary[4], {
                color: { red: 255, green: 255, blue: 0 }
            });
            combineList.push(library[4]);
        }else if(key == '('&& library.length > 5){
            Overlays.editOverlay(overlayLibrary[5], {
                color: { red: 255, green: 255, blue: 0 }
            });
            combineList.push(library[5]);
        }else if(key == ')'&& library.length > 6){
            Overlays.editOverlay(overlayLibrary[6], {
                color: { red: 255, green: 255, blue: 0 }
            });
            combineList.push(library[6]);
        }
    }


    if(event.text == 'SPACE'){


        var i = 0;
        for(i = 0; i<overlayLibrary.length; i++){
            Overlays.editOverlay(overlayLibrary[i], {
                color: {red: 50, green: 50, blue: 50}
            });
        }
        library = [];

        // var libcopy = library;
        //
        // library = libcopy.filter(function(n) {
        //     return combineList.indexOf(n) !== -1;
        // });
        // for(i = 0; i<library.length; i++){
        //     Overlays.editOverlay(overlayLibrary[i], {
        //         color: {red: 255, green: 255, blue: 0}
        //     });
        // }
        if(combineList.length > 1) {
            currpiece = crossover_dresses(combineList);
        }

        clearAttachments();
        wear(currpiece);
        console.log(combineList.length, "combine length");
    }
});
