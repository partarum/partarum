var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// Partarum/PartarumJS/ClientSide/Cache/PreloadCache.js
var PreloadCache = class {
};
__publicField(PreloadCache, "classes", {
  HTML: "Partarum/PartarumJS/ClientSide/HTML/HTML.js",
  Design: "Partarum/PartarumJS/ClientSide/Design/Design.js"
});

// Partarum/PartarumJS/ClientSide/HTML/HTMLPreload.js
var HTMLPreload = class {
  constructor() {
    this.head = document.getElementsByTagName("head")[0];
    this.preloadClasses = PreloadCache.classes;
  }
  setLinks() {
    for (let classes of Object.keys(this.preloadClasses)) {
      let link = document.createElement("link");
      link.setAttribute("rel", "modulepreload");
      link.setAttribute("href", this.preloadClasses[classes]);
      this.head.appendChild(link);
    }
  }
  static init() {
    return new Promise((resolve) => {
      let preload = new HTMLPreload();
      preload.setLinks();
      resolve(true);
    });
  }
};

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

// Partarum/PartarumJS/ClientSide/Cache/TopicCache.js
var TopicCache = class {
  constructor() {
    this.addTopic("withoutTopic");
  }
  addTopic(topic2) {
    this[topic2] ??= new TopicObject(topic2);
    this[topic2].themeCache ??= new ThemeCache();
  }
  hasTopic(topic2) {
    return this.hasOwnProperty(topic2);
  }
  getTopic() {
  }
  removeTopic() {
  }
  addTheme(topic2 = "withoutTopic", theme) {
    if (!(theme in this[topic2].themeCache)) {
      this[topic2].themeCache[theme] = new ThemeObject();
      return true;
    }
    return false;
  }
  getTheme(topic2, theme) {
    return this[topic2].getTheme(theme);
  }
  hasTheme() {
  }
  removeTheme() {
  }
  addTopicMethode(topic2, theme, mapName, methodeNameArray) {
  }
  setToMap(topic2, theme, key, value, mapName) {
    let map = this[topic2].themeCache[theme][mapName];
    map.set(key, value);
    return this.hasIntoMap(topic2, theme, mapName, key);
  }
  getFromMap(topic2, theme, key, mapName) {
    return this.hasIntoMap(topic2, theme, mapName, key) ? this[topic2].themeCache[theme][mapName].get(key) : null;
  }
  getAllFromMap(topic2, theme, mapName) {
    return this[topic2].themeCache[theme][mapName];
  }
  hasIntoMap(topic2, theme, mapName, key) {
    return this[topic2].themeCache[theme][mapName].has(key);
  }
  removeFromMap(name, key) {
    return this.themeCache[name].delete(key);
  }
};
var ThemeCache = class {
  addTheme(theme) {
  }
  getTheme(theme) {
    return this[theme].entries();
  }
  getThemeMap() {
  }
};
var ThemeObject = class {
  setMethod(methodName, callback) {
    this[methodName] = callback;
  }
  addThemeMap(mapName) {
    let mapArray = Array.isArray(mapName) ? mapName : [mapName];
    for (let name of mapArray) {
      this[name] = /* @__PURE__ */ new Map();
    }
  }
};
var TopicObject = class {
  constructor(name) {
    this.topicName = name;
  }
  addTheme(theme) {
    this.themeCache ??= new ThemeCache();
    this.themeCache.addTheme(theme);
  }
  getTheme(theme) {
    return this.themeCache.getTheme(theme);
  }
  hasMap() {
  }
  removeMap() {
  }
};

// Partarum/PartarumJS/ClientSide/Cache/CacheStorage/CacheStorage.js
var CacheStorage = class extends WeakMap {
  topicIDCache = /* @__PURE__ */ new Map();
  initiatorIDCache = /* @__PURE__ */ new Map();
  idInitiatorCache = /* @__PURE__ */ new Map();
  initiatorIDs = Hex.createIndex();
  cacheObjects = {};
  hex = Hex.createIndex();
  constructor() {
    super();
  }
  setInitiator(name) {
    if (!this.initiatorIDCache.has(name)) {
      const ID = this.initiatorIDs.next(true);
      this.initiatorIDCache.set(name, ID);
      this.idInitiatorCache.set(ID, name);
      if (!(name in this.cacheObjects)) {
        this.cacheObjects[name] = new TopicCache();
      }
      super.set(this.cacheObjects[name], this.initiatorIDCache.get(name));
    }
    return this.initiatorIDCache.get(name);
  }
  setTopic(topic2, ID) {
    const NAME = this.idInitiatorCache.get(ID);
    this.cacheObjects[NAME].addTopic(topic2);
    this.topicIDCache.set(ID, topic2);
    return this.cacheObjects[NAME];
  }
  hasTopic(topic2) {
    return this.initiatorIDCache.has(topic2) || this.idInitiatorCache.has(topic2);
  }
  getTopic(topic2) {
    return this.cacheObjects[topic2];
  }
  setTheme(ID, topic2, theme) {
    const INITIATOR_NAME = this.idInitiatorCache.get(ID);
    return this.cacheObjects[INITIATOR_NAME].addTheme(topic2, theme);
  }
  setToMap(topic2, theme, mapKey, mapValue, methodMapName, ID) {
    const INITIATOR_NAME = this.idInitiatorCache.get(ID);
    this.cacheObjects[INITIATOR_NAME].setToMap(topic2, theme, mapKey, mapValue, methodMapName);
  }
  getFromMap(topic2, theme, key, methodMapName, ID) {
    const INITIATOR_NAME = this.idInitiatorCache.get(ID);
    return this.cacheObjects[INITIATOR_NAME].getFromMap(topic2, theme, key, methodMapName);
  }
  hasIntoMap(topic2, theme, methodMapName, key, ID) {
    const INITIATOR_NAME = this.idInitiatorCache.get(ID);
    return this.cacheObjects[INITIATOR_NAME].hasIntoMap(topic2, theme, methodMapName, key);
  }
  getAllFromMap(topic2, theme, methodMapName, ID) {
    const INITIATOR_NAME = this.idInitiatorCache.get(ID);
    return this.cacheObjects[INITIATOR_NAME].getAllFromMap(topic2, theme, methodMapName);
  }
  addThemeMap(ID, topic2, theme, mapName) {
    const INITIATOR_NAME = this.idInitiatorCache.get(ID);
    this.cacheObjects[INITIATOR_NAME][topic2].themeCache[theme].addThemeMap(mapName);
  }
  get(map) {
    return super.get(map);
  }
  has(map) {
    return super.has(map);
  }
};

// Partarum/PartarumJS/ClientSide/Cache/PartarumCache.js
var PartarumCache = class {
  static start() {
    PartarumCache.status ??= 0;
    if (PartarumCache.status !== 1) {
      PartarumCache.status = 1;
    }
  }
  static setCallback(c) {
    PartarumCache.callback ??= [];
    PartarumCache.callback.push(c);
  }
  static getCallback() {
    return PartarumCache.callback;
  }
  static setRound() {
    if (!PartarumCache.roundCounter) {
      PartarumCache.roundCounter = 1;
    } else {
      PartarumCache.roundCounter++;
    }
  }
  static getRound() {
    return PartarumCache.roundCounter;
  }
  static setStatus(num) {
    PartarumCache.status = num;
    if (PartarumCache.status === 1) {
      while (PartarumCache.status === 1) {
        console.log("status = 1");
      }
    }
  }
  static setSurfacePaths(pathObject) {
    PartarumCache.surfacePaths = pathObject;
  }
  static setTemplates(obj) {
    PartarumCache.templates = obj;
  }
  static getTemplate(temp) {
    return PartarumCache.templates[temp];
  }
  static setTemplatePath(templateName, templatePath) {
    PartarumCache.templatePaths ??= [];
    PartarumCache.templatePaths[templateName] = templatePath;
  }
  static isTemplate(option) {
    PartarumCache.template = option === true;
  }
};

