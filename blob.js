const dropRegion = document.getElementById("drop-region");
const imagePreviewRegion = document.getElementById("image-preview");

// File Selector
const fakeInput = document.createElement("input");
fakeInput.type = "file";
fakeInput.accept = "image/*";
fakeInput.multiple = true;

dropRegion.addEventListener("click" , () => {
    fakeInput.click();
});

fakeInput.addEventListener("change", () => {
    const files = fakeInput.files;
    handleFiles(files);
});

//Drag events

const preventDefaultBehaviors = (event) => {
    event.preventDefault();
    event.stopPropagation();
}

dropRegion.addEventListener("dragenter", preventDefaultBehaviors, false);
dropRegion.addEventListener("dragleave", preventDefaultBehaviors, false);
dropRegion.addEventListener("dragover", preventDefaultBehaviors, false);
dropRegion.addEventListener("drop", preventDefaultBehaviors, false);

const handleDrop = (event) => {
    const files = event.dataTransfer.files;
    
    // check if it was uploaded from local file system
    if (files.length) {
        handleFiles(files);
    } else {
        const html = event.dataTransfer.getData("text/html");
        const regex = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html);
        const url = regex && regex[1];

        if(url) {
            uploadImageFromUrl(url);
        }
    }
}

dropRegion.addEventListener("drop", handleDrop, false);

const handleFiles = (files) => {
    for ( let i = 0; i < files.length; i++) {
        if (validateImage(files[i])) {
            previewAndUploadImage(files[i]);
        }
    }
}

