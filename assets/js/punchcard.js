// Reference for IBM 029 card punch, arrangement EL and H:
// http://bitsavers.informatik.uni-stuttgart.de/pdf/ibm/punchedCard/Keypunch/029/GA24-3332-6_Reference_Manual_Model_29_Card_Punch_Jun70.pdf
var IBM_029_EL_punches_by_char = {}
var IBM_029_H_punches_by_char = {}
// digits
for(var i=0; i <=9; i++) {
    IBM_029_EL_punches_by_char[i] = [i];
}
// latin alphabet
for(var i=1; i <=9; i++) {
    IBM_029_EL_punches_by_char["ABCDEFGHI"[i-1]] = [-2, i];
    IBM_029_EL_punches_by_char["JKLMNOPQR"[i-1]] = [-1, i];
    if (i == 1) { continue; }
    IBM_029_EL_punches_by_char["STUVWXYZ"[i-2]] = [0, i];
}
for(var k of Object.keys(IBM_029_EL_punches_by_char)) {
    IBM_029_H_punches_by_char[k] = IBM_029_EL_punches_by_char[k];
}
// Special characters (EL)
IBM_029_EL_punches_by_char["&"] = [-2]
IBM_029_EL_punches_by_char["-"] = [-1]
IBM_029_EL_punches_by_char["/"] = [0, 1]
for(var i=-2; i <= 1; i++) {
    var extra = i == 1 ? [] : [i];
    IBM_029_EL_punches_by_char[".$,#"[i+2]] = [8, 3].concat(extra);
    IBM_029_EL_punches_by_char["<*%@"[i+2]] = [8, 4].concat(extra);
    IBM_029_EL_punches_by_char["¢! :"[i+2]] = [8, 2].concat(extra);
    IBM_029_EL_punches_by_char["()_'"[i+2]] = [8, 5].concat(extra);
    IBM_029_EL_punches_by_char["+;>="[i+2]] = [8, 6].concat(extra);
    IBM_029_EL_punches_by_char['|¬?"'[i+2]] = [8, 7].concat(extra);
}
// Special characters (H)
IBM_029_H_punches_by_char["+"] = [-2]
IBM_029_H_punches_by_char["-"] = [-1]
IBM_029_H_punches_by_char["/"] = [0, 1]
for(var i=-2; i <= 1; i++) {
    var extra = i == 1 ? [] : [i];
    IBM_029_H_punches_by_char[".$,="[i+2]] = [8, 3].concat(extra);
    IBM_029_H_punches_by_char[")*('"[i+2]] = [8, 4].concat(extra);
}
// space
IBM_029_EL_punches_by_char[" "] = []
IBM_029_H_punches_by_char[" "] = []
function hole_coordinates(row, column) {
    var x = 22.5;
    var dx = 8.715;
    var y = 69;
    var dy = 25.17;
    x += column * dx;
    y += row * dy;
    return [x, y];
}
function punch(row, column) {
    var coords = hole_coordinates(row, column);
    var x = coords[0];
    var y = coords[1];
    var w = 6;
    var h = 15;
    return `<rect height="${h}" width="${w}" x="${x}" y="${y}" style="fill-opacity:1;fill:#1f272b"/>`
}
function punchcard(content, punches_by_char, show_text) {
    content = content.substring(0,80);
    var svg_header = '<svg width="740" height="327" xmlns="http://www.w3.org/2000/svg">'
    console.log(background_image_url);
    var svg_content = `<image height="327" width="740" href="${background_image_url}" />`
    for(var i = 0; i < content.length; i++) {
        var c = content[i];
        if (show_text) {
            var text_x = hole_coordinates(0, i)[0] + 0.5;
            svg_content += `<text x=${text_x} y=13 style="font-size:8px;">${c.toUpperCase()}</text>`
        }
        if (c.toUpperCase() in punches_by_char) {
            for(const p of punches_by_char[c.toUpperCase()]) {
                svg_content += punch(p, i);
            }
        } else {
            // mark column red to signal error
            svg_content += `<rect x=${hole_coordinates(0, i)[0]} y=0 height=327 width=6 fill="red"/>`
        }
    }
    var svg_footer = "</svg>"
    return svg_header + svg_content + svg_footer;
}
/*
function base64background() {
    var image = document.createElement("img")
    image.src = "/assets/img/IBM5081_1000.png" 
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);
    return dataURL;
}*/
// var background_image_url = base64background();
var background_image_url = "/assets/img/IBM5081_1000.png";
function updatePunchcard() {
    pc = document.getElementById("punchcards");
    pc_text = document.getElementById("pc_text");
    pc_key_punch = document.getElementById("pc_key_punch");
    pc_print = document.getElementById("pc_print");
    var punches_by_char = {};
    if (pc_key_punch.value == "IBM_029_EL") {
        punches_by_char = IBM_029_EL_punches_by_char;
    } else if (pc_key_punch.value == "IBM_029_H") {
        punches_by_char = IBM_029_H_punches_by_char;
    }
    pc.innerHTML = punchcard(pc_text.value, punches_by_char, pc_print.checked)
}
/*
function downloadPunchcard() {
    pc = document.getElementById("punchcards");
    var svgBlob = new Blob([pc.innerHTML], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.click();
}*/
