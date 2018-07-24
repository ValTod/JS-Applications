const BASE_URL = 'https://phonebook-13da0.firebaseio.com/phonebook'
const TABLE = $('#phonebook')
const PERSON = $('#person')
const PHONE = $('#phone')

$("#btnLoad").on('click', loadContacts)
$("#btnCreate").on('click', createContact)

function loadContacts() {
    $.ajax({
        method: "GET",
        url: BASE_URL + '.json'
    }).then(appendContacts)
        .catch(handleError)
}

function appendContacts(contacts) {
    TABLE.empty()
    let keys = Object.keys(contacts)
    keys.sort((a, b) => contacts[a].name.localeCompare(contacts[b].name))
    for (const key of keys) {
        let li = $('<li>')
        li.text(`${contacts[key].name}: ${contacts[key].phone}`)
        let a = $('<button>DELETE</button>')
        a.on('click', function () {
            $.ajax({
                method: "DELETE",
                url: BASE_URL+ "/" + key + '.json'
            }).then(function () {
                li.remove()
            }).catch(handleError)
        })
        li.append(a)
        TABLE.append(li)
    }
}

function createContact() {
    let name = PERSON.val()
    let phone = PHONE.val()

    if (name.trim() !== '' && phone.trim() !== '') {
        $.ajax({
            method: "POST",
            url: BASE_URL + '.json',
            data:JSON.stringify({name, phone})
        }).then(function () {
            let li = $('<li>')
            li.text(`${name}: ${phone}`)
            TABLE.append(li)
            PERSON.val('')
            PHONE.val('')
        })
            .catch(handleError)
    }
}

function handleError(err) {
    console.log(err)
}
