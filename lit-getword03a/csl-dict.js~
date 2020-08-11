import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';

class cslDict extends LitElement {
  static get styles() {
   return [
    
   ];
  }
  
  static get properties() {
    return {
      dict:  { type: String },
    };
  }

  constructor() {
    super();
    this.dict="mw";
  }
  dictnames = 
[['WIL' , 'Wilson Sanskrit-English Dictionary'],
['YAT' , 'Yates Sanskrit-English Dictionary'],
['GST' , 'Goldstücker Sanskrit-English Dictionary'],
['BEN' , 'Benfey Sanskrit-English Dictionary'],
['MW72' , 'Monier-Williams Sanskrit-English Dictionary'],
['AP90' , 'Apte Practical Sanskrit-English Dictionary'],
['CAE' , 'Cappeller Sanskrit-English Dictionary'],
['MD' , 'Macdonell Sanskrit-English Dictionary'],
['MW' , 'Monier-Williams Sanskrit-English Dictionary'],
['SHS' , 'Shabda-Sagara Sanskrit-English Dictionary'],
['BHS' , 'Edgerton Buddhist Hybrid Sanskrit Dictionary'],
['AP' , 'Practical Sanskrit-English Dictionary, revised edition'],
['PD' , 'An Encyclopedic Dictionary of Sanskrit on Historical Principles'],
['MWE' , 'Monier-Williams English-Sanskrit Dictionary'],
['BOR' , 'Borooah English-Sanskrit Dictionary'],
['AE' , 'Apte Student English-Sanskrit Dictionary'],
['BUR' , 'Burnouf Dictionnaire Sanscrit-Français'],
['STC' , 'Stchoupak Dictionnaire Sanscrit-Français'],
['PWG' , 'Böhtlingk and Roth Grosses Petersburger Wörterbuch'],
['GRA' , 'Grassman Wörterbuch zum Rig Veda'],
['PW' , 'Böhtlingk Sanskrit-Wörterbuch in kürzerer Fassung'],
['CCS' , 'Cappeller Sanskrit Wörterbuch'],
['SCH' , 'Schmidt Nachträge zum Sanskrit-Wörterbuch'],
['BOP' , 'Bopp Glossarium Sanscritum'],
['SKD' , 'Sabda-kalpadruma'],
['VCP' , 'Vacaspatyam'],
['INM' , 'Index to the Names in the Mahabharata'],
['VEI' , 'The Vedic Index of Names and Subjects'],
['PUI' , 'The Purana Index'],
['ACC' , 'Aufrecht Catalogus Catalogorum'],
['KRM' , 'Kṛdantarūpamālā'],
['IEG' , 'Indian Epigraphical Glossary'],
['SNP' , 'Meulenbeld Sanskrit Names of Plants'],
['PE' , 'Puranic Encyclopedia'],
['PGN' , 'Personal and Geographical Names in the Gupta Inscriptions'],
['MCI' , 'Mahabharata Cultural Index']
];
  dictitemF = function(item) {
   let value = item[0];
   let name  = item[1];
   let markup;
   if (this.dict.toLowerCase() == value.toLowerCase()) {
    markup = html`<option value="${value}" selected>${name}</option>`;
   } else {
    markup = html`<option value="${value}">${name}</option>`;
   }
   return markup;
  }
  onChangeF (event) {
    //event.preventDefault();
    this.dict = event.target.value;
    console.log('csl-dict: new value of this.dict=',this.dict);
    var new_event = new CustomEvent('new-dict',
     {detail: {dict:this.dict}
     });
    this.dispatchEvent(new_event);  // this. is needed. Not sure why
  }

  render() {
    return html`
<div id="dictdiv">
  <select name="input" id="input" 
   @change=${this.onChangeF}>
   ${this.dictnames.map(item =>this.dictitemF(item))}
  </select>
 </div>      
    `;
  }
}
//   @onchange=${this.onChangeF}>

customElements.define('csl-dict', cslDict);

/*
    
  <!-- <label for="input">input</label> -->

  
    }
<!--
   <option value='hk' selected='selected'>KH </option>
   <option value='slp1'>SLP1</option>
   <option value='itrans'>ITRANS</option>
   <option value='deva'>Devanagari</option>
   <option value='roman'>IAST</option>
-->
*/
