var library = [];

var currpiece = {};

// class EvolutionaryAlgorithm {
function startEA(pop_size) {
        // pop_size = pop_size;
        pop = [];	
        var i = 0;
        for (i = 0; i < pop_size; i++) {
            pop.push(make_clothes());
        }

        return pop;
    }

function max(array){
	var num = Math.max.apply( Math, array );
		    return num;
}
    

function padding(lists) {

		// console.log("*********************"+lists[0][0]["x"]);
        var lens = [];
        var ls;
        for(ls = 0; ls < lists.length; ls++){
        	lens.push(lists[ls].length);
        }
        // lists.forEach(ls => 
        //     lens.push(ls.length));
        // var max_len = Math.max(...lens);
        var max_len = max(lens);
		console.log("PLEASE"+max_len);
        var padded_lists = [];

        ls = 0;
        for(ls = 0; ls < lists.length; ls++){
        	var padded_list = [];
            var i = 0;
            for (i = 0; i < max_len; i++) {
                if (i < lists[ls].length) {
                    padded_list.push(lists[ls][i]);
                } else {
                    padded_list.push(null);
                }
            }
            padded_lists.push(padded_list);
        }
        // lists.forEach(ls => {
        //     var padded_list = [];
        //     var i = 0;
        //     for (i = 0; i < max_len; i++) {
        //         if (i < ls.length) {
        //             padded_list.push(ls[i]);
        //         } else {
        //             padded_list.push(null);
        //         }
        //     }
        //     padded_lists.push(padded_list);
        // });
        // console.log("padded list print test *********"+padded_lists[0]["x"]);
        return padded_lists;
    }


function crossover_parts(parents) {
		// console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA"+parents[0][0]["x"]);
        var parents = padding(parents);
        var part = [];
        for (var i = 0; i < parents[0].length; i++) {
            var options = [];
            var j = 0;
            for ( j = 0; j < parents.length; j++) {
                var option = parents[j][i];
                if (option != null) {
                    options.push(option);
                }
            }
            var took = choose(options);
            part.push(took);
        }
        return part;
    }

function crossover_dresses(parents) {
        var structure = Object.keys(parents[0]);
        var child = make_clothes();
        var idx;
        for (idx in structure) {
            var part = structure[idx];
            var parts = [];
            var p;
            for ( p in parents) {
            	// console.log("pppppppppppppppppppppppp"+parents[p][part][0]["x"]);
                parts.push(parents[p][part]);
            }
            child[part] = crossover_parts(parts);
        }
        return child;
    }

function mutate_dress(outfit) {
        // at random will regenerate a section of the outfit
        var structure = Object.keys(outfit);
        var part;
        for (part in structure) {
            if (Math.random() < 0.3) {
                outfit[part] = make_piece();
            }
        }
        return outfit;
    }
// }

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
};

function make_toast(part) {
    var toast = {};

    if(part == "head"){
        toast.x = Math.random()*0.2 -0.1;
        toast.y = 0.25;
        toast.z = Math.random()*0.2 -0.1;
        toast.rx = Math.random()*0.2 -0.1;
        toast.ry = Math.random()*0.2 -0.1;
        toast.rz = Math.random()*0.2 -0.1;
    }
    if(part == "torso"){
        toast.x = Math.random()*0.5 -0.25;
        toast.y = Math.random()*0.5 -0.35;
        toast.z = Math.random()*0.5 -0.25;
        toast.rx = Math.random()*0.5 -0.25;
        toast.ry = Math.random()*0.5 -0.25;
        toast.rz = Math.random()*0.5 -0.25;
    }
    if(part == "pants"){
        toast.x = Math.random()*0.3 -0.15;
        toast.y = Math.random()*0.8 -0.4;
        toast.z = Math.random()*0.3 -0.15;
        toast.rx = Math.random()*0.5 -0.25;
        toast.ry = Math.random()*0.5 -0.25;
        toast.rz = Math.random()*0.5 -0.25;
    }
    if(part == "shoes"){
        toast.x = Math.random()*0.2 -0.1;
        toast.y = Math.random()*0.2;
        toast.z = Math.random()*0.2 -0.1;
        toast.rx = Math.random()*0.2 -0.1;
        toast.ry = Math.random()*0.2 -0.1;
        toast.rz = Math.random()*0.2 -0.1;
    }
    return toast;
};

function make_ring_toast(rx, ry, range, i){

    var angleIncrement = 2*Math.PI / range;

    var toast = {};

   
    toast.x = rx* Math.cos((angleIncrement * i) );
    toast.y = 0;
    toast.z = rx* Math.sin((angleIncrement * i));
    toast.rx = 0;
    toast.ry = Math.sin((angleIncrement * i));
    toast.rz = 0;
    
    return toast;
};

