// Your code here
function createEmployeeRecord(employeeData) {
    return {firstName: employeeData[0],
            familyName: employeeData[1],
            title: employeeData[2],
            payPerHour: employeeData[3],
            timeInEvents: [],
            timeOutEvents: []
    }
}

function createEmployeeRecords(employeeDataBatch) {
    return employeeDataBatch.map(createEmployeeRecord);
}

function createTimeEvent(employeeRecord, timeClock, type) {

    const employeeRecordRev = employeeRecord;

    const event = {type: type[0].toUpperCase()+type.slice(1),
                    date: timeClock.slice(0, 10),
                    hour: parseInt(timeClock.slice(11))
                    }
    
    employeeRecordRev[`${type}Events`].push(event);

    return employeeRecordRev;
}

function createTimeInEvent(employeeRecord, timeIn) {

    return createTimeEvent(employeeRecord, timeIn, "timeIn");
}

function createTimeOutEvent(employeeRecord, timeOut) {

    return createTimeEvent(employeeRecord, timeOut, "timeOut");
}

function hoursByDate(employeeRecord, type) {
    return employeeRecord[`${type}Events`].reduce((accumulator, item) => {
        const newEntry = { [item.date]: item.hour}
        // return {...accumulator, ...newEntry} 
        return Object.assign({}, accumulator, newEntry);
    }, {})
}
function hoursWorkedOnDate(employeeRecord, date) {
    const hoursOut = hoursByDate(employeeRecord, 'timeOut')
    const hoursIn = hoursByDate(employeeRecord, 'timeIn')

    return (hoursOut[date] - hoursIn[date])/100
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date)*employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    const hoursOut = hoursByDate(employeeRecord, 'timeOut');
    console.log(hoursOut)
    const hoursIn = hoursByDate(employeeRecord, 'timeIn');

    let totalHours = 0

    for (let date in hoursOut) {
        totalHours += (hoursOut[date] - hoursIn[date])/100
    }

    return totalHours*employeeRecord.payPerHour;
}

function calculatePayroll(employeeRecords) {

    return employeeRecords.reduce((accumulator, employee) => accumulator + allWagesFor(employee), 0);
}

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// Earns 324
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// Earns 54
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// 324 + 54
console.log(cRecord)
console.log(allWagesFor(cRecord))