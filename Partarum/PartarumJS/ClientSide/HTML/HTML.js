var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// Partarum/PartarumJS/ClientSide/HTML/HTMLPartarumElement.js
var HTMLPartarumElement = class extends HTMLElement {
  root = {
    dom: {},
    app: new Partarum(),
    constructed: false,
    initialized: false,
    initializedSuper: false,
    connected: false,
    connectedCallback: function(callback) {
      if (this.initialized === false) {
        this.initialized = true;
        callback();
      }
    }
  };
  constructor(config, name, dom, id) {
    super();
    this.root.constructed = true;
    this.root.dom = dom;
    this.root.config = config;
    this.root.name = name;
    this.root.id = typeof id === "string" ? id.replace(" ", "_") : "";
  }
  connectedCallback() {
    if (this.root.initializedSuper === false) {
      this.id = this.root.id;
      this.setConfig(this.root.config, this.root.name);
      this.root.initializedSuper = true;
    }
  }
  setConfig(config, needle, element = this) {
    if (config !== void 0) {
      if ("surface" in config) {
        if (Reflect.has(config.surface, needle)) {
          if (Reflect.has(config.surface[needle], "style")) {
            for (let style in config.surface[needle].style) {
              element.style[style] = config.surface[needle].style[style];
            }
          }
        }
      }
    }
  }
  initAddElement(name, element, parent = "shadowBox", config = this.root.config, place = "append") {
    this.root.dom.add(name, element, null);
    this.setConfig(config, name, element);
    this.root.dom.add(parent, element, place);
  }
  add(element, topic) {
    this.root.dom.add(topic, element, "append");
  }
  addTopic(parent, topic, elementName) {
    let topicArray = Array.isArray(topic) ? topic : [topic];
    return new Promise((resolve) => {
      let topicCounter = 0;
      for (let topicName of topicArray) {
        this.root.dom.add(topicName, document.createElement(elementName));
        this.root.dom.add(parent, this.root.dom.get(topicName), "append");
        if (topicCounter === topicArray.length) {
          resolve(true);
        }
        topicCounter++;
      }
    });
  }
};
customElements.get("partarum-element") === void 0 && customElements.define("partarum-element", HTMLPartarumElement);

