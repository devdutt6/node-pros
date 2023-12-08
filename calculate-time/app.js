import chalk from "chalk";
import { createInterface } from "readline";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Hour {
  constructor(hour) {
    this.hour = hour;
  }

  isHour() {
    if (isNaN(this.hour))
      throw new Error("please enter valid number of hour in HH");
    this.hour = parseInt(this.hour);
    if (this.hour < 0 || this.hour > 23)
      throw new Error("please enter valid hours in 24h format");
    return this.hour;
  }
}
class Minute {
  constructor(minute) {
    this.minute = minute;
  }

  isMinute() {
    if (isNaN(this.minute))
      throw new Error("please enter valid number of minute in MM format");
    this.minute = parseInt(this.minute);
    if (this.minute < 0 || this.minute > 60)
      throw new Error("please enter valid number of minutes in format");
    return this.minute;
  }
}

let add = (time1, time2) => {
  let minute = time1.minute + time2.minute;
  let hour = 0;
  if (minute / 60 > 1) {
    hour += 1;
    minute %= 60;
  }
  hour += parseInt(time1.hour + time2.hour);

  return { hour, minute };
};

let subtract = (time1, time2) => {
  if (time1.hour <= time2.hour) {
    if (time1.hour === time2.hour && time1.minute === time2.minute) {
      return { hour: 0, minute: 0 };
    }
    if (time1.hour === time2.hour && time1.minute < time2.minute) {
      return subtract(time2, time1);
    }
    if (time1.minute < time2.minute) {
      return subtract(time2, time1);
    }
  }

  let hour = time1.hour - time2.hour;
  let minute = time1.minute - time2.minute;
  if (minute < 0) {
    hour -= 1;
    minute += 60;
  }

  return { hour, minute };
};

let create = (hour, minute) => {
  return { hour, minute };
};

readline.question(
  chalk.blue(`What's your desk time hours: `),
  (deskTimeHour) => {
    deskTimeHour = new Hour(deskTimeHour);
    deskTimeHour = deskTimeHour.isHour();
    readline.question(
      chalk.green(`What's your desk time minutes: `),
      (deskTimeMinute) => {
        deskTimeMinute = new Minute(deskTimeMinute);
        deskTimeMinute = deskTimeMinute.isMinute();
        readline.question(
          chalk.blue(`What's your project time hours: `),
          (projectTimeHour) => {
            projectTimeHour = new Hour(projectTimeHour);
            projectTimeHour = projectTimeHour.isHour();
            readline.question(
              chalk.green(`What's your project time minutes: `),
              (projectTimeMinute) => {
                projectTimeMinute = new Minute(projectTimeMinute);
                projectTimeMinute = projectTimeMinute.isMinute();
                const totalTime = add(
                  create(deskTimeHour, deskTimeMinute),
                  create(projectTimeHour, projectTimeMinute)
                );
                const remainingTime = subtract(create(8, 30), totalTime);

                const currentHours = new Date().getHours();
                const currentMinutes = new Date().getMinutes();

                const final = add(
                  create(currentHours, currentMinutes),
                  remainingTime
                );
                final.hour %= 12;
                const minutesToGo =
                  remainingTime.hour * 60 + remainingTime.minute;

                console.log(
                  chalk.red(minutesToGo),
                  chalk.bgRed.black("mins to go")
                );
                console.log(
                  chalk.black("You can leave at"),
                  chalk.green(
                    Object.values(final)
                      .map((num) => {
                        num = `${num}`;
                        return num.padStart(2, "0");
                      })
                      .join(":")
                  )
                );
                readline.close();
              }
            );
          }
        );
      }
    );
  }
);