function make_ring(min_num, max_num, part){
    var piece = [];
    var radiusX = (Math.random() * max_num) +min_num;
    var radiusY = Math.floor((Math.random() * max_num)) +min_num;
    console.log(radiusX);
    var range = Math.ceil(5* Math.PI * radiusX);
    console.log(range);
    var i = 0;
    for (i = 0; i < range; i++) {
        piece.push(make_ring_toast(radiusX, radiusY, range, i));
    }
    return piece;

};

function make_piece(min_num, max_num, part) {
    var i = 0;
    var piece = [];
    var range = Math.floor((Math.random() * max_num)) +min_num ;
    for (i = 0; i < range; i++) {
        piece.push(make_toast(part));
    }
    return piece;
};


function make_clothes() {
    // var outfit = {
    //     "head": make_piece(0, 3, "head"),
    //     "torso": make_piece(10, 35, "torso"),
    //     "pants": make_piece(5, 15, "pants"),
    //     "shoes": make_piece(0, 3, "shoes")
    // };


    var outfit = {
        "head": make_ring(0, 0.2, "head"),
        "spine2": make_ring(0.2, 0.3, "spine2"),
        "spine1": make_ring(0.2, 0.3, "spine1"),
        "spine": make_ring(0.2, 0.3, "spine"),
        "hips": make_ring(0.2, 0.3, "hips"),
        "leftupleg": make_ring(0, 0.2, "leftupleg"),
        "leftleg": make_ring(0, 0.2, "leftleg"),
        "leftfoot": make_ring(0, 0.1, "leftfoot")
    };
    return outfit;
};


