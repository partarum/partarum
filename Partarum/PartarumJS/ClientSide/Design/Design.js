var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// Partarum/PartarumJS/ClientSide/Events/MediaBoxEvent.js
var Enlarge = class {
  constructor(mediaBoxID, boxID, ev, type) {
    this.mediaBox = document.getElementById(mediaBoxID);
    this.boxID = boxID;
    this.box = document.getElementById(boxID);
    this.event = ev;
    this.type = type;
    let init = async () => {
      let one, two, three, four, five = false;
      switch (this.type) {
        case "mouseover":
          one = await this.firstStep();
          two = one === true ? await this.secondStep() : false;
          three = two === true ? await this.thirdStep() : false;
          four = three === true ? await this.fourthStep() : false;
          five = four === true ? await this.fifthStep() : false;
          break;
        case "click":
          two = await this.secondStep();
          three = two === true ? await this.thirdStep() : false;
      }
    };
    init().then();
  }
  firstStep() {
    return new Promise((resolve) => {
      let themeIds = Partarum.Cache.EventCache.getThemeIDs("MediaBoxPicture", "MediaBoxPicture_mouseover");
      for (let ar of themeIds) {
        let picture = document.getElementById(ar[1]);
        picture.removeEventListener("mouseover", Partarum.Cache.EventCache.getEvent("MediaBoxPicture", "MediaBoxPicture_mouseover", ar[0]));
      }
      resolve(true);
    });
  }
  secondStep(ev) {
    return new Promise((resolve) => {
      let start = () => {
        return new Promise((resolve2) => {
          for (let pic of this.mediaBox.children) {
            pic.id !== this.boxID && (() => {
              pic.classList.add("news-box-zeroBox");
            })();
            this.box.scrollIntoView({ block: "start", behavior: "smooth" });
          }
          resolve2();
        });
      };
      start().then(() => {
        for (let pic of this.mediaBox.children) {
          pic.id !== this.boxID && pic.classList.add("news-box-zero");
          this.box.scrollIntoView({ block: "start", behavior: "smooth" });
        }
        resolve(true);
      });
    });
  }
  setButtonBox() {
    let buttonBoxId = "ButtonBox_" + this.box.id;
    this.buttonBox = document.getElementById(buttonBoxId);
    if (!this.buttonBox) {
      let newBox = new Partarum();
      newBox.themes = [
        {
          buttonBox: {
            config: {
              footer: {
                _attributes: {
                  class: "box-row box-center-center",
                  style: "margin:auto; font-size: 3em; color: darkred;",
                  id: "ButtonBox_" + this.box.id
                },
                i: {
                  _attributes: {
                    class: "fa-duotone fa-circle-xmark",
                    id: "ButtonBox_" + this.box.id + "_close",
                    addEvent: {
                      type: "click",
                      topic: "MediaBoxPicture",
                      theme: "MediaBoxPicture_ButtonBox_click",
                      name: "MediaBoxPicture_ButtonBox_" + this.box.id + "_click",
                      targetID: "MediaBoxPicture_ButtonBox_" + this.box.id,
                      doThat: () => {
                        let box = document.getElementById("ButtonBox_" + this.box.id);
                        box.classList.remove("box-row");
                        box.classList.add("zero");
                        this.box.classList.remove("news-box-open");
                        for (let pic of this.mediaBox.children) {
                          pic.classList.remove("news-box-zero");
                          pic.classList.remove("news-box-zeroBox");
                          pic.classList.remove("news-box-open");
                        }
                      }
                    }
                  }
                }
              }
            },
            parent: this.box
          }
        }
      ];
      newBox.create().then();
    }
  }
  thirdStep() {
    return new Promise((resolve) => {
      localStorage.setItem("boxFocus", "1");
      this.box.classList.remove("news-box-zero");
      this.box.classList.remove("news-box-zeroBox");
      this.box.classList.add("news-box-open");
      this.box.style.position = "relative";
      this.box.scrollIntoView();
      resolve(true);
    });
  }
  fourthStep() {
    return new Promise((resolve, reject) => {
      let eventName = this.box.id + "_mouseout";
      Partarum.Cache.EventCache.create("MediaBoxPicture", "MediaBoxPicture_mouseout");
      Partarum.Cache.EventCache.setEvent({
        topic: "MediaBoxPicture",
        theme: "MediaBoxPicture_mouseout",
        name: eventName,
        targetID: this.box.id,
        bubbles: true,
        doThat: (ev) => {
          console.log("mouseout - soll: " + this.box.id + " - ist: " + ev.target.id);
          if (ev.target.parentElement.id === "mediaBox") {
            this.mediaBox.style.flexDirection = "row";
            this.box.classList.remove("news-box-open");
            this.whileCounter ??= 0;
            this.whileCounter++;
            console.dir(this.whileCounter);
            if (this.buttonBox) {
              this.buttonBox.remove("box-row");
              this.buttonBox.classList.add("zero");
            }
            for (let pic of this.mediaBox.children) {
              pic.classList.remove("news-box-zero");
              pic.classList.remove("news-box-zeroBox");
              pic.classList.remove("news-box-open");
            }
            let themeIds = Partarum.Cache.EventCache.getThemeIDs("MediaBoxPicture", "MediaBoxPicture_mouseout");
            for (let ar of themeIds) {
              this.box.removeEventListener("mouseout", Partarum.Cache.EventCache.getEvent("MediaBoxPicture", "MediaBoxPicture_mouseout", ar[0]), false);
            }
          } else {
          }
        }
      });
      setTimeout(() => {
        this.box.addEventListener("mouseout", Partarum.Cache.EventCache.getEvent("MediaBoxPicture", "MediaBoxPicture_mouseout", eventName), false);
        resolve(true);
      }, 500);
    });
  }
  fifthStep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let themeIds = Partarum.Cache.EventCache.getThemeIDs("MediaBoxPicture", "MediaBoxPicture_mouseover");
        for (let ar of themeIds) {
          let picture = document.getElementById(ar[1]);
          picture.addEventListener("mouseover", Partarum.Cache.EventCache.getEvent("MediaBoxPicture", "MediaBoxPicture_mouseover", ar[0]), { once: true });
        }
        resolve(true);
      }, 500);
    });
  }
  clickOn() {
  }
  clickOff() {
  }
  mouseoverOn() {
  }
  mouseoverOff() {
  }
  mouseoutOn() {
  }
  mouseoutOff() {
  }
};
var MediaBoxEvent = class {
  static enlarge(ev, boxID, type) {
    console.dir(type);
    let event = new Enlarge("mediaBox", boxID, ev, type);
  }
};

