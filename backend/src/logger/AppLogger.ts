import chalk from "chalk";

export class AppLogger<T> {
  error(message: T) {
    console.log(chalk.bgRed(message));
  }

  warning(message: T) {
    console.log(chalk.bgYellow(message));
  }

  info(message: T) {
    console.log(chalk.bgBlue(message));
  }

  success(message: T) {
    console.log(chalk.bgGreen(message));
  }
}
