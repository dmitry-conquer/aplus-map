import "../styles/main.scss";
import { InteractiveMap } from "./Map";
import { Modal } from "./Modal";

document.addEventListener("DOMContentLoaded", (): void => {
  new Modal();

  const map = new InteractiveMap();
  setInterval(() => {
    map.init();
  }, 1000);
});
