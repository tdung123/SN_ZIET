// Lời chúc sinh nhật
const birthdayMessage = "Chúc mừng sinh nhật tuổi 18 lần 3! Chúc Ziệt một tuổi mới luôn ngập tràn niềm vui, bình an và nhận được thật nhiều yêu thương. Mong rằng mọi ước mơ của bạn sẽ sớm trở thành hiện thực. Happy Birthday!!! 🎉";

const giftBox = document.getElementById('giftBox');
const cakeImg = document.getElementById('cakeImg');
const cakeWrapper = document.getElementById('cakeWrapper');

const stepGift = document.getElementById('step-gift');
const stepCake = document.getElementById('step-cake');
const stepGallery = document.getElementById('step-gallery');
const btnNext = document.getElementById('btnNext');
const typedTextElement = document.getElementById('typed-text');
const bgMusic = document.getElementById('bgMusic');

// 1. Tạo hiệu ứng bong bóng trôi ở nền
function createBalloons() {
  const bgDecor = document.getElementById('bgDecor');
  const colors = ['#ff758f', '#ffb703', '#8093f1', '#b388eb', '#72efdd'];
  
  for (let i = 0; i < 18; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.animationDelay = `${Math.random() * 8}s`;
    balloon.style.animationDuration = `${6 + Math.random() * 6}s`;
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    bgDecor.appendChild(balloon);
  }
}
createBalloons();

// Hàm phát nhạc an toàn
function playAudio() {
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch(err => {
      console.log("Trình duyệt chặn autoplay ban đầu:", err);
    });
  }
}

// 2. Click vào Hộp Quà đầu tiên -> Phát nhạc + Sang màn Bánh Kem
giftBox.addEventListener('click', () => {
  playAudio();

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  });

  stepGift.classList.remove('active');
  stepGift.classList.add('hidden');
  
  stepCake.classList.remove('hidden');
  stepCake.classList.add('active');

  typeWriter(birthdayMessage, 0);
});

// 3. Tương tác với Bánh Sinh Nhật
function playCakeGif() {
  cakeImg.src = 'Pic/cake.gif';
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 }
  });
}

function stopCakeGif() {
  cakeImg.src = 'Pic/cake.jpg';
}

cakeWrapper.addEventListener('mouseenter', playCakeGif);
cakeWrapper.addEventListener('mouseleave', stopCakeGif);
cakeWrapper.addEventListener('click', playCakeGif);

// 4. Hiệu ứng gõ chữ
function typeWriter(text, index) {
  if (index < text.length) {
    typedTextElement.innerHTML += text.charAt(index);
    setTimeout(() => typeWriter(text, index + 1), 35);
  }
}

// 5. Bấm chuyển tiếp sang Màn 3 (Bảng 4 Hộp Quà)
btnNext.addEventListener('click', () => {
  var duration = 1.5 * 1000;
  var end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());

  stepCake.classList.remove('active');
  stepCake.classList.add('hidden');
  
  stepGallery.classList.remove('hidden');
  stepGallery.classList.add('active');
});

// 6. Xử lý mở 4 hộp quà ở màn cuối -> Mở hộp quà nào ghim ảnh đó lên
const giftItems = document.querySelectorAll('.gift-item-box');

giftItems.forEach(item => {
  const giftCover = item.querySelector('.gift-cover');
  const photoCard = item.querySelector('.photo-card');

  giftCover.addEventListener('click', () => {
    // Hiệu ứng bắn pháo hoa tại vị trí hộp quà
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });

    // Ẩn nắp hộp quà và hiện tấm ảnh được ghim
    giftCover.style.display = 'none';
    photoCard.classList.remove('hidden-photo');
    item.style.border = 'none'; // Bỏ đường viền đứt nét sau khi hiện ảnh
    item.style.background = 'transparent';
  });
});