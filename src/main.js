import { owl } from "@odoo/owl";
import "./app.scss";

const { mount, Store, QWeb } = owl;
import { Root } from "./components/Root";
const { loadFile } = owl.utils;
import { createTaskStore } from "./store";

(async function setup() {
  const template1 = await loadFile(`./components/Root.xml`);
  const template2 = await loadFile(`./components/Sudoku/header.xml`);
  const template3 = await loadFile(`./components/Sudoku/cell.xml`);
  const template4 = await loadFile(`./components/Sudoku/displaynumber.xml`);

  const qweb = new QWeb();
  qweb.addTemplates(template1);
  qweb.addTemplates(template2);
  qweb.addTemplates(template3);
  qweb.addTemplates(template4);
  const env = {
    qweb: qweb,
    store: createTaskStore(),
  };

  mount(Root, { target: document.body, env });
})();
