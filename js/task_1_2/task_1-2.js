// Task 1. 14.1. JSON vs XML
// и
// Task 2. 14.1. JSON vs XML
console.log("Task 1 and 2. 14.1. JSON vs XML");

// 
class Data {
    marshalXML() {
        throw new Error("Marshal XML method shoud be implemented")
    }
    unmarshalXML() {
        throw new Error("Unmarshal XML method shoud be implemented")
    }

    marshalJSON() {
        throw new Error("Marshal JSON method shoud be implemented")
    }
    unmarshalJSON() {
        throw new Error("Unmarshal JSON method shoud be implemented")
    }
}

// Convert класс реализует логику преобразования полученных данных
// принимает экземпляр класса Data (а так-же классы которые унаследованы от Data, например List)

class Convert {
    constructor(data) {
        this.data = data
    }

    marXML(mess = '') {
        return this.data.marshalXML(mess)
    }

    unmarXML(mess = '') {
        return this.data.unmarshalXML(mess)
    }

    marJSON(mess = '') {
        return this.data.marshalJSON(mess)
    }

    unmarJSON(mess = '') {
        return this.data.unmarshalJSON(mess)
    }
}


// List (класс абстракция над списком пользователей)
// унаследован от Data, 
// экземпляры класса List передаются в конструктор класса Convert 
// в котором вызываются соответствующие методы для преобразования данных
class List extends Data {
    constructor() {
        super()
        this.parser = new DOMParser();

    }

    unmarshalXML(mess = '') {
        const xmlDOM = this.parser.parseFromString(mess, "text/xml");
        const list = xmlDOM.querySelector("list");
        const students = list.querySelectorAll("student");

        const studentsArr = Array.from(students).map((student) => {

            let name = student.querySelector("name")
            let age = student.querySelector("age")
            let prof = student.querySelector("prof")
            let first = name.querySelector("first")
            let second = name.querySelector("second")
            let lang = name.getAttribute('lang');


            return {
                name: `${first.textContent} ${second.textContent}`,
                age: age.textContent,
                prof: prof.textContent,
                lang: lang,
            }
        })
        return {
            list: studentsArr
        }
    }

    marshalXML() {
        console.log("marshaling...");
    }


    unmarshalJSON(mess = ``) {
        const data = JSON.parse(mess);
        const list = data.list;
        return {
            list: list
        }
    }
}


//Входные данные из задания 1
const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
  `;
//Входные данные из задания 2
const jsonString = `
  {
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }
   `
// start
const conv = new Convert(
    new List() 
)
console.log(conv.unmarXML(xmlString));
console.log(conv.unmarJSON(jsonString));