// Partarum/PartarumJS/ClientSide/HTML/HTMLPartarumHost.js
var _base, base_fn;
var HTMLPartarumHost = class extends HTMLPartarumElement {
  constructor(config, name, id) {
    super(config, name, id);
    __privateAdd(this, _base);
    __privateMethod(this, _base, base_fn).call(this);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  loadStyle(config) {
    return new Promise((resolve) => {
      let linkCounter = 0;
      let linkStatus = false;
      let styleCounter = 0;
      let styleStatus = false;
      if (Reflect.has(config, "link")) {
        let linkArray = Array.isArray(config.link) ? config.link : [config.link];
        for (let link of linkArray) {
          let linkElement = document.createElement("link");
          linkElement.setAttribute("rel", "stylesheet");
          linkElement.setAttribute("type", "text/css");
          linkElement.setAttribute("href", link);
          this.root.dom.add("shadowBox", linkElement.cloneNode(true), "append");
          linkCounter++;
          linkStatus = linkCounter === linkArray.length;
        }
      } else {
        linkStatus = true;
      }
      if (Reflect.has(config, "style")) {
        let styleList = Array.isArray(config.style) ? config.style : config.style instanceof NodeList ? config.style : [config];
        for (let style of styleList) {
          this.root.dom.add("shadowBox", style.cloneNode(true), "append");
          styleCounter++;
          styleStatus = styleCounter === styleList.length;
        }
      } else {
        styleStatus = true;
      }
      function checkStatus() {
        if (styleStatus === true && linkStatus === true) {
          resolve(true);
        }
      }
      let inID = setInterval(checkStatus, 100);
    });
  }
};
_base = new WeakSet();
base_fn = function() {
  this.partarum = window.Partarum;
  this.root.dom = this.partarum.Cache.HTMLCache.create("partarum-host", this.root.name);
  this.root.dom.add("shadowBox", this.attachShadow({ mode: "open" }), null);
  let partarumCSS = document.createElement("link");
  partarumCSS.setAttribute("rel", "stylesheet");
  partarumCSS.setAttribute("type", "text/css");
  partarumCSS.setAttribute("href", "/Partarum/css");
  this.root.dom.add("shadowBox", partarumCSS, "append");
};
__publicField(HTMLPartarumHost, "cache");
customElements.get("partarum-host") === void 0 && customElements.define("partarum-host", HTMLPartarumHost);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCardBox/HTMLCardBoxHeader.js
var HTMLCardBoxHeader = class extends HTMLPartarumElement {
  constructor(config, id = null) {
    super(config, "header");
    this.id = id || "";
  }
  addTopic(topic) {
    super.addTopic(topic, "button");
  }
  addMenu() {
  }
  addCanvas() {
  }
};
customElements.get("partarum-card-box-header") === void 0 && customElements.define("partarum-card-box-header", HTMLCardBoxHeader);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCardBox/HTMLCardBoxMenu.js
var HTMLCardBoxMenu = class extends HTMLPartarumElement {
  constructor(config, id, dom) {
    super(config, "menu", dom, id);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  add(element, topic) {
    this.root.dom.add(topic, element, "append");
  }
  addTopic(topic, id, elementName = "button", cardBoxObject, position = "start") {
    return new Promise((resolve) => {
      let topicArray = Array.isArray(topic) ? topic : [topic];
      let topicCounter = 0;
      this.root.dom.get("Listener").add("windowScroll", () => {
        this.setClickEvent(this);
      });
      window.addEventListener("scroll", this.root.dom.get("Listener").get("windowScroll"), { once: true });
      for (let topicName of topicArray) {
        let topicNode = document.createElement(elementName);
        let buttonID = "button_" + id;
        topicNode.setAttribute("id", buttonID);
        topicNode.classList.add("product-category-button");
        let idNew = "productCategory_" + id;
        let loader = this.root.dom.get("Loader");
        loader.add(buttonID, idNew);
        let h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode(topicName));
        topicNode.appendChild(h3);
        this.appendChild(topicNode);
        this.root.dom.add(buttonID, topicNode);
        topicCounter++;
      }
      resolve(true);
    });
  }
  setClickEvent(that) {
    console.dir("click");
    let loadStatus = that.root.dom.get("Loader").get("Status");
    if (loadStatus === 0) {
      let loadCache = that.root.dom.getAllOfTheme("CardBox", "Loader");
      let loadObject = Object.fromEntries(loadCache.entries());
      let loadCounter = 0;
      for (let loadKey in loadObject) {
        if (loadKey !== "Status") {
          let groupBox = that.root.dom.get(loadObject[loadKey]);
          let data = groupBox.data;
          data.groupButton = loadKey;
          let buttonNode = that.root.dom.get(loadKey);
          buttonNode.addEventListener("click", (ev) => {
            console.dir("clcik");
            console.dir(ev);
            that.displayCategory(groupBox);
          });
          loadCounter === 0 && buttonNode.click();
          loadCounter++;
        }
      }
      that.root.dom.get("Loader").add("Status", 1);
    } else {
      console.dir("is loaded");
    }
  }
  displayCategory(catBox) {
    console.dir(catBox);
    const topic = catBox.topic;
    const data = catBox.data;
    const catID = topic.id;
    let cacheBox = this.root.dom.get("DisplayCategories").get(catID);
    let displayMenu = this.root.dom.get("DisplayMenu").get(catID);
    let nodeObject;
    let idArray = [];
    if (cacheBox === null) {
      idArray.push(catID);
      let categories = this.root.dom.getAllOfTheme("CardBox", "Categories");
      nodeObject = Object.fromEntries(categories.entries());
      let aktNode = nodeObject[catID];
      let aktNodeData = aktNode.data;
      let aktNodeType = aktNode.type;
      switch (aktNodeType) {
        case "WithSubCategories":
          idArray.push(aktNodeData.subCategories[0]);
          idArray.push(displayMenu.categoryMenu);
          idArray.push(displayMenu.categoryCanvas);
          break;
        case "SubCategories":
          idArray.push(aktNodeData.category);
          displayMenu = this.root.dom.get("DisplayMenu").get(aktNodeData.category);
          idArray.push(displayMenu.categoryMenu);
          idArray.push(displayMenu.categoryCanvas);
      }
      this.root.dom.get("DisplayCategories").add(catID, [nodeObject, idArray]);
    } else {
      nodeObject = cacheBox[0];
      idArray = cacheBox[1];
    }
    let cardDrawBox = this.root.dom.get("CardDrawBox");
    let canvas = this.root.dom.get(displayMenu?.categoryCanvas) ?? this.root.dom.get("canvas");
    let getList = this.root.dom.get("Listener").get("windowResize");
    if (getList === null) {
      this.root.dom.get("Listener").add("windowResize", () => {
        let width = this.root.dom.get(displayMenu?.categoryMenu)?.offsetWidth ?? this.root.dom.get("productGroupNav").offsetWidth;
        canvas.width = width.toString();
        this.root.dom.get("canvas").width = width;
        for (let upCat of this.root.dom.getAllOfTheme("CardBox", "DisplayCategories").entries()) {
          cardDrawBox.plotter.clearBoard(canvas.id, "canvas");
          cardDrawBox.plotter.update("setLine", upCat[0]);
        }
      });
      window.addEventListener("resize", this.root.dom.get("Listener").get("windowResize"), false);
    }
    for (let groupObject in nodeObject) {
      let group = nodeObject[groupObject].topic;
      if (idArray.includes(group.id) === false) {
        if (group.classList.length !== 0) {
          if (group.classList.contains("grid")) {
            group.classList.replace("grid", "zero");
          }
        } else {
          group.classList.add("zero");
        }
      } else {
        if (group.classList.length !== 0) {
          if (group.classList.contains("zero")) {
            group.classList.replace("zero", "grid");
          }
        }
      }
    }
    canvas.classList.replace("zero", "inline");
    if (displayMenu === null) {
      if ("category" in data) {
        let catCan = this.root.dom.get("DisplayMenu").get(data.category);
        cardDrawBox.plotter.clearBoard(catCan.categoryCanvas);
      } else {
        cardDrawBox.plotter.clearBoard("canvas");
      }
    } else {
      if ("subCategories" in data) {
        cardDrawBox.plotter.clearBoard(canvas.id, "canvas");
      } else {
        cardDrawBox.plotter.clearBoard(canvas.id);
      }
    }
    this.root.dom.get("LastDraw").clear();
    console.dir(cardDrawBox.plotter.isCollected("setLine", catID));
    if (cardDrawBox.plotter.isCollected("setLine", catID)) {
      if (canvas.width === 0) {
        canvas.width = this.root.dom.get(displayMenu.categoryMenu).offsetWidth;
      }
      cardDrawBox.plotter.update("setLine", catID);
    } else {
      let childBox = catBox.themes;
      if (Object.keys(childBox).length !== 0) {
        this.root.dom.get("LastDraw").add(catID, "");
        for (let child in childBox) {
          cardDrawBox.setLines(canvas, catID, this.root.dom.get(data.groupButton), childBox[child].theme);
        }
      } else {
        this.root.dom.get("LastDraw").add(catID);
        for (let sub of data.subCategories) {
          let subObject = this.root.dom.get(sub);
          cardDrawBox.setLines(this.root.dom.get("canvas"), catID, this.root.dom.get(data.groupButton), this.root.dom.get(subObject.data.groupButton));
        }
        let firstChild = this.root.dom.get(data.subCategories[0]);
        this.root.dom.get("LastDraw").add(data.subCategories[0]);
        let subThemes = firstChild.themes;
        for (let subThemeCard in subThemes) {
          let themeNode = subThemes[subThemeCard].theme;
          let subCanvas = this.root.dom.get(displayMenu.categoryCanvas);
          cardDrawBox.setLines(subCanvas, data.subCategories[0], this.root.dom.get(firstChild.data.groupButton), themeNode);
        }
      }
    }
  }
};
customElements.get("partarum-card-box-menu") === void 0 && customElements.define("partarum-card-box-menu", HTMLCardBoxMenu);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCardBox/HTMLCardThemeBox.js
var HTMLCardThemeBox = class extends HTMLPartarumElement {
  constructor(config, dom, id, cardBoxObject) {
    super(config, "section", dom, id);
    this.root.cardBoxObject = cardBoxObject;
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = this.root.id;
    this.root.title = this.root.cardBoxObject.title;
    this.root.topicDOM = this.root.dom.get(this.root.cardBoxObject.parent);
    this.root.themeDOM = Reflect.get(this.root.topicDOM.themes, this.root.cardBoxObject.id);
    this.root.mainInfoObject = this.root.cardBoxObject.mainInfo ?? null;
    this.root.featureObject = this.root.cardBoxObject.features ?? null;
    this.loadElements().then();
  }
  async loadElements() {
    await this.setSlogan();
    if (this.root.mainInfoObject !== null) {
      await this.setMainInfo();
      await this.setLifetime(this.root.mainInfoObject.lifetime);
      await this.setPrice(this.root.mainInfoObject.price);
      await this.setLinkPage(this.root.mainInfoObject.link);
    }
    if (this.root.featureObject !== null) {
      await this.setFeatures(this.root.featureObject);
    }
  }
  setSlogan() {
    return new Promise((resolve) => {
      let sloganBox = document.createElement("header");
      let sloganText = document.createElement("h3");
      sloganText.appendChild(document.createTextNode(this.root.cardBoxObject.title));
      sloganBox.appendChild(sloganText);
      this.appendChild(sloganBox);
      resolve();
    });
  }
  setMainInfo() {
    return new Promise((resolve) => {
      this.root.themeDOM.mainInfo = document.createElement("section");
      this.appendChild(this.root.themeDOM.mainInfo);
      resolve();
    });
  }
  setLifetime(lifetimeText) {
    return new Promise((resolve) => {
      let lifetime = document.createElement("section");
      lifetime.classList.add("box-row", "box-center");
      let lifetimeArray = Array.isArray(lifetimeText) ? lifetimeText : [lifetimeText];
      for (let key in lifetimeArray) {
        let p = document.createElement("p");
        let text = document.createTextNode(lifetimeArray[key]);
        p.appendChild(text);
        lifetime.appendChild(p);
      }
      this.root.themeDOM.mainInfo.appendChild(lifetime);
      resolve();
    });
  }
  setPrice(priceObject) {
    return new Promise((resolve) => {
      let price = document.createElement("section");
      price.classList.add("partarum-card-theme-price");
      let amount = document.createElement("p");
      amount.appendChild(document.createTextNode(priceObject.amount));
      price.appendChild(amount);
      let period = document.createElement("p");
      period.appendChild(document.createTextNode(priceObject.period));
      price.appendChild(period);
      this.root.themeDOM.mainInfo.appendChild(price);
      resolve();
    });
  }
  setLinkPage(linkObject) {
    return new Promise((resolve) => {
      let linkPage = document.createElement("section");
      let link = document.createElement("a");
      link.setAttribute("href", linkObject.href);
      link.classList.add("beauty-button-link");
      let textNode = document.createTextNode(linkObject.text ?? "Jetzt Registrieren");
      link.appendChild(textNode);
      if ("icon" in linkObject) {
        let icon = document.createElement("i");
        if ("class" in linkObject.icon) {
          for (let classItem of linkObject.icon.class.split(" ")) {
            icon.classList.add(classItem);
          }
        }
        if ("position" in linkObject.icon) {
          let position = "before";
          if (linkObject.icon.position === "before") {
            textNode.before(icon);
          } else {
            textNode.after(icon);
          }
          icon.classList.add(position === "before" ? "icon-left" : "icon-right");
        }
      }
      linkPage.appendChild(link);
      this.root.themeDOM.mainInfo.appendChild(linkPage);
      resolve();
    });
  }
  setFeatures(featuresObject) {
    return new Promise((resolve) => {
      let features = document.createElement("footer");
      features.classList.add("text-setLeft", "partarum-card-theme-features");
      this.appendChild(features);
      for (let feature in featuresObject) {
        let featureBox = document.createElement("section");
        featureBox.classList.add("partarum-card-theme-feature-box");
        features.appendChild(featureBox);
        this.setList(featuresObject[feature], featureBox).then();
      }
      resolve();
    });
  }
  setList(feature, featureBox) {
    return new Promise((resolve) => {
      let header = document.createElement("header");
      header.className = "box-row center";
      let headerText = document.createTextNode(feature.title);
      header.appendChild(headerText);
      featureBox.appendChild(header);
      if ("icon" in feature) {
        let icon = document.createElement("i");
        icon.className = feature.icon.class;
        if ("position" in feature.icon) {
          this.setIcon(icon, headerText, feature.icon.position, feature.icon.class);
        }
      }
      let section = document.createElement("section");
      featureBox.appendChild(section);
      let lastElement = [];
      let list = feature.list;
      for (let key in list) {
        switch (key) {
          case "icon":
            let icon = document.createElement("i");
            this.setIcon(icon, lastElement.at(-1) ?? null, list.icon.position, list.icon.class);
            lastElement.push(icon);
            break;
          default:
            if (key.includes("text")) {
              lastElement.push(document.createElement("p"));
              lastElement.at(-1).appendChild(document.createTextNode(list[key]));
              section.appendChild(lastElement.at(-1));
            }
        }
      }
      resolve();
    });
  }
  setIcon(iconNode, textNode, position, className) {
    if (textNode !== null) {
      iconNode.className = className ?? "";
      switch (position) {
        case "before":
          textNode.before(iconNode);
          iconNode.classList.add("icon-left");
          break;
        case "after":
          textNode.after(iconNode);
          iconNode.classList.add("icon-right");
          break;
        case "middle":
          textNode.after(iconNode);
          iconNode.classList.add("icon-left", "icon-right");
          break;
        default:
          textNode.before(iconNode);
          iconNode.classList.add("icon-left");
          break;
      }
    }
  }
};
customElements.get("partarum-card-theme-box") === void 0 && customElements.define("partarum-card-theme-box", HTMLCardThemeBox);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCardBox/HTMLCardTopicBox.js
var HTMLCardTopicBox = class extends HTMLPartarumElement {
  cardKey = 1;
  constructor(config, dom, id, cardBoxObject) {
    super(config, "section", dom, id);
    this.root.cardBoxObject = cardBoxObject;
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = this.root.id;
    let display = "display" in this.root.cardBoxObject && this.root.cardBoxObject.display === true ? "grid" : "zero";
    this.classList.add(display, "grid-auto-column", "product-cards-box-shadow");
    this.loadElements().then();
  }
  async loadElements() {
    await this.setThemeBoxes();
  }
  setThemeBoxes() {
    return new Promise((resolve) => {
      for (let key in this.root.cardBoxObject) {
        switch (key) {
          case "cards":
            for (let cardKey in this.root.cardBoxObject.cards) {
              this.root.dom.get("Categories").add(this.id, this.root.dom.get(this.id));
              let card = this.root.cardBoxObject.cards[cardKey];
              this.addThemeBox(card, cardKey);
              this.cardKey++;
            }
            break;
          case "card":
            this.addThemeBox(this.root.cardBoxObject.card);
            this.cardKey++;
            break;
          case "subTopic":
            let withSubCategory = this.root.dom.get(this.id);
            withSubCategory.type = "WithSubCategories";
            withSubCategory.data = {
              subCategories: []
            };
            this.root.dom.get("Categories").add(this.id, withSubCategory);
            let subBox = this.root.cardBoxObject.subTopic;
            let cbo = this.root.dom.get("CardBoxObject");
            for (let [key2, value] of cbo.subBoxes) {
              for (let [subKey, subValue] of value.startMenu) {
                let id = "productCategory_" + subKey;
                this.root.dom.add(id, {
                  themes: {},
                  topic: new HTMLCardTopicBox(this.root.config, this.root.dom, id, subBox[subValue]),
                  type: "SubCategories",
                  data: {
                    category: this.id
                  }
                });
                withSubCategory.data.subCategories.push(id);
                this.appendChild(this.root.dom.get(id).topic);
              }
            }
        }
      }
      resolve();
    });
  }
  addThemeBox(card, cardKey = this.cardKey) {
    let cacheObject = this.root.dom.get(this.id).themes;
    card.parent = this.id;
    let title = card.title;
    let id = "productCard_" + title.replace(" ", "_");
    card.id = id;
    cacheObject[id] = {
      theme: new HTMLCardThemeBox(this.root.config, this.root.dom, id, card)
    };
    this.appendChild(cacheObject[id].theme);
  }
  addCanvas() {
    return new Promise((resolve) => {
      resolve();
    });
  }
};
customElements.get("partarum-card-topic-box") === void 0 && customElements.define("partarum-card-topic-box", HTMLCardTopicBox);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCardBox/HTMLCardTopicBody.js
var HTMLCardTopicBody = class extends HTMLPartarumElement {
  constructor(config, id, dom) {
    super(config, "article", dom, id);
    this.cardBoxObject = this.root.dom.get("CardBoxObject");
  }
  connectedCallback() {
    super.connectedCallback();
    this.className = "box-row box-center";
    this.loadElements().then();
  }
  async loadElements() {
    await this.addTopicBox();
  }
  addTopicBox() {
    return new Promise((resolve) => {
      for (let [key, value] of this.cardBoxObject.topicBoxes) {
        let id = "productCategory_" + key;
        this.root.dom.add(id, {
          themes: {},
          topic: new HTMLCardTopicBox(this.root.config, this.root.dom, id, value),
          type: "Categories",
          data: {}
        });
        this.appendChild(this.root.dom.get(id).topic);
      }
      resolve();
    });
  }
};
customElements.get("partarum-card-topic-body") === void 0 && customElements.define("partarum-card-topic-body", HTMLCardTopicBody);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCardBox/HTMLCardBoxObject.js
var HTMLCardBoxObject = class {
  startMenu = /* @__PURE__ */ new Map();
  topicIDs = Partarum.Helper.Hex.createIndex(true);
  topicBoxes = /* @__PURE__ */ new Map();
  subBoxes = /* @__PURE__ */ new Map();
  lastID = 1;
  ready = false;
  config = {};
  constructor(config) {
    this.checkConfig(config).then(() => {
      this.analyseConfig(this.config.topic).then(() => {
        this.ready = true;
      });
    });
  }
  checkConfig(config) {
    return new Promise((resolve) => {
      if (Array.isArray(config)) {
        this.config.topic = config;
      } else {
        this.config = config;
      }
      resolve(true);
    });
  }
  async analyseConfig(topic) {
    if (topic instanceof Object) {
      if (Array.isArray(topic)) {
        for (let topicObject of topic) {
          this.lastID = this.topicIDs.next(true);
          this.topicBoxes.set(this.lastID, {});
          for (let topicKey in topicObject) {
            await this[topicKey === "name" ? "topicName" : topicKey](topicObject[topicKey]);
          }
        }
      }
    }
  }
  checkStatus() {
    return new Promise((resolve) => {
      let int = setInterval(() => {
        if (this.ready === true) {
          resolve(true);
          clearInterval(int);
        }
      }, 100);
    });
  }
  topicName(topic) {
    return new Promise((resolve) => {
      this.startMenu.set(this.lastID, topic);
      resolve(true);
    });
  }
  subTopic(cardObject) {
    return new Promise((resolve) => {
      let convert = Object.entries(cardObject).map((cards) => {
        return cards[1];
      });
      let subCardBoxObject = new HTMLCardBoxObject(convert);
      subCardBoxObject.checkStatus().then(() => {
        this.subBoxes.set(this.lastID, subCardBoxObject);
        this.topicBoxes.get(this.lastID).subTopic = cardObject;
        resolve(true);
      });
    });
  }
  card(cardObject) {
    return new Promise((resolve) => {
      this.topicBoxes.get(this.lastID).card = cardObject;
      resolve(true);
    });
  }
  cards(cardsObject) {
    return new Promise((resolve) => {
      this.topicBoxes.get(this.lastID).cards = cardsObject;
      resolve(true);
    });
  }
  display(value) {
    return new Promise((resolve) => {
      this.topicBoxes.get(this.lastID).display = value;
      resolve(true);
    });
  }
};

// Partarum/PartarumJS/ClientSide/HTML/PartarumCardBox/HTMLCardBoxBody.js
var HTMLCardBoxBody = class extends HTMLPartarumElement {
  constructor(config, name, dom) {
    super(config, name, dom, "partarumCardBoxBody");
  }
  connectedCallback() {
    super.connectedCallback();
    this.analyseConfig().then(() => {
      this.loadElements().then();
    });
  }
  analyseConfig() {
    return new Promise((resolve, reject) => {
      if ("topic" in this.root.config && "surface" in this.root.config) {
        this.cardBoxObject = new HTMLCardBoxObject(this.root.config);
        this.cardBoxObject.checkStatus().then(() => {
          resolve(true);
        });
        this.root.dom.add("CardBoxObject", this.cardBoxObject);
      } else {
        reject();
      }
    });
  }
  async loadElements() {
    let theme = this.root.config?.theme ?? "classic";
    switch (theme) {
      case "classic":
        await this.setHeader();
        await this.setStartMenu();
        await this.setSubMenu();
        await this.setTopicBody();
        break;
      case "noDraw":
        await this.setHeader();
        await this.setStartMenu(false);
        await this.setSubMenu(false);
        await this.setTopicBody();
    }
  }
  setHeader() {
    return new Promise((resolve) => {
      this.root.dom.add("CardBoxHeader", new HTMLCardBoxHeader(this.root.config, "card-box-menu", this.root.dom), null);
      this.appendChild(this.root.dom.get("CardBoxHeader"));
      resolve(true);
    });
  }
  setStartMenu(draw = true) {
    return new Promise((resolve) => {
      let ar = this.cardBoxObject.startMenu;
      this.setMenu("productGroupNav", this.root.config, "productGroupNav").then(() => {
        for (let [id, name] of ar) {
          this.root.dom.get("productGroupNav").addTopic(name, id, "button", this.root);
        }
        draw === true && this.setCanvas("canvas", this.root.dom.get("productGroupNav")).then(() => {
          resolve(true);
        });
      });
    });
  }
  setSubMenu(draw = true) {
    return new Promise((resolve) => {
      let cardSubBoxes = this.cardBoxObject.subBoxes;
      let boxCounter = 0;
      let displayMenu = this.root.dom.get("DisplayMenu");
      let categories = this.root.dom.get("Categories");
      for (let [parentID, subBox] of this.cardBoxObject.subBoxes) {
        let menuID = "categoryMenu_" + parentID;
        let canvasID = "categoryCanvas_" + parentID;
        displayMenu.add("productCategory_" + parentID, {
          "categoryMenu": menuID,
          "categoryCanvas": canvasID
        });
        let menuObject = {};
        let canvasObject = {};
        let startMenu = subBox.startMenu;
        let menuCounter = 0;
        this.setMenu(menuID, subBox.config, menuID).then(() => {
          for (let [id, name] of startMenu) {
            let menu = this.root.dom.get(menuID);
            menu.addTopic(name, id, "button", this.root).then(() => {
              menuCounter++;
              menuObject.topic = menu;
              if (boxCounter === cardSubBoxes.size && menuCounter === startMenu.size) {
                draw === true && this.setCanvas(canvasID, this.root.dom.get(menuID), false).then(() => {
                  canvasObject.topic = this.root.dom.get(canvasID);
                  categories.add(canvasID, canvasObject);
                  categories.add(menuID, menuObject);
                  menu.classList.add("zero");
                  resolve(true);
                });
              }
            });
          }
        });
        boxCounter++;
      }
    });
  }
  setMenu(menuType, config, id) {
    return new Promise((resolve) => {
      this.root.dom.add(menuType, new HTMLCardBoxMenu(config, id, this.root.dom), null);
      this.root.dom.add("CardBoxHeader", this.root.dom.get(menuType), "append");
      resolve(true);
    });
  }
  setCanvas(id = "canvas", menu, draw = true) {
    return new Promise((resolve) => {
      Partarum.Draw.Plotter.createBoard(id, { width: menu.offsetWidth.toString(), height: "160" }).then((canvas) => {
        this.root.dom.add(canvas.id, canvas);
        draw === false && canvas.classList.add("zero");
        this.root.dom.get("DrawBoard").add(id, canvas);
        this.root.dom.add("CardBoxHeader", canvas, "append");
        resolve();
      });
    });
  }
  setTopicBody() {
    return new Promise((resolve) => {
      this.root.dom.add("CardTopicBody", new HTMLCardTopicBody(this.root.config, "card-topic-body", this.root.dom), null);
      this.appendChild(this.root.dom.get("CardTopicBody"));
      resolve(true);
    });
  }
  addTopicBox() {
    return new Promise((resolve) => {
    });
  }
};
customElements.get("partarum-card-box-body") === void 0 && customElements.define("partarum-card-box-body", HTMLCardBoxBody);

// Partarum/PartarumJS/ClientSide/Helper/Hex.js
var HEX_START = 1;
var _Hex = class {
  static getString(hex = 0) {
    return "0x" + hex.toString(16).padStart(14, "0");
  }
  static getInt(hex) {
    return parseInt(hex, 16);
  }
  static createIndex(global = false, startNumber = global === false ? HEX_START : ++_Hex.lastID) {
    return new HexIndex(startNumber);
  }
};
var Hex = _Hex;
__publicField(Hex, "lastID", HEX_START);
var HexIndex = class {
  lastHex = HEX_START;
  constructor(startNumber) {
    this.lastHex = startNumber;
  }
  *nextID(type) {
    while (true) {
      this.lastHex++;
      Hex.lastID = this.lastHex;
      yield type === false ? this.lastHex : Hex.getString(this.lastHex);
    }
  }
  next(type = false) {
    return this.nextID(type).next().value;
  }
};

// Partarum/PartarumJS/ClientSide/Draw/DrawElementAnalyzer.js
var _DrawElementAnalyzer = class {
  id;
  cache = /* @__PURE__ */ new WeakMap();
  constructor() {
    _DrawElementAnalyzer.analyzerID ??= Hex.createIndex();
    this.id = _DrawElementAnalyzer.analyzerID.next(true);
  }
  getID() {
    return this.id;
  }
  init(board, nodes) {
    _DrawElementAnalyzer.worker ??= new Worker("/Partarum/PartarumJS/Worker/DrawWorker/AnalyzeWorker");
    let boardObject = {
      width: board.offsetWidth ?? board.innerWidth,
      height: board.offsetHeight ?? board.innerHeight,
      top: board.offsetTop ?? 0,
      left: board.offsetLeft ?? 0
    };
    let nodeMap = [];
    for (let node of nodes) {
      let nodeObject = {
        width: node.offsetWidth,
        height: node.offsetHeight,
        top: node.offsetTop,
        left: node.offsetLeft
      };
      this.cache.set(nodeObject, node);
      nodeMap.push(nodeObject);
    }
    _DrawElementAnalyzer.worker.postMessage([boardObject, nodeMap, this.id]);
    _DrawElementAnalyzer.intCache[this.id] = {};
    _DrawElementAnalyzer.promiseCache[this.id] = {};
    _DrawElementAnalyzer.promiseCache[this.id].promise = new Promise((resolve, reject) => {
      _DrawElementAnalyzer.worker.onmessage = (data) => {
        _DrawElementAnalyzer.promiseCache[data.data.id].data = data.data;
        console.dir(_DrawElementAnalyzer.promiseCache);
        _DrawElementAnalyzer.intCache[data.data.id].id = setInterval(_DrawElementAnalyzer.intCache[data.data.id].fn, 200, data);
      };
      _DrawElementAnalyzer.intCache[this.id].fn = (test) => {
        this.id === test.data.id && clearInterval(_DrawElementAnalyzer.intCache[test.data.id].id);
        resolve(test.data);
      };
    });
    return _DrawElementAnalyzer.promiseCache[this.id].promise;
  }
};
var DrawElementAnalyzer = _DrawElementAnalyzer;
__publicField(DrawElementAnalyzer, "worker");
__publicField(DrawElementAnalyzer, "analyzerID");
__publicField(DrawElementAnalyzer, "promiseCache", {});
__publicField(DrawElementAnalyzer, "intCache", {});

// Partarum/PartarumJS/ClientSide/Draw/Plot.js
var Plot = class {
  theme;
  board;
  nodes = new DrawElementAnalyzer();
  analyzerID;
  lineParams = {
    start: {
      moveTo: "start" | "center" | "end",
      plus: null,
      minus: null
    },
    goal: {
      moveTo: "start" | "center" | "end",
      plus: null,
      minus: null
    }
  };
  constructor(board, id = null) {
    this.analyzerID = id ?? this.nodes.getID();
    console.dir(this.analyzerID);
    this.board = board instanceof HTMLCanvasElement ? board : document.createElement("canvas");
  }
  setTheme(theme) {
    this.theme = theme;
  }
  setNodes(...nodes) {
    return new Promise((resolve, reject) => {
      this.nodes.init(this.board, Array.isArray(nodes) ? nodes : [nodes]).then((data) => {
        console.dir(Partarum.Cache.PlotCache.getCollection("PlotterCache", "Plotter", "setLine").entries());
        resolve({ data, ctx: this.board.getContext("2d") });
      });
    });
  }
  setCanvasTo(element, position = "append" | "after" | "before" | "replace") {
    switch (position) {
      case "append":
        element.appendChild(this.board);
        break;
      case "after":
        element.after(this.board);
        break;
      case "before":
        element.before(this.board);
        break;
      case "replace":
        element.replaceWith(this.board);
    }
  }
};

// Partarum/PartarumJS/ClientSide/HTML/PartarumCardBox/HTMLCardDrawBox.js
var HTMLCardDrawBox = class {
  root = {
    dom: {},
    app: new Partarum()
  };
  plotter = Partarum.Draw.Plotter;
  constructor(config, name, dom, id) {
    this.root.dom = dom;
    this.root.config = config;
    this.root.name = name;
    this.root.id = typeof id === "string" ? id.replace(" ", "_") : "";
  }
  createPlot(board, theme, nodes, clear = false) {
    return new Promise((resolve) => {
      let plot = new Plot(board);
      plot.setTheme(theme);
      plot.setNodes(nodes).then(() => {
        resolve(plot);
      });
    });
  }
  setLines(canvas, cardTheme, startNode, goalNode, clear = false) {
    this.plotter.record(canvas, "setLine", cardTheme, goalNode.id, () => {
      let plot = new Plot(canvas);
      console.dir(plot.analyzerID);
      plot.setNodes(startNode, goalNode).then((data) => {
        let ctx = data.ctx;
        console.dir(data.data.id);
        let board = data.data.board;
        let start = data.data.nodes[0];
        let goal = data.data.nodes[1];
        clear !== false && ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#007F85";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(start.nodeCTX.centerTop.x, 0);
        ctx.lineTo(goal.nodeCTX.centerTop.x, goal.nodeCTX.centerTop.y);
        ctx.stroke();
      });
    }).then(() => {
      this.plotter.render("setLine", cardTheme);
    }).catch((error) => {
      console.dir(error);
      console.log("ERROR");
    });
  }
};

// Partarum/PartarumJS/ClientSide/HTML/HTMLCardBox.js
var HTMLCardBox = class extends HTMLPartarumHost {
  constructor(config) {
    super(config, "partarum-card-box", "partarumCardBox");
    this.loadStyle({
      link: "/Partarum/PartarumCSS/PartarumElements/cardBox.css",
      style: document.querySelectorAll('style[id*="fa"]')
    }).then(() => {
    });
    this.root.dom.add("CardBoxBody", new HTMLCardBoxBody(this.root.config, "body", this.root.dom), null);
    this.root.dom.get("CardBoxBody").classList.add("single-box-center-medium");
    this.root.dom.add("shadowBox", this.root.dom.get("CardBoxBody"), "append");
    if (Reflect.has(this.root.config, "parent")) {
      this.root.config.parent.appendChild(this);
    } else {
      document.body.appendChild(this);
    }
    this.root.dom.add("DrawBoard", this.root.dom.create("Canvas", "Boards"));
    this.root.dom.add("CardDrawBox", new HTMLCardDrawBox());
    this.root.dom.add("Categories", this.root.dom.create("CardBox", "Categories"));
    this.root.dom.add("DisplayCategories", this.root.dom.create("CardBox", "DisplayCategories"));
    this.root.dom.add("DisplayMenu", this.root.dom.create("CardBox", "DisplayMenu"));
    this.root.dom.add("Loader", this.root.dom.create("CardBox", "Loader"));
    this.root.dom.add("Listener", this.root.dom.create("CardBox", "Listener"));
    this.root.dom.add("LastDraw", /* @__PURE__ */ new Set());
    this.root.dom.get("Loader").add("Status", 0);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  add(element, topic) {
    this.root.dom[topic].appendChild(element);
  }
  addTopic(topic) {
    let topicArray = Array.isArray(topic) ? topic : [topic];
    for (let topicName of topicArray) {
      this.root.dom.add(topicName, document.createElement("section"), null);
      this.root.dom.add("CardBoxBody", this.root.dom.get(topicName), "append");
    }
  }
};
customElements.get("partarum-card-box") === void 0 && customElements.define("partarum-card-box", HTMLCardBox);

// Partarum/PartarumJS/ClientSide/HTML/PartarumNavBar/HTMLMenuHamburger.js
var HTMLMenuHamburger = class extends HTMLPartarumHost {
  constructor(config) {
    super(config, "partarum-menu-hamburger", "partarumMenuHamburger");
    this.loadStyle({
      link: "/Partarum/PartarumCSS/PartarumElements/menuHamburger.css",
      style: document.querySelectorAll('style[id*="fa"]')
    }).then(() => {
    });
    this.root.dom.add("input", document.createElement("input"), null);
    this.root.dom.get("input").setAttribute("id", "partarumMenuHamburgerTrigger");
    this.root.dom.get("input").setAttribute("type", "checkbox");
    this.root.dom.get("input").classList.add("hamburger");
    this.root.dom.add("shadowBox", this.root.dom.get("input"), "append");
    if (Reflect.has(config, "parent")) {
      if (config?.position === "left" || config?.position === "center") {
        config.parent.before(this);
      } else {
        config.parent.after(this);
      }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = "partarumMenuHamburger";
  }
};
customElements.get("partarum-menu-hamburger") === void 0 && customElements.define("partarum-menu-hamburger", HTMLMenuHamburger);

// Partarum/PartarumJS/ClientSide/HTML/HTMLLayoutElementAnalyzer.js
var _HTMLLayoutElementAnalyzer = class {
  id;
  cache = /* @__PURE__ */ new WeakMap();
  constructor() {
    _HTMLLayoutElementAnalyzer.analyzerID ??= Hex.createIndex();
    this.id = _HTMLLayoutElementAnalyzer.analyzerID.next(true);
  }
  getID() {
    return this.id;
  }
  init(base, nodes) {
    _HTMLLayoutElementAnalyzer.worker ??= new Worker("/Partarum/PartarumJS/Worker/HTMLWorker/LayoutAnalyzeWorker");
    let baseObject = {
      width: base.offsetWidth ?? base.innerWidth,
      height: base.offsetHeight ?? base.innerHeight,
      top: base.offsetTop ?? 0,
      left: base.offsetLeft ?? 0
    };
    let nodeMap = [];
    for (let node of nodes) {
      let nodeObject = {
        width: node.offsetWidth,
        height: node.offsetHeight,
        top: node.offsetTop,
        left: node.offsetLeft
      };
      this.cache.set(nodeObject, node);
      nodeMap.push(nodeObject);
    }
    _HTMLLayoutElementAnalyzer.worker.postMessage([baseObject, nodeMap, this.id]);
    _HTMLLayoutElementAnalyzer.intCache[this.id] = {};
    _HTMLLayoutElementAnalyzer.promiseCache[this.id] = {};
    _HTMLLayoutElementAnalyzer.promiseCache[this.id].promise = new Promise((resolve, reject) => {
      _HTMLLayoutElementAnalyzer.worker.onmessage = (data) => {
        _HTMLLayoutElementAnalyzer.promiseCache[data.data.id].data = data.data;
        _HTMLLayoutElementAnalyzer.intCache[data.data.id].id = setInterval(_HTMLLayoutElementAnalyzer.intCache[data.data.id].fn, 200, data);
      };
      _HTMLLayoutElementAnalyzer.intCache[this.id].fn = (test) => {
        this.id === test.data.id && clearInterval(_HTMLLayoutElementAnalyzer.intCache[test.data.id].id);
        resolve(test.data);
      };
    });
    return _HTMLLayoutElementAnalyzer.promiseCache[this.id].promise;
  }
};
var HTMLLayoutElementAnalyzer = _HTMLLayoutElementAnalyzer;
__publicField(HTMLLayoutElementAnalyzer, "worker");
__publicField(HTMLLayoutElementAnalyzer, "analyzerID");
__publicField(HTMLLayoutElementAnalyzer, "promiseCache", {});
__publicField(HTMLLayoutElementAnalyzer, "intCache", {});

// Partarum/PartarumJS/ClientSide/HTML/PartarumNavBar/HTMLNavBarBody.js
var HTMLNavBarBody = class extends HTMLPartarumElement {
  nodes = new HTMLLayoutElementAnalyzer();
  constructor(config, name, dom) {
    super(config, name, dom, "partarumNavBarBody");
  }
  connectedCallback() {
    super.connectedCallback();
    this.root.connectedCallback(() => {
      console.dir("root connectedCallback");
      this.id = "partarumNavBarBody";
      this.analyseConfig().then(() => {
        if (Reflect.has(this.root.config, "nav")) {
          this.loadElements().then();
        }
      });
    });
  }
  analyseConfig(config) {
    return new Promise((resolve) => {
      resolve();
    });
  }
  async loadElements() {
    await this.setNav(this.root.config.nav);
    await this.setDesktop(this.root.config.desktop);
    await this.setMobile(this.root.config.mobile);
  }
  setNav(nav) {
    return new Promise((resolve) => {
      let type = this.root.config?.type;
      this.root.dom.add("nav", document.createElement("nav"), null);
      this.appendChild(this.root.dom.get("nav"));
      switch (type) {
        case "classic":
          this.setAnchor(nav, this.root.dom.get("nav")).then(() => resolve());
      }
    });
  }
  setMobile(config) {
    return new Promise((resolve) => {
      console.dir(config);
      if (config?.type) {
        switch (config.type) {
          case "Hamburger":
            let checkbox = new HTMLMenuHamburger({
              parent: this.root.dom.get("nav"),
              ...config?.mobile
            });
            resolve();
        }
      }
      if (config?.position) {
      }
    });
  }
  setDesktop(config) {
    return new Promise((resolve) => {
      if (config?.type) {
      }
      if (config?.position || (config?.positionX || config?.positionY)) {
        let x = config.positionX || config.position.x || {
          to: "center"
        };
        let y = config.positionY || config.position.y || {
          from: 0,
          to: "10vh",
          height: "10vh"
        };
        Partarum.HTML.getSafeElementByQueryString(config.position.to).then((element) => {
          setTimeout(() => {
            this.nodes.init(window, [element]).then((data) => {
              let vh1 = data.base.height / 100;
              console.dir(vh1 * 10);
              console.dir(data);
              let animationTop = data.nodes[0].top / 2 - data.base.height / 10 / 2;
              this.setAttribute("style", `
                            --animationTop: ${animationTop}px; 
                            --animationHeight: ${config.position?.height || "10vh"}; 
                            animation: simpleNav 2s ease-in-out; 
                            animation-fill-mode: forwards; 
                            display: grid;
                            grid-template-columns: 1fr 0; 
                            color: #F9F9FA;
                            `);
              resolve();
            });
          }, 500);
        });
      }
    });
  }
  setAnimation(top, height) {
    let style = document.createElement("style");
    style.textContent = `
            @keyframes simpleNav {
                from {
                    top: 0;
                    height: 0;
                    opacity: 0;                  
                    font-size: 0;
                } 
                to {
                    top: calc(calc(${top}px / 2) - calc(${height}vh / 2));
                    height: ${height}vh;
                    opacity: 1;
                    font-size: 1.6rem;
                }
            }
        `;
    this.appendChild(style);
  }
  setAnchor(config, parent) {
    return new Promise((resolve) => {
      console.dir("setAnchor");
      let anchorArray = Array.isArray(config) ? config : [config];
      let counter = 0;
      for (let anchorConfig of anchorArray) {
        let anchor = document.createElement("a");
        for (let attr in anchorConfig) {
          switch (attr) {
            case "text":
              anchor.appendChild(document.createTextNode(anchorConfig[attr]));
              break;
            default:
              anchor.setAttribute(attr, anchorConfig[attr]);
          }
        }
        parent.appendChild(anchor);
        counter++;
        counter === anchorArray.length && resolve();
      }
    });
  }
};
customElements.get("partarum-nav-bar-body") === void 0 && customElements.define("partarum-nav-bar-body", HTMLNavBarBody);

// Partarum/PartarumJS/ClientSide/HTML/HTMLNavBar.js
var HTMLNavBar = class extends HTMLPartarumHost {
  constructor(config) {
    super(config, "partarum-nav-bar", "partarumNavBar");
    this.loadStyle({
      link: "/Partarum/PartarumCSS/PartarumElements/navBar.css",
      style: document.querySelectorAll('style[id*="fa"]')
    }).then(() => {
    });
    this.root.dom.add("NavBarBody", new HTMLNavBarBody(config, "body", this.root.dom), null);
    this.root.dom.get("NavBarBody").classList.add("single-box-center-large");
    this.root.dom.add("shadowBox", this.root.dom.get("NavBarBody"), "append");
    if (config !== void 0) {
      if (Reflect.has(config, "parent")) {
        config.parent.appendChild(this);
      }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = "partarumNavBar";
  }
};
customElements.get("partarum-nav-bar") === void 0 && customElements.define("partarum-nav-bar", HTMLNavBar);

// Partarum/PartarumJS/ClientSide/HTML/PartarumBottomBar/HTMLBottomBarBody.js
var HTMLBottomBarBody = class extends HTMLPartarumElement {
  constructor(config, name) {
    super(config, name);
    this.id = "partarumBottomBarBody";
  }
};
customElements.get("partarum-bottom-bar-body") === void 0 && customElements.define("partarum-bottom-bar-body", HTMLBottomBarBody);

// Partarum/PartarumJS/ClientSide/HTML/HTMLBottomBar.js
var HTMLBottomBar = class extends HTMLPartarumHost {
  constructor(config) {
    super(config, "partarum-bottom-bar");
    this.id = "partarumBottomBar";
    this.loadStyle({
      link: "/Partarum/PartarumCSS/PartarumElements/bottomBar.css",
      style: document.querySelectorAll('style[id*="fa"]')
    }).then(() => {
    });
    this.root.dom.add("BottomBarBody", new HTMLBottomBarBody(config, "body"), null);
    this.root.dom.add("shadowBox", this.root.dom.get("BottomBarBody"), "append");
    if (Reflect.has(config, "parent")) {
      config.parent.appendChild(this);
    } else {
      document.body.appendChild(this);
    }
    this.addTopic(["leftSide", "center", "rightSide"]);
  }
  add(element, topic) {
    this.root.dom.add(topic, element, "append");
  }
  addTopic(topic) {
    let topicArray = Array.isArray(topic) ? topic : [topic];
    for (let topicName of topicArray) {
      let topicNode = document.createElement("section");
      this.root.dom.add(topicName, topicNode, null);
      this.root.dom.add("BottomBarBody", topicNode, "append");
    }
  }
};
customElements.get("partarum-bottom-bar") === void 0 && customElements.define("partarum-bottom-bar", HTMLBottomBar);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCookie/HTMLCookieBody.js
var HTMLCookieBody = class extends HTMLPartarumElement {
  constructor(config) {
    super(config, "body");
  }
};
customElements.get("partarum-cookie-body") === void 0 && customElements.define("partarum-cookie-body", HTMLCookieBody);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCookie/HTMLCookieHeader.js
var HTMLCookieHeader = class extends HTMLPartarumElement {
  constructor(config) {
    super(config, "header");
    this.className = "box box-center-center";
    this.root.app.themes = [
      {
        header: {
          config: {
            h1: "Und auch wir benutzen Cookies :)"
          },
          parent: this
        }
      }
    ];
    this.root.app.create().then();
  }
};
customElements.get("partarum-cookie-header") === void 0 && customElements.define("partarum-cookie-header", HTMLCookieHeader);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCookie/HTMLCookieMain.js
var HTMLCookieMain = class extends HTMLPartarumElement {
  constructor(config) {
    super(config, "main");
  }
};
customElements.get("partarum-cookie-main") === void 0 && customElements.define("partarum-cookie-main", HTMLCookieMain);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCookie/HTMLCookieFooter.js
var HTMLCookieFooter = class extends HTMLPartarumElement {
  constructor(config, name, dom) {
    super(config, "footer");
    this.root.dom = dom;
    this.className = "media-box-row";
    let sessionCookieStatus = window.sessionStorage.getItem("cookies_accepted");
    const COOKIES_ACCEPTED = !(sessionCookieStatus === null || sessionCookieStatus === false);
    this.root.app.themes = [
      {
        footer: {
          config: {
            section_left: {
              _attributes: {
                class: "media-box-row"
              },
              button_config: {
                _attributes: {
                  text: "Cookie-Einstellungen"
                }
              }
            },
            section_right: {
              _attributes: {
                class: "media-box-row"
              },
              button_essential: {
                _attributes: {
                  type: "button",
                  id: "cookieDisable",
                  text: "Nicht akzeptieren",
                  addEvent: {
                    type: "click",
                    topic: "CookieBanner",
                    theme: "disableCookie",
                    name: "disableCookie_click",
                    doThat: () => {
                      config.cookies.disable.doThat();
                      this.root.dom.get("CookieBanner").classList.toggle("zero");
                    }
                  }
                }
              },
              button_all: {
                _attributes: {
                  type: "button",
                  id: "cookieActive",
                  text: COOKIES_ACCEPTED === false ? "Alle akzeptieren" : "Schlie\xDFen",
                  addEvent: {
                    type: "click",
                    topic: "CookieBanner",
                    theme: "activeCookie",
                    name: "activeCookie_click",
                    targetID: "cookieActive",
                    doThat: (e) => {
                      if (Partarum.System.Cookie.accepted === false) {
                        this.setCookies(config, "active", e);
                      }
                      this.root.dom.get("CookieBanner").classList.toggle("zero");
                    }
                  }
                }
              }
            }
          },
          parent: this
        }
      }
    ];
    this.root.app.create().then();
  }
  setCookies(config, action, e) {
    Partarum.System.Cookie.init().then((cookieTest) => {
      if (cookieTest.status === true) {
        switch (action) {
          case "active":
            Partarum.System.Cookie.toAgree(config).then(() => {
              this.root.dom.get("shadowBox").getElementById("cookieActive").innerText = "Schlie\xDFen";
            });
            break;
          case "disable":
        }
      }
    });
  }
};
customElements.get("partarum-cookie-footer") === void 0 && customElements.define("partarum-cookie-footer", HTMLCookieFooter);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCookie/HTMLCookieBanner.js
var HTMLCookieBanner = class extends HTMLPartarumElement {
  constructor(config, dom) {
    super(config, "banner");
    this.id = "PartarumCookieBanner";
    this.className = "single-box-center";
    this.root.config = config;
    this.root.dom = dom;
    this.loadBody().then();
  }
  async loadBody() {
    await this.setBody();
    await this.setHeader();
    await this.setMain();
    await this.setFooter();
  }
  setBody() {
    return new Promise((resolve) => {
      this.root.dom.add("CookieBody", new HTMLCookieBody(this.root.config, "body"), null);
      this.appendChild(this.root.dom.get("CookieBody"));
      resolve(true);
    });
  }
  setHeader() {
    return new Promise((resolve) => {
      this.root.dom.add("CookieHeader", new HTMLCookieHeader(this.root.config, "header"), null);
      this.root.dom.add("CookieBody", this.root.dom.get("CookieHeader"), "append");
      resolve(true);
    });
  }
  setMain() {
    return new Promise((resolve) => {
      this.root.dom.add("CookieMain", new HTMLCookieMain(this.root.config, "main"), null);
      this.root.dom.add("CookieBody", this.root.dom.get("CookieMain"), "append");
      resolve(true);
    });
  }
  setFooter() {
    return new Promise((resolve) => {
      this.root.dom.add("CookieFooter", new HTMLCookieFooter(this.root.config, "footer", this.root.dom), null);
      this.root.dom.add("CookieBody", this.root.dom.get("CookieFooter"), "append");
      resolve(true);
    });
  }
};
customElements.get("partarum-cookie-banner") === void 0 && customElements.define("partarum-cookie-banner", HTMLCookieBanner);

// Partarum/PartarumJS/ClientSide/HTML/HTMLCookie.js
var HTMLCookie = class extends HTMLPartarumHost {
  constructor(config) {
    const LOG = Partarum.Log.create("HTMLCookie", "construct");
    LOG.add("HTMLCookie", "construct", "start");
    super(config, "partarum-cookie");
    this.root.status = {
      cookieBanner: false,
      cookiesActivated: false,
      cookiesAccepted: false,
      cookiesInUse: false
    };
    Partarum.System.Cookie.init().then((result) => {
      Partarum.Log.add("HTMLCookie", "construct", "after Cookie.init()");
      const COOKIE_TEST = result;
      const COOKIE_STATUS_ACTIVATED = COOKIE_TEST.status;
      const COOKIE_STATUS_ACCEPTED = COOKIE_TEST.accepted;
      const COOKIE_STATUS_INUSE = COOKIE_TEST.inUse;
      this.root.status.cookiesActivated = COOKIE_STATUS_ACTIVATED;
      this.root.status.cookiesAccepted = COOKIE_STATUS_ACCEPTED;
      this.root.status.cookiesInUse = COOKIE_STATUS_INUSE;
      if (COOKIE_STATUS_ACTIVATED === true) {
        Partarum.Log.add("HTMLCookie", "construct", "activated === true");
        this.id = "partarumCookie";
        this.loadStyle({
          link: "/Partarum/PartarumCSS/PartarumElements/cookieBanner.css",
          style: document.querySelectorAll('style[id*="fa"]')
        }).then(() => {
          this.root.app.themes = [
            {
              header: {
                config: {
                  i: {
                    _attributes: {
                      id: "partarumCookieIcon",
                      class: "fa-duotone fa-cookie-bite fa-flip fa-3dicon",
                      style: this.closest("#partarumBottomBarBody") !== null ? `
                                                position: unset;
                                                bottom: unset;
                                                left: unset;
                                            ` : "",
                      addEvent: {
                        type: "click",
                        topic: "CookieBanner",
                        theme: "CookieIcon",
                        name: "CookieIcon_click",
                        targetID: "cookieIcon",
                        bubble: true,
                        doThat: (ev) => {
                          console.dir("CookieIcon - clicked");
                          console.dir(this.root.dom.get("CookieBanner"));
                          this.root.dom.get("CookieBanner").classList.toggle("zero");
                        }
                      }
                    }
                  }
                },
                parent: this.root.dom.get("shadowBox")
              }
            }
          ];
          this.root.app.create(() => {
          }).then(() => {
            this.setCookieBanner(config).then(() => {
              COOKIE_STATUS_ACCEPTED === true && Partarum.System.Cookie.toAgree(config, true);
            });
          });
        });
      }
    }).then(() => {
    });
  }
  async setCookieBanner(config) {
    const LOG = Partarum.Log.create("HTMLCookie", "setCookieBanner");
    LOG.add("HTMLCookie", "setCookieBanner", "start");
    await this.loadCookieElement(config);
  }
  loadCookieElement(config) {
    return new Promise((resolve) => {
      this.root.dom.add("CookieBanner", new HTMLCookieBanner(config, this.root.dom), null);
      if (this.root.status.cookiesAccepted === true) {
        this.root.dom.get("CookieBanner").classList.toggle("zero");
      }
      this.root.dom.add("shadowBox", this.root.dom.get("CookieBanner"), "append");
      resolve(true);
    });
  }
};
customElements.get("partarum-cookie") === void 0 && customElements.define("partarum-cookie", HTMLCookie);

// Partarum/PartarumJS/ClientSide/HTML/HTMLRegistrationBox.js
var HTMLRegistrationBox = class extends HTMLPartarumHost {
  constructor(config) {
    super(config, "partarum-registration-box");
  }
  connectedCallback() {
    super.connectedCallback();
    this.loadElements().then();
  }
  async loadElements() {
    let theme = this.root.config?.theme ?? "small";
    let level = this.root.config?.level ?? 4;
    await this.setHeadline();
    await this.setForm();
  }
  setHeadline() {
    return new Promise((resolve) => {
      let h = document.createElement("h" + this.root.config.level.toString());
      h.appendChild(document.createTextNode(this.root.config?.surface?.headline?.text ?? "Registrierung"));
      this.initAddElement("headline", h);
    });
  }
  setForm() {
    return new Promise((resolve) => {
    });
  }
};
customElements.get("partarum-registration-box") === void 0 && customElements.define("partarum-registration-box", HTMLRegistrationBox);

// Partarum/PartarumJS/ClientSide/HTML/HTML.js
var HTML = class {
  static createBottomBar(...args) {
    return new HTMLBottomBar(...args);
  }
  static createCardBox(...args) {
    return new HTMLCardBox(...args);
  }
  static createCookieBanner(...args) {
    return new HTMLCookie(...args);
  }
  static createNavBar(...args) {
    return new HTMLNavBar(...args);
  }
  static createRegistrationBox(...args) {
    return new HTMLRegistrationBox(...args);
  }
  static confirmLink(config) {
    const { href, confirm, title, options } = config;
    ["href", "confirm", "title", "options"].forEach((key) => Reflect.deleteProperty(config, key));
    this.counter++;
    return {
      href: "javascript:void(0)",
      title: title || "Link",
      addEvent: {
        type: "click",
        topic: "ConfirmLink",
        theme: "confirmLink_click",
        name: "confirmLink_click_" + this.counter,
        targetID: "confirmLink_" + this.counter,
        doThat: (ev) => {
          Partarum.Validation.confirmLink(confirm, href, options);
        }
      },
      ...config
    };
  }
  static getSafeElementById(id, timeout = 250) {
    return new Promise((resolve) => {
      Partarum.HTML.getSafeElement("byID", id, timeout).then((element) => {
        resolve(element);
      });
    });
  }
  static getSafeElementByQueryString(queryString, timeout = 250) {
    return new Promise((resolve) => {
      Partarum.HTML.getSafeElement("byQuery", queryString, timeout).then((element) => {
        resolve(element);
      });
    });
  }
  static getSafeElement(type, needle, timeout = 250) {
    return new Promise((resolve, reject) => {
      console.dir(needle);
      let element = type === "byID" ? document.getElementById(needle) : document.querySelector(needle);
      let intID;
      let counter = 0;
      let funcBreak = () => {
        if (element === null && counter < 1e3) {
          element = type === "byID" ? document.getElementById(needle) : document.querySelector(needle);
          if (element === null) {
            counter++;
            funcBreak();
          } else {
            resolve(element);
          }
        } else {
          clearInterval(intID);
          resolve(element);
        }
      };
      if (element === null) {
        intID = setInterval(funcBreak, timeout);
      } else {
        resolve(element);
      }
    });
  }
};
__publicField(HTML, "BottomBar", HTMLBottomBar);
__publicField(HTML, "CardBox", HTMLCardBox);
__publicField(HTML, "CookieBanner", HTMLCookie);
__publicField(HTML, "NavBar", HTMLNavBar);
__publicField(HTML, "RegistrationBox", HTMLRegistrationBox);
__publicField(HTML, "counter", 0);
var testElement = class extends HTMLElement {
  constructor(attr) {
    super();
    console.log("testElement: ");
    console.dir(attr);
    console.dir(this);
  }
};
var testElement2 = class extends HTMLElement {
  constructor(attr) {
    super();
    console.log("testElement2: ");
    console.dir(attr);
    console.dir(this);
  }
};
customElements.get("test-element") || customElements.define("test-element", testElement);
customElements.get("test-element2") || customElements.define("test-element2", testElement2);
export {
  HTML,
  HTMLBottomBar,
  HTMLCardBox,
  HTMLCookie,
  HTMLNavBar,
  HTMLRegistrationBox,
  testElement,
  testElement2
};
//# sourceMappingURL=HTML.js.map
