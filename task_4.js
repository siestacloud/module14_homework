// Task 4. 14.4 Promises, async/await

console.log("Task 4. 14.4 Promises, async/await");

// Создаю promise
const myPromise = new Promise((resolve, reject) => {
    setTimeout((min, max) => {
        min = Math.ceil(0);
        max = Math.floor(100);
        let val = Math.floor(Math.random() * (max - min)) + min;
        if (val % 2 == 0) {
            resolve(val);
        }
        reject(val);

    }, 3000)
});

// Выполняем promise
myPromise
    .then((result) => {
        console.log(`Завершено успешно. Сгенерированное число — ${result}` );
    })
    .catch((error) => {
        console.log(`Завершено с ошибкой. Сгенерированное число — ${error}`);
    })


