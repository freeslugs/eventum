$(function() {
    function setInputToWidthOfText(text) {
        width = calculateWordWidth(text);
        $('input[name="filename"]').animate({"width":width + 30}, 10);
    }

    function setInitialPositions() {
        var extension = $('input[name="extension"]').val();
        var filename = $('input[name="filename"]').val();
        $('.extension').html(extension);
        if (filename) {
            setInputToWidthOfText(filename + "." + extension);
        }
    }

    setInitialPositions();

    /* let the `btn-choose` div act as the file input */
    $(".btn-choose").click(function () {
        $('input[name="image"]').trigger('click');
        return false;
    });

    /* let the `btn-upload` div act as the submit button */
    $(".btn-upload").click(function () {
        var formData = new FormData($('.upload-form')[0]);
        $.ajax({
            url: '/admin/media/upload',  //server script to process data
            type: 'POST',
            xhr: function() {  // custom xhr
                myXhr = $.ajaxSettings.xhr();
                return myXhr;
            },
            //Ajax events
            success: function(data, textStatus, jqXHR) {
                var response = jQuery.parseJSON(jqXHR.responseText);
                if (response.extension == null){
                    $('#images-ajax-loadpoint').load("/admin/media/view", function(response, status){
                        if (status == "error"){
                            alert("Sorry, there was an error loading the images.");
                        }
                    });
                    $('.error-message').hide();
                }
                else {
                    $('.error-message').text(response.extension);
                    $('.error-message').show();
                    $('.error-message').addClass('active');
                }
            },
            error: function(jqXHR, textStatus, error) {
                $('.error-mesage').text("An unknown error occured.");
                $('.error-message').addClass('active');
            },
            // Form data
            data: formData,
            //Options to tell JQuery not to process data or worry about content-type
            cache: false,
            contentType: false,
            processData: false
        });
    });

    /* Automatically populate the filename field when a file is chosen */
    $('input[name="image"]').change(function(){
        var filename = $(this).val().split('/').pop().split('\\').pop();
        var pieces = filename.split(".");
        if (pieces[1]) {
            $('.extension').html("." + pieces[1].toLowerCase());
            $('input[name="extension"]').val("." + pieces[1].toLowerCase());
        }
        setInputToWidthOfText(pieces[0] + "." + pieces[1]);
        $('input[name="filename"]').attr("placeholder",pieces[0]);
        $('input[name="filename"]').val(pieces[0]);
    });

    /* Match the width of the filename field to the width of the input */
    $('input[name="filename"]').keydown(function() {
        setInputToWidthOfText($(this).val() + "." + $('.extension').html());
    });

    function calculateWordWidth(text, classes) {
        classes = classes || [];
        classes.push('text-width-calculation');
        var div = document.createElement('div');
        div.setAttribute('class', classes.join(' '));
        div.innerHTML = text;
        document.body.appendChild(div);
        var width = jQuery(div).outerWidth(true);
        div.parentNode.removeChild(div);
        return width;
    }

});