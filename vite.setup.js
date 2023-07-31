import indexeddb from "fake-indexeddb";

globalThis.indexedDB = indexeddb;
window.indexedDB = indexeddb;
