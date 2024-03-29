/**
 * sortable v3.1.0
 *
 * https://www.npmjs.com/package/sortable-tablesort
 * https://github.com/tofsjonas/sortable
 *
 * Makes html tables sortable, No longer ie9+ 
 *
 * Styling is done in css.
 *
 * Copyleft 2017 Jonas Earendel
 *
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org>
 *
 */


// hidden form for mobile "jennie"
var hiddenForm = document.createElement('input');
hiddenForm.setAttribute('type','text');
//hiddenForm.style.cssText = 'visibility: hidden;';
hiddenForm.style.cssText = 'position: absolute; left: 0; top: -250px;';
hiddenForm.setAttribute('id','jennie-form');

var tapedTwice = false; // detects double-click / tap


window.onload = function(e) { 
    setTimeout(UpdateClock, 100);

    addAriaAttributes();

    document.body.appendChild(hiddenForm);

    jennieForm = document.getElementById('jennie-form');
    jennieForm.addEventListener('input', function (event) {
        if (event.defaultPrevented) {
            //console.log('prevented');
            return; // Do nothing if the event was already processed or is a text field
        }
        k = jennieForm.value;
        jennieForm.value = '';
        //console.log(e);
        k = k ? k.toLowerCase() : '';
        //console.log(k);
        processJennie(k);
    
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);

    //dt = document.querySelectorAll('');
    //dt.addEventListener("touchstart", tapHandler);
    //document.addEventListener("touchstart", tapHandler);

    const clockDiv = document.createElement("div");
    //clockDiv.style.backgroundColor = 'gray';
    //clockDiv.style.width  = '100%';
    //clockDiv.style.height = '72px';
    clockDiv.setAttribute('id','Clock');
    clockDiv.textContent = "00:00:00";
    //const siteNav = document.getElementById('site-nav');
    //siteNav.style.paddingTop = '1rem';
    const eAfter = document.getElementById('menu-button');
    eAfter.insertAdjacentElement("beforebegin", clockDiv);
    //siteNav.style.cssText = 'position: absolute; left: 0; top: -250px;';
}



document.addEventListener('click', function (e) {
    try {
        // allows for elements inside TH
        function findElementRecursive(element, tag) {
            return element.nodeName === tag ? element : findElementRecursive(element.parentNode, tag);
        }
        var ascending_table_sort_class = 'asc';
        var no_sort_class = 'no-sort';
        var null_last_class = 'n-last';
        var table_class_name = 'sortable';
        var alt_sort_1 = e.shiftKey || e.altKey;
        var element = findElementRecursive(e.target, 'TH');
        var tr = element.parentNode;
        var thead = tr.parentNode;
        var table = thead.parentNode;
        function getValue(element) {
            var _a;
            var value = alt_sort_1 ? element.dataset.sortAlt : (_a = element.dataset.sort) !== null && _a !== void 0 ? _a : element.textContent;
            return value;
        }
        if (thead.nodeName === 'THEAD' && // sortable only triggered in `thead`
            table.classList.contains(table_class_name) &&
            !element.classList.contains(no_sort_class) // .no-sort is now core functionality, no longer handled in CSS
        ) {
            var column_index_1;
            var nodes = tr.cells;
            var tiebreaker_1 = parseInt(element.dataset.sortTbr);
            // Reset thead cells and get column index
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i] === element) {
                    column_index_1 = parseInt(element.dataset.sortCol) || i;
                }
                else {
                    nodes[i].setAttribute('aria-sort', 'none');
                }
            }
            var direction = 'descending';
            if (element.getAttribute('aria-sort') === 'descending' ||
                (table.classList.contains(ascending_table_sort_class) && element.getAttribute('aria-sort') !== 'ascending')) {
                direction = 'ascending';
            }
            // Update the `th` class accordingly
            element.setAttribute('aria-sort', direction);
            var reverse_1 = direction === 'ascending';
            var sort_null_last_1 = table.classList.contains(null_last_class);
            var compare_1 = function (a, b, index) {
                var x = getValue(b.cells[index]);
                var y = getValue(a.cells[index]);
                if (sort_null_last_1) {
                    if (x === '' && y !== '') {
                        return -1;
                    }
                    if (y === '' && x !== '') {
                        return 1;
                    }
                }
                // var temp = Number(x) - Number(y); // original code
                // var temp = Number(x.replace(/\,/g,'')) - Number(y.replace(/\,/g,'')); // tav hack

                var humanNotation = function(token) {
                    token = token.replace(/\,/g,'');
                    lastt = token.slice(-1).toLowerCase();
                    firstt = token.slice(0,1);
                    dnumber = 0;
                    // If we detect a possible human notation
                    if (!isNaN(parseInt(firstt)) && isNaN(parseInt(lastt))) {
                        dnumber = parseInt(token);
                        if (lastt == 'k') {
                            return dnumber * 1000;
                        } else if (lastt == 'm') {
                            return dnumber * 1000000;
                        } else if (lastt == 'b') {
                            return dnumber * 1000000000;
                        } else if (lastt == 't') {
                            return dnumber * 1000000000000;
                        }
                    }
                    return Number(token);
                };
                // compare
                var temp = 0;
                // check for Weapon / Armour sorting
                xSplit = x.split('/', 3);
                ySplit = y.split('/', 3);
                if (xSplit.length == 2 && ySplit.length == 2) {
                    x1 = humanNotation(xSplit[0]);
                    x2 = humanNotation(xSplit[1]);
                    y1 = humanNotation(ySplit[0]);
                    y2 = humanNotation(ySplit[1]);
                    if (!isNaN(x1) || !isNaN(x2) || !isNaN(y1) || !isNaN(y1)) {
                        temp = x1 - y1;
                        temp = temp == 0 ? x2 - y2 : temp;
                    } else {
                        temp = humanNotation(x) - humanNotation(y);
                    }
                } else {
                    temp = humanNotation(x) - humanNotation(y);
                }
                var bool = isNaN(temp) ? x.localeCompare(y) : temp;
                return reverse_1 ? -bool : bool;
            };
            // loop through all tbodies and sort them
            for (var i = 0; i < table.tBodies.length; i++) {
                var org_tbody = table.tBodies[i];
                // Put the array rows in an array, so we can sort them...
                var rows = [].slice.call(org_tbody.rows, 0);
                // Sort them using Array.prototype.sort()
                rows.sort(function (a, b) {
                    var bool = compare_1(a, b, column_index_1);
                    return bool === 0 && !isNaN(tiebreaker_1) ? compare_1(a, b, tiebreaker_1) : bool;
                });
                // Make an empty clone
                var clone_tbody = org_tbody.cloneNode();
                // Put the sorted rows inside the clone
                clone_tbody.append.apply(clone_tbody, rows);
                // And finally replace the unsorted tbody with the sorted one
                table.replaceChild(clone_tbody, org_tbody);
            }
        }
    }
    catch (error) {
        //console.log(error)
    }

    // doucle click on body
    try {
        //console.log(e);
        //console.log('1 => ' + e.target);
        //console.log('2 => ' + e.type);
        //console.log('3 => ' + e.target.getAttribute('type'));
        //console.log('5 => ' + e.target.tagName);
        //console.log('4 => ' + e.target.attr('type'));

        if (e.target.tagName == 'H1') {
            //console.log('tapedTwice 1' + tapedTwice);
            if(!tapedTwice) {
                //console.log('tapedTwice 2' + tapedTwice);
                tapedTwice = true;
                setTimeout( function() { tapedTwice = false; }, 300 );
                return false;
            }
            
            e.preventDefault();
            //console.log('Double-Click!' + tapedTwice);
            //alert('You tapped me Twice !!!');
            //action on double tap goes below
            jform = document.getElementById('jennie-form');
            //console.log(jform);
            //jform.focus(true, false);
            setTimeout(function(){ jform.focus({ preventScroll: true }); }, 100);
            //jform.click();
        }
    }
    catch (error) {
        //console.log(error)
    }
});

