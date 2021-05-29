const btnSection = document.querySelector('.btnSection');
const video = document.querySelector('#video');
navigator.getMedia = ( navigator.getUserMedia || // use the proper vendor prefix
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

const createPhoto = () => {
  Webcam.snap(function(data_uri) {
    const img = new Image();
    const a = document.createElement('a');
    const container = document.getElementById('results')
    img.src = data_uri;
    a.download = 'image.png';
    a.href = data_uri;
    a.append(img)
    container.append(a);
  });
}

navigator.getMedia({video: true}, function() {
  const btn = document.createElement('button');
  const timeBtn = document.createElement('button');
  const vbtn = document.createElement('input');
  btn.setAttribute('id', 'snap');
  timeBtn.setAttribute('id', 'time');
  vbtn.setAttribute('type', 'checkbox');
  vbtn.setAttribute('id', 'vbtn');
  btn.textContent = 'snap picture';
  timeBtn.textContent = 'snap picture after 3 seconds';
  btnSection.append(btn);
  btnSection.append(timeBtn);
  btnSection.append(vbtn);
  Webcam.set({
    width: 400,
    height: 320,
    image_format: 'jpeg',
    jpeg_quality: 90
  });
Webcam.attach( '#video' );
const v = document.querySelector('video');
document.getElementById("snap").addEventListener("click",function() {
	createPhoto();
});

document.getElementById("vbtn").addEventListener("change", function(e) {
  if(e.currentTarget.checked){
    Webcam.reset();
    btn.style.display = 'none';
    timeBtn.style.display = 'none';
  } else {
    Webcam.attach( '#video' );
    btn.style.display = 'initial';
    timeBtn.style.display = 'initial';
  }
})

document.getElementById("time").addEventListener("click",function() {
	setTimeout(() => {
    createPhoto();
  }, 3000);
});
}, function(error) {
  alert('Camera access must be allowed.');
});