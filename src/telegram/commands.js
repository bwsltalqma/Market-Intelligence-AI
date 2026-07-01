export async function handleCommand(command, args = []) {
  switch (command) {
    case "/today":
      return "Today's opportunities are not available yet.";

    case "/week":
      return "Weekly report is not available yet.";

    case "/search":
      if (!args.length) {
        return "Please provide a keyword.";
      }

      return `Searching for: ${args.join(" ")}`;

    default:
      return "Unknown command.";
  }
}
