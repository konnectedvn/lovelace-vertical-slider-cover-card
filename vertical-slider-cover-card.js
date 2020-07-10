/*
 * Author        : duytruong
 * Github        : https://github.com/konnectedvn
 * Description   : 
 * Date          : 02 Jul 2020 02:38:30
 * Based on      : github.com/DBuit/hass-smart-home-panel-card (Thanks to DBuit!)
 */

console.info("%c [konnected.vn] Vertical Slider Cover Card  \n%c Version 0.0.6","color: red; font-weight: bold; background: black", "color: white; font-weight: bold; background: dimgray");

import {
    LitElement,
    html,
    css
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";
class VerticalSliderCoverCard extends LitElement {
  
  static get properties() {
    return {
      hass: {},
      config: {},
      active: {}
    };
  }
  
  constructor() {
    super();
  }
  
  render() {
    var positionWidth = this.config.positionWidth ? this.config.positionWidth : "100px";
    var positionHeight = this.config.positionHeight ? this.config.positionHeight : "300px";
    var switchWidth = this.config.switchWidth ? this.config.switchWidth : "100px";
    var switchHeight = this.config.switchHeight ? this.config.switchHeight : "100px";
    var gapWidth = this.config.gapWidth ? this.config.gapWidth : "50px";
    
    var countText = this.config.countText ? this.config.countText : "covers open";
    var entityCounter = 0;
    
    var showButton = this.config.showButton == "show" ? true : false;
    var buttonText = this.config.buttonText ? this.config.buttonText : "Home";
    var buttonPath = this.config.buttonPath ? this.config.buttonPath : "/lovelace/0";
    var buttonService = this.config.buttonService ? this.config.buttonService: "";
    var buttonData = this.config.buttonData ? this.config.buttonData : "";
    
    var background = this.config.background ? this.config.background : "transparent";
    var sideColor1 = this.config.sideColor1 ? this.config.sideColor1 : '#ffcccc';
    var sideColor2 = this.config.sideColor2 ? this.config.sideColor2 : '#b30000';
    var switchColor = this.config.switchColor ? this.config.switchColor : sideColor2;
    var closedColor = this.config.closedColor ? this.config.closedColor : 'hsl(0, 0%, 20%)';
    var openColor = this.config.openColor ? this.config.openColor: 'hsl(0, 0%, 90%, 0.6)';
    var panelType = this.config.panelType;
    return html`
        <ha-card>
        <div class="page" style="background:${background};">
        
          <div class="side" style="--side-width:${this._panelSize(panelType)};--sideColor-1:${sideColor1};--sideColor-2:${sideColor2};">
            <div class="header">
              
            </div>
            <div class="center">
              <div class="icon">
                <ha-icon icon="${this.config.icon}" />
              </div>
              <h1>${this.config.title}</h1>
              <h3>${this._stateCount()} ${countText}</h3>
            </div>
            <div class="bottom">
                ${showButton ? html`<button class="back-btn" @click=${e => this._navigate(buttonPath,buttonService,buttonData)}>${buttonText}</button>` : html``}
            </div>
          </div>
          
          <div class="main">
            <div class="inner-main" style="width:${this.config.entities.length * this._coverSize(positionWidth, gapWidth)}px;">
            ${this.config.entities.map(ent => {
                entityCounter++;
                var switchValue = 0;
                const stateObj = this.hass.states[ent.entity];
                switch(stateObj.state) {
                    case 'open':
                        switchValue = 100;
                        break;
                    case 'closed':
                        switchValue = 0;
                        break;
                    default:
                        switchValue = 0;
                }
                return stateObj ? html`
                    <div class="cover" style="--cover-width:${this._coverSize(positionWidth,gapWidth)}px;">
                      <div class="cover-slider">
                        <p class="cover-name" style="--cover-fontSize: ${this._coverNameFont(positionWidth,gapWidth)}px;">${ent.name || stateObj.attributes.friendly_name}</p>
                        ${stateObj.attributes.supported_features > 9 ? html`
                            <p class="cover-position" style="--cover-fontSize: ${parseInt(positionWidth.replace(/px/,"")) / 4 - (parseInt(positionWidth.replace(/px/,"")) - 60) / 4}px;">${stateObj.state === "closed" ? 0 : Math.round(stateObj.attributes.current_position)}</p>
                            <div class="range-holder" style="--slider-height: ${positionHeight};--closed-color: ${closedColor};">
                              <input type="range" class="${stateObj.state}" style="--slider-width: ${positionWidth};--slider-height: ${positionHeight};--closed-color: ${closedColor};--open-color: ${openColor};" .value="${stateObj.state === "closed" ? 0 : Math.round(stateObj.attributes.current_position)}" @change=${e => this._setPosition(stateObj, e.target.value)}>
                            </div>
                        ` : html`
                            <h4>${stateObj.state}</h4>
                            <div class="switch-holder" style="--switch-height: ${switchHeight};">
                              <input type="range" class="${stateObj.state}" style="--switch-width: ${switchWidth};--switch-height: ${switchHeight};" value="0" min="0" max="1" .value="${switchValue}" @change=${e => this._switch(stateObj)}>
                            </div>
                        `}
                        <div class="toggle">
                            <input ?checked=${stateObj.state == "open"} type="checkbox" id="toggle${entityCounter}" class="toggle-btn" @change=${e => this._switch(stateObj)} />
                            <label for="toggle${entityCounter}" style="--switch-width: ${switchWidth};--switch-height: ${switchHeight};--switch-color: ${switchColor};--switch-labelSize: ${parseInt(switchWidth.replace(/px/,"")) / 5}px;"><span></span></label>
                            </div>
                      </div>
                    </div>
                `: html``;
            })}
            </div>
          </div>
        </div>
        </ha-card>
    `;
  }
  
  updated() {}

  _setPosition(state, value) {
    this.hass.callService("cover", "set_cover_position", {
        entity_id: state.entity_id,
        position: value
    });
  }
  
  _stateCount() {
      let count = 0;
      this.config.entities.map(ent => {
          const stateObj = this.hass.states[ent.entity];
          if(stateObj.state === "open") {
              count++;
          }
      })
      return count;
  }
  
  _panelSize(panelType) {
    let sideWidth = 40;
    if (panelType === true) {
		sideWidth = 30;
	}
  	return sideWidth;
  }
    
  _coverSize(positionWidth, gapWidth) {
    return (parseInt(positionWidth.replace(/px/,"")) + parseInt(gapWidth.replace(/px/,"")));
  }
  
  _coverNameFont(positionWidth, gapWidth) {
    var maxLength = 0;
    this.config.entities.map(ent => {
          const stateObj = this.hass.states[ent.entity];
          var name = ent.name || stateObj.attributes.friendly_name;
          if(name.length > maxLength) {
              maxLength = name.length;
          }
      })
    return (((parseInt(positionWidth.replace(/px/,"")) + parseInt(gapWidth.replace(/px/,"")) - 4 ) / maxLength) * 1.8) | 0;
  }
  
  _switch(state) {
      this.hass.callService("cover", "stop_cover", {
        entity_id: state.entity_id    
      });
  }
  
  _navigate(path,service,data) {
    if (service.length === 0) {
      window.location.href = path;
    } else {
      var domain = service.split(".",2)[0];
      var ser = service.split(".",2)[1];
      this.hass.callService(domain,ser, {
        entity_id: data
      });
    }
  }
  
  setConfig(config) {
    if (!config.entities) {
      throw new Error("You need to define entities");
    }
    if (!config.title) {
      throw new Error("You need to define a title");
    }
    if (!config.icon) {
      throw new Error("You need to define a icon");
    }
    this.config = config;
  }

  getCardSize() {
    return this.config.entities.length + 1;
  }
  
  static get styles() {
    return css`
   		:host([is-panel]) ha-card {
      	  left: 50;
      	  top: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          border-radius: 0px;
        }
        ha-card {
      	  overflow: hidden;
      	  width: 100%;
      	  height: 100%;
      	  display: flex;
      	  justify-content: center;
    	}
        .page {
          width:100%;
          height:100%;
          display:flex;
          flex-direction: row;
        }
        .page > .side {
          padding: 10px;
          width: var(--side-width)%;
          display:flex;
          flex-direction:column;
          background: rgb(28,122,226);
          background: linear-gradient(145deg, var(--sideColor-1) 0%, var(--sideColor-2) 90%);
          justify-content:space-between
        }
        .side .header {
        }
        .side .center {
          display:flex;
          flex-direction:column;
        }
        .side .center .icon {
          display:block;
          overflow:hidden;
        }
        .side .center .icon ha-icon {
          color:#fff;
        }
        .side .center  h1 {
          color:#FFF;
          margin:10px 0 0 0;
          font-weight:400;
          font-size: 40px;
          line-height: 40px;
        }
        .side .center  h3 {
          color:#FFF;
          margin:5px 0 0 0;
          font-size: 20px;
          font-weight: 400;
          margin: 0;
        }
        
        .side .bottom {
        }
        
        .back-btn {
          border:2px solid #FFF;
          color:#FFF;
          background:transparent;
          font-size:24px;
          border-radius:4px;
          width:100%;
          display:block;
          padding: 10px 0;
        }
        
        .page > .main {
          width:70%;
          overflow-x:scroll;
        }
        .page > .main > .inner-main {
            display:flex;
            flex-direction:row;
            align-items:center;
            height:100%;
            margin:auto;
        }
        .page > .main > .inner-main > .cover {
          width: var(--cover-width);
          display:inline-block;
        }
        
        .cover .icon {
          margin: 0 auto;
          text-align:center;
          display:block;
          height: 50px;
          width: 50px;
          color: rgba(255,255,255,0.3);
          font-size: 30px;
          padding-top:5px;
        }
        .cover .icon ha-icon {
          width: 30px;
          height: 30px;
          text-align:center;
        }
        .cover .icon.on ha-icon {
          fill: #f7d959;
        }
        h2 {
          color: #FFF;
          display: block;
          font-weight: 300;
          margin-bottom: 10px;
          text-align: center;
          font-size:20px;
          margin-top:0;
        }
        
        h3 {
          color: #FFF;
          display: block;
          font-weight: 300;
          margin-top: 5px;
          margin-bottom: 5px;
          text-align: center;
          font-size:18px;
        }
        
        .cover-name {
          display: block;
          font-weight: 300;
          margin-top: 5px;
          margin-bottom: 5px;
          text-align: center;
          font-size: var(--cover-fontSize);
        }
        .cover-position {
          display: block;
          font-weight: 300;
          margin-top: 7px;
          margin-bottom: 20px;
          text-align: center;
          font-size: var(--cover-fontSize);
        }
        .cover-slider .cover-name, .cover-position {
          color: var(--primary-text-color);
        }
        
        h4 {
          color: var(--primary-text-color);
          display: block;
          font-weight: 300;
          margin-bottom: 20px;
          text-align: center;
          font-size:16px;
          margin-top:0;
        }
        h4.position:after {
          content: "%";
          padding-left: 1px;
        }
        
        .range-holder {
          height: var(--slider-height);
          position:relative;
          display: block;
        }
        .range-holder input[type="range"] {
          outline: 0;
          border: 0;
          border-radius: 4px;
          width: var(--slider-height);
          margin: 0;
          transition: box-shadow 0.2s ease-in-out;
          -webkit-transform:rotate(270deg);
          -moz-transform:rotate(270deg);
          -o-transform:rotate(270deg);
          -ms-transform:rotate(270deg);
          transform:rotate(270deg);
          overflow: hidden;
          height: var(--slider-width);
          -webkit-appearance: none;
          background-color: var(--closed-color);
          position: absolute;
          top: calc(50% - (var(--slider-width) / 2));
          right: calc(50% - (var(--slider-height) / 2));
        }
        .range-holder input[type="range"]::-webkit-slider-runnable-track {
          height: var(--slider-width);
          -webkit-appearance: none;
          color: var(--open-color);
          margin-top: 0px;
          transition: box-shadow 0.2s ease-in-out;
        }
        .range-holder input[type="range"]::-webkit-slider-thumb {
          width: calc((var(--slider-width) / 4) - 2px);
          border-right:8px solid var(--closed-color);
          border-left:8px solid var(--closed-color);
          border-top:20px solid var(--closed-color);
          border-bottom:20px solid var(--closed-color);
          -webkit-appearance: none;
          height: var(--slider-width);
          cursor: ew-resize;
          background: var(--closed-color);
          box-shadow: -350px 0 0 350px var(--open-color), inset 0 0 0 80px #969696;
          border-radius: 0;
          transition: box-shadow 0.2s ease-in-out;
          position: relative;
          top: 0;
        }
        // .range-holder input[type="range"].on::-webkit-slider-thumb {
        //     border-color: #1c7ae2;
        //     box-shadow: -350px 0 0 350px #1c7ae2, inset 0 0 0 80px #FFF;
        // }
        
        .switch-holder {
          height: var(--switch-height);
          position:relative;
          display: block;
        }
        .switch-holder input[type="range"] {
          outline: 0;
          border: 0;
          border-radius: 4px;
          width: calc(var(--switch-height) - 20px);
          margin: 0;
          transition: box-shadow 0.2s ease-in-out;
          -webkit-transform: rotate(270deg);
          -moz-transform: rotate(270deg);
          -o-transform: rotate(270deg);
          -ms-transform: rotate(270deg);
          transform: rotate(270deg);
          overflow: hidden;
          height: calc(var(--switch-width) - 20px);
          -webkit-appearance: none;
          background-color: var(--switch-color);
          padding: 10px;
          position: absolute;
          top: calc(50% - (var(--switch-width) / 2));
          right: calc(50% - (var(--switch-height) / 2));
        }
        .switch-holder input[type="range"]::-webkit-slider-runnable-track {
          height: calc(var(--switch-width) - 20px);
          -webkit-appearance: none;
          color: var(--switch-color);
          margin-top: -1px;
          transition: box-shadow 0.2s ease-in-out;
        }
        .switch-holder input[type="range"]::-webkit-slider-thumb {
          width: calc(var(--switch-height) / 2);
          -webkit-appearance: none;
          height: calc(var(--switch-width) - 20px);
          cursor: ew-resize;
          background: var(--switch-color);
          transition: box-shadow 0.2s ease-in-out;
          box-shadow: -340px 0 0 350px #4d4d4d, inset 0 0 0 80px #969696;
          position: relative;
          top: 0;
          border-radius: 4px;
        }
        // .switch-holder input[type="range"].on::-webkit-slider-thumb {
        //     box-shadow: -340px 0 0 350px #4d4d4d, inset 0 0 0 80px #1c7ae2;
        // }
        
        .toggle {
          margin-top:20px;
          margin-bottom: 10px;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .toggle > input.toggle-btn {
          display: none;
        }
        .toggle > input.toggle-btn + label {
          border: 1px solid #FFF;
          background: transparent;
          width: var(--switch-width);
          height: var(--switch-height);
          text-align:center;
          line-height: var(--switch-height);
          cursor: pointer;
          border-radius: 4px;
          color: #FFF;
          display:block;
          font-size:var(--switch-labelSize);
        }
        .toggle > input.toggle-btn + label:active,
        .toggle > input.toggle-btn + label {
          background: var(--switch-color);
          border-color: var(--switch-color);  
        }
        .toggle > input.toggle-btn + label> span:before {
          content: 'STOP';
        }
    `;
  }  
  
}

customElements.define('vertical-slider-cover-card', VerticalSliderCoverCard);