$(function () {
    const $image = $('#image');
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options);


    $('.uploadImg').on('click', function () {
        $('#chooseImg').click();
    });
})