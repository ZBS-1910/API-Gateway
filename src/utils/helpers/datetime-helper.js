function compareTime(timeString1, timeString2){
    let datetime1 = new Date(`1970-01-01T${timeString1}`);
    let datetime2 = new Date(`1970-01-01T${timeString2}`);
    
    return datetime1.getTime() > datetime2.getTime();
}

module.exports
= {
    compareTime,
};