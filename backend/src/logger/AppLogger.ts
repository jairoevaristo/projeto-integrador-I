import chalk from "chalk";

export class AppLogger<T> {
  error(message: T) {
    console.log(chalk.red(message));
  }

  warning(message: T) {
    console.log(chalk.yellow(message));
  }

  info(message: T) {
    console.log(chalk.blue(message));
  }

  success(message: T) {
    console.log(chalk.green(message));
  }
}
