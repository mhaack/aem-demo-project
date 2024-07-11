// all promises the beacon shall wait for, fully filled before the beacon is called
const promisesToWaitFor = [];
// mapping of solutionId => prenotification promise to resolve them
const prenotificationPromises = new Map();

function prenotifyWaitForSolution(solutionId) {
  const timeout = 2000;
  let isResolved = false;

  let resolverFunction;
  const notificationPromise = new Promise((resolve) => {
    resolverFunction = resolve;
    setTimeout(() => {
      if (!isResolved) {
        resolve();
      }
    }, timeout);
  });
  // Attach the resolver function to the promise
  notificationPromise.resolve = resolverFunction;
  notificationPromise.then(() => {
    isResolved = true;
  });
  // register notification promise in map and in the list of promises
  prenotificationPromises.set(solutionId, notificationPromise);
  promisesToWaitFor.push(notificationPromise);
}

function removePrenotification(solutionId) {
  // resolve the solution's notification promise
  const notificationPromise = prenotificationPromises.get(solutionId);
  if (notificationPromise) {
    // calls the attached notification promise's resolver function
    notificationPromise.resolve();
  }
}

function solutionReadyById(solutionId) {
  removePrenotification(solutionId);
}

function solutionReadyByPromise(solutionId, solutionPromise) {
  const timeout = 2000;
  let isResolved = false;
  setTimeout(() => {
    if (!isResolved) {
      removePrenotification(solutionId);
    }
  }, timeout);
  solutionPromise.then(() => {
    isResolved = true;
    removePrenotification(solutionId);
  });
}

async function sendBeacon(stl = null, dl = window.adobeDataLayer) {
  dl.push({
    event: stl ? 'stlBeaconReady' : 'stBeaconReady',
  });
}

async function sendAdobeDCBeacon() {
  Promise.all(promisesToWaitFor).then(() => {
    sendBeacon();
  });
}

function getPrenotificationPromise(solutionId) {
  return prenotificationPromises.get(solutionId);
}

export {
  sendAdobeDCBeacon,
  solutionReadyById,
  solutionReadyByPromise,
  prenotifyWaitForSolution,
  getPrenotificationPromise,
};
