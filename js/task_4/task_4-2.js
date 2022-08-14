// Task 4. 14.5. Работа с HTTP (fetch, async/await)
console.log("Task 4. 14.5. Работа c HTTP (fetch, async/await)");

// Функция отправки запроса на внешнее API
// возвращает fetch
const useRequestFetch = (url) => {
    return fetch(url)
        .then((response) => {
            // console.log('response', response.url);
            return response.url;
        })
        .catch(() => { console.log('error') });
}

// поиск элементов в DOM
const resultNodeTask4 = document.querySelector('.j-result');
const btnNodeTask4 = document.querySelector('.j-btn-request-task4');
const errResultNodeTask4 = document.querySelector('.j-err-result-taks4');

// Функция обработки полученного результата
function displayResultTask4(imgUrl) {
    const cardBlock = `
    <div class="content__item item" tabindex="1">
      <div class="box">
          <div class="file">
              <img src="${imgUrl}" class="card-image-task4" />
          </div>
      </div>
    </div>
      `;
    resultNodeTask4.innerHTML = cardBlock;
}

// Вешаем обработчик на кнопку для запроса
btnNodeTask4.addEventListener('click', async () => {
    const value1 = document.querySelector('.j-task4-1').value;
    const value2 = document.querySelector('.j-task4-2').value;

    console.log(value1, value2);
    if (+value1 && +value1 >= 100 && +value1 <= 300 && +value2 && +value2 >= 100 && +value2 <= 300) {
        const requestResultImgUrl = await useRequestFetch(`https://picsum.photos/${value1}/${value2}`);
        displayResultTask4(requestResultImgUrl)
        errResultNodeTask4.innerHTML = "числа диапазоне от 100 до 300";
        return
    }
    errResultNodeTask4.innerHTML = "одно из чисел вне диапазона от 100 до 300";
})