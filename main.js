const fs = require('fs');
const main_rooms_config = {
    room1: {
        beds: [1,2,3,4,5,6,7,8,9,10],
        students: ['ajmera','subhadip','ranjan','rajkumar','raju','dhruv','surah shah','pawan',1,2],
        shuffled_students: []
    },
    room6: {
        beds: [11,12,13,14,15,16,17,18,19,20],
        students: ['navid','nasir','priyanshu',3,4,5,6,7,8,9],
        shuffled_students: []
    },
    room7: {
        beds: [21,22,23,24,25,26,27,28],
        students: ['riyaz','shabid','prathemesh','harshal','praveen','ankit',10,11],
        shuffled_students: []
    },
    room8: {
        beds: [29,30,31,32,33,34],
        students: ['sampat','suraj','tushar','hemant','anmol',12],
        shuffled_students: []
    },
    room10: {
        beds: [35,36,37,38,39,40,41,42],
        students: ['arif','abhay','satpal','amarpal',13,14,15,16],
        shuffled_students: []
    },
    room12: { 
        beds: [43,44,45,46,47,48,49,50,51,52],
        students: ['akshit','rahul s','amol','parmeshwer','anurag','umesh','akshay','dipesh',17,18],
        shuffled_students: []
    }
}
function roomShuffling(rooms_config) {
    for (room in rooms_config) {
        var [count,counter] = [0,0]
        var c=0
        for (c;rooms_config[room].beds.length !== rooms_config[room].shuffled_students.length;c++) {
            const random_room = Object.keys(rooms_config)[Math.floor(Math.random()*Object.keys(rooms_config).length)]
            // console.log(random_room)
            if (random_room !== room && rooms_config[random_room].students.length !== 0) {
                const random_student = rooms_config[random_room].students[Math.floor(Math.random()*rooms_config[random_room].students.length)]
                // console.log(random_student)
                const filter_random_student =  typeof(random_student) !== "number" ? random_student : "empty"
                const bed_no = rooms_config[room].beds[count]
                // console.log(filter_random_student)
                const student_detail = {
                    name: filter_random_student,
                    bed_no: bed_no,
                    bed_position: bed_no%2 === 0 ? "upside_bed" : "downside_bed"
                }
                rooms_config[room].shuffled_students.push(student_detail)
                const random_student_index = rooms_config[random_room].students.indexOf(random_student)
                rooms_config[random_room].students.splice(random_student_index,1)
                count++
            }
            counter++
            if (counter>100) {
                return false
            }
        }
        delete rooms_config[room].beds
    }
    return rooms_config
    
}

while (true) {
    const copy_room_config = JSON.parse(JSON.stringify(main_rooms_config))   ;
    const getFormFunction = roomShuffling(copy_room_config)
    if (getFormFunction)  {
        fs.writeFile("room_shuffle.json",JSON.stringify(getFormFunction,null,4),(err,) => {
            if(!err) {
                console.log('Done')
            }
        })
        break
    }
}