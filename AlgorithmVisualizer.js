/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const traverse_Tree_Button = document.querySelector(".traverse-tree-Button");
const balance_Tree_Button = document.querySelector(".Balance-tree-button");
const insert_Node_Value = document.querySelector(".insert-node-value");
const insert_Value_button = document.querySelector(".insert-button");
const reverse_Tree_Button = document.querySelector(".reverse-tree-button");
const Visualization_area = document.querySelector(".Tree-visualizing-area");
const Visualization_SVG = document.querySelector(".visualizing-area-svg");
const remove_Node_value = document.querySelector(".remove-node-value");
const remove_value_button = document.querySelector(".remove-button");
const traversed_value_area = document.querySelector(".traversed-value-area");
const gotoview = document.querySelector("#viewScroll");
const findMin_Button = document.querySelector(".findMin-button");
const search_node_Value = document.querySelector(".search-node-value");
const search_button = document.querySelector(".search-button");
const inverted_tree = document.querySelector(".inverted-tree");
const arrange_button = document.querySelector(".arrange-button");

Visualization_SVG.style.height = 100 * Visualization_area.clientHeight;
Visualization_SVG.style.width = 100 * Visualization_area.clientWidth;

let firstNodeScreenPositionX = (100 * Visualization_area.clientWidth) / 2;
let firstNodeScreenPositionY = 100;
let NodeScreenPositionY;
let NodeScreenPositionX;
let nodeValuePosition_X;
let nodeValuePosition_Y;
let nodevalue;
let wentLeft = false;
let wentRight = false;
let traversingIndicationClasses;
let svgindicationCircleRemoveDelay = 1000;
let traverseTime = 500;
let traverseTimeChange = 400;
let all_Node_Values_Array = new Array();
let onlyOnce = true;
gotoview.style.cx = firstNodeScreenPositionX + 700;
const node_distance = 70;
let runForOneFunction = false;
let indicatorOn = false;
let go_Traversing = false;
let insertInvert = 1;
let firstExecution = true;
let balancing = false;
let previousNodePos_X;
let previousNodePos_Y;
let allNodelocations_X = new Array();
let allNodelocations_Y = new Array();

//Traversing indication
const traversingIndication = function () {
  Visualization_SVG.insertAdjacentHTML(
    "beforeend",
    `<circle
  class="traverse-indication-circle"
  cx="${NodeScreenPositionX}"
  cy="${NodeScreenPositionY}"
  r="24"
 
  fill-opacity="0"
  style="stroke: rgb(64, 5, 92); stroke-width: 2"
/>`
  );
};

/////////////////////////////////////////////

const traversingCircle = function (circleXposition, circleYposition) {
  Visualization_SVG.insertAdjacentHTML(
    "beforeend",
    `<circle
  class="traversing-circle"
  cx="${circleXposition}"
  cy="${circleYposition}"
  r="24"
  fill="grey"
  fill-opacity="0"
  style="stroke: rgb(184, 5, 5); stroke-width: 2"/>`
  );
};

////////////////////////////////////////////////////////
const tree_Left_Branch_insertion = function () {
  Visualization_SVG.insertAdjacentHTML(
    "beforeend",
    `<line
    class="svg_line"
    x1="${previousNodePos_X - 22}"
    y1="${previousNodePos_Y + 22}"
   x2="${currentPos_X}"
   y2="${currentPos_Y}"
    style="stroke: rgb(186, 91, 19); stroke-width: 5"
  />`
  );
};

const tree_Right_Branch_insertion = function () {
  Visualization_SVG.insertAdjacentHTML(
    "beforeend",
    `<line
    class="svg_line"
    x1="${previousNodePos_X + 22}"
    y1="${previousNodePos_Y + 22}"
   x2="${currentPos_X}"
   y2="${currentPos_Y}"
    style="stroke: rgb(186, 91, 19); stroke-width: 5"
  />`
  );
};
let currentPos_X;
let currentPos_Y;

