function attachEvents() {
    const URL = 'https://baas.kinvey.com/appdata/kid_Sy-9jWP4Q/';
    const USERNAME = 'Peter';
    const PASSWORD = 'p';
    const BASE_64 = btoa(USERNAME + ':' + PASSWORD);
    const AUTH = {'Authorization': 'Basic ' + BASE_64};
    const SELECT = $('#posts');
    const TITLE = $('#post-title');
    const BODY = $('#post-body');
    const COMMENTS = $('#post-comments');

    $('#btnLoadPosts').on('click', loadPosts);
    $('#btnViewPost').on('click', viewPosts);

    function loadPosts() {

        $.ajax({
            method: 'GET',
            url: URL + 'posts',
            headers: AUTH
        }).then(function (response) {
            SELECT.empty();
            for (const post of response) {
                SELECT.append($(`<option id="${post._id}" body="${post.body}">${post.title}</option>`))
            }
        }).catch(function (err) {
            console.log(err);
        })
    }

    function viewPosts() {

        let selectedElement = SELECT.find(':selected');
        let id = selectedElement.attr('id');
        let value = selectedElement.val();
        let body = selectedElement.attr('body');
        TITLE.text(value);
        BODY.append($(`<li>${body}</li>`));

        $.ajax({
            method: 'GET',
            url: URL + `comments/?query={"post_id":"${id}"}`,
            headers: AUTH
        }).then(function (response) {
            BODY.empty();
            COMMENTS.empty();
            for (const comment of response) {
                COMMENTS.append($(`<li>${comment.text}</li>`))
            }
        }).catch(function (err) {
            console.log(err);
        })
    }
}