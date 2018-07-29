function attachEvents() {
    const URL = 'https://baas.kinvey.com/appdata/kid_HkLD_2uVX/biggestCatches/';
    const USERNAME = 'guest';
    const PASSWORD = 'guest';
    const BASE_64 = btoa(USERNAME + ':' + PASSWORD);
    const AUTH = {'Authorization': 'Basic ' + BASE_64};
    //const MAIN = $('#main');

    $('.load').on('click', load);
    $('.add').on('click', add);

    function add() {
        let angler = $('#addForm').find('.angler').val();
        let weight = Number($('#addForm').find('.weight').val());
        let species = $('#addForm').find('.species').val();
        let location = $('#addForm').find('.location').val();
        let bait = $('#addForm').find('.bait').val();
        let captureTime = Number($('#addForm').find('.captureTime').val());

        $.ajax({
            method: 'POST',
            url: URL,
            headers: {'Authorization': 'Basic ' + BASE_64,
                'contentType': 'application/json'},
            data: JSON.stringify({
                "angler": angler,
                "weight": weight,
                "species": species,
                "location": location,
                "bait": bait,
                "captureTime": captureTime
            })
        }).then(load)
            .catch(handleError);

        $('#addForm').find('.angler').val('');
        $('#addForm').find('.weight').val('');
        $('#addForm').find('.species').val('');
        $('#addForm').find('.location').val('');
        $('#addForm').find('.bait').val('');
        $('#addForm').find('.captureTime').val('');
    }

    function load() {
        $.ajax({
            method: 'GET',
            url: URL,
            headers: AUTH
        }).then(loadCatches)
            .catch(handleError)
    }

    function loadCatches(catchFish) {
        let catchLoad = $('#catches');
        catchLoad.empty();
        console.log(catchFish);
        for (const el of catchFish) {

            let angler = el.angler;
            let weight = Number(el.weight);
            let species = el.species;
            let location = el.location;
            let bait = el.bait;
            let captureTime = Number(el.captureTime);
            let id = el._id;
            //console.log(id);

            catchLoad
                .append($(`<div class="catch" data-id=${id}>`)
                    .append($('<label>Angler</label>'))
                    .append($('<input type="text" class="angler"/>').attr('value', angler))
                    .append($('<label>Weight</label>'))
                    .append($(`<input type="number" class="weight"/>`).attr('value', weight))
                    .append($('<label>Species</label>'))
                    .append($(`<input type="text" class="species">`).attr('value', species))
                    .append($('<label>Location</label>'))
                    .append($(`<input type="text" class="location"/>`).attr('value', location))
                    .append($('<label>Bait</label>'))
                    .append($(`<input type="text" class="bait"/>`).attr('value', bait))
                    .append($('<label>Capture Time</label>'))
                    .append($(`<input type="number" class="captureTime"/>`).attr('value', captureTime))
                    .append($('<button class="update">Update</button>').on('click', update))
                    .append($('<button class="delete">Delete</button>').on('click', deleteDiv)));
            //MAIN.append(catchLoad);
        }
    }

    function update() {
        let aaa = $(this).parent();
        //console.log(aaa);
        let angler = $(aaa).find('.angler').val();
        //console.log(angler);
        let weight = Number($(aaa).find('.weight').val());
        let species = $(aaa).find('.species').val();
        let location = $(aaa).find('.location').val();
        let bait = $(aaa).find('.bait').val();
        let captureTime = Number($(aaa).find('.captureTime').val());

        $.ajax({
            method: 'PUT',
            url: URL + aaa.attr('data-id'),
            headers: {'Authorization': 'Basic ' + BASE_64,
                'contentType': 'application/json'},
            data: JSON.stringify({
                "angler": angler,
                "weight": weight,
                "species": species,
                "location": location,
                "bait": bait,
                "captureTime": captureTime
            })
        }).then(load)
            .catch(handleError)
    }

    function deleteDiv() {
        let element = $(this).parent().attr('data-id');
        //console.log(element);
        $.ajax({
            method: 'DELETE',
            url: URL + element,
            headers: {'Authorization': 'Basic ' + BASE_64,
                'contentType': 'application/json'},
        }).then(load)
            .catch(handleError)
    }

    function handleError(err) {
        console.log(err);
    }
}