const checkCurrentNodePos = function () {
  if (wentLeft) {
    wentLeft = false;
    NodeScreenPositionX = NodeScreenPositionX - node_distance;
    NodeScreenPositionY = NodeScreenPositionY + node_distance;
  }
  if (wentRight) {
    wentRight = false;
    NodeScreenPositionX = NodeScreenPositionX + node_distance;
    NodeScreenPositionY = NodeScreenPositionY + node_distance;
  }

  for (let i = 0; i < need_to_be_arranged_x.length; i++) {
    if (
      NodeScreenPositionX === need_to_be_arranged_x[i] &&
      NodeScreenPositionY === need_to_be_arranged_Y[i]
    ) {
      if (NodeScreenPositionX < firstNodeScreenPositionX) {
        NodeScreenPositionX = NodeScreenPositionX - node_distance;
        NodeScreenPositionY = NodeScreenPositionY + node_distance;
      } else {
        NodeScreenPositionX = NodeScreenPositionX + node_distance;
        NodeScreenPositionY = NodeScreenPositionY + node_distance;
      }
    }
  }
  currentPos_X = NodeScreenPositionX;
  currentPos_Y = NodeScreenPositionY;
};

/////////////////////////////////////////////////////////////////////////////////
//Not insertion visualization
const HtmlNodeinsertionFunction = function (nodeValue, nodeLeftOrRight) {
  if (nodeLeftOrRight === null) {
    if (wentLeft) {
      wentLeft = false;
      NodeScreenPositionX = NodeScreenPositionX - node_distance;
      NodeScreenPositionY = NodeScreenPositionY + node_distance;
    }
    if (wentRight) {
      wentRight = false;
      NodeScreenPositionX = NodeScreenPositionX + node_distance;
      NodeScreenPositionY = NodeScreenPositionY + node_distance;
    }

    for (let i = 0; i < need_to_be_arranged_x.length; i++) {
      if (
        NodeScreenPositionX === need_to_be_arranged_x[i] &&
        NodeScreenPositionY === need_to_be_arranged_Y[i]
      ) {
        if (NodeScreenPositionX < firstNodeScreenPositionX) {
          NodeScreenPositionX = NodeScreenPositionX - node_distance;
          NodeScreenPositionY = NodeScreenPositionY + node_distance;
        } else {
          NodeScreenPositionX = NodeScreenPositionX + node_distance;
          NodeScreenPositionY = NodeScreenPositionY + node_distance;
        }
      }
    }

    firstExecution = false;
    nodeValuePosition_X = NodeScreenPositionX - 10;
    nodeValuePosition_Y = NodeScreenPositionY + 5;
    Visualization_SVG.insertAdjacentHTML(
      "beforeend",
      `<circle
      class="svg_circle"
      cx="${NodeScreenPositionX}"
      cy="${NodeScreenPositionY}"
      r="30"
      fill="grey"
      style="stroke: rgb(15, 209, 64); stroke-width: 5 "
    />
    <text x="${nodeValuePosition_X}" y="${nodeValuePosition_Y}" class="svg-node-values" font-size="1.5em" fill="red">${nodeValue}</text>)`
    );
  } else {
    if (wentLeft) {
      wentLeft = false;
      NodeScreenPositionX = NodeScreenPositionX - node_distance;
      NodeScreenPositionY = NodeScreenPositionY + node_distance;
    } else {
      wentRight = false;
      NodeScreenPositionX = NodeScreenPositionX + node_distance;
      NodeScreenPositionY = NodeScreenPositionY + node_distance;
    }

    for (let i = 0; i < need_to_be_arranged_x.length; i++) {
      if (
        NodeScreenPositionX === need_to_be_arranged_x[i] &&
        NodeScreenPositionY === need_to_be_arranged_Y[i]
      ) {
        if (NodeScreenPositionX < firstNodeScreenPositionX) {
          NodeScreenPositionX = NodeScreenPositionX - node_distance;
          NodeScreenPositionY = NodeScreenPositionY + node_distance;
        } else {
          NodeScreenPositionX = NodeScreenPositionX + node_distance;
          NodeScreenPositionY = NodeScreenPositionY + node_distance;
        }
      }
    }
  }
};

//////////////////////////////////////////////////////////
//print traversed value
const traversedValue = function (nodeData) {
  let HTML = `<div class="traversed-value" >${nodeData}  ></div>`;
  traversed_value_area.insertAdjacentHTML("beforeend", HTML);
};

//Node class
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.position_X = null;
    this.position_Y = null;
  }
}

