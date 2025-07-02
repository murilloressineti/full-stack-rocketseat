import dayjs from "dayjs"

import { openingHours } from "../../utils/opening-hours.js"
import { hoursClick } from "./hours-click.js"

const hours = document.getElementById("hours")

export function hoursLoad({ date }) {
  hours.innerHTML = ""

  const opening = openingHours.map((hour) => {
    const [schedulesHour] = hour.split(":")

    const isHourPast = dayjs(date).add(schedulesHour, "hour").isAfter(dayjs())
    
    return {
      hour,
      available: isHourPast,
    }
  })

  opening.forEach(({hour, available}) => {
    const li = document.createElement("li")

    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")

    li.textContent = hour

    if(hour === "9:00") {
      hourHeaderadd("Manhã")
    } else if (hour === "13:00"){
      hourHeaderadd("Tarde")
    } else if (hour === "18:00"){
      hourHeaderadd("Noite")
    }

    hours.append(li)
  })

  hoursClick()
}

function hourHeaderadd(title) {
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}