// Task 5. 14.7. Финальное задание
console.log("Task 5. 14.7. Финальное задание");

// Функция отправки запроса на внешнее API
const useReq = (url, callback) => {
    console.log(url)
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            if (callback) {
                callback(json)
                console.log(typeof json)
                // запись результата запроса в localStorage
                localStorage.setItem('imgJSON', JSON.stringify(json));
            }
        })
        .catch(error => console.error(error));
}


// Функция обработки полученного результата
function dispRes(apiData) {
    let cards = '';
    console.log(apiData.length);
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
    resultNodeTask5.innerHTML = cards;
}

// Функция отображения картинок если они есть в localStorage
function initImages(key) {
    const imgJSON = localStorage.getItem(key);
    if (imgJSON) {
        dispRes(JSON.parse(imgJSON))
    } else {
        console.log('localStorage empty');
    }
}


// поиск элементов в DOM
const resultNodeTask5 = document.querySelector('.j-result');
const btnNodeTask5 = document.querySelector('.j-btn-request-task5');
const errResultNodeTask5 = document.querySelector('.j-err-result-taks5');

initImages('imgJSON') // попытка добавить imgs из localStorage


// Обработчик кнопки для запроса
btnNodeTask5.addEventListener('click', async () => {
    const page = document.querySelector('.j-task5-1').value;
    const limit = document.querySelector('.j-task5-2').value;

    if (!checkParam(page) && !checkParam(limit)) {
        errResultNodeTask5.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
        return
    }
    if (checkParam(page) && checkParam(limit)) {
        const params = new URLSearchParams()
        params.append('page', page)
        params.append('limit', limit)
        console.log(params.toString())
        let url = `https://picsum.photos/v2/list/?${params}`
        useReq(url, dispRes);
        errResultNodeTask5.innerHTML = "числа в диапазоне от 1 до 10";
        return
    }
    if (!checkParam(page)) {
        errResultNodeTask5.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    }
    if (!checkParam(limit)) {
        errResultNodeTask5.innerHTML = "Лимит вне диапазона от 1 до 10";
    }
})

function checkParam(param) {
    if (+param && +param >= 1 && +param <= 10) {
        return true
    }
    return false
}
