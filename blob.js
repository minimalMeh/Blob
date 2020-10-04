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
        previewAndUploadImage(files[i]);
    }
}

const uploadImageFromUrl = (url) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    img.onload.bind(img) = () => {
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        context.drawImage(this, 0, 0);
        canvas.toBlob((blob) => {
            handleFiles([blob]);
        }, "image/png")
    };
    img.onerror = () => {
        alert("Error in uploading");
    };
    img.crossOrigin = "";
    img.src = url;
}

const previewImage = (img) => {
    //container
    const imgView = document.createElement("div");
    imgView.className = "image-view";
    imagePreviewRegion.appendChild(imgView);

    //preview image
    const image = document.createElement("img");
    imgView.appendChild(image);

    //progress overlay
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    imgView.appendChild(overlay);

    //read image
    const reader = new FileReader();
    reader.onload = (e) => {
        image.src = e.target.result;
    }
    reader.readAsDataURL(img); // can be replaced as URL.createObjectURL();
}