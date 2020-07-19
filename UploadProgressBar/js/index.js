function fileSelected() {
    //TEST var file = document.getElementById('fileToUpload').files[0];
    var file = document.getElementById('file-3').files[0]; //TEST
    inicializar();

    if (file) {
        var fileSize = 0;
        if (file.size > 1024 * 1024) {
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + ' MB';
        }
        else {
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + ' KB';
        }

        document.getElementById('fileName').innerHTML += " " + file.name;
        document.getElementById('fileSize').innerHTML += " " + fileSize;
        document.getElementById('fileType').innerHTML += " " + file.type;

        document.getElementById('caracteristicasFichero').classList.remove('invisible');
        document.getElementById('myProgress').classList.remove('invisible');

        document.getElementById('textoFichero').innerHTML = file.name; //TEST
    }
}

function uploadFile() {
    //TEST var file = document.getElementById('fileToUpload').files[0];
    var file = document.getElementById('file-3').files[0]; //TEST

    var maxFileSize = 104857600; // Esta limitación está tambien en Web.config

    if (file === null || file === undefined) {
        MostrarMensaje("Info", "Seleccione un fichero");
        return false;
    }

    if (file.size > maxFileSize) {
        MostrarMensaje("Warning", "No puede subir un fichero de más de " + (maxFileSize / (1024 * 1024)) + " MB");
        return false;
    }

    var xhr = new XMLHttpRequest();
    var fd = new FormData();

    //TEST fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);
    fd.append("fileToUpload", document.getElementById('file-3').files[0]); //TEST

    /* event listners */
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    
    xhr.open("POST", "Upload.aspx");
    xhr.send(fd);
}

function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';

        var elem = document.getElementById('myBar');
        elem.style.width = percentComplete + '%';
        elem.innerText = percentComplete + '%';
    }
    else {
        document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
}

function uploadComplete(evt) {
/* This event is raised when the server send back a response */
    MostrarMensaje("Info", "Upload complete");
}

function uploadFailed(evt) {
    MostrarMensaje("Error", "There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
    MostrarMensaje("Info", "The upload has been canceled by the user or the browser dropped the connection.");
}  

function clearFile() {
    inicializar();
    document.getElementById('myProgress').classList.add('invisible');
    //TEST document.getElementById('fileToUpload').value = '';
    document.getElementById('file-3').value = ''; //TEST
}

function inicializar() {
    document.getElementById('fileName').innerHTML = '<label class="etiquetaPrincipal">Name:</label>';
    document.getElementById('fileSize').innerHTML = '<label class="etiquetaPrincipal">Size:</label>';
    document.getElementById('fileType').innerHTML = '<label class="etiquetaPrincipal">Type:</label>';

    document.getElementById('caracteristicasFichero').classList.add('invisible');

    document.getElementById('textoFichero').innerHTML = 'Seleccione un fichero...'; //TEST

    document.getElementById('progressNumber').innerHTML = '';

    var elem = document.getElementById("myBar");
    elem.style.width = 0 + "%";
    elem.innerText = 0 + "%";
}

function showRunning() {
    MostrarMensaje("Proceso", "");
}