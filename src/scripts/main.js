import { SinkRepair } from "./SinkRepair.js";
import {
  fetchCompletions,
  fetchPlumbers,
  fetchRequests,
} from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

const render = () => {
  fetchRequests()
    .then(() => fetchPlumbers())
    .then(() => fetchCompletions())
    .then(() => {
      mainContainer.innerHTML = SinkRepair();
    });
};

render();

mainContainer.addEventListener("stateChanged", (customEvent) => {
  render();
});