// Partarum/PartarumJS/ClientSide/Cache/CacheBase.js
var CacheBase = class {
  static init(status = false) {
    this.status = status;
    status === true && this.update();
    return this.status;
  }
  static update() {
    let topicKeys = this.newcomerTopicSet.values();
    for (let topic2 of topicKeys) {
      this.topicSet.add(topic2);
      let themeKeys = this.newComerThemesMap.keys();
      for (let theme of themeKeys) {
        this.themeMap.set(theme, topic2);
        for (let mapName of this.themeMapNames) {
          Partarum.Cache.CacheStorage.addThemeMap(this.initiatorID, topic2, theme, mapName);
        }
      }
    }
    this.status = false;
    this.newcomerTopicSet.clear();
    this.newComerThemesMap.clear();
  }
  static create(topic2, theme) {
    this.topicSet ??= /* @__PURE__ */ new Set();
    this.themeMap ??= /* @__PURE__ */ new Map();
    this.initiatorID = Partarum.Cache.CacheStorage.setInitiator(this.name);
    this.setTopic(topic2);
    return this.setTheme(topic2, theme);
  }
  static setTopic(topic2) {
    this.newcomerTopicSet ??= /* @__PURE__ */ new Set();
    if (this.hasTopic(topic2) === false) {
      Partarum.Cache.CacheStorage.setTopic(topic2, this.initiatorID);
      this.newcomerTopicSet.add(topic2);
    } else {
      this.topicSet.has(topic2) && this.newcomerTopicSet.add(topic2);
    }
    return true;
  }
  static hasTopic(topic2) {
    return Partarum.Cache.CacheStorage.hasTopic(topic2);
  }
  static setTheme(topic2 = "withoutTopic", theme) {
    this.newComerThemesMap ??= /* @__PURE__ */ new Map();
    let res = Partarum.Cache.CacheStorage.setTheme(this.initiatorID, topic2, theme);
    res && this.newComerThemesMap.set(theme, topic2);
    return res;
  }
  static getTheme(topic2, theme) {
    return this.topicCache[topic2].getTheme(theme);
  }
  static addCacheMethode(mapName, methodNamesArray) {
    this.themeMapNames ??= [];
    if (!this.themeMapNames.includes(mapName)) {
      this.themeMapNames.push(mapName);
    }
    let methodTypes = ["set", "get", "has", "remove"];
    if (methodNamesArray.length === methodTypes.length) {
      for (let number in methodTypes) {
        let callbackObject = null;
        switch (methodTypes[number]) {
          case "set":
            callbackObject = {
              [methodNamesArray[number]]: (topic2, theme, mapKey, mapValue) => {
                let methodMapName = this[methodNamesArray[number]].mapName;
                Partarum.Cache.CacheStorage.setToMap(topic2, theme, mapKey, mapValue, methodMapName, this.initiatorID);
              }
            };
            callbackObject[methodNamesArray[number]].mapName = mapName;
            break;
          case "get":
            callbackObject = {
              [methodNamesArray[number]]: (topic2, theme, key) => {
                let methodMapName = this[methodNamesArray[number]].mapName;
                return Partarum.Cache.CacheStorage.getFromMap(topic2, theme, key, methodMapName, this.initiatorID);
              }
            };
            callbackObject[methodNamesArray[number]].mapName = mapName;
            break;
          case "has":
            callbackObject = {
              [methodNamesArray[number]]: (topic2, theme, key) => {
                let methodMapName = this[methodNamesArray[number]].mapName;
                return Partarum.Cache.CacheStorage.hasIntoMap(topic2, theme, methodMapName, key, this.initiatorID);
              }
            };
            callbackObject[methodNamesArray[number]].mapName = mapName;
            break;
          case "remove":
            callbackObject = {
              [methodNamesArray[number]]: () => {
                return this.topicCache.removeFromMap();
              }
            };
        }
        const { [methodNamesArray[number]]: funk } = callbackObject;
        this[methodNamesArray[number]] = funk;
      }
      let callGetFomAll = {
        ["getAll"]: (topic2, theme, mapName2) => {
          return Partarum.Cache.CacheStorage.getAllFromMap(topic2, theme, mapName2, this.initiatorID);
        }
      };
      callGetFomAll["getAll"].mapName = mapName;
      const { ["getAll"]: funkAll } = callGetFomAll;
      this["getAll"] = funkAll;
    }
  }
};

// Partarum/PartarumJS/ClientSide/Cache/WorkingCache.js
var WorkingCache = class extends CacheBase {
  static create(topic2, theme) {
    super.create(topic2, theme);
  }
  static setStationLoadPageLoadCounter() {
    WorkingCache.loadCounter ??= 0;
    WorkingCache.loadCounter++;
  }
};

// Partarum/PartarumJS/ClientSide/Cache/ImportCache.js
var ImportCache = class {
  static create(id) {
    ImportCache.modulArray ??= {};
  }
  static setID(id) {
    ImportCache.id = id;
  }
  static setModule(data) {
    ImportCache.module = data;
  }
  static setCondition() {
    ImportCache.conditionObject ??= {};
    ImportCache.idCounter ??= 0;
    let id = "round_" + ImportCache.idCounter++;
    ImportCache.conditionObject[id] = [];
    return id;
  }
};

// Partarum/PartarumJS/ClientSide/Cache/HTMLCache.js
var HTMLCache = class extends CacheBase {
  static create(topic2, theme) {
    super.create(topic2, theme);
    if (super.init() === false) {
      super.addCacheMethode("NodeCache", ["setNode", "getNode", "hasNode", "removeNode"]);
      super.init(true);
    }
    return {
      caller: this,
      topic: topic2,
      theme,
      add: (key, value, position = null) => {
        Partarum.Cache.HTMLCache.add(topic2, theme, key, value, position);
      },
      get: (key, promise = false) => {
        return promise === false ? this.getNode(topic2, theme, key) : new Promise((resolve) => {
          let res = this.getNode(topic2, theme, key);
          let val = setInterval(() => {
            if (res !== null) {
              resolve(res);
              clearInterval(val);
            } else {
            }
          }, 200);
        });
      },
      create: (topic3, theme2) => {
        return HTMLCache.create(topic3, theme2);
      },
      getAllOfTheme: (topic3, theme2) => {
        return this.getAll(topic3, theme2, "NodeCache");
      },
      has: (key) => {
        return this.hasNode(topic2, theme, key);
      }
    };
  }
  static add(topic2, theme, key, value, position = null) {
    if (this.hasNode(topic2, theme, key)) {
      let node = this.getNode(topic2, theme, key);
      if (typeof node !== "number" && typeof node !== "string") {
        switch (position) {
          case "append":
            node.appendChild(value);
            break;
          case "after":
            break;
          case "before":
        }
      } else {
        this.setNode(topic2, theme, key, value);
      }
    } else {
      this.setNode(topic2, theme, key, value);
    }
  }
};

// Partarum/PartarumJS/ClientSide/Cache/DOMCache.js
var DOMCache = class {
  static create() {
    DOMCache.startCounter();
    DOMCache.setTemplateProp();
  }
  static startCounter() {
    DOMCache.counter ??= 0;
    DOMCache.roundCounter ??= {};
  }
  static setTemplateProp(item) {
    DOMCache.templateProps ??= [];
    if (item !== void 0) {
      DOMCache.templateProps[item.name] = item.value;
    }
  }
  static zeroCounter() {
    DOMCache.zeroCount ??= 0;
    DOMCache.zeroCount++;
  }
  static getTemplateProp(item) {
    return DOMCache.templateProps[item];
  }
  static getAllTemplateProps() {
    return DOMCache.templateProps;
  }
};

// Partarum/PartarumJS/ClientSide/Cache/EventCache.js
var EventCache = class extends CacheBase {
  static create(topicName, theme) {
    super.create(topicName, theme);
    if (super.init() === false) {
      super.addCacheMethode("handlerCache", ["setHandler", "getHandler", "hasHandler", "removeHandler"]);
      super.addCacheMethode("targetIDCache", ["setTargetID", "getTargetID", "hasTargetID", "removeTargetID"]);
      super.init(true);
    }
  }
  static setEvent(name, callback) {
    if (name instanceof Object) {
      let eventName = name.name ?? name.eventName;
      const { [eventName]: funk } = {
        [eventName]: (ev) => {
          name.doThat(ev);
        }
      };
      let topic2 = name.topic;
      let theme = name.theme;
      this.setHandler(topic2, theme, eventName, funk);
      this.setTargetID(topic2, theme, eventName, name.targetID);
    } else {
      const { [name]: funk } = {
        [name]: (ev) => {
          callback(ev);
        }
      };
    }
  }
  static getEvent(topic2, theme, eventName) {
    return EventCache.getHandler(topic2, theme, eventName);
  }
  static getID(name, topic2) {
    return EventCache.topicCache[topic2].getTargetID(name);
  }
  static getThemeIDs(topic2, theme) {
    return EventCache.topicCache.getAllFromMap(topic2, theme, "targetIDCache");
  }
  static removeEvent(name) {
    delete EventCache.topicCache[topic]?.[name];
  }
};

// Partarum/PartarumJS/ClientSide/Cache/CounterCache.js
var CounterCache = class extends CacheBase {
};