function addAria(qs) {
    s = document.querySelector(qs);
    if(!s) return false;
    s.setAttribute('aria-sort', 'ascending');
}

function addAriaAll(qs) {
    s = document.querySelectorAll(qs);
    if(s.length === 0) return false;
    s.forEach(e => { e.setAttribute('aria-sort', 'ascending'); });
}

function addAriaAttributes() {
    addAria(".levels th:nth-child(1)") ;
    addAria(".masterodds th:nth-child(1)") ;
    addAria(".weapons th:nth-child(2)");
    addAria(".armours th:nth-child(2)");
    addAria(".weaponsarmours th:nth-child(2)");
    addAria(".masters th:nth-child(2)");
    addAria(".raremonsters th:nth-child(2)");
    addAria(".disabledmonsters th:nth-child(2)");
    addAriaAll(".monsters th:nth-child(3)");
}



var jennie = function() {
    let levelPages = ['level1','level2','level3','level4','level5','level6','level7','level8','level9','level10','level11','level12'];
    let levelPages2 = levelPages.map(x => x.replace("level", "level "));
    let masterPages = ['halder','barak','aragorn','olodrin','sandtiger','sparhawk','atsuko sensei','aladdin','prince caspian','gandalf','turgon'];
    
    let jcode = prompt("", "");
    jcode   = jcode ? jcode.toLowerCase() : null;

    if (levelPages.includes(jcode)) {
        window.open("/lord/levels/"+jcode, "_self");

    } else if (levelPages2.includes(jcode)) {
        window.open("/lord/levels/"+jcode.replace(' ', ''), "_self");

    } else if (jcode == 'level' || jcode == 'levels') {
        window.open("/lord/levels", "_self");

    } else if (masterPages.includes(jcode)) {
        window.open("/lord/masters/"+jcode.replace(' ', '_'), "_self");

    } else if (jcode == 'atsuko' || jcode == 'sensei' || jcode == 'atsuko_sensei') {
        window.open("/lord/masters/atsuko_sensei", "_self");

    } else if (jcode == 'prince' || jcode == 'caspian' || jcode == 'prince_caspian') {
        window.open("/lord/masters/prince_caspian", "_self");

    } else if (jcode == 'master' || jcode == 'masters') {
        window.open("/lord/masters", "_self");

    } else if (jcode == 'home' || jcode == 'wiki') {
        window.open("/", "_self");

    } else if (jcode == 'lord' || jcode == 'play') {
        window.open("https://legendreddragon.net/", "_blank");

    } else if (jcode == 'status') {
        window.open("https://status.gearhost.com/", "_blank");

    } else if (jcode == 'forum') {
        window.open("https://www.facebook.com/groups/1556690911146602", "_blank");

    } else if (jcode == 'about') {
        window.open("https://legendreddragon.net/About", "_blank");

    } else if (jcode == 'oldwiki') {
        window.open("https://nuklearlord.fandom.com/wiki/Special:AllPages", "_blank");

    }
}


