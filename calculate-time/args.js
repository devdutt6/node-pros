import chalk from "chalk";

let arr = process.argv;

let targetIndex = arr.findIndex((val) => val === "-t");
let deskIndex = arr.findIndex((val) => val === "-dt");
let projectIndex = arr.findIndex((val) => val === "-p");

if (!deskIndex || !projectIndex) {
  throw new Error("you might have missed some argument");
}

let deskTime = arr[deskIndex + 1];
let projectTime = arr[projectIndex + 1];
let targetTime = targetIndex !== -1 ? arr[targetIndex + 1] : "8:30";

let separate = (timeString) => {
  let time = timeString.split(":");
  if (time.length !== 2) throw new Error("please provide time in HH:MM format");
  if (isNaN(time[0]) || isNaN(time[1]))
    throw new Error("please provide valid time in HH:MM format");
  if (time[0] > 23 || time[0] < 0 || time[1] < 0 || time[1] > 60)
    throw new Error("please provide time in HH:MM format");
  return { hour: parseInt(time[0]), minute: parseInt(time[1]) };
};

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
  let minute =
    time1.minute > time2.minute
      ? time1.minute - time2.minute
      : time2.minute - time1.minute;

  return { hour, minute };
};

deskTime = separate(deskTime);
projectTime = separate(projectTime);
targetTime = separate(targetTime);

let totalTime = add(deskTime, projectTime);
let remainingTime = subtract(targetTime, totalTime);

let currentHours = new Date().getHours();
let currentMinutes = new Date().getMinutes();

let final = add({ hour: currentHours, minute: currentMinutes }, remainingTime);
final.hour %= 12;
let minutesToGo = remainingTime.hour * 60 + remainingTime.minute;

console.log(chalk.red(minutesToGo), "mins to go");
console.log("You can leave at", chalk.green(Object.values(final).join(":")));
