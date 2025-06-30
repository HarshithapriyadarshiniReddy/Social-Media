const form = document.querySelector('.create-post');
const postInput = document.getElementById('postInput');
const feedContainer = document.getElementById('feedContainer');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
let uploadedImage = null;

// Handle image selection
imageInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      // Display preview
      imagePreview.style.display = 'block';
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
      uploadedImage = e.target.result;
    };
    
    reader.readAsDataURL(file);
  }
});

// Handle post submission
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = postInput.value.trim();
  if (!text && !uploadedImage) return;
  
  // Create image HTML if image was uploaded
  const imageHTML = uploadedImage ? `
    <div class="post-image">
      <img src="${uploadedImage}" alt="Posted image" />
    </div>
  ` : '';

  const postHTML = `
    <div class="feed">
      <div class="head">
        <div class="user">
          <div class="profile-pic">
            <img src="https://randomuser.me/api/portraits/women/29.jpg" />
          </div>
          <div class="info">
            <h3>Helen</h3>
            <small>Just now</small>
          </div>
        </div>
        <span class="edit">...</span>
      </div>
      <div class="caption">
        <p><b>@helen</b> ${text}</p>
      </div>
      ${imageHTML}
      <div class="action-buttons">
        <span>♥</span>
        <span>💬</span>
        <span>🔁</span>
      </div>
      <div class="comments text-muted">
        No comments yet
      </div>
    </div>
  `;

  feedContainer.insertAdjacentHTML('afterbegin', postHTML);
  postInput.value = '';
  imagePreview.style.display = 'none';
  imagePreview.innerHTML = '';
  uploadedImage = null;
  imageInput.value = '';
});
function incrementLike(button) {
  const countSpan = button.nextElementSibling;
  let currentCount = parseInt(countSpan.innerText);
  countSpan.innerText = currentCount + 1;
}