//class Binary Tree
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  //new node creation
  createNode = function (nodevalue) {
    console.log(this.root);

    let newNode = new Node(nodevalue);

    if (this.root === null) {
      HtmlNodeinsertionFunction(newNode.data, this.root);

      this.root = newNode;
      this.root.position_X = NodeScreenPositionX;
      this.root.position_Y = NodeScreenPositionY;

      console.log("firstExecutionWorking");
    } else {
      traversingIndicationClasses = document.querySelectorAll(
        ".traverse-indication-circle"
      );
      traversingIndication();

      if (
        nodeValuePosition_X === firstNodeScreenPositionX + node_distance ||
        nodeValuePosition_X === firstNodeScreenPositionX - node_distance
      ) {
        setTimeout(function () {
          document.querySelector(".traverse-indication-circle").remove();
        }, 1000);
      }
      if (insertInvert % 2 === 0) {
        this.invert_tree_insert(this.root, newNode);
      } else {
        this.insertNewNode(this.root, newNode);
      }
    }
  };

  //New node insertion
  insertNewNode = function (node, newNode) {
    if (newNode.data < node.data) {
      wentLeft = true;

      if (node.left === null) {
        previousNodePos_X = NodeScreenPositionX;
        previousNodePos_Y = NodeScreenPositionY;
        checkCurrentNodePos();
        tree_Left_Branch_insertion();
        HtmlNodeinsertionFunction(newNode.data, node.left);

        node.left = newNode;
        node.left.position_X = NodeScreenPositionX;
        node.left.position_Y = NodeScreenPositionY;
      } else {
        HtmlNodeinsertionFunction(newNode.data, node.left);

        //////////////////////////////////////////////////////////////////////////////

        traversingIndicationClasses = document.querySelectorAll(
          ".traverse-indication-circle"
        );
        traversingIndication();
        traversingIndicationClasses.forEach((element) => {
          setTimeout(function () {
            element.remove();
          }, 1000);
        });
        setTimeout(function () {
          document.querySelector(".traverse-indication-circle").remove();
        }, 1000);
        this.insertNewNode(node.left, newNode);
      }
      ////////////////////////////////////////////////////////////////////////////////////////////
    } else {
      wentRight = true;
      if (node.right === null) {
        previousNodePos_X = NodeScreenPositionX;
        previousNodePos_Y = NodeScreenPositionY;
        checkCurrentNodePos();
        tree_Right_Branch_insertion();
        HtmlNodeinsertionFunction(newNode.data, node.right);

        node.right = newNode;
        node.right.position_X = NodeScreenPositionX;
        node.right.position_Y = NodeScreenPositionY;
      } else {
        HtmlNodeinsertionFunction(newNode.data, node.right);

        ///////////////////////////////////////////////////////////////////////////////////
        traversingIndicationClasses = document.querySelectorAll(
          ".traverse-indication-circle"
        );
        traversingIndication();
        traversingIndicationClasses.forEach((element) => {
          setTimeout(function () {
            element.remove();
          }, 1000);
        });
        setTimeout(function () {
          document.querySelector(".traverse-indication-circle").remove();
        }, 1000);
        this.insertNewNode(node.right, newNode);
      }

      ///////////////////////////////////////////////////////////////////////////////////////////
    }
  };

  invert_tree_insert = function (node, newNode) {
    if (newNode.data < node.data) {
      wentRight = true;

      if (node.right === null) {
        previousNodePos_X = NodeScreenPositionX;
        previousNodePos_Y = NodeScreenPositionY;
        checkCurrentNodePos();
        tree_Right_Branch_insertion();
        HtmlNodeinsertionFunction(newNode.data, node.right);

        node.right = newNode;
        node.right.position_X = NodeScreenPositionX;
        node.right.position_Y = NodeScreenPositionY;
      } else {
        HtmlNodeinsertionFunction(newNode.data, node.right);

        //////////////////////////////////////////////////////////////////////////////

        traversingIndicationClasses = document.querySelectorAll(
          ".traverse-indication-circle"
        );
        traversingIndication();
        traversingIndicationClasses.forEach((element) => {
          setTimeout(function () {
            element.remove();
          }, 1000);
        });
        setTimeout(function () {
          document.querySelector(".traverse-indication-circle").remove();
        }, 1000);
        this.invert_tree_insert(node.right, newNode);
      }
      ////////////////////////////////////////////////////////////////////////////////////////////
    } else {
      wentLeft = true;
      if (node.left === null) {
        previousNodePos_X = NodeScreenPositionX;
        previousNodePos_Y = NodeScreenPositionY;
        checkCurrentNodePos();
        tree_Left_Branch_insertion();
        HtmlNodeinsertionFunction(newNode.data, node.left);

        node.left = newNode;
        node.left.position_X = NodeScreenPositionX;
        node.left.position_Y = NodeScreenPositionY;
      } else {
        HtmlNodeinsertionFunction(newNode.data, node.left);

        ///////////////////////////////////////////////////////////////////////////////////
        traversingIndicationClasses = document.querySelectorAll(
          ".traverse-indication-circle"
        );
        traversingIndication();
        traversingIndicationClasses.forEach((element) => {
          setTimeout(function () {
            element.remove();
          }, 1000);
        });
        setTimeout(function () {
          document.querySelector(".traverse-indication-circle").remove();
        }, 1000);
        this.invert_tree_insert(node.left, newNode);
      }

      ///////////////////////////////////////////////////////////////////////////////////////////
    }
  };

  //////////////////////////////////////////////////////
  //inorder-Traversal

  inorderTraversal = function (node) {
    if (node !== null) {
      if (!balancing) {
        setTimeout(function () {
          traversingCircle(node.position_X, node.position_Y);
        }, traverseTime);
        setTimeout(function () {
          document.querySelector(".traversing-circle").remove();
        }, traverseTime + traverseTimeChange);
        traverseTime = traverseTime + traverseTimeChange;
      }

      this.inorderTraversal(node.left);

      console.log(node.data);
      all_Node_Values_Array.push(node.data);

      if (!balancing) {
        setTimeout(function () {
          traversedValue(node.data);
        }, traverseTime + traverseTimeChange);

        setTimeout(function () {
          traversingCircle(node.position_X, node.position_Y);
        }, traverseTime + traverseTimeChange);

        setTimeout(function () {
          document.querySelector(".traversing-circle").remove();
        }, traverseTime + 2 * traverseTimeChange);
        traverseTime += 2 * traverseTimeChange;
      }
      this.inorderTraversal(node.right);
    }
  };

  preOrderTraversal = function (node) {
    if (node !== null) {
      console.log(node.data);
      all_Node_Values_Array.push(node.data);
      allNodelocations_X.push(node.position_X);
      allNodelocations_Y.push(node.position_Y);
      if (go_Traversing) {
        setTimeout(function () {
          traversedValue(node.data);
        }, traverseTime);

        setTimeout(function () {
          traversingCircle(node.position_X, node.position_Y);
        }, traverseTime);
        setTimeout(function () {
          document.querySelector(".traversing-circle").remove();
        }, traverseTime + traverseTimeChange);
        traverseTime = traverseTime + traverseTimeChange;
      }
      this.preOrderTraversal(node.left);
      if (go_Traversing) {
        setTimeout(function () {
          traversingCircle(node.position_X, node.position_Y);
        }, traverseTime + traverseTimeChange);

        setTimeout(function () {
          document.querySelector(".traversing-circle").remove();
        }, traverseTime + 2 * traverseTimeChange);
        traverseTime += 2 * traverseTimeChange;
      }
      this.preOrderTraversal(node.right);
    }
  };

  ////////////////////
  postOrderTraversal = function (node) {
    if (node !== null) {
      setTimeout(function () {
        traversingCircle(node.position_X, node.position_Y);
      }, traverseTime);
      setTimeout(function () {
        document.querySelector(".traversing-circle").remove();
      }, traverseTime + traverseTimeChange);
      traverseTime = traverseTime + traverseTimeChange;
      this.postOrderTraversal(node.left);

      setTimeout(function () {
        traversingCircle(node.position_X, node.position_Y);
      }, traverseTime + traverseTimeChange);

      setTimeout(function () {
        document.querySelector(".traversing-circle").remove();
      }, traverseTime + 2 * traverseTimeChange);
      traverseTime += 2 * traverseTimeChange;
      this.postOrderTraversal(node.right);

      console.log(node.data);
      setTimeout(function () {
        traversedValue(node.data);
      }, traverseTime);
    }
  };

  ////////////////////////////////////////////
  //remove node

  remove = function (data) {
    if (insertInvert % 2 === 0) {
      this.root = this.invertRemoveNode(this.root, data);
    } else {
      this.root = this.removeNode(this.root, data);
    }

    setTimeout(function () {
      go_Traversing = false;

      BST.preOrderTraversal(BST.root);
      Visualization_SVG.innerHTML = "";
      BST.root = null;
      Visualization_SVG.insertAdjacentHTML(
        "afterbegin",
        ' <circle id="viewScroll" cx="39500" r="0"></circle>'
      );
      if (insertInvert % 2 === 0) {
        console.log("Entered if");
        Visualization_SVG.insertAdjacentHTML(
          "beforeend",
          `<text x="${firstNodeScreenPositionX}" y="40" class="inverted-tree" id="inverted-tree" fill="black">
            This tree is inverted
          </text>`
        );
      }
      all_Node_Values_Array.forEach(function (arrayValues) {
        if (arrayValues !== undefined) {
          NodeScreenPositionX = firstNodeScreenPositionX;
          NodeScreenPositionY = firstNodeScreenPositionY;
          BST.createNode(arrayValues);
        } else {
          console.log("ArrayEmpty");
        }
      }, traverseTime + 2 * traverseTimeChange);
    });
  };

  removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.data) {
      node.left = this.removeNode(node.left, key);

      return node;
    } else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;

        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }
      runForOneFunction = false;
      let minNode = this.findMinNode(node.right);
      node.data = minNode.data;
      node.right = this.removeNode(node.right, minNode.data);
      return node;
    }
  }

  invertRemoveNode = function (node, key) {
    if (node === null) {
      return null;
    } else if (key < node.data) {
      node.right = this.invertRemoveNode(node.right, key);

      return node;
    } else if (key > node.data) {
      node.left = this.invertRemoveNode(node.left, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;

        return node;
      }
      if (node.right === null) {
        node = node.left;
        return node;
      } else if (node.left == null) {
        node = node.right;
        return node;
      }
      runForOneFunction = false;
      let minNode = this.findMinNode(node.left);
      node.data = minNode.data;
      node.left = this.invertRemoveNode(node.left, minNode.data);
      return node;
    }
  };

  findMinNode(node) {
    if (node.left === null) {
      if (runForOneFunction) {
        setTimeout(function () {
          traversingCircle(node.position_X, node.position_Y);
        }, traverseTime);
        setTimeout(function () {
          document.querySelector(".traversing-circle").style.stroke = `rgb(
          255,
          238,
          30)`;

          traversedValue(node.data);
        }, traverseTime + traverseTimeChange);
        indicatorOn = true;
      }
      return node;
    } else {
      if (runForOneFunction) {
        setTimeout(function () {
          traversingCircle(node.position_X, node.position_Y);
        }, traverseTime);
        setTimeout(function () {
          document.querySelector(".traversing-circle").remove();
        }, traverseTime + traverseTimeChange);
        traverseTime = traverseTime + traverseTimeChange;
      }
      return this.findMinNode(node.left);
    }
  }

  ////////////////////////////////////////
  //search

  search(node, data) {
    // if trees is empty return null
    if (node === null) {
      setTimeout(function () {
        traversingCircle(node?.position_X, node?.position_Y);
      }, traverseTime);
      if (document.querySelector(".traversing-circle")) {
        setTimeout(function () {
          document.querySelector(".traversing-circle").style.stroke = `rgb(
        255,
        238,
        30)`;
        }, traverseTime + traverseTimeChange);
      }
      indicatorOn = true;
      return null;
    }

    // if data is less than node's data
    // move left
    else if (data < node.data) {
      setTimeout(function () {
        traversingCircle(node.position_X, node.position_Y);
      }, traverseTime);
      setTimeout(function () {
        document.querySelector(".traversing-circle").remove();
      }, traverseTime + traverseTimeChange);
      traverseTime = traverseTime + traverseTimeChange;
      return this.search(node.left, data);
    }

    // if data is less than node's data
    // move left
    else if (data > node.data) {
      setTimeout(function () {
        traversingCircle(node.position_X, node.position_Y);
      }, traverseTime + traverseTimeChange);

      setTimeout(function () {
        document.querySelector(".traversing-circle").remove();
      }, traverseTime + 2 * traverseTimeChange);
      traverseTime += 2 * traverseTimeChange;
      return this.search(node.right, data);
    }

    // if data is equal to the node data
    // return node
    else {
      setTimeout(function () {
        traversingCircle(node.position_X, node.position_Y);
      }, traverseTime);
      setTimeout(function () {
        document.querySelector(".traversing-circle").style.stroke = `rgb(
        255,
        238,
        30)`;
        alert(`${node.data} found`);
      }, traverseTime + traverseTimeChange);
      indicatorOn = true;
      return node;
    }
  }

  /////////////////////////////////////////////
  //invert tree

  invertTree = function (node) {
    if (node !== null) {
      this.invertTree(node.left);
      this.invertTree(node.right);

      let temp = node.left;
      node.left = node.right;
      node.right = temp;
    }
  };
}