function test() {
	var piece = make_clothes();
	console.log(piece);

    Chat.showMessage("Starting Test");
    var pop = startEA(6);
   	console.log(pop);
    Chat.showMessage("----")
    child = crossover_dresses([pop[0], pop[1]]);
    console.log(child);
    Chat.showMessage(child);
    Chat.showMessage("+++++");
    mutation = mutate_dress(child);
    console.log(mutation);
    
    var structure = Object.keys(child);

    currpiece = child;
    var idx;
    for (idx in structure) {
        var part = structure[idx];
        if(part == "head"){
            var t = 0;
            for(t = 0; t < child[part].length; t++){
             var toast = {
                modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
                jointName: "Head",
                translation: {"x": child[part][t].x, "y": child[part][t].y+0.3, "z": child[part][t].z},
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
        if(part == "spine2"){
            var t = 0;
            for(t = 0; t < child[part].length; t++){
             var toast = {
                modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
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
        if(part == "spine1"){
            var t = 0;
            for(t = 0; t < child[part].length; t++){
             var toast = {
                modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
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
        if(part == "spine"){
            var t = 0;
            for(t = 0; t < child[part].length; t++){
             var toast = {
                modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
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

        if(part == "hips"){
            var t = 0;
            for(t = 0; t < child[part].length; t++){
             var toast = {
                modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
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
        if(part == "leftupleg"){
            var t = 0;
            for(t = 0; t < child[part].length; t++){
             var toast = {
                modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
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
                modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
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
        if(part == "leftleg"){
            var t = 0;
            for(t = 0; t < child[part].length; t++){
             var toast = {
                modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
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
                modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
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
        if(part == "leftfoot"){
            var t = 0;
            for(t = 0; t < child[part].length; t++){
             var toast = {
                modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
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
                modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
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

test();

Controller.mouseReleaseEvent.connect(function (event) {
    print(JSON.stringify(event));
    if(event.isLeftButton){
        if(event.x > 1000){
            console.log("KEEP");
            library.push(currpiece);
        }
        else{
            console.log("DESTROY");
        }
    }
});
 
//*******************************************************
Script.setTimeout(function () { //wait for the object to be created

// var hat = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Head",
//     translation: {"x": 0, "y": 0.25, "z": 0},
//     rotation: {"x": 0, "y": 0, "z": -1, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

//  MyAvatar.attach(hat.modelURL,
//                  hat.jointName,
//                  hat.translation,
//                  hat.rotation,
//                  hat.scale,
//                  hat.isSoft);


// var shoe = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "LeftToeBase",
//     translation: {"x": 0, "y": 0, "z": 0},
//     rotation: {"x": 0, "y": 1, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

//  MyAvatar.attach(shoe.modelURL,
//                  shoe.jointName,
//                  shoe.translation,
//                  shoe.rotation,
//                  shoe.scale,
//                  shoe.isSoft);

// var shoe2 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "RightToeBase",
//     translation: {"x": 0, "y": 0, "z": 0},
//     rotation: {"x": 0, "y": 1, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

//  MyAvatar.attach(shoe2.modelURL,
//                  shoe2.jointName,
//                  shoe2.translation,
//                  shoe2.rotation,
//                  shoe2.scale,
//                  shoe2.isSoft);



// var attachment2 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Spine2",
//     translation: {"x": 0, "y": 0.05, "z": 0.1},
//     rotation: {"x": 0, "y": 1, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

//  MyAvatar.attach(attachment2.modelURL,
//                  attachment2.jointName,
//                  attachment2.translation,
//                  attachment2.rotation,
//                  attachment2.scale,
//                  attachment2.isSoft);

//  var attachment3 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Spine1",
//     translation: {"x": 0, "y": -0.05, "z": 0.1},
//     rotation: {"x": 0, "y": 1, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

//  MyAvatar.attach(attachment3.modelURL,
//                  attachment3.jointName,
//                  attachment3.translation,
//                  attachment3.rotation,
//                  attachment3.scale,
//                  attachment3.isSoft);


// var attachment4 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Spine2",
//     translation: {"x": 0, "y": 0.05, "z": -0.1},
//     rotation: {"x": 0, "y": 1, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

//  MyAvatar.attach(attachment4.modelURL,
//                  attachment4.jointName,
//                  attachment4.translation,
//                  attachment4.rotation,
//                  attachment4.scale,
//                  attachment4.isSoft);

//  var attachment5 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Spine1",
//     translation: {"x": 0, "y": -0.05, "z": -0.1},
//     rotation: {"x": 0, "y": 1, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

//  MyAvatar.attach(attachment5.modelURL,
//                  attachment5.jointName,
//                  attachment5.translation,
//                  attachment5.rotation,
//                  attachment5.scale,
//                  attachment5.isSoft);

//  var attachment6 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Hips",
//     translation: {"x": 0, "y": -0.05, "z": -0.1},
//     rotation: {"x": 0, "y": 1, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

//  MyAvatar.attach(attachment6.modelURL,
//                  attachment6.jointName,
//                  attachment6.translation,
//                  attachment6.rotation,
//                  attachment6.scale,
//                  attachment6.isSoft);

//  var attachment7 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Hips",
//     translation: {"x": 0, "y": -0.05, "z": 0.1},
//     rotation: {"x": 0, "y": 1, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

//  MyAvatar.attach(attachment7.modelURL,
//                  attachment7.jointName,
//                  attachment7.translation,
//                  attachment7.rotation,
//                  attachment7.scale,
//                  attachment7.isSoft);


// var attachment8 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Hips",
//     translation: {"x": 0.125, "y": 0, "z": -0.025},
//     rotation: {"x": 0, "y": 0, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

// MyAvatar.attach(attachment8.modelURL,
//                  attachment8.jointName,
//                  attachment8.translation,
//                  attachment8.rotation,
//                  attachment8.scale,
//                  attachment8.isSoft);

// var attachment9 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Hips",
//     translation: {"x": -0.125, "y": 0, "z": -0.025},
//     rotation: {"x": 0, "y": 0, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

// MyAvatar.attach(attachment9.modelURL,
//                  attachment9.jointName,
//                  attachment9.translation,
//                  attachment9.rotation,
//                  attachment9.scale,
//                  attachment9.isSoft);

// var attachment10 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Spine1",
//     translation: {"x": 0.125, "y": 0, "z": -0.025},
//     rotation: {"x": 0, "y": 0, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

// MyAvatar.attach(attachment10.modelURL,
//                  attachment10.jointName,
//                  attachment10.translation,
//                  attachment10.rotation,
//                  attachment10.scale,
//                  attachment10.isSoft);

// var attachment11 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Spine1",
//     translation: {"x": -0.125, "y": 0, "z": -0.025},
//     rotation: {"x": 0, "y": 0, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

// MyAvatar.attach(attachment11.modelURL,
//                  attachment11.jointName,
//                  attachment11.translation,
//                  attachment11.rotation,
//                  attachment11.scale,
//                  attachment11.isSoft);

// var attachment12 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Spine2",
//     translation: {"x": 0.125, "y": 0, "z": -0.025},
//     rotation: {"x": 0, "y": 0, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

// MyAvatar.attach(attachment12.modelURL,
//                  attachment12.jointName,
//                  attachment12.translation,
//                  attachment12.rotation,
//                  attachment12.scale,
//                  attachment12.isSoft);

// var attachment13 = {
//     modelURL: "https://files.tivolicloud.com/hanieh/toast-smaller.gltf",
//     jointName: "Spine2",
//     translation: {"x": -0.125, "y": 0, "z": -0.025},
//     rotation: {"x": 0, "y": 0, "z": 0, "w": 1},
//     scale: 0.01,
//     isSoft: false
// };

// MyAvatar.attach(attachment13.modelURL,
//                  attachment13.jointName,
//                  attachment13.translation,
//                  attachment13.rotation,
//                  attachment13.scale,
//                  attachment13.isSoft);
}, 50);