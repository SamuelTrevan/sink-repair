import {
  getRequests,
  deleteRequest,
  getPlumbers,
  sendPostCompletion,
  getCompletions,
} from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", (click) => {
  if (click.target.id.startsWith("request--")) {
    const [, requestId] = click.target.id.split("--");
    deleteRequest(parseInt(requestId));
  }
});

mainContainer.addEventListener("change", (event) => {
  if (event.target.id === "plumbers") {
    const [requestId, plumberId] = event.target.value.split("--");

    /*
              This object should have 3 properties
                 1. requestId
                 2. plumberId
                 3. date_created
          */
    const completion = {
      requestId: parseInt(requestId),
      plumberId: parseInt(plumberId),
      date_created: Date.now(),
    };

    /*
              Invoke the function that performs the POST request
              to the `completions` resource for your API. Send the
              completion object as a parameter.
           */
    sendPostCompletion(completion);
  }
});

export const Requests = () => {
  const completions = getCompletions();
  const requests = getRequests();

  const completedRequests = requests.filter((requestObj) =>
    completions.find((completion) => completion.id === requestObj.id)
  );

  const imcompleteRequest = requests.filter(
    (requestObj) =>
      !completions.find((completion) => completion.id === requestObj.id)
  );

  let html = `
        <ul>
            ${imcompleteRequest.map(incomplete).join("")}
            ${completedRequests.map(completed).join("")}
        </ul>
    `;

  return html;
};

const completed = (requestObj) => {
  // const completions = getCompletions();
  // const plumbers = getPlumbers();
  /*
  1. .find completion and save in variable
  2. render compltions based on objects in saved variable
  3. if variable is null then render requesets normally
*/
  // const foundCompletion = completions.find(
  //   (completion) => completion.id === requestObj.id
  // );

  // if (foundCompletion) {
  return `<li class="completed">${requestObj.description}
                  <button class="request_delete"
                   id="request--${requestObj.id}">
                  Delete
                  </button>
                    </li>`;
};

const incomplete = (requestObj) => {
  const plumbers = getPlumbers();
  return `<li>${requestObj.description}
  <select class="plumbers" id="plumbers">
  <option value="">Choose</option>
  ${plumbers
    .map((plumber) => {
      return `<option value="${requestObj.id}--${plumber.id}">${plumber.name}</option>`;
    })
    .join("")}
    </select>
    
    <button class="request__delete" id="request--${requestObj.id}">
      Delete
    </button>
          </li>`;
};
