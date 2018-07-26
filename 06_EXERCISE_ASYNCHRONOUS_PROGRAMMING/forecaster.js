function attachEvents() {
    const LOCATION = 'https://judgetests.firebaseio.com/locations.json';
    const TODAY = 'https://judgetests.firebaseio.com/forecast/today/';
    const UPCOMING = 'https://judgetests.firebaseio.com/forecast/upcoming/';
    const FORECAST = $('#forecast');
    let city = '';
    let code = '';

    $('#submit').on('click', getWeather)

    function getWeather() {
        city = $('#location').val();
        $.ajax({
            method: 'GET',
            url: LOCATION
        }).then(function (e) {
            for (let location of e) {
                if (city === location.name) {
                    code = location.code;
                    today();
                }
            }
        }).catch(handleError)
    }

    function today() {
        $.ajax({
            method: 'GET',
            url: TODAY + code + '.json'
        }).then(function (aaa) {
            let current = $('#current');
            current.empty();
            current.append('<div class="label">Current conditions</div>')
            let symbol = '';
            switch (aaa.forecast.condition) {
                case 'Sunny':
                    symbol = '&#x2600';
                    break;
                case 'Partly sunny':
                    symbol = '&#x26C5';
                    break;
                case 'Overcast':
                    symbol = '&#x2601';
                    break;
                case 'Rain':
                    symbol = '&#x2614';
                    break;
            }

            current.append(`<span class="condition symbol">${symbol}</span>`);

            let name = `<span class="forecast-data">${aaa.name}</span>`;
            let temp = `<span class="forecast-data">${aaa.forecast.low}&#176/${aaa.forecast.high}&#176</span>`;
            let cond = `<span class="forecast-data">${aaa.forecast.condition}</span>`;
            let inSpan = `<span class="condition">${name}${temp}${cond}</span>`;
            current.append(inSpan);
            upcoming();
        }).catch(handleError)
    }

    function upcoming() {
        $.ajax({
            method: 'GET',
            url: UPCOMING + code + '.json'
        }).then(function (aaa) {
            let upcoming = $('#upcoming');
            upcoming.empty();
            upcoming.append('<div class="label">Three-day forecast</div>');

            let symbol = '';
            for (let i = 0; i < 3; i++) {

                let symbol = '';
                switch (aaa.forecast[i].condition) {
                    case 'Sunny':
                        symbol = '&#x2600';
                        break;
                    case 'Partly sunny':
                        symbol = '&#x26C5';
                        break;
                    case 'Overcast':
                        symbol = '&#x2601';
                        break;
                    case 'Rain':
                        symbol = '&#x2614';
                        break;
                }
                let symbol2 = (`<span class="symbol">${symbol}</span>`);
                let temp2 = (`<span class="forecast-data">${aaa.forecast[i].low}&#176/${aaa.forecast[i].high}&#176</span>`);
                let cond2 = (`<span class="forecast-data">${aaa.forecast[i].condition}</span>`);
                let upSpan = `<span class="upcoming">${symbol2}${temp2}${cond2}</span>`;
                upcoming.append(upSpan);
            }

            FORECAST.show();
        }).catch(handleError)
    }

    function handleError() {
        FORECAST.empty();
        FORECAST.show();
        FORECAST.append('<p>Error</p>');
    }
}