// Partarum/PartarumJS/ClientSide/Design/Barrier/Picture/PictureMenu.js
var PictureMenu = class {
  constructor(options) {
    this.getBackground();
  }
  static create(options) {
    Partarum.hasBackground = false;
    let box = new PictureMenu(options);
    return box.menu();
  }
  menu() {
    return {
      nav: {
        _attributes: {
          class: "box-row picture-menu"
        },
        button_shrink: this.shrink(),
        button_enlarge: this.enlarge()
      }
    };
  }
  enlarge() {
    return {
      _attributes: {
        text: "Bild vergr\xF6\xDFern"
      },
      i: {
        _attributes: {
          class: "fa-duotone fa-magnifying-glass-plus"
        }
      }
    };
  }
  shrink() {
    return {
      _attributes: {
        text: "Bild verkleinern"
      },
      i: {
        _attributes: {
          class: "fa-duotone fa-magnifying-glass-minus"
        }
      }
    };
  }
  getBackground() {
    const BACKGROUND_TYPES = [
      "background-color",
      "background-image"
    ];
    if (Partarum.hasBackground === false) {
      let body = window.getComputedStyle(document.body);
      let main = window.getComputedStyle(document.getElementsByTagName("main")[0]);
      for (let type of BACKGROUND_TYPES) {
        console.log("body - " + type + ": " + body.getPropertyValue(type));
        console.log("main - " + type + ": " + main.getPropertyValue(type));
      }
      Partarum.hasBackground = true;
    }
  }
};

