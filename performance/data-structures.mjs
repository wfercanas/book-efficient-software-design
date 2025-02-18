function randomLetter() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function randomName(callback) {
  let name = "";
  const randomLength = Math.floor(Math.random() * 4) + 3;
  const lookable = Math.random() < 0.05;

  for (let i = 0; i < randomLength; i++) {
    name = name + randomLetter();
  }

  if (lookable) {
    callback(name);
  }

  return name;
}

const lookupNames = [];
function addLookupName(name) {
  let newName = name;
  const noisable = Math.random() < 0.2;

  if (noisable) {
    newName = newName + "*";
  }

  if (!lookupNames.includes(newName)) {
    lookupNames.push(newName);
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

// const arrayNames = [];
// for (let i = 0; i < 1000000; i++) {
//   const name = randomName(addLookupName);
//   arrayNames.push(name);
// }

function arraySearch() {
  timer("array");
  for (let name of lookupNames) {
    arrayNames.includes(name);
  }
}

// --------------------------------Objects

const objectNames = {};
for (let i = 0; i < 1000000; i++) {
  const name = randomName(addLookupName);
  objectNames[name] = name;
}

function objectSearch() {
  timer("object");
  for (let name of lookupNames) {
    objectNames.hasOwnProperty[name];
  }
}

// arraySearch();
objectSearch();
