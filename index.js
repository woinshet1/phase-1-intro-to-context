// Your code here
const createEmployeeRecord = (array) => {    
    return { 
        firstName : array[0], familyName : array[1], title : array[2], payPerHour : array[3], timeInEvents: [], timeOutEvents:[]
    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec=>createEmployeeRecord(rec))
}

const createTimeInEvent = (recordObj, timestamp) => {
    const [date , time] = timestamp.split(' ')
    const timeIn = {
        type:'TimeIn',
        hour:parseInt(time),
        date: date
    }
    recordObj.timeInEvents.push(timeIn)
    return recordObj
}

const createTimeOutEvent = (recordObj, timestamp) => {
    const [date , time] = timestamp.split(' ')
    const timeOut = {
        type:'TimeOut',
        hour:parseInt(time),
        date: date
    }
    recordObj.timeOutEvents.push(timeOut)
    return recordObj
}

const hoursWorkedOnDate = (employeeObj, datestamp) => {
    const timeIn = employeeObj.timeInEvents.find(inEvent=>inEvent.date === datestamp);
    const timeOut = employeeObj.timeOutEvents.find(outEvent=>outEvent.date === datestamp);
    return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = (employeeObj, datestamp) => {
    const timeIn = employeeObj.timeInEvents.find(inEvent=>inEvent.date === datestamp);
    const timeOut = employeeObj.timeOutEvents.find(outEvent=>outEvent.date === datestamp);
    const payRate = employeeObj.payPerHour
    return [(timeOut.hour - timeIn.hour)/100]*payRate
}

const allWagesFor = (employeeObj) => {
    let hoursWorked =[] 
    let totalHours
    for(let i =0;i<employeeObj.timeInEvents.length; i++)

    if(employeeObj.timeInEvents[i].date === employeeObj.timeOutEvents[i].date){
        hoursWorked.push((employeeObj.timeOutEvents[i].hour-employeeObj.timeInEvents[i].hour)/100)
    };
     totalHours = hoursWorked.reduce((a, b) => {
        return (a + b);
      })
      return totalHours*employeeObj.payPerHour
    
}

const calculatePayroll = (recordsArray) => {
    let employeeWages = []
    let payrollCost=

    recordsArray.forEach(element=>employeeWages.push(allWagesFor(element)));
    payrollCost = employeeWages.reduce((a, b) => {
        return (a + b);
      })
      return payrollCost    
}
