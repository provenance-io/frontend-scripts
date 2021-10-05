const inquirer = require('inquirer');

exports.promptUser = async (question) => {
  try {
    return await inquirer.prompt(question);
  } catch {
    throw new Error(`Unable to prompt use question: "${question}"`);
  }
};
