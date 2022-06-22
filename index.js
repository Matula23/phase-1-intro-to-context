// Your code here
function createEmployeeRecord(array){
  const employeeObject = {
    'firstName': array[0],
    'familyName': array[1],
    'title': array[2],
    'payPerHour': array[3],
    'timeInEvents': [],
    'timeOutEvents': [],
  }
  return employeeObject
}

function createEmployeeRecords(arrayOfArrays){
  let employeeObjectArrays = arrayOfArrays.map(employeeArray => createEmployeeRecord(employeeArray))
  // console.log(employeeObjectArrays)
  return employeeObjectArrays
}

// createEmployeeRecords([["moe", "sizlak", "barkeep", 2],["bartholomew", "simpson", "scamp", 3]])

// function createTimeInEvent(event){
//   let [date, time] = event.split(" ")
//   let timeInObject = {
//     type: 'TimeIn',
//     time,
//     date
//   }
//   //  this.timeInEvents.push(timeInObject)
//   //  return this
  
// }

function createTimeInEvent(employeeObject, event){
  let [date, hour] = event.split(' ')
  let eventObj = {
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date
  }

employeeObject.timeInEvents.push(eventObj)
return employeeObject
}

function createTimeOutEvent(employeeObject, event){
  let [date, hour] = event.split(' ')
  let eventObj = {
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date
  }

employeeObject.timeOutEvents.push(eventObj)
return employeeObject
}

function hoursWorkedOnDate(employeeObject, date){
  let timeIn = parseInt(employeeObject.timeInEvents.find(event => event.date === date).hour)
  let timeOut = parseInt(employeeObject.timeOutEvents.find(event => event.date === date).hour)

  let totalTime = (timeOut - timeIn) /100

  return totalTime
}

function wagesEarnedOnDate(employeeObject, date){
  return hoursWorkedOnDate(employeeObject, date) * employeeObject.payPerHour
}

function allWagesFor(employeeObject){
  let datesWorkedArray = Object.values(employeeObject.timeInEvents)
  let totalWages = (datesWorkedArray.map(shift => wagesEarnedOnDate(employeeObject, shift.date))).reduce((previous, current)=>previous + current)
  return totalWages
}

function calculatePayroll(employeeArray){
  let employeeWages = employeeArray.map(employee => allWagesFor(employee))
  let totalPayroll = employeeWages.reduce((previous,current) => previous + current)
  return totalPayroll
}
