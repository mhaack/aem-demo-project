// all promises sendBeacon shall wait for
const sendBeaconGuards = [];
// all promises loadAdobeDC (Launch) shall wait for
const loadAdobeDCGuards = [];
// mapping of solutionId => guard (promise with resolver)
const solutionIdToGuard = new Map();

function registerWaitForSolution(solutionId, blockLoadAdobeDC = false, blockSendBeacon = true) {
  const timeout = 2000;
  let isResolved = false;
  let resolverFunction;
  // guard: promise + resolver
  const guard = new Promise((resolve) => {
    resolverFunction = resolve;
    setTimeout(() => {
      if (!isResolved) {
        resolve();
      }
    }, timeout);
  });
  // Attach the resolver function to the promise
  guard.resolve = resolverFunction;
  guard.then(() => {
    isResolved = true;
  });
  // register notification promise in map and in the list of guards
  solutionIdToGuard.set(solutionId, guard);
  if (blockLoadAdobeDC) {
    loadAdobeDCGuards.push(guard);
  }
  if (blockSendBeacon) {
    sendBeaconGuards.push(guard);
  }
}

function resolveGuard(solutionId) {
  // resolve the solution's notification promise
  const guard = solutionIdToGuard.get(solutionId);
  if (guard) {
    // calls the attached notification promise's resolver function
    guard.resolve();
  }
}

function solutionReadyById(solutionId) {
  resolveGuard(solutionId);
}

function solutionReadyByPromise(solutionId, solutionPromise) {
  const timeout = 2000;
  let isResolved = false;
  setTimeout(() => {
    if (!isResolved) {
      resolveGuard(solutionId);
    }
  }, timeout);
  solutionPromise.then(() => {
    isResolved = true;
    resolveGuard(solutionId);
  });
}

function getSendBeaconGuard() {
  return Promise.all(sendBeaconGuards);
}

function getLoadAdobeDCGuard() {
  return Promise.all(loadAdobeDCGuards);
}

export {
  solutionReadyById,
  solutionReadyByPromise,
  registerWaitForSolution,
  getSendBeaconGuard,
  getLoadAdobeDCGuard,
};
