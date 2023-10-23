const mainTree = document.querySelector('#main_tree');
const styleTree = document.createElement('style');

mainTree.attachShadow({ mode: 'open' });

class MyTree extends HTMLElement {
  constructor() {
    super();
  }
}

class MyLeaf extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define('my-tree', MyTree);
customElements.define('my-leaf', MyLeaf);

const createTree = (tree, parent) => {
  const list = document.createElement('my-tree');
  const item = document.createElement('my-leaf');

  item.textContent = String(tree.id);
  list.append(item);
  parent.append(list);

  tree.items?.map((elem) => {
    createTree(elem, list);
  })
}

const addTree = (elem) => {
  const objTree = JSON.parse(mainTree.getAttribute('data-tree'));
  const wrp = document.createElement('div');

  console.log(wrp);

  createTree(objTree, wrp);
  elem.shadowRoot.append(wrp);
}

styleTree.textContent = `my-tree {
    display: list-item;
    margin-left: 20px;
  }
`;

mainTree.shadowRoot.append(styleTree);
addTree(mainTree);