// Partarum/PartarumJS/ClientSide/Cache/SimpleCache.js
var SimpleCache = class extends CacheBase {
  static create(topic2, theme) {
    super.create(topic2, theme);
    if (super.init() === false) {
      super.addCacheMethode("ItemCache", ["setItem", "getItem", "hasItem", "removeItem"]);
      super.addCacheMethode("Timeline", ["setItemToTimeline", "getItemFromTimeline", "hasItemFromTimeline", "removeItemFromTimeline"]);
      super.init(true);
    }
  }
};

// Partarum/PartarumJS/ClientSide/Cache/IndexCache.js
var IndexCache = class extends Map {
  constructor(topic2) {
    super();
    this.topic = topic2;
    this.index = Partarum.Helper.Hex.createIndex();
  }
  set(value = true) {
    let index = this.index.next();
    const ID = Partarum.Helper.Hex.getString(index);
    super.set(ID, value);
    return ID;
  }
  get(id) {
    return this[id] ?? null;
  }
};

// Partarum/PartarumJS/ClientSide/Cache/PlotCache.js
var PlotCache = class extends CacheBase {
  static create(topic2, theme) {
    console.dir(topic2);
    console.dir(theme);
    super.create(topic2, theme);
    if (super.init() === false) {
      super.addCacheMethode("CTXCache", ["setCTX", "getCTX", "hasCTX", "removeCTX"]);
      super.addCacheMethode("BoardCache", ["setBoard", "getBoard", "hasBoard", "removeBoard"]);
      super.addCacheMethode("CollectionCache", ["setCollection", "getCollection", "hasCollection", "removeCollection"]);
      super.addCacheMethode("LastDraw", ["setLastDraw", "getLastDraw", "hasLastDraw", "removeLastDraw"]);
      super.init(true);
    }
    return {
      caller: this,
      topic: topic2,
      theme,
      add: (key, value, position = null) => {
        PlotCache.add(topic2, theme, key, value, position);
      },
      get: (mapName) => {
        let baseObject = {
          caller: this,
          topic: topic2,
          theme
        };
        let reObject;
        switch (mapName) {
          case "CTXCache":
            reObject = {
              add: (...arg) => {
                return this.setCTX(topic2, theme, ...arg);
              },
              get: (...arg) => {
                return this.getCTX(topic2, theme, ...arg);
              },
              has: () => {
                return this.hasCTX();
              },
              remove: () => {
                return this.removeCTX();
              },
              ...baseObject
            };
            break;
          case "BoardCache":
            reObject = {
              add: (...arg) => {
                return this.setBoard(topic2, theme, ...arg);
              },
              get: (...arg) => {
                return this.getBoard(topic2, theme, ...arg);
              },
              has: () => {
                return this.hasBoard();
              },
              remove: () => {
                return this.removeBoard();
              },
              ...baseObject
            };
            break;
          case "CollectionCache":
            reObject = {
              add: (...arg) => {
                return this.setCollection(topic2, theme, ...arg);
              },
              get: (...arg) => {
                return this.getCollection(topic2, theme, ...arg);
              },
              has: (...arg) => {
                return this.hasCollection(topic2, theme, ...arg);
              },
              remove: () => {
                return this.removeCollection();
              },
              ...baseObject
            };
            break;
          case "LastDraw":
            reObject = {
              add: (...arg) => {
                return this.setLastDraw(topic2, theme, ...arg);
              },
              get: () => {
                return this.getLastDraw();
              },
              has: () => {
                return this.hasLastDraw();
              },
              remove: () => {
                return this.removeLastDraw();
              },
              ...baseObject
            };
        }
        return reObject;
      },
      create: (topic3, theme2) => {
        return PlotCache.create(topic3, theme2);
      },
      getAllOfTheme: (topic3, theme2) => {
        return this.getAll(topic3, theme2, "NodeCache");
      },
      has: (key) => {
        return this.hasNode(topic2, theme, key);
      }
    };
  }
  add() {
  }
  get() {
  }
  has() {
  }
  remove() {
  }
};

// Partarum/PartarumJS/ClientSide/Cache/Cache.js
var Cache = class {
};
__publicField(Cache, "IndexCache", IndexCache);
__publicField(Cache, "PartarumCache", PartarumCache);
__publicField(Cache, "WorkingCache", WorkingCache);
__publicField(Cache, "ImportCache", ImportCache);
__publicField(Cache, "DOMCache", DOMCache);
__publicField(Cache, "EventCache", EventCache);
__publicField(Cache, "CounterCache", CounterCache);
__publicField(Cache, "SimpleCache", SimpleCache);
__publicField(Cache, "CacheStorage", new CacheStorage());
__publicField(Cache, "HTMLCache", HTMLCache);
__publicField(Cache, "PlotCache", PlotCache);

// Partarum/PartarumJS/ClientSide/Workshop/Log.js
var Log = class extends CacheBase {
  static create(topic2, theme) {
    super.create(topic2, theme);
    if (super.init() === false) {
      super.addCacheMethode("LogCache", ["setLog", "getLog", "hasLog", "removeLog"]);
      super.init(true);
    }
    return {
      caller: this,
      topic: topic2,
      theme,
      add: (value) => {
        console.dir("call Log over Object.add()");
        this.add(topic2, theme, value);
      }
    };
  }
  static add(topic2, theme, value) {
    const MOMENT = performance.now().toString();
    let key = "0x" + this.lastHex.toString(16).padStart(6, "0");
    this.timeline[key] = {
      time: MOMENT,
      topic: topic2,
      theme,
      message: value
    };
    this.setLog(topic2, theme, MOMENT, value);
    let num = this.lastHex + 1;
    let next = "0x" + num.toString(16).padStart(6, "0");
    this.lastHex = parseInt(next, 16);
  }
  static view() {
    console.table(this.timeline);
  }
};
__publicField(Log, "timeline", {});
__publicField(Log, "lastHex", 1);

// Partarum/PartarumJS/ClientSide/Validation/Validation.js
var Validation = class {
  static confirmLink(text, link, options) {
    let optionString = Object.entries(options).map((x) => x.join("=")).join(",");
    window.confirm(text) && window.open(link, "_blank", optionString);
  }
};

// Partarum/PartarumJS/ClientSide/Validation/ValidObject.js
var ValidObject = class {
  testObject;
  isValid(props, needle) {
    return props.every((prop) => {
      return this[prop] !== needle && this[prop] !== void 0;
    });
  }
  merge(ob) {
    for (let prop in ob) {
      if (ob.hasOwnProperty(prop)) {
        this[prop] = ob[prop];
      }
    }
  }
};

// Partarum/PartarumJS/ClientSide/Helper/Counter.js
var Counter = class {
  constructor(theme) {
    this.theme = Symbol(theme);
    Partarum.Cache.CounterCache.setTheme(this.theme);
  }
};

// Partarum/PartarumJS/ClientSide/Workshop/Helper.js
var Helper = class {
  static getGermanDateString(date, withTime = false) {
    let startDate = new Date(this.getValidDateString(date));
    const options = withTime === false ? {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    } : {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    let utc = new Date(startDate.toUTCString());
    return utc.toLocaleDateString("de-DE", options);
  }
  static getDateFromUTC(date) {
    let startDate = new Date(this.getValidDateString(date));
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    };
    return new Date(startDate.toUTCString()).toLocaleDateString("de-DE", options);
  }
  static getValidDateString(date) {
    return date.replace(/ /g, "T");
  }
  static getCurrentHour() {
    return new Date().getHours();
  }
  static betweenRanges(needle, min, max) {
    return needle > min && needle < max;
  }
  static safeFunction() {
  }
};
__publicField(Helper, "Hex", Hex);
__publicField(Helper, "Counter", Counter);

