const applicationState = {
  requests: [],
  plumbers: [],
  completions: [],
};

const mainContainer = document.querySelector("#container");
const API = "http://localhost:8088";

export const fetchRequests = () => {
  return fetch(`${API}/requests`)
    .then((response) => response.json()) // this is a promis that when the api returns it will turn it into json
    .then((serviceRequests) => {
      //this is a promis that when the previous step on line 9 completes it will store the external state in application state
      applicationState.requests = serviceRequests;
    });
};

export const fetchCompletions = () => {
  return fetch(`${API}/completions`)
    .then((response) => response.json()) // this is a promis that when the api returns it will turn it into json
    .then((serviceRequests) => {
      //this is a promis that when the previous step on line 9 completes it will store the external state in application state
      applicationState.completions = serviceRequests;
    });
};

export const fetchPlumbers = () => {
  return fetch(`${API}/plumbers`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.plumbers = data;
    });
};

//this iterates over the database that has been returned from the fetch and creates a new array that is a copy of the original
export const getRequests = () => {
  return applicationState.requests.map((request) => ({ ...request }));
};
export const getPlumbers = () => {
  return applicationState.plumbers.map((plumber) => ({ ...plumber }));
};
export const getCompletions = () => {
  return applicationState.completions.map((completion) => ({ ...completion }));
};

export const sendRequest = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };

  return fetch(`${API}/requests`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const sendPostCompletion = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };

  return fetch(`${API}/completions`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const deleteRequest = (id) => {
  return fetch(`${API}/requests/${id}`, { method: "DELETE" }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};
