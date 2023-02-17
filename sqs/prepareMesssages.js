const fs = require("fs");

msgArr = [];
const prepareMessages = (message, count) => {
  for (let index = 1; index <= count; index++) {
    msgArr.push(`Count : ${index} of total ${count} ${message}`);
  }
};

prepareMessages("Sqs message", 1000);
console.log(msgArr);

fs.writeFile(
  "messages.json",
  JSON.stringify(msgArr),
  {
    encoding: "utf8",
    flag: "w",
    mode: 0o666,
  },
  (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      //   console.log(fs.readFileSync("movies.txt", "utf8"));
    }
  }
);