// Partarum/PartarumJS/ClientSide/Design/MediaBox.js
var MediaBox = class {
  constructor(config) {
    console.dir(config);
    this.boxConfig = config.boxConfig || null;
    if (this.boxConfig.template.PartarumTemplate) {
      let template = this.boxConfig.template.PartarumTemplate;
      this.id = template.id;
      this.templateClass = template.templateName;
      this.cc = this.templateClass.configCache[this.id];
      this.PartarumTemplate = true;
    }
    this.boxValues = config.boxValues;
    this.Event = new MediaBoxEvent();
    this.filterObject();
  }
  filterObject() {
    if (this.boxConfig) {
      this.templateName = this.PartarumTemplate ? this.templateClass.name : this.boxConfig.templateName;
      this.boxEvents = this.boxConfig.events || null;
      this.barrier = this.boxConfig.barrier || false;
    }
  }
  mainTemplate() {
    return {
      _attributes: {
        class: "main-article media-box media-box-medium",
        id: "mediaBox"
      }
    };
  }
  createValueUser() {
  }
  createValueTemplate() {
  }
  createValue() {
    if (this.PartarumTemplate) {
      this.createValueTemplate();
    } else {
      this.createValueUser();
    }
    this.surfaceValue = this.mainTemplate();
    let counter = 1;
    if (this.boxValues) {
      for (let box of Object.keys(this.boxValues)) {
        let sectionID = "mediaBox_box_" + counter;
        let sectionTagName = "section_" + counter;
        if (this.PartarumTemplate) {
          Reflect.set(this.cc, sectionID, this.templateClass.create(this.cc.config));
          let partarumIntern = this.cc[sectionID].PartarumIntern;
          if (this.templateName === "MediaBoxPicture") {
            let pictureID = "mediaBox_picture_" + counter;
            Reflect.defineProperty(this.boxValues[box].$picture, "id", { value: pictureID });
            if (partarumIntern.events) {
              this.cc[sectionID].figure.img._attributes.addEvent = [];
              for (let eventName in partarumIntern.events) {
                let eventObject = {
                  topic: "MediaBoxPicture",
                  targetID: pictureID
                };
                switch (eventName) {
                  case "enlarge":
                    let eventType = partarumIntern.events[eventName] === "barrier" ? "click" : "mouseover";
                    eventObject.type = eventType;
                    eventObject.theme = "MediaBoxPicture_" + eventType;
                    eventObject.name = pictureID + "_" + eventType;
                    eventObject.doThat = (ev) => {
                      MediaBoxEvent.enlarge(ev, sectionID, eventType);
                    };
                }
                console.dir(eventObject);
                this.cc[sectionID].figure.img._attributes.addEvent.push(eventObject);
              }
            }
            Reflect.deleteProperty(this.cc[sectionID], "PartarumIntern");
          }
          let val = {
            _attributes: {
              class: this.barrier === true ? "picture-box-barrier" : "picture-box",
              id: sectionID
            }
          };
          if (this.barrier === true) {
            let pictureMenu = PictureMenu.create();
            Reflect.set(val, "nav", pictureMenu.nav);
          }
          let importObject = {
            template: {
              name: sectionID,
              surface: this.cc[sectionID],
              valueFile: this.boxValues[box]
            }
          };
          Reflect.set(val, "_import", importObject);
          Reflect.set(this.surfaceValue, sectionTagName, val);
          counter++;
        }
      }
    }
    return this.surfaceValue;
  }
  static create(config) {
    const mediaBox = new MediaBox(config);
    return mediaBox.createValue();
  }
  static init() {
  }
  static typePicture() {
  }
};

