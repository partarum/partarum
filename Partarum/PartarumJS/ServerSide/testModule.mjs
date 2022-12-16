import {TestClass} from "./TestClass.mjs";
import pkg from "./TestClassCommon.js";

let tst = new TestClass();

const TestClassCommon = pkg;

let tstC = new TestClassCommon();

console.log("test");