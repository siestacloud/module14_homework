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

// Выполняю promise
myPromise
    .then((result) => {
        console.log(`Завершено успешно. Сгенерированное число — ${result} (task 4)` );
    })
    .catch((error) => {
        console.log(`Завершено c ошибкой. Сгенерированное число — ${error} (task 4)`);
    })