function tapHandler(event) {
    if(!tapedTwice) {
        tapedTwice = true;
        setTimeout( function() { tapedTwice = false; }, 300 );
        return false;
    }
    event.preventDefault();
    //action on double tap goes below
    document.getElementById('jennie-form').focus(true, false);
    alert('You tapped me Twice !!!');
 }
   

typeJennie="";
function processJennie(k) {
    //console.log(k);
    switch (k) {
    case "j":
        typeJennie="j";
        return true;
        break;
    case "e":
        if (typeJennie === 'j') {
            typeJennie="je";
            return true;
        } else if (typeJennie === 'jenni') {
            //alert("You are a Jennie!\nWell Done!")
            typeJennie="";
            jennie();
            return true;
        } else {
            typeJennie="";
        }
        break;
    case "n":
        if (typeJennie === 'je') {
            typeJennie="jen";
            return true;
        } else if (typeJennie === 'jen') {
            typeJennie="jenn";
            return true;
        } else { 
            typeJennie="";
        }
        break;
    case "i":
        // code for "right arrow" key press.
        if (typeJennie === 'jenn') {
            typeJennie="jenni";
            return true;
        }
        else {
            typeJennie="";
        }
        break;
    default:
        typeJennie="";
        return false; // Quit when this doesn't handle the key event.
    }
    return false;
}

//window.addEventListener("keyup touchend input", function (event) {
window.addEventListener("keydown", function (event) {
    //if (event.defaultPrevented) {
    if (event.defaultPrevented || event.target.type === 'text') {
        return; // Do nothing if the event was already processed or is a text field
    }
    //console.log(event);
    //console.log(event.target);
    k = event.key ? event.key.toLowerCase() : '';
    if (processJennie(k)) {
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }
   
}, true);

// the last option dispatches the event to the listener first,
// then dispatches event to window


// Method to add/subtract a Date object
Date.prototype.addHours = function (hours) {
    const date = new Date(this.valueOf())
    date.setTime(date.getTime() + hours * 60 * 60 * 1000)
    return date
}

//var d = new Date(0); // epoch
//var servertimeseconds = parseInt(document.getElementById("ServerTime").value);
//d.setUTCSeconds(servertimeseconds);
var serverTime = (new Date()).addHours(-3);
serverTime = serverTime.getTime();
var timeDiff = (new Date()).getTime() - serverTime;
//console.log(timeDiff);
var displaytime = new Date();
var lastTime = "";

function UpdateClock() {
    
    displaytime.setTime((new Date()).getTime() - timeDiff);

    var displayhours = displaytime.getUTCHours();
    var displayminutes = displaytime.getUTCMinutes();
    var displayseconds = displaytime.getUTCSeconds();

    if (displayhours < 10) { displayhours = "0" + displayhours; }
    if (displayminutes < 10) { displayminutes = "0" + displayminutes; }
    if (displayseconds < 10) { displayseconds = "0" + displayseconds; }

    var newTime = displayhours + ":" + displayminutes + ":" + displayseconds;

    if(lastTime != newTime)
    {
        var element = document.getElementById("Clock")
        if (!element) { return; }

        element.innerHTML = newTime;
        lastTime = newTime;
    }

    setTimeout(UpdateClock, 100);
}


