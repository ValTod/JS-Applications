function attachEvents() {
    $('#refresh').on('click', funcRefresh);
    $('#submit').on('click', funcSubmit);

    function funcRefresh() {
        $('#messages').empty();
        $.ajax({
            method: 'GET',
            url: 'https://messanger-2efa9.firebaseio.com/messenger.json',
            success: refresh,
            error: handleError
        })
    }

    function funcSubmit() {
        if ( $('#author').val() !== '' && $('#content').val() !== '') {
            let timestamp = Date.now().toString();
            $.ajax({
                method: 'POST',
                url: 'https://messanger-2efa9.firebaseio.com/messenger.json',
                data: JSON.stringify({author: $('#author').val(), content: $('#content').val(), timestamp: timestamp}),
                success: post,
                error: handleError
            })
        }
    }

    function refresh(chat) {
        let orderedChat = Object.keys(chat).sort((a, b) => chat[a].timestamp - chat[b].timestamp);

        for (let message of orderedChat) {
            $('#messages').append(`${chat[message].author}: ${chat[message].content}\n`)
        }
    }

    function post() {
        $('#author').val('');
        $('#content').val('');
        funcRefresh();
    }

    function handleError(err) {
        console.log(err);
    }

}