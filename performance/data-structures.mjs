function randomChar() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function randomSKU(callback) {
  let sku = "";
  const randomLength = Math.floor(Math.random() * 4) + 8;

  for (let i = 0; i < randomLength; i++) {
    sku = sku + randomChar();
  }

  callback(sku);
  return sku;
}

const lookupItems = [];
function addLookupItem(sku) {
  const lookable = Math.random() < 0.05;

  if (!lookable) {
    return;
  }

  let newSku = sku;
  const noisable = Math.random() < 0.2;

  if (noisable) {
    newSku = newSku + "*";
  }

  if (!lookupItems.includes(newSku)) {
    lookupItems.push(newSku);
  }
}

function timer(processName) {
  const start = new Date();

  setTimeout(() => {
    const end = new Date();
    console.log(processName, end - start);
  }, 0);
}

// -----------------------------Arrays

// const arrayItems = [];
// for (let i = 0; i < 1000000; i++) {
//   const item = randomSKU(addLookupItem);
//   arrayItems.push(item);
// }

// function arraySearch() {
//   timer("array");
//   for (let item of lookupItems) {
//     arrayItems.includes(item);
//   }
// }

// arraySearch();

// --------------------------------Objects

const objectItems = {};
for (let i = 0; i < 1000000; i++) {
  const item = randomSKU(addLookupItem);
  objectItems[item] = item;
}

function objectSearch() {
  timer("object");
  for (let item of lookupItems) {
    objectItems.hasOwnProperty(item);
  }
}

objectSearch();
