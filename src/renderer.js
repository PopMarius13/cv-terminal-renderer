import Reconciler from "react-reconciler";
import readline from "readline";
import chalk from "chalk";
import { log } from "console";

const TerminalRenderer = Reconciler({
  now: Date.now,
  supportsMutation: true,

  getRootHostContext(rootContainerInstance) {
    return {};
  },

  getChildHostContext(parentHostContext, type, rootContainerInstance) {
    return {};
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  createInstance(type, props) {
    return { type, props, children: [] };
  },

  createTextInstance(type, props) {
    return { type, props, children: [] };
  },

  appendInitialChild(parent, child) {
    parent.children.push(child);
  },

  appendChildToContainer(container, child) {
    container.push(child);
    updateTerminal();
  },

  appendChild(parent, child) {
    parent.children.push(child);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    instance.props = newProps;
    updateTerminal();
  },

  removeChildFromContainer(container, child) {
    const index = container.indexOf(child);
    if (index > -1) container.splice(index, 1);
  },

  finalizeInitialChildren(instance, type, props) {
    return false;
  },

  prepareUpdate(instance, type, oldProps, newProps) {
    return true;
  },

  prepareForCommit() {},

  resetAfterCommit() {},

  getPublicInstance(instance) {
    return instance;
  },
  clearContainer(container) {
    container.length = 0;
  },
});

let elements = [];
let activeIndex = 0;

const updateTerminal = () => {
  console.clear();
  console.log(chalk.green("🚀 MARIUS POP - TERMINAL CV\n"));

  elements.forEach((node, index) => {
    if (node.type === "section") {
      node.props.children.forEach((child) => {
        if (typeof child === "string") {
          if(index === activeIndex) 
            console.log(chalk.blue(child));
          else
            console.log(child);
        } else if (child.type === "details" && child.props.hidden) {
          console.log(chalk.cyan(child.props.children));
        }
      });
    }
  });
  console.log(
    chalk.yellow("\n↑ ↓: Navigate | Enter: Expand/Collapse | ESC: Exit")
  );
};

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on("keypress", (str, key) => {
  if (key.name === "escape") process.exit();
  if (key.name === "up") {
    activeIndex = activeIndex > 0 ? activeIndex - 1 : elements.length - 1;
    updateTerminal();
  }
  if (key.name === "down") {
    activeIndex = activeIndex < elements.length - 1 ? activeIndex + 1 : 0;
    updateTerminal();
  }
  if (key.name === "return") {
    elements[activeIndex].props.onClick();
    updateTerminal();
  }
});

export function render(element) {
  elements = [];
  const root = TerminalRenderer.createContainer(elements);
  TerminalRenderer.updateContainer(element, root, null);
}