let BST = new BinarySearchTree();

//insert value Button
insert_Value_button.addEventListener("click", function (e) {
  balancing = false;
  if (firstExecution) {
    firstExecution = false;
    insertInvert = 1;
  }
  e.preventDefault();
  if (indicatorOn) {
    indicatorOn = false;
    document.querySelector(".traversing-circle").remove();
  }
  if (onlyOnce) {
    onlyOnce = false;
    gotoview.scrollIntoView({ behavior: "smooth" });
  }

  NodeScreenPositionX = firstNodeScreenPositionX;

  NodeScreenPositionY = firstNodeScreenPositionY;

  nodevalue = Number(insert_Node_Value.value);

  all_Node_Values_Array.push(nodevalue);

  if (Number.isInteger(nodevalue)) {
    BST.createNode(nodevalue);
  } else {
    alert(`Entered value is not an integer`);
  }
  go_Traversing = false;

  //////////////////////////////////////////////////////////

  BST.preOrderTraversal(BST.root);

  ///////////////////////////////////////////////////////
});
///////////////////////////////////////////////////////////////////////////
traverse_Tree_Button.addEventListener("click", function (e) {
  balancing = false;
  go_Traversing = true;
  if (indicatorOn) {
    indicatorOn = false;
    document.querySelector(".traversing-circle")?.remove();
  }
  e.preventDefault();
  traverseTime = 500;
  traversed_value_area.innerHTML = "";
  let chooseTraversal = prompt(
    "Choose the option: \n\n 1.Inorder Traversal\n\n2.Pre-Order Traversal\n\n3.Post-Order Traversal"
  );
  if (Number(chooseTraversal) === 1) {
    BST.inorderTraversal(BST.root);
  } else if (Number(chooseTraversal) === 2) {
    BST.preOrderTraversal(BST.root);
  } else if (Number(chooseTraversal) === 3) {
    BST.postOrderTraversal(BST.root);
  } else {
    alert("Invalid Option!");
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////
remove_value_button.addEventListener("click", function (e) {
  e.preventDefault();

  if (indicatorOn) {
    indicatorOn = false;
    document.querySelector(".traversing-circle")?.remove();
  }
  traverseTime = 500;
  traverseTimeChange = 400;
  value = Number(remove_Node_value.value);
  all_Node_Values_Array.splice(0);
  BST.remove(value);
});
///////////////////////////////////////////////////////////////////////////
findMin_Button.addEventListener("click", function (e) {
  e.preventDefault();
  traversed_value_area.innerHTML = "";
  runForOneFunction = true;
  traverseTime = 500;
  traverseTimeChange = 400;
  if (indicatorOn) {
    indicatorOn = false;
    document.querySelector(".traversing-circle")?.remove();
  }
  BST.findMinNode(BST.root);
});
/////////////////////////////////////////////////////////////////////////
search_button.addEventListener("click", function (e) {
  e.preventDefault();
  traverseTime = 500;
  traverseTimeChange = 400;
  if (indicatorOn) {
    indicatorOn = false;
    document.querySelector(".traversing-circle")?.remove();
  }
  console.log(BST.search(BST.root, Number(search_node_Value.value)));
});
/////////////////////////////////////////////////////////////////////////
reverse_Tree_Button.addEventListener("click", function (e) {
  e.preventDefault();
  insertInvert++;
  go_Traversing = false;
  BST.invertTree(BST.root);
  all_Node_Values_Array.splice(0);
  BST.preOrderTraversal(BST.root);
  BST.root = null;
  Visualization_SVG.innerHTML = "";
  if (insertInvert % 2 === 0) {
    console.log("Entered if");
    Visualization_SVG.insertAdjacentHTML(
      "beforeend",
      `<text x="${firstNodeScreenPositionX}" y="40" class="inverted-tree" id="inverted-tree" fill="black">
        This tree is inverted
      </text>`
    );
  } else {
    console.log("Entered else");
    let inverted = document.querySelector(".inverted-tree");
    inverted?.remove();
  }
  all_Node_Values_Array.forEach(function (arrayValues) {
    if (arrayValues !== undefined) {
      NodeScreenPositionX = firstNodeScreenPositionX;
      NodeScreenPositionY = firstNodeScreenPositionY;
      BST.createNode(arrayValues);
    } else {
      console.log("ArrayEmpty");
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////
const Balance_Tree = function (arr, start, end) {
  NodeScreenPositionX = firstNodeScreenPositionX;
  NodeScreenPositionY = firstNodeScreenPositionY;
  if (end >= start) {
    let mid = start + (end - start) / 2;
    if ((end - start) % 2 !== 0) {
      mid = start + (end - start + 1) / 2;
    }
    BST.createNode(arr[mid]);
    Balance_Tree(all_Node_Values_Array, start, mid - 1);
    Balance_Tree(all_Node_Values_Array, mid + 1, end);
  }
};

///////////////////////////////////////////////////////////////////////////////////////
balance_Tree_Button.addEventListener("click", function (e) {
  balancing = true;
  all_Node_Values_Array.splice(0);
  Visualization_SVG.innerHTML = "";
  if (insertInvert % 2 === 0) {
    console.log("Entered if");
    Visualization_SVG.insertAdjacentHTML(
      "beforeend",
      `<text x="${firstNodeScreenPositionX}" y="40" class="inverted-tree" id="inverted-tree" fill="black">
        This tree is inverted
      </text>`
    );
  }
  BST.inorderTraversal(BST.root);
  BST.root = null;
  Balance_Tree(all_Node_Values_Array, 0, all_Node_Values_Array.length - 1);
});

//////////////////////////////////////////////////////////////////////////////////////
let need_to_be_arranged_x = new Array();
let need_to_be_arranged_Y = new Array();
arrange_button.addEventListener("click", function (e) {
  e.preventDefault();
  go_Traversing = false;
  allNodelocations_X.splice(0);
  allNodelocations_Y.splice(0);
  all_Node_Values_Array.splice(0);
  BST.preOrderTraversal(BST.root);
  BST.root = null;
  let i = 0;
  for (let a = 0; a < allNodelocations_X.length - 1; a++) {
    for (let b = a + 1; b < allNodelocations_X.length; b++) {
      if (
        allNodelocations_X[a] === allNodelocations_X[b] &&
        allNodelocations_Y[a] === allNodelocations_Y[b]
      ) {
        if (allNodelocations_X[a] < firstNodeScreenPositionX) {
          need_to_be_arranged_x.push(allNodelocations_X[a] - node_distance);
          need_to_be_arranged_Y.push(allNodelocations_Y[a] - node_distance);
        } else {
          need_to_be_arranged_x.push(allNodelocations_X[a] + node_distance);
          need_to_be_arranged_Y.push(allNodelocations_Y[a] - node_distance);
        }
      }
    }
  }
  Visualization_SVG.innerHTML = "";
  if (insertInvert % 2 === 0) {
    console.log("Entered if");
    Visualization_SVG.insertAdjacentHTML(
      "beforeend",
      `<text x="${firstNodeScreenPositionX}" y="40" class="inverted-tree" id="inverted-tree" fill="black">
        This tree is inverted
      </text>`
    );
  }

  all_Node_Values_Array.forEach(function (arrayValues) {
    if (arrayValues !== undefined) {
      NodeScreenPositionX = firstNodeScreenPositionX;
      NodeScreenPositionY = firstNodeScreenPositionY;
      BST.createNode(arrayValues);
    } else {
      console.log("ArrayEmpty");
    }
  });
});

let colorWhite = true;
setInterval(function () {
  if (colorWhite) {
    colorWhite = false;
    document.querySelector("#logo").style.color = "rgb(255,255,255)";
  } else {
    colorWhite = true;
    document.querySelector("#logo").style.color = "rgb(25,140,31)";
  }
}, 400);
