import "./style.css";
import { loadData } from "./storage.js";
import { init } from "./dom.js";

const data = loadData();
init(data);
