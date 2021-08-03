export const interceptGql = (cy, url, operations) => {
  const requests = {};
  const numberOfStubbedResponses = {};
  Object.keys(operations).forEach((operationName) => {
    requests[operationName] = [];

    const stub = operations[operationName];
    numberOfStubbedResponses[operationName] = Array.isArray(stub)
      ? stub.length
      : 1;
  });
  cy.intercept("POST", url, (req) => {
    const operationName = req.body.operationName;
    const stub = operations[operationName];

    if (!stub) {
      console.log(
        `No stub was provided for "${operationName}" GraphQL operation.`
      );
      return;
    }

    requests[operationName].push(req);
    const numberOfCalls = requests[operationName].length;
    req.alias = `${operationName}-${numberOfCalls}`;
    // If the stub then execute it
    if (typeof stub === "function") return stub(req);

    // If the stub is object then pass it to reply
    if (!Array.isArray(stub)) return req.reply(stub);

    // If you pass an an array of stubs
    if (Array.isArray(stub)) {
      const numberOfStubbedResponses = stub.length;

      if (numberOfCalls > numberOfStubbedResponses[operationName])
        throw new Error(
          `Your test is calling the ${operationName} GraphQL operation for the ${numberOfCalls} time, but you only provided ${numberOfStubbedResponses} stub responses.`
        );
      // If the stub then execute it
      const stubForRequest = stub.shift(); // cut the item on the top of the array
      // If the stub then execute it
      if (typeof stubForRequest === "function") return stub(stubForRequest);
      // else if the stub is object then pass it to reply
      else return req.reply(stubForRequest);
    }
  });

  return requests;
};
