// Task 3. 14.2 XHR

console.log("Task 3. 14.2 XHR");
function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };

    xhr.onerror = function () {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
};

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');
const errResultNode = document.querySelector('.j-err-result');

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
    let cards = '';
    // console.log('start cards', cards);

    apiData.forEach(item => {
        const cardBlock = `
    <div class="content__item item" tabindex="1">
      <div class="box">
          <div class="file">
              <img src="${item.download_url}" class="card-image" />
          </div>
          <div class="tooltip">author: ${item.author}</div>
      </div>
    </div>
      `;
        cards = cards + cardBlock;
    });

    // console.log('end cards', cards);

    resultNode.innerHTML = cards;
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
    const value = document.querySelector('input').value;
    console.log(value);
    if (+value && +value != 0 && +value <= 10) {
        useRequest(`https://picsum.photos/v2/list/?limit=${value}`, displayResult);
        errResultNode.innerHTML = "число диапазоне";

        return
    }
    errResultNode.innerHTML = "число вне диапазона от 1 до 10";

})