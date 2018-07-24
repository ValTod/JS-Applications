function attachEvents(){
    const BASE_URL = 'https://phonebook-nakov.firebaseio.com/phonebook';

    const TABLE = $('#phonebook');
    const PERSON = $('#person');
    const PHONE = $('#phone');

    $('#btnLoad').on('click', loadContacts);
    $('#btnCreate').on('click', createContact);

    function loadContacts() {
       let load = ({
            method: 'GET',
            url: BASE_URL + '.json',
            success:appendContacts,
            error:handleError
        });
        $.ajax(load)
    }

    function appendContacts(contacts) {
        TABLE.empty();
        for (const key in contacts) {
            let li = $('<li>');
            li.text(`${contacts[key].person}:${contacts[key].phone}`);
            let a = $('<button id="dltBtn">Delete</button>')
            a.on('click', function () {
                $.ajax({
                    method: 'DELETE',
                    url: BASE_URL + '/' + key + '.json'
                }).then(function () {
                    li.remove()
                }).catch(handleError)
            });
            li.append(a);
            TABLE.append(li)
        }
    }

    function createContact() {
        let person = PERSON.val();
        let phone = PHONE.val();
        if (person.trim() !== '' && phone.trim() !== '') {
            $.ajax({
                method: "POST",
                url: BASE_URL + '.json',
                data: JSON.stringify({person, phone})
            }).then(loadContacts)
                .catch(handleError);
            PERSON.val('');
            PHONE.val('')
        }
    }

    function handleError(err) {
        console.log(err)
    }
}
