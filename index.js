const btnSection = document.querySelector('.btnSection');
const video = document.querySelector('#video');
const timer = document.querySelector('.timer');
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
    img.setAttribute('class', 'picture');
    img.setAttribute('title', 'download picture');
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
  btn.setAttribute('class', 'btn btn-primary');
  timeBtn.setAttribute('id', 'time');
  timeBtn.setAttribute('class', 'btn btn-info');
  vbtn.setAttribute('type', 'checkbox');
  vbtn.setAttribute('id', 'vbtn');
  btn.textContent = 'Snap picture';
  timeBtn.textContent = 'Snap picture after 3 seconds';
  btnSection.append(btn);
  btnSection.append(timeBtn);
  btnSection.append(vbtn);
  Webcam.set({
    width: 340,
    height: 280,
    image_format: 'jpeg',
    jpeg_quality: 90
  });
Webcam.attach( '#video' );

document.getElementById("snap").addEventListener("click",function() {
	createPhoto();
});

document.getElementById("vbtn").addEventListener("change", function(e) {
  if(e.currentTarget.checked){
    Webcam.reset();
    btn.style.display = 'none';
    timeBtn.style.display = 'none';
    timer.style.display = 'none';
  } else {
    Webcam.attach( '#video' );
    btn.style.display = 'initial';
    timeBtn.style.display = 'initial';
    timer.style.display = 'block';
  }
})

document.getElementById("time").addEventListener("click",function() {
  let s = 3;
  timer.textContent = s;
  const time = setInterval(()=>{
    s-=1;
    timer.textContent = s;
    if(s<=0){
      createPhoto();
      timer.textContent=3;
      clearInterval(time)
    }
  }, 1000);
});
}, function() {
  alert('Camera access must be allowed.');
});