// Partarum/PartarumJS/ClientSide/Design/MediaBox/MediaBoxPicture.js
var _MediaBoxPicture = class {
  constructor(config, barrier = false) {
    this.headline = config.headline || _MediaBoxPicture.HEADLINE_UNDER_IMAGE;
    this.picture = config.picture || _MediaBoxPicture.STYLE_ORIGINAL;
    this.barrier = barrier;
    this.events = config.events || null;
    if (this.events) {
      this.enlarge = this.events.enlarge || null;
    }
  }
  headlineTemplate() {
    return {
      h2: {
        $headline: {
          _type: "text"
        }
      }
    };
  }
  imageTemplate() {
    return {
      img: {
        $picture: {
          src: {
            _type: "_attributes",
            _value: {
              src: ""
            }
          },
          alt: {
            _type: "_attributes",
            _value: {
              alt: ""
            }
          },
          id: {
            _type: "_attributes",
            _value: {
              id: ""
            }
          }
        },
        _attributes: {}
      }
    };
  }
  figcaptionText() {
    return {
      p: {
        $description: {
          _type: "text"
        }
      }
    };
  }
  figcaptionTemplate() {
    let figcaptionBody = {};
    if (this.headline === _MediaBoxPicture.HEADLINE_UNDER_IMAGE) {
      Reflect.set(figcaptionBody, "h2", this.headlineTemplate().h2);
    }
    Reflect.set(figcaptionBody, "p", this.figcaptionText().p);
    return {
      figcaption: figcaptionBody
    };
  }
  figureBody() {
    let body = {};
    if (this.headline === _MediaBoxPicture.HEADLINE_OVER_IMAGE) {
      Reflect.set(body, "h2", this.headlineTemplate().h2);
    }
    Reflect.set(body, "img", this.imageTemplate().img);
    Reflect.set(body, "figcaption", this.figcaptionTemplate().figcaption);
    return body;
  }
  template() {
    let figure = {
      figure: {
        ...this.figureBody()
      },
      PartarumIntern: {
        template: "MediaBoxPicture"
      }
    };
    if (this.events) {
      figure.PartarumIntern.events ??= {};
      for (let event in this.events) {
        Reflect.set(figure.PartarumIntern.events, event, this.events[event]);
      }
    }
    return figure;
  }
  static create(config) {
    let picbox = new _MediaBoxPicture(config);
    return picbox.template();
  }
  static init(config) {
    let id = "mediaBox_" + _MediaBoxPicture.counter;
    Reflect.set(_MediaBoxPicture.configCache, id, {
      config
    });
    return {
      PartarumTemplate: {
        templateName: _MediaBoxPicture,
        id
      }
    };
  }
};
var MediaBoxPicture = _MediaBoxPicture;
__publicField(MediaBoxPicture, "STYLE_ORIGINAL", 2);
__publicField(MediaBoxPicture, "STYLE_MOVIE", 4);
__publicField(MediaBoxPicture, "HEADLINE_OVER_IMAGE", 8);
__publicField(MediaBoxPicture, "HEADLINE_UNDER_IMAGE", 16);
__publicField(MediaBoxPicture, "configCache", {});
__publicField(MediaBoxPicture, "counter", 1);

// Partarum/PartarumJS/ClientSide/Design/Design.js
var Design = class {
  static MediaBox(template) {
    return MediaBox.create(template);
  }
  static MediaBoxPicture(config) {
    return MediaBoxPicture.init(config);
  }
};
__publicField(Design, "STYLE_ORIGINAL", 2);
__publicField(Design, "STYLE_MOVIE", 4);
__publicField(Design, "HEADLINE_OVER_IMAGE", 8);
__publicField(Design, "HEADLINE_UNDER_IMAGE", 16);
export {
  Design
};
//# sourceMappingURL=Design.js.map
