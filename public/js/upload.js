document.getElementById("imageUpload").onclick = function () {
  let xhttp = new XMLHttpRequest();

  const imageStatus = document.getElementById("imageStatus");
  const selectedImage = document.getElementById("selectedImage");

  xhttp.onreadystatechange = function () {
    imageStatus.innerHTML = this.responseText;
  };

  xhttp.open("POST", "/dashboard/image-upload");

  xhttp.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      let result = Math.floor((e.loaded / e.total) * 100);
      console.log(result + "%");
    }
  };

  let formData = new FormData();

  if (selectedImage.files.length > 0) {
    formData.append("image", selectedImage.files[0]);
    xhttp.send(formData);
  } else {
    imageStatus.innerHTML = "برای اپلود عکس یک عکس رو انتخاب کن ";
  }
};
