/**
 * @author Joao Rodrigues
 * @version 2.1 - 2018-05-09 - Uses cache in autocomplete.
 * @version 2.2 - 2019-10-28 - Handles XHR connection error.
 */
(function(doc) {
  'use strict';
  let cache = [];
  // 2019-08-22 - changed URL
  //const URL = "//www.jrfaq.com.br/lang.asp";
  const URL = "getlang.php";
  /**
   * Adds options from rsp into "lang_sel"
   * if they don't exist in the select.
   * @param {array} rsp - array with new options for the datalist / select.
   */
  let autocomplete = rsp => {
    // Get items from rsp not available in cache
    let diff = rsp.filter(x => !cache.includes(x));
    if (diff.length > 0) {
      // cache.concat(diff); -> slow
      [].push.apply(cache, diff);
      cache.sort();
      let frag = doc.createDocumentFragment();
      cache.forEach(item => {
        let option = doc.createElement("option");
        [option.value, option.text] = [item, item];
        frag.appendChild(option);
      });
      if (frag.hasChildNodes()) {
        let sel = doc.getElementById("lang_sel");
        let newSel = sel.cloneNode(false); // without options.
        newSel.appendChild(frag);
        sel.parentNode.replaceChild(newSel, sel);
      }
    }
  };
    
  let showMsg = (msg) => {
    doc.getElementById('lblSel').textContent = msg || '';
  };

  /**
   * Uses the text typed in the datalist for
   * searching programming languages via AJAX.
   * @param {event} e - e.currentTarget === datalist (input#cod)
   */
  let search = e => {
    const val = e.currentTarget.value; //this.value
    console.log('search: val=',val);
    console.log('target=',e.currentTarget);
    if (val.length === 0) return;
    let cors_xhr = new XMLHttpRequest();
    cors_xhr.onload = () => {
      if (cors_xhr.status === 200) { // success
        let rsp = cors_xhr.responseText;
        console.log('search: rsp=',rsp);
        if (rsp) autocomplete(JSON.parse(rsp));
      }
    };
    cors_xhr.onerror = () => showMsg(`Server is unavailable. Please try again later.`);
    cors_xhr.onloadend = () => console.log('cors status',cors_xhr.status);
    cors_xhr.open("POST", URL, true); // true = asynchronous.
    cors_xhr.setRequestHeader("Content-type",
      "application/x-www-form-urlencoded");
    cors_xhr.setRequestHeader('Accept', 'application/json');
    cors_xhr.send("l=" + val);
    

  };
  
  /**
   * Fills the label #lblSel with the name
   * of the selected option.
   * @param {event} e - e.currentTarget === datalist (input#cod)
   */
  let getSelectedOption = e => {
    const val = e.currentTarget.value;
    if (!val) return;
    let sel = doc.getElementById("lang_sel");
    let arr = Array.from(sel.options, i => i.text);
    let find = arr.find(x => x == val);
    showMsg(find);
  };

  doc.addEventListener("DOMContentLoaded", function() {
    let input = doc.getElementById("cod");
    console.log('input=',input);
    /* Prefer onkeyup for searching, because
       oninput will fire even when the user
       selects an option in datalist / select,
       thus triggering unneeded AJAX requests in
       search() function.
       Events sequence:
       keydown > keypress > input > keyup
     */
    if (input) {
      input.addEventListener("keyup", search, false);
      input.addEventListener('input', getSelectedOption, false);
    }
  });
})(document);