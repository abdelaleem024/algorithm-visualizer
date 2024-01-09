function log(message, level = 0, type = "component") {
  let styling;
  const isItCell = message.includes("Cell");
  if (isItCell) {
    if (!message.includes("0 - 0") || message[0] !== "0") {
      return;
    }
    styling = "padding: 0.15rem; background: #210957; color: #ede6b2";
  } else if (type === "other") {
    styling = "padding: 0.15rem; background: #210957; color: #ede6b2";
  } else {
    styling = "padding: 0.15rem; background: #04406b; color: #fcfabd";
  }

  const indent = "- ".repeat(level);

  console.log("%c" + indent + message, styling);
}

export default log;