// Partarum/PartarumJS/ClientSide/Workshop/ViewKit.js
var GroupObject = class {
  constructor(name) {
    Partarum.ViewKit.displayCache ??= /* @__PURE__ */ new Map();
    this.groupName = name;
    this.displays = [];
  }
  addDisplay(d, el) {
    this.displays.push(d);
    this[d] = new Display(this.groupName, d, el);
    Partarum.ViewKit.displayCache.set(d, this.groupName);
    return this[d];
  }
  setScrollableElement(el) {
    this.scrollableElement = el;
  }
  setFocus(e) {
    this.focus = e ?? false;
  }
};
var DisplayGroup = class extends GroupObject {
  constructor(name) {
    super(name);
  }
};
var Display = class {
  constructor(g, d, el) {
    this.groupName = g;
    this.displayName = d;
    this.element = el ?? d;
    this.classes = [];
  }
  setClass(className) {
    this.classes.push(className);
  }
  setScrollableElement(el) {
    this.scrollableElement = el;
  }
  createUrl(id, block) {
    let start = "start";
    return `javascript: Partarum.ViewKit.setIntoView("${this.displayName}", "${id}", "${block ?? start}").then((resolve)=>{
            if(resolve === false){
            console.dir("Kein Element vorhanden");
            
            } else {
            console.dir("Element vorhanden und Funktion ausgef\xFChrt");
            }
        });`;
  }
  setViewport(id, block) {
    this.id = id;
    this.viewportCache ??= /* @__PURE__ */ new Map();
    this.viewportCache.set(this.id, {
      block,
      url: this.createUrl(id, block)
    });
    return this;
  }
  getURL() {
    let result = this.viewportCache.get(this.id);
    return result.url;
  }
};
var singleDisplay = class extends Display {
  constructor(name) {
    super(name, name, name);
    delete this.groupName;
  }
  setFocus(e) {
    this.focus = e ?? false;
  }
};
var ViewKit = class {
  static scrollNow(e, b) {
    return new Promise((resolve, reject) => {
      e.scrollIntoView({ block: b === "center" || b === "start" ? "start" : b, behavior: "smooth" });
      resolve(e);
    });
  }
  static scrollBack(el) {
    el.scrollBy({ left: 0, top: -300, behavior: "smooth" });
  }
  static addfocusCache(el) {
    ViewKit.focusCache ??= [];
    ViewKit.focusCache.push(el);
  }
  static removeFocusCache() {
    let el = ViewKit.focusCache.shift();
    el.classList.remove("focusBorder");
  }
  static setFocusBorder(el) {
    Array.isArray(ViewKit.focusCache) && ViewKit.removeFocusCache();
    ViewKit.addfocusCache(el);
    el.classList.add("focusBorder");
  }
  static getScrollStopped() {
    return new Promise((resolve, reject) => {
    });
  }
  static setScrollEvent(el, callback) {
    el.addEventListener("scroll", callback, false);
  }
  static scrollCallback(evName, scrollElement, scrollableElement, block) {
    return (ev) => {
      scrollableElement.removeEventListener("scroll", Partarum.Cache.EventCache.getEvent(evName), false);
      if (block === "center") {
        if (scrollableElement.scrollTop !== scrollElement.offsetTop - scrollableElement.offsetTop) {
          if (scrollableElement !== document) {
            scrollableElement.scrollTo({
              left: 0,
              top: scrollElement.offsetTop - scrollableElement.offsetTop - 300,
              behavior: "smooth"
            });
          }
        }
      }
    };
  }
  static setIntoView(d, e, b) {
    return new Promise((resolve, reject) => {
      let el = document.getElementById(e);
      if (el) {
        let groupName = Partarum.ViewKit.displayCache ? Partarum.ViewKit.displayCache.get(d) : void 0;
        let display = groupName === void 0 ? Partarum.ViewKit.displays[d] : Partarum.ViewKit.displays[groupName][d];
        let focus = groupName === void 0 ? Partarum.ViewKit.displays[d].focus : Partarum.ViewKit.displays[groupName].focus;
        let scrollableElement = () => {
          if (display?.scrollableElement === false || display?.scrollableElement === "window") {
            return ["window", document];
          } else {
            return [display.scrollableElement, document.getElementById(display.scrollableElement)];
          }
        };
        let evNameAndElement = scrollableElement();
        let ev = {
          type: "scroll",
          topic: evNameAndElement[0],
          theme: "Viewport",
          name: display.id + "_scrollTo_" + e,
          targetID: display.displayName,
          doThat: ViewKit.scrollCallback(evNameAndElement[0], el, evNameAndElement[1], b)
        };
        Partarum.Cache.EventCache.create(ev.topic, ev.theme);
        Partarum.Cache.EventCache.setEvent(ev);
        let getEvCallback = Partarum.Cache.EventCache.getEvent(ev.topic, ev.theme, ev.name);
        if (evNameAndElement[1].offsetHeight !== evNameAndElement[1].scrollHeight) {
          ViewKit.setScrollEvent(evNameAndElement[1], getEvCallback);
        }
        ViewKit.displayStatus(el) !== true && ViewKit.changeDisplay(groupName, d);
        ViewKit.scrollNow(el, b).then((e2) => {
          focus === true && ViewKit.setFocusBorder(e2);
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
  static setDisplayGroup(name) {
    Partarum.ViewKit.displays ??= {};
    Partarum.ViewKit.displays[name] = new DisplayGroup(name);
    return Partarum.ViewKit.displays[name];
  }
  static setSingleDisplay(name) {
    Partarum.ViewKit.displays ??= {};
    Partarum.ViewKit.displays[name] = new singleDisplay(name);
    return Partarum.ViewKit.displays[name];
  }
  static setDisplay(display) {
    return new singleDisplay(display);
  }
  static callDisplay(display) {
    let displayGroup = Partarum.ViewKit.displays;
    let getGroup = displayGroup[display] ? Partarum.ViewKit.displays[display] : Partarum.ViewKit.displayCache.get(display);
    if (typeof getGroup !== "object") {
      return displayGroup[getGroup][display];
    } else {
      return displayGroup[display];
    }
  }
  static displayStatus(el) {
    return [
      el.clientLeft,
      el.clientHeight,
      el.clientTop,
      el.clientWidth
    ].every((key) => key === 0) !== true;
  }
  static replaceClass(el, oldClass, newClass) {
    el.classList.remove(oldClass);
    el.classList.add(newClass);
  }
  static changeDisplay(dg, d) {
    let displayGroup = Partarum.ViewKit.displays[dg];
    let displays = displayGroup.displays;
    let counter = 0;
    let elGroup = [];
    let classGroup = [];
    for (let displayName of displays) {
      counter++;
      classGroup.push(displayGroup[displayName].classes);
      elGroup.push(document.getElementById(displayGroup[displayName].element));
    }
    for (let i = 0; i < counter; i++) {
      for (let j = 0; j < counter; j++) {
        elGroup[i].classList.toggle(classGroup[j]);
      }
    }
  }
};

// Partarum/PartarumJS/ClientSide/Workshop/Loader.js
var Loader = class {
  static fetchFile(file, type) {
    return new Promise((resolve, reject) => {
      fetch(file).then((response) => {
        switch (type) {
          case "array":
            return response.arrayBuffer();
          case "blob":
            return response.blob();
          case "json":
            return response.json();
          case "text":
            return response.text();
          case "form":
            return response.formData();
          default:
            return false;
        }
      }).then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  static fetchJSONPost(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
      }).then((response) => {
        return response.json();
      }).then((data2) => {
        resolve(data2);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  static fetchImage(file, id) {
    return new Promise((resolve, reject) => {
      fetch(file).then((response) => {
        return response.blob();
      }).then((blob) => {
        let pic = URL.createObjectURL(blob);
        let node = document.getElementById(id);
        node.src = pic;
        console.dir(node);
        console.dir(pic);
      });
    });
  }
};

// Partarum/PartarumJS/ClientSide/Workshop/Workbox.js
var Workbox = class {
  constructor(file, config = null) {
    this.worker = new Worker(file, config);
  }
  getWorker() {
    return this.worker;
  }
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
  add(element, topic2) {
    this.root.dom.add(topic2, element, "append");
  }
  addTopic(parent, topic2, elementName) {
    let topicArray = Array.isArray(topic2) ? topic2 : [topic2];
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
var HTMLPartarumHost = class extends HTMLPartarumElement {
  constructor(config, name, id) {
    super(config, name, id);
    this.base();
  }
  connectedCallback() {
    super.connectedCallback();
  }
  base() {
    this.partarum = window.Partarum;
    this.root.dom = this.partarum.Cache.HTMLCache.create("partarum-host", this.root.name);
    this.root.dom.add("shadowBox", this.attachShadow({ mode: "open" }), null);
    let partarumCSS = document.createElement("link");
    partarumCSS.setAttribute("rel", "stylesheet");
    partarumCSS.setAttribute("type", "text/css");
    partarumCSS.setAttribute("href", "/Partarum/css");
    this.root.dom.add("shadowBox", partarumCSS, "append");
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
__publicField(HTMLPartarumHost, "cache");
customElements.get("partarum-host") || customElements.define("partarum-host", HTMLPartarumHost);

// Partarum/PartarumJS/ClientSide/HTML/PartarumCardBox/HTMLCardBoxHeader.js
var HTMLCardBoxHeader = class extends HTMLPartarumElement {
  constructor(config, id = null) {
    super(config, "header");
    this.id = id || "";
  }
  addTopic(topic2) {
    super.addTopic(topic2, "button");
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
  add(element, topic2) {
    this.root.dom.add(topic2, element, "append");
  }
  addTopic(topic2, id, elementName = "button", cardBoxObject, position = "start") {
    return new Promise((resolve) => {
      let topicArray = Array.isArray(topic2) ? topic2 : [topic2];
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
    const topic2 = catBox.topic;
    const data = catBox.data;
    const catID = topic2.id;
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
  async analyseConfig(topic2) {
    if (topic2 instanceof Object) {
      if (Array.isArray(topic2)) {
        for (let topicObject of topic2) {
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
  topicName(topic2) {
    return new Promise((resolve) => {
      this.startMenu.set(this.lastID, topic2);
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
  add(element, topic2) {
    this.root.dom[topic2].appendChild(element);
  }
  addTopic(topic2) {
    let topicArray = Array.isArray(topic2) ? topic2 : [topic2];
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
  add(element, topic2) {
    this.root.dom.add(topic2, element, "append");
  }
  addTopic(topic2) {
    let topicArray = Array.isArray(topic2) ? topic2 : [topic2];
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

// Partarum/PartarumJS/ClientSide/System/Cookie.js
var Cookie = class {
  static init(statusInUse = false) {
    Partarum.Log.create("Cookie", "init");
    Partarum.Log.add("Cookie", "init", "start");
    if (this.isInitialized === false) {
      this.isInitialized = true;
      Partarum.Log.add("Cookie", "init", { initialized: false });
      return new Promise(async (resolve) => {
        Partarum.Log.add("Cookie", "init", "Promise");
        this.inUse = statusInUse;
        if (this.inUse === false) {
          Partarum.Log.add("Cookie", "init", { inUse: false });
          await this.check();
          await this.getUserCookies();
        }
        await this.isAccepted().then(() => {
          Partarum.Log.add("Cookie", "init", "after isAccepted()");
          resolve({
            inUse: this.inUse,
            status: this.status,
            accepted: this.accepted,
            initialized: this.isInitialized
          });
        });
      });
    } else {
      Partarum.Log.add("Cookie", "init", { initialized: true });
      return Promise.resolve({
        inUse: this.inUse,
        status: this.status,
        accepted: this.accepted,
        log: this.Log,
        errorTest: new Error("testLog")
      });
    }
  }
  static toAgree(config, reload = false) {
    Partarum.Log.create("Cookie", "toAgree");
    Partarum.Log.add("Cookie", "toAgree", "start");
    return new Promise((resolve) => {
      Partarum.Log.add("Cookie", "toAgree", "Promise");
      if (this.status === true) {
        this.accepted = true;
        window.sessionStorage.setItem("cookies_accepted", "true");
        ((config2) => {
          let cookie = document.cookie;
          return new Promise((resolve2) => {
            config2.cookies.active.doThat();
            resolve2(cookie);
          });
        })(config).then((cookieBefore) => {
          if (cookieBefore === document.cookie) {
            let isCookie = function() {
              counter++;
              if (document.cookie === cookieBefore) {
                console.log(document.cookie);
                (counter === 200 || reload === true) && clearInterval(intID);
                resolve(false);
              } else {
                console.log(document.cookie);
                clearInterval(intID);
                resolve(true);
              }
            };
            let intID = setInterval(isCookie, 100);
            let counter = 0;
          }
        });
      }
    });
  }
  static toDisagree() {
    if (this.status === true) {
      this.accepted = false;
      window.sessionStorage.setItem("cookies_accepted", "false");
    }
  }
  static isAccepted() {
    Partarum.Log.create("Cookie", "isAccepted");
    return new Promise((resolve) => {
      Partarum.Log.add("Cookie", "isAccepted", "Promise");
      let acceptedStatus = window.sessionStorage.getItem("cookies_accepted");
      if (acceptedStatus !== null && acceptedStatus === "true") {
        this.accepted = true;
        resolve(true);
      } else {
      }
      resolve(false);
    });
  }
  static add() {
  }
  static has() {
  }
  static get() {
  }
  static remove() {
  }
  static updateUserCookies() {
  }
  static getUserCookies() {
    Partarum.Log.create("Cookie", "getUserCookies");
    return new Promise((resolve) => {
      Partarum.Log.add("Cookie", "getUserCookies", "Promise");
      Partarum.Cache.SimpleCache.create("Cookies", "userCookies");
      let cookieArray = document.cookie.split(";");
      cookieArray.forEach((item) => {
        let cookie = item.split("=");
        if (cookie.length > 1) {
          let cookieName = cookie[0].trim();
          let cookieValue = cookie[1];
          this.Storage.set(cookieName, cookieValue);
          Partarum.Cache.SimpleCache.setItem("Cookies", "userCookies", cookieName, cookieValue);
          this.inUse = true;
        }
      });
      Partarum.Cache.SimpleCache.setItemToTimeline("Cookies", "userCookies", performance.now().toString(), document.cookie);
      resolve(true);
    });
  }
  static check() {
    Partarum.Log.create("Cookie", "check");
    return new Promise((resolve) => {
      Partarum.Log.add("Cookie", "check", "Promise");
      this.status = navigator.cookieEnabled === true ? true : navigator.cookieEnabled === false ? false : "hidden";
      this.status === true && window.sessionStorage.setItem("cookies_activated", this.status.toString());
      resolve(this.status);
    });
  }
};
__publicField(Cookie, "status", false);
__publicField(Cookie, "inUse", false);
__publicField(Cookie, "accepted", false);
__publicField(Cookie, "Storage", /* @__PURE__ */ new Map());
__publicField(Cookie, "isInitialized", false);

// Partarum/PartarumJS/ClientSide/System/System.js
var System = class {
};
__publicField(System, "Cookie", Cookie);

// Partarum/PartarumJS/ClientSide/Draw/Plotter.js
var Plotter = class {
  static createBoard(id, attr = { width: window.offsetWidth, height: window.offsetHeight }, type = "node") {
    return new Promise((resolve) => {
      if (this.isInitialized === false) {
        let plotterCache = Partarum.Cache.PlotCache.create("PlotterCache", "Plotter");
        this.root = {
          cache: plotterCache,
          ctx: plotterCache.get("CTXCache"),
          board: plotterCache.get("BoardCache"),
          collection: plotterCache.get("CollectionCache"),
          lastDraw: plotterCache.get("LastDraw")
        };
        this.isInitialized = true;
      }
      let board = document.createElement("canvas");
      board.setAttribute("id", id);
      board.setAttribute("width", attr.width);
      board.setAttribute("height", attr.height);
      this.root.board.add(id, board);
      this.root.ctx.add(this.root.board.get(id), /* @__PURE__ */ new Map());
      this.root.ctx.get(this.root.board.get(id)).set("ctx", this.root.board.get(id).getContext("2d"));
      this.root.ctx.get(this.root.board.get(id)).set("id", id);
      resolve(type === "node" ? this.root.board.get(id) : this.root.ctx.get(this.root.board.get(id)).get("ctx"));
      resolve();
    });
  }
  static clearBoard(...idArray) {
    for (let id of idArray) {
      this.root.ctx.get(this.root.board.get(id)).get("ctx").clearRect(0, 0, this.root.board.get(id).width, this.root.board.get(id).height);
    }
  }
  static showPoint(left, top, color) {
    let pointElement = document.createElement("div");
    pointElement.style.position = "absolute";
    pointElement.style.height = "5px";
    pointElement.style.width = "5px";
    pointElement.style.borderRadius = "50%";
    pointElement.style.background = color;
    pointElement.style.left = left + "px";
    pointElement.style.top = top + "px";
    document.body.appendChild(pointElement);
  }
  static render(name, group) {
    for (let child of Object.keys(this.root.collection.get(name)[group])) {
      this.root.collection.get(name)[group][child]();
    }
  }
  static record2(plot) {
    return new Promise((resolve) => {
    });
  }
  static record(canvas, name, group, child, callback) {
    return new Promise((resolve) => {
      let theme;
      if (this.root.collection.has(name) === false) {
        this.root.collection.add(name, /* @__PURE__ */ new Map());
        theme = this.root.collection.get(name);
        theme.set("boards", /* @__PURE__ */ new Map());
        theme.get("boards").set(this.root.ctx.get(canvas).get("id"), canvas);
        theme.set("endpoints", /* @__PURE__ */ new Map());
      } else {
        theme = this.root.collection.get(name);
      }
      console.dir(group);
      if (this.root.collection.get(name).hasOwnProperty(group) === false) {
        this.root.collection.get(name)[group] = {};
      }
      console.dir(this.root.collection.get(name));
      this.root.collection.get(name)[group][child] = callback;
      this.root.lastDraw.add("name", name);
      this.root.lastDraw.add("group", group);
      resolve(true);
    });
  }
  static update(paramName = void 0, paramGroup = void 0) {
    this.render(paramName || this.root.lastDraw.get("name"), paramGroup || this.root.lastDraw.get("group"));
  }
  static isCollected(name, group) {
    return this.root.collection.has(name) && this.root.collection.get(name).hasOwnProperty(group);
  }
};
__publicField(Plotter, "root");
__publicField(Plotter, "isInitialized", false);

// Partarum/PartarumJS/ClientSide/Draw/Draw.js
var Draw = class {
};
__publicField(Draw, "Plotter", Plotter);

// Partarum/PartarumJS/ClientSide/Events/Events.js
var _Events = class {
  static getBase(topic2, type, addition, targetID, goalID, handler) {
    return {
      type,
      topic: topic2,
      theme: topic2 + "_" + addition,
      name: topic2 + "_" + addition + "_" + type + "_from_" + targetID + "_to_" + goalID,
      targetID,
      ...handler
    };
  }
  static keycheck(type, keyName, targetID, goalID) {
    const KEYS = {
      enter: 13
    };
    return _Events.getBase("keycheck", type, keyName, targetID, goalID, _Events.handler.keycheck[type](goalID, KEYS[keyName]));
  }
  static validation(type, theme, targetID, goalID) {
    return _Events.getBase("validation", type, theme, targetID, goalID, _Events.handler.validation[type][theme](goalID));
  }
};
var Events = _Events;
__publicField(Events, "handler", {
  keycheck: {
    keyup: (goalID, keyCodeNeedle) => {
      return {
        doThat: (event) => {
          if (event.keyCode === keyCodeNeedle) {
            event.preventDefault();
            document.getElementById(goalID).click();
          }
        }
      };
    }
  },
  validation: {
    click: {
      email: (goalID, options) => {
        return {
          doThat: () => {
            let email = document.getElementById(goalID).value;
            if (email.length > 4) {
              if (email.includes("@") && email.includes(".")) {
                sessionStorage.setItem("email", email);
                let a = document.getElementById("sendTheShit");
                a.setAttribute("style", "display: block");
                a.click();
              } else {
                let text = "Du musst eine Email - Adresse mit @ und . eingeben!";
                let a = document.getElementById("emailValidation");
                a.hidden = false;
                a.style.backgroundColor = options?.backgroundColor ?? "#E6E6FA";
                a.children[0].innerText = text;
              }
            } else {
              let text = "Zu kurz f\xFCr eine Email - Adresse";
              let a = document.getElementById("emailValidation");
              a.hidden = false;
              a.style.backgroundColor = options?.backgroundColor ?? "#E6E6FA";
              a.children[0].innerText = text;
            }
          }
        };
      }
    }
  }
});

// Partarum/PartarumJS/ClientSide/Import/Import.js
var ImportList = {
  Log,
  Validation,
  ValidObject,
  Helper,
  ViewKit,
  Loader,
  Workbox,
  Cache,
  HTML,
  Design,
  Counter,
  System,
  Draw,
  Events
};

// Partarum/PartarumJS/ClientSide/Workshop/Workshop.js
var Workshop = class {
  constructor() {
    if (!globalThis.Partarum || !Window.Partarum) {
      globalThis.Partarum = Partarum;
    }
    this.setClasses();
    this.loadStyle();
  }
  addToGlobal(a) {
    for (let i of a) {
      globalThis.Partarum[i] = i;
    }
  }
  setClasses() {
    for (let i in ImportList) {
      if (ImportList.hasOwnProperty(i)) {
        globalThis.Partarum[i] = ImportList[i];
      }
    }
  }
  loadStyle() {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "https://partarum.download/module/css/partarum");
    document.getElementsByTagName("head")[0].appendChild(link);
  }
};

// Partarum/PartarumJS/ClientSide/System/ClientSetting.js
var ClientSetting = class {
  constructor() {
    this._dateObject = new Date();
    this._cookiesEnable = false;
    this._cookies = /* @__PURE__ */ new Map();
    this._resultWindow = /* @__PURE__ */ new Map();
    this._windowKeys = Object.getOwnPropertyNames(window);
    this._searchWindowArray = [
      "localStorage",
      "sessionStorage"
    ];
    this.checkStorage();
    this.checkCookies();
    this.getUserCookies();
  }
  visitingDate() {
    return this._dateObject.toLocaleString();
  }
  checkStorage() {
    for (let j = 0; j < this._searchWindowArray.length; j++) {
      let parameterWindow = this._searchWindowArray[j];
      this._resultWindow.set(parameterWindow, this._windowKeys.some((keys) => parameterWindow === keys));
    }
    if (this._resultWindow.size === 0) {
      this._resultWindow.set("localStorage", !!localStorage);
      this._resultWindow.set("sessionStorage", !!sessionStorage);
    }
    this._localStorage = this._resultWindow.get("localStorage") ?? false;
    this._sessionStorage = this._resultWindow.get("sessionStorage") ?? false;
  }
  checkCookies() {
    this._cookiesEnable = navigator.cookieEnabled === true ? true : navigator.cookieEnabled === false ? false : "hidden";
  }
  setCookie(item) {
    let cookName = Object.keys(item.nameValue);
    let cookValue = item.nameValue;
    let runTime = item.time;
    let cookieTime = runTime.min ? 1e3 * 60 * runTime.min : false;
    let date = new Date();
    let runningTime = cookieTime !== false ? date.getTime() + cookieTime : date.getTime() + 36e5;
    date.setTime(runningTime);
    for (let value of cookName) {
      document.cookie = value + "=" + cookValue[value] + "; expires=" + date.toGMTString();
    }
  }
  isCookie(cookieName) {
    if (document.cookie.split(";").some((item) => item.trim().startsWith(cookieName + "="))) {
      console.log("The cookie {cookieName} exists");
      return true;
    }
  }
  getUserCookies() {
    this.cookiesEnable && (() => {
      let cookieArray = document.cookie.split(";");
      cookieArray.forEach((item) => {
        let cookie = item.split("=");
        this._cookies.set(cookie[0], cookie[1]);
      });
    })();
  }
  getCookie(cookieName) {
    return this._cookies.get(cookieName) ?? false;
  }
  get resultWindow() {
    return this._resultWindow;
  }
  get localStorage() {
    return this._localStorage ?? false;
  }
  get sessionStorage() {
    return this._sessionStorage ?? false;
  }
  get cookiesEnable() {
    return this._cookiesEnable;
  }
};

// Partarum/PartarumJS/ClientSide/Partarum.js
var Partarum2 = class {
  constructor() {
    this.item = "Was geht ab?";
    this.dom = [];
    this.id = Cache.ImportCache.setCondition();
    this.app = {};
    Partarum2.workerCache = {};
    if (!globalThis.Partarum || !Window.Partarum) {
      globalThis.Partarum = Partarum2;
      let preload = async () => {
        await HTMLPreload.init();
      };
      !Partarum2.preloadStatus && preload().then(() => {
        new Workshop();
        Partarum2.preloadStatus = true;
        Cookie.init().then((cookieTest) => {
          console.dir(cookieTest);
        });
      });
    } else {
    }
  }
  static void() {
    return "javascript:void(0)";
  }
  static init() {
    if (!globalThis.Partarum || !Window.Partarum) {
      globalThis.Partarum = Partarum2;
      new Workshop();
    }
  }
  addWorkbox(name, file) {
    Partarum2.workerCache[name] = new Partarum2.Workbox(file, { name });
    return Partarum2.workerCache[name].getWorker();
  }
  static getWorker(name) {
    return Partarum2.workerCache[name].getWorker();
  }
  static counter() {
    Partarum2.count ??= 0;
    Partarum2.count++;
  }
  childCounter() {
    this.childCount ??= 0;
    this.childCount++;
  }
  static setTheme(i) {
    Partarum2.themeCache ??= [];
    Partarum2.themeCache.push(i);
  }
  static getTheme() {
    return Partarum2.themeCache[Partarum2.themeCache.length - 1];
  }
  static setStart() {
    Partarum2.isStarted ??= 1;
  }
  static stopStart() {
    Partarum2.isStoped ??= 1;
  }
  static start() {
    let intervall = setInterval(() => {
      let id = location.hash.slice(1);
      if (id !== "") {
        if (document.getElementById(id)) {
          let display = Partarum2.ViewKit.setSingleDisplay("anchor");
          display.setScrollableElement("window");
          Partarum2.ViewKit.callDisplay("anchor").setViewport(id, "center");
          Partarum2.ViewKit.setIntoView("anchor", id, "center");
          clearInterval(intervall);
        }
      } else {
        clearInterval(intervall);
      }
    }, 100);
  }
  set surface(value) {
    this.setSurface(value);
  }
  setSurface(value) {
    this.surfaceObject = value;
  }
  create(callback) {
    Partarum2.counter();
    callback instanceof Function && Cache.PartarumCache.setCallback(callback);
    return new Promise((resolve, reject) => {
      Partarum2.checkPreload().then(() => {
        Cache.PartarumCache.isTemplate = (this.template ?? true) && Cache.PartarumCache.setTemplates(this.template);
        this.type = this?.themes ? "group" : this?.theme ? "single" : null;
        if (this.type === "single") {
          let app = new Station(this);
          let result = this?.config ? app.loadPage(this.config) : console.dir(this);
          result.then(() => {
          });
        } else if (this.type === "group") {
          this.themes.forEach((value, index) => {
            for (let t in value) {
              if (value.hasOwnProperty(t)) {
                this.childCounter();
                Partarum2.setTheme(t);
                value[t].theme = t;
                Cache.ImportCache.conditionObject[this.id].push({ [t]: value[t] });
                let app = new Station(value[t], this.id);
                this.app[t] = app.loadPage(value[t].config);
              }
            }
          });
        }
        resolve(this.app);
      });
    });
  }
  static checkPreload() {
    return new Promise((resolve) => {
      if (Partarum2.preloadStatus === true) {
        resolve(true);
      } else {
        setTimeout(() => {
          this.checkPreload().then(() => {
            resolve(true);
          });
        }, 100);
      }
    });
  }
};
var Station = class {
  constructor(arg, id) {
    this.arg = arg;
    this.id = id;
    Cache.ImportCache.create(id);
  }
  loadPage(filePath) {
    async function load(arg, id) {
      if (typeof filePath === "string") {
        console.dir(filePath);
        return await import(filePath).then((data) => {
          return {
            [arg.theme]: {
              id,
              theme: arg.theme,
              themeData: arg,
              type: "import",
              module: data
            }
          };
        }).catch((error) => {
          console.log(filePath);
          console.dir(error);
        });
      } else if (typeof filePath === "object") {
        return {
          [arg.theme]: {
            id,
            theme: arg.theme,
            themeData: arg,
            type: "direct",
            module: filePath
          }
        };
      }
    }
    return load(this.arg, this.id).then((data) => {
      let nowImportCacheLength = Object.keys(Cache.ImportCache.modulArray).length;
      let nowImportCacheIDCounter = Cache.ImportCache.idCounter;
      let theme = Object.keys(data)[0];
      let id = data[theme].id;
      Cache.ImportCache.setID(id);
      Cache.ImportCache.modulArray[id] ??= {};
      Cache.ImportCache.modulArray[id][theme] = data[theme];
      if (Object.keys(Cache.ImportCache.modulArray[id]).length === Cache.ImportCache.conditionObject[id].length) {
        Cache.ImportCache.conditionObject[id].forEach((value, index, array) => {
          for (let conditionTheme in value) {
            if (value.hasOwnProperty(conditionTheme)) {
              let im = Cache.ImportCache.modulArray[id][conditionTheme];
              let importData;
              if (im.hasOwnProperty("type")) {
                if (im.type === "import") {
                  importData = im.module.default;
                } else if (im.type === "direct") {
                  importData = im.module;
                }
              } else {
                importData = Cache.ImportCache.modulArray[id][conditionTheme].module.default;
              }
              let content = new WebApp(conditionTheme, importData, value[conditionTheme].config);
              content.setPage(value[conditionTheme]);
            }
          }
        });
      }
      if (nowImportCacheLength !== 0 && nowImportCacheLength === nowImportCacheIDCounter - 1) {
        if (Partarum2.isStarted !== 1) {
          if (Partarum2.isStoped !== 1) {
            Partarum2.start();
            Partarum2.setStart();
            Partarum2.stopStart();
            Partarum2.isStarted = null;
          }
          Station.setCallback();
        }
      } else {
        Cache.PartarumCache.setRound();
        if (Cache.PartarumCache.getRound() === Cache.ImportCache.conditionObject["round_0"].length) {
          Station.setCallback();
        }
      }
      return data;
    }).catch((error) => {
      console.dir(error);
    });
  }
  static setCallback() {
    let c = Cache.PartarumCache.getCallback();
    if (c !== void 0) {
      for (let i = 0; i < c.length; i++) {
        let call = c[i] ?? (() => {
        });
        call();
      }
      Cache.PartarumCache.callback = [];
    }
  }
};
var WebApp = class {
  constructor(page, data, filePath) {
    this._surface = data;
    this._cache = [data];
    this.filePath = filePath;
    this._clientSettings = new ClientSetting();
  }
  setPage(arg) {
    let box = null;
    if (arg?.container) {
      box = document.createElement(arg.container);
      box.setAttribute("id", arg.theme);
      arg.parent.appendChild(box);
    }
    for (let module of this._cache) {
      if (module instanceof Promise) {
        module[0].then((data) => {
          Cache.PartarumCache.setSurfacePaths(this._surface.surface);
          return new Content(data.default, box ?? arg.parent, this.filePath);
        });
      } else {
        new Content(module, box ?? arg.parent, this.filePath);
      }
    }
  }
};
var Content = class {
  constructor(surface, arg, filePath) {
    if (arg !== null) {
      if (arg instanceof HTMLElement) {
        this.dom = arg;
      } else {
        if (arg instanceof ShadowRoot) {
          this.dom = arg;
        } else {
          this.after = arg?.after;
        }
      }
      this.surface = surface;
      this.surfacePaths = Cache.PartarumCache.surfacePaths;
      this.filePath = filePath;
      this.templateKeys = [
        "_attributes",
        "_import"
      ];
      Cache.DOMCache.create();
      this.create();
    }
  }
  create() {
    let stopRound = null;
    if (typeof this.surface !== "string" && !Array.isArray(this.surface)) {
      for (let main in this.surface) {
        Cache.DOMCache.counter++;
        if (this.surface.hasOwnProperty(main)) {
          let surface = this.surface[main];
          let node = null;
          if (main.charAt(0) !== "$") {
            let tagName = main.split("_")[0];
            if (tagName === "" && main === "_attributes") {
              Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "attribute";
              for (let attr in surface) {
                if (surface.hasOwnProperty(attr)) {
                  if (attr.charAt(0) !== "$") {
                    if (attr === "text") {
                      if (surface[attr] instanceof Promise) {
                        surface[attr].then((data) => {
                          this.dom.appendChild(document.createTextNode(data));
                        });
                      } else {
                        this.dom.appendChild(document.createTextNode(surface[attr]));
                      }
                    } else if (attr === "innerHTML") {
                      this.dom.innerHTML = surface[attr];
                    } else {
                      if (attr === "addEvent") {
                        if (Partarum2.hasOwnProperty("Cache")) {
                          let eventArray = Array.isArray(surface[attr]) ? surface[attr] : [surface[attr]];
                          for (let event of eventArray) {
                            if (event.name) {
                              if (event.topic) {
                                Partarum2.Cache.EventCache.create(event.topic, event.theme);
                                Partarum2.Cache.EventCache.setEvent(event);
                              } else {
                                Partarum2.Cache.EventCache.setEvent(event);
                              }
                            } else {
                            }
                            let eventCallback = Partarum2.Cache.EventCache.getEvent(event.topic, event.theme, event.name) ?? event["doThat"];
                            if (event.bubbles) {
                              this.dom.addEventListener(event.type, eventCallback, true);
                            } else {
                              this.dom.addEventListener(event.type, eventCallback, false);
                            }
                          }
                        }
                      } else if (attr === "addDOMEvent") {
                        surface[attr]["doThat"]();
                      } else {
                        this.dom.setAttribute(attr, surface[attr]);
                      }
                    }
                  }
                }
              }
              stopRound = true;
            } else if (tagName === "" && main === "_import") {
              if (typeof surface !== "object") {
                Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "import";
                let app = new Partarum2();
                app.themes = [
                  {
                    [surface]: {
                      config: surface,
                      parent: this.dom
                    }
                  }
                ];
                app.create();
              } else {
                if (!surface.template && Array.isArray(surface)) {
                  for (let p of surface) {
                    let is = new Content(p, this.dom, this.filePath);
                  }
                } else if (surface.template) {
                  if (typeof surface.template === "object") {
                    let valueFile = surface.template.valueFile;
                    Cache.PartarumCache.isTemplate = true;
                    Cache.PartarumCache.setTemplates(valueFile);
                    let t = new Template(surface.template.name, surface.template.surface, valueFile, this.dom);
                  } else if (typeof surface.template === "string") {
                    if (Cache.PartarumCache.getTemplate(surface.template)) {
                      Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "templateStart";
                      Template.start = true;
                      Template.startNumber = Cache.DOMCache.counter;
                      let t = new Template(surface.template, Cache.PartarumCache.templatePaths[surface.template], Cache.PartarumCache.templates[surface.template], this.dom);
                    }
                  }
                  Cache.PartarumCache.isTemplate = false;
                } else {
                  for (let attr in surface) {
                    if (surface.hasOwnProperty(attr)) {
                      if (attr === "text") {
                        fetch(surface[attr]).then(function(response) {
                          if (!response.ok) {
                            throw new Error("HTTP error, status = " + response.status);
                          }
                          return response.text();
                        }).then((text) => {
                          let textNode = document.createTextNode(text);
                          this.dom.appendChild(textNode);
                        }).catch((error) => {
                          console.dir(error);
                        });
                      }
                    }
                  }
                }
              }
              stopRound = true;
            } else if (tagName === "" && main === "_partarum") {
              console.dir(surface);
              this.dom.appendChild(surface);
            } else {
              let count = 1;
              let mainIsArray = false;
              if (Array.isArray(surface)) {
                count = surface.length;
                mainIsArray = true;
              }
              for (let i = 0; i < count; i++) {
                let hasText = false;
                if (mainIsArray === true || typeof surface === "string") {
                  hasText = typeof surface === "string" ? surface : typeof surface[i] === "string" ? surface[i] : false;
                } else if (typeof surface === "object") {
                  hasText = false;
                  for (let t in surface) {
                    if (surface.hasOwnProperty(t)) {
                      if (Cache.DOMCache.templateProps[t]) {
                        Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "reference";
                        let content = new Content(Cache.DOMCache.templateProps[t] ?? surface, this.dom, this.filePath);
                      }
                    }
                  }
                }
                if (tagName !== "") {
                  Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "node";
                  node = document.createElement(tagName);
                  hasText !== false && node.appendChild(document.createTextNode(hasText));
                  this.after ? this.after.after(node) : this.dom.appendChild(node);
                  let s = Object.keys(surface) && mainIsArray !== true ? surface : mainIsArray === true ? surface[i] : null;
                  let c = new Content(s, node, this.filePath);
                }
                stopRound = null;
              }
            }
          } else {
            let value = Template.valueCache?.[main];
            if (value !== void 0) {
              let templateReference = this.surface[main];
              if (typeof value === "string") {
                let type = templateReference["_type"];
                let valueReference = templateReference["_value"];
                if (type === "_attributes") {
                  for (let attrKey in valueReference) {
                    if (valueReference.hasOwnProperty(attrKey)) {
                      if (attrKey.startsWith("data_")) {
                        attrKey = attrKey.replace("_", "-");
                      }
                      this.dom.setAttribute(attrKey, Template.valueCache[main]);
                    }
                  }
                } else if (type === "text") {
                  this.dom.appendChild(document.createTextNode(value));
                } else if (type === "_callback") {
                  let call = "back";
                  console.log(call);
                }
              } else if (typeof value === "object") {
                if (Array.isArray(value)) {
                  let type = templateReference["_type"];
                  if (type === "_callback") {
                    let f = templateReference["_callback"];
                    f(Template.valueCache);
                  } else {
                    let nodeCounter = value.length;
                    for (let i = 0; i < nodeCounter; i++) {
                      let part = value[i];
                      let nextNode = document.createElement(this.dom.nodeName);
                      let hasChild = [];
                      if (type === "HTMLCollection") {
                        for (let valuePart in part) {
                          if (part.hasOwnProperty(valuePart)) {
                            if (valuePart === "_attributes") {
                              for (let attrKey in part[valuePart]) {
                                if (part[valuePart].hasOwnProperty(attrKey)) {
                                  if (attrKey === "text") {
                                    let textNode = document.createTextNode(part[valuePart][attrKey]);
                                    i === 0 ? this.dom.appendChild(textNode) : nextNode.appendChild(textNode);
                                  } else {
                                    attrKey = attrKey.startsWith("data_") ? attrKey.replace("_", "-") : attrKey;
                                    i === 0 ? this.dom.setAttribute(attrKey, part[valuePart][attrKey]) : nextNode.setAttribute(attrKey, part[valuePart][attrKey]);
                                  }
                                }
                              }
                            } else {
                              let nextSurface = {
                                [valuePart]: part[valuePart]
                              };
                              hasChild.push(nextSurface);
                            }
                          }
                        }
                        if (i !== 0) {
                          this.dom.parentElement.appendChild(nextNode);
                        } else {
                          nextNode = null;
                        }
                        if (hasChild.length > 0) {
                          for (let child of hasChild) {
                            let content = new Content(child, nextNode ?? this.dom, this.filePath);
                          }
                        }
                      } else if (type === "_callback") {
                      } else {
                        this.dom.parentElement.appendChild(document.createElement(this.dom.nodeName)).innerHTML = part;
                      }
                    }
                  }
                } else {
                  for (let groupKey in templateReference) {
                    if (templateReference.hasOwnProperty(groupKey)) {
                      let type = templateReference[groupKey]?.["_type"];
                      let valueReference = templateReference[groupKey]?.["_value"];
                      if (type === "text") {
                        let text = Template.valueCache[main]?.[groupKey];
                        this.dom.appendChild(document.createTextNode(text));
                      } else if (type === "_attributes") {
                        let value2 = Template.valueCache[main]?.[groupKey];
                        for (let attrKey in valueReference) {
                          if (valueReference.hasOwnProperty(attrKey)) {
                            attrKey = attrKey.startsWith("data_") ? attrKey.replace("_", "-") : attrKey;
                            this.dom.setAttribute(attrKey, value2);
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              Cache.DOMCache.templateProps?.[main] ? Cache.DOMCache.zeroCounter() : Cache.DOMCache.setTemplateProp({
                name: main,
                value: surface
              });
              let content = stopRound ?? new Content(surface, node ?? this.dom, this.filePath);
            }
          }
        }
      }
    } else {
    }
  }
};
var Template = class {
  constructor(templateName, templateSurface, valuePath, parentNode) {
    Template.setStaticTemplateProperties();
    this.templateName = templateName;
    this.templateSurface = templateSurface;
    this.pathsObject = {
      templateSurface,
      valuePath
    };
    this.loadDOM(templateName, this.pathsObject, parentNode);
  }
  loadDOM(templateName, pathsObject, parentNode) {
    if (pathsObject.valuePath instanceof Object) {
      Template.templateScript[templateName] = pathsObject.templateSurface;
      Template.templateValue[templateName] = pathsObject.valuePath;
      Template.valueCache = pathsObject.valuePath;
      Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "templateAsync";
      let templateNode = new Content(Template.templateScript[templateName], parentNode, "");
    } else {
      async function load() {
        for (let path in pathsObject) {
          if (pathsObject.hasOwnProperty(path)) {
            if (path === "valuePath") {
              await import("/" + pathsObject[path]).then((data) => {
                Template.templateScript[templateName] = pathsObject.templateSurface;
                Template.templateValue[templateName] = data.default;
                Template.valueCache = data.default;
              }).catch((error) => {
                console.dir(error);
              });
            }
          }
        }
        Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "templateAsync";
        let templateNode = new Content(Template.templateScript[templateName], parentNode, "");
      }
      load().then(() => {
        return true;
      }).catch((error) => {
        console.dir(error);
      });
    }
  }
  static start() {
    if (Template.startNumber === void 0) {
      Template.startNumber = 0;
    }
  }
  static setStaticTemplateProperties() {
    if (Template.templateScript === void 0) {
      Template.templateScript = {};
    }
    if (Template.templateValue === void 0) {
      Template.templateValue = {};
    }
    if (Template.valueCache === void 0) {
      Template.valueCache = {};
    }
    if (Template.templateCounter === void 0) {
      Template.templateCounter = {};
    }
  }
  static getTemplateScripts(name) {
    return Template.templateScript[name];
  }
};
export {
  Cache,
  Partarum2 as Partarum,
  Workshop
};
//! für mehrere Events ausbauen
//# sourceMappingURL=Partarum.js.map
