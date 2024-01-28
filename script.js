// script.js
document.getElementById('skipNonWorkdays').addEventListener('change', toggleWorkdayCheckboxes);

let nonWorkdays = [
     // January 2024
  {
    "NonWorkdays": "2024-01-01"
  }, // New Year's Day
  {
    "NonWorkdays": "2024-01-06"
  },
  {
    "NonWorkdays": "2024-01-07"
  },
  {
    "NonWorkdays": "2024-01-13"
  },
  {
    "NonWorkdays": "2024-01-14"
  },
  {
    "NonWorkdays": "2024-01-15"
  }, // Martin Luther King Jr. Day
  {
    "NonWorkdays": "2024-01-20"
  },
  {
    "NonWorkdays": "2024-01-21"
  },
  {
    "NonWorkdays": "2024-01-27"
  },
  {
    "NonWorkdays": "2024-01-28"
  },
  // February 2024 (Leap Year)
  {
    "NonWorkdays": "2024-02-03"
  },
  {
    "NonWorkdays": "2024-02-04"
  },
  {
    "NonWorkdays": "2024-02-10"
  },
  {
    "NonWorkdays": "2024-02-11"
  },
  {
    "NonWorkdays": "2024-02-17"
  },
  {
    "NonWorkdays": "2024-02-18"
  }, // Presidents' Day
  {
    "NonWorkdays": "2024-02-24"
  },
  {
    "NonWorkdays": "2024-02-25"
  },
  {
    "NonWorkdays": "2024-02-29"
  },
  // March 2024
  {
    "NonWorkdays": "2024-03-02"
  },
  {
    "NonWorkdays": "2024-03-03"
  },
  {
    "NonWorkdays": "2024-03-09"
  },
  {
    "NonWorkdays": "2024-03-10"
  },
  {
    "NonWorkdays": "2024-03-16"
  },
  {
    "NonWorkdays": "2024-03-17"
  },
  {
    "NonWorkdays": "2024-03-23"
  },
  {
    "NonWorkdays": "2024-03-24"
  },
  {
    "NonWorkdays": "2024-03-30"
  },
  {
    "NonWorkdays": "2024-03-31"
  },
  // April 2024
  {
    "NonWorkdays": "2024-04-06"
  },
  {
    "NonWorkdays": "2024-04-07"
  },
  {
    "NonWorkdays": "2024-04-13"
  },
  {
    "NonWorkdays": "2024-04-14"
  },
  {
    "NonWorkdays": "2024-04-20"
  },
  {
    "NonWorkdays": "2024-04-21"
  },
  {
    "NonWorkdays": "2024-04-27"
  },
  {
    "NonWorkdays": "2024-04-28"
  },
  // May 2024
  {
    "NonWorkdays": "2024-05-04"
  },
  {
    "NonWorkdays": "2024-05-05"
  },
  {
    "NonWorkdays": "2024-05-11"
  },
  {
    "NonWorkdays": "2024-05-12"
  },
  {
    "NonWorkdays": "2024-05-18"
  },
  {
    "NonWorkdays": "2024-05-19"
  },
  {
    "NonWorkdays": "2024-05-25"
  },
  {
    "NonWorkdays": "2024-05-26"
  }
];

function calculateNewDate() {
    let inputDate = document.getElementById('fixedDate').value;
    let numDays = parseInt(document.getElementById('numDays').value);
    let skipNonWorkdays = document.getElementById('skipNonWorkdays').checked;
    let excludeFirstWorkday = document.getElementById('excludeFirstWorkday').checked;
    let excludeLastWorkday = document.getElementById('excludeLastWorkday').checked;

    if (isNaN(Date.parse(inputDate))) {
        console.error("Invalid start date");
        return;
    }

    let fixedDate = new Date(inputDate);
    let newDate = addDays(fixedDate, numDays, skipNonWorkdays, excludeFirstWorkday, excludeLastWorkday);
    document.getElementById('newDate').value = newDate.toISOString().split('T')[0];
}

function addDays(startDate, days, skipNonWorkdays, excludeFirstWorkday, excludeLastWorkday) {
    let currentDate = new Date(startDate.getTime());

    // Add the specified number of days
    currentDate.setDate(currentDate.getDate() + days);

    // If skipping non-workdays, adjust the date if it falls on a non-workday
    if (skipNonWorkdays) {
        while (isNonWorkday(currentDate)) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    // If "Exclude First Workday" is checked, add an extra day after finding the first available workday
    if (excludeFirstWorkday) {
        currentDate.setDate(currentDate.getDate() + 1);
        while (isNonWorkday(currentDate)) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    // If "Exclude Last Workday" is checked, subtract a day if the next day is a non-workday
    if (excludeLastWorkday) {
        let nextDay = new Date(currentDate.getTime());
        nextDay.setDate(nextDay.getDate() + 1);
        if (isNonWorkday(nextDay)) {
            currentDate.setDate(currentDate.getDate() - 1);
        }
    }

    return currentDate;
}

function isNonWorkday(date) {
    let dateString = date.toISOString().split('T')[0];
    return nonWorkdays.some(nonWorkday => nonWorkday.NonWorkdays === dateString);
}



function toggleWorkdayCheckboxes() {
    var skipNonWorkdaysChecked = document.getElementById('skipNonWorkdays').checked;
    document.getElementById('excludeFirstWorkday').disabled = !skipNonWorkdaysChecked;
    document.getElementById('excludeLastWorkday').disabled = !skipNonWorkdaysChecked;

    if (!skipNonWorkdaysChecked) {
        document.getElementById('excludeFirstWorkday').checked = false;
        document.getElementById('excludeLastWorkday').checked = false;
    }
}