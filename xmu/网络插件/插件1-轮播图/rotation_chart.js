var unit = "px"; // 鍗曚綅
var focusWidth = "511" + unit; // 杞挱鍥剧殑瀹�
var focusHeight = "193.666667" + unit; // 杞挱鍥剧殑楂�
var focusOlLeft = "225" + unit; // 灏忕偣璺濆乏杈规璺濈
var focusOlTop = "5" + unit; // 灏忕偣璺濆彸杈规璺濈
var rotation_Speed = 3000; // 杞挱鍥捐嚜鍔ㄦ挱鏀鹃€熷害 姣
// 淇敼杞挱鍥炬牱寮�
function setRotation(focusWidth, focusHeight, focusOlLeft, focusOlTop, rotation_Speed) {
    // if (unit != "" && unit != undefined && isNaN(unit))
    // 	unit = unit;
    // else unit = "px";

    if (focusWidth != "" && focusWidth != undefined && !isNaN(focusWidth))
        focusWidth = focusWidth + unit;
    else focusWidth = 511 + unit;

    if (focusHeight != "" && focusHeight != undefined && !isNaN(focusHeight))
        focusHeight = focusHeight + unit;
    else focusHeight = 193.666667 + unit;

    if (focusOlLeft != "" && focusOlLeft != undefined && !isNaN(focusOlLeft))
        focusOlLeft = focusOlLeft + unit;
    else focusOlLeft = 225 + unit;

    if (focusOlTop != "" && focusOlTop != undefined && !isNaN(focusOlTop))
        focusOlTop = focusOlTop + unit;
    else focusOlTop = 5 + unit;

    if (rotation_Speed != "" && rotation_Speed != undefined && !isNaN(rotation_Speed))
        rotation_Speed = rotation_Speed;
    else rotation_Speed = 2000;

    window.unit = unit;
    window.focusWidth = focusWidth;
    window.focusHeight = focusHeight;
    window.focusOlLeft = focusOlLeft;
    window.focusOlTop = focusOlTop;
    window.rotation_Speed = rotation_Speed;
}
$(function () {

    // 鑷姩娣诲姞灏忓渾鐐�
    var index = 0; // 涓嬫爣
    $(".focus>ul>li").each(function (i, element) {
        var li = $("<li></li>");
        li.attr("index", index++);
        li.css({
            "list-style-type": "none",
            "float": "left",
            "width": 10 + unit,
            "height": 10 + unit,
            "margin": "0 3" + unit,
            "border": 1 + unit + " solid black",
            "border-radius": 5 + unit,
            "background": "#fff",
            "cursor": "pointer"
        });
        $(".focus>ol").append(li);
    })
    $(".focus>ol>li")[0].style.background = "orange";

    var focus = $(".focus");
    var ul = $(".focus>ul");
    var imgLi = $(".focus>ul>li");
    var lb_l = $(".lb_l");
    var lb_r = $(".lb_r");
    var ol = $(".focus>ol");
    var yuanLi = $(".focus>ol>li");

    // 澶嶅埗绗竴涓浘鍍�
    $(imgLi[0]).clone().appendTo($(ul[0]));

    // 鏍峰紡閮ㄥ垎
    $("li").css("list-style-type", "none");
    $(".focus").css({
        "position": "relative",
        "width": focusWidth,
        "height": focusHeight,
        "overflow": "hidden",
        "box-sizing": "border-box"
    });
    var focusUlSize = 150 * $(".focus>ul>li").length + "%";
    $(".focus>ul").css({
        "position": "absolute",
        "left": 0,
        "width": focusUlSize,
        "cursor": "pointer",
        "overflow": "hidden"
    });

    $(".focus>ul>li").css({
        "float": "left"
    });
    $(".focus>ul>li>img").css({
        "width": focusWidth,
        "height": focusHeight
    });
    $(".focus>ol").css({
        "position": "absolute",
        "left": focusOlLeft,
        "bottom": focusOlTop
    });

    $(".lb_l,.lb_r").css({
        "position": "absolute",
        "display": "none",
        // "z-index": 10,
        "width": 20 + unit,
        "height": 30 + unit,
        "background-color": "rgba(0, 0, 0, .2)",
        "color": "aliceblue",
        "text-align": "center",
        "line-height": 30 + unit,
        "user-select": "none",
        "cursor": "pointer"
    });
    $(".lb_l").css({
        "left": 0,
        "top": focusHeight / 2 + unit
    });
    $(".lb_r").css({
        "right": 0,
        "top": focusHeight / 2 + unit
    });

    // 杞挱
    focus.mouseenter(function () {
        lb_l.show();
        lb_r.show();
        lb_l.hover(function () {
            lb_l[0].style.color = "red"
        }, function () {
            lb_l[0].style.color = "#fff"
        })
        lb_r.hover(function () {
            lb_r[0].style.color = "red"
        }, function () {
            lb_r[0].style.color = "#fff"
        });
        clearInterval(timer);
    })

    focus.mouseleave(function () {
        lb_l.hide();
        lb_r.hide();
        timer = setInterval(function () {
            lb_r.click();
        }, 3000);
    });
    var yidongjl = focus.outerWidth(); // 绉诲姩璺濈
    var num = 0; // 鐐瑰嚮璁℃暟
    var flag = true; // 鑺傛祦闃€
    // 鍙崇澶�
    lb_r.click(function () {
        if (flag) {
            flag = false;
            if (num == imgLi.length) {
                ul[0].style.left = '0' + "px";
                num = 0;
            }
            num++;
            lj()
            move(ul[0], -num * yidongjl, function () {
                flag = true;
            });
        }
    });
    //宸︾澶�
    lb_l.click(function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = imgLi.length;
                ul[0].style.left = yidongjl * -num + "px";
            }
            num--;
            lj();
            move(ul[0], -num * yidongjl, function () {
                flag = true;
            });
        }
    });

    // 灏忓渾鐐规粴鍔�
    yuanLi.click(function () {
        yuanLi.css({
            "background": "#fff"
        })
        $(this).css({
            "background": "orange"
        })
        move(ul[0], -$(this).attr("index") * yidongjl);
        num = $(this).attr("index");
    });

    function lj() {
        yuanLi.css({
            "background": "#fff"
        })
        var p = num > imgLi.length - 1 ? 0 : num;
        yuanLi[p].style.backgroundColor = "orange";
    }
    var timer = setInterval(function () {
        lb_r.click();
    }, rotation_Speed);
});

// 鍔ㄧ敾
function move(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var tam = (target - obj.offsetLeft) / 10;
        tam = tam > 0 ? Math.ceil(tam) : Math.floor(tam);
        if (obj.offsetLeft == target) {
            if (callback) {
                callback();
            }
            clearInterval(obj.timer);
        };
        $(obj).css("left", obj.offsetLeft + tam + 'px');
        // obj.style.left = obj.offsetLeft + tam + 'px';
    }, 20);
}