// Function to delete a post
function deletePost(postId) {
  fetch(`/delete-post/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.querySelector(`[data-id="${postId}"]`).remove();
        alert(data.message);
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error:', error));
}

// Function to open edit modal with post data
function editPost(postId) {
  const postElement = document.querySelector(`[data-id="${postId}"]`);
  const title = postElement.querySelector("h2").innerText;
  const content = postElement.querySelector("p").innerText;

  document.getElementById("edit-post-id").value = postId;
  document.getElementById("edit-title").value = title;
  document.getElementById("edit-content").value = content;

  document.getElementById("edit-modal").classList.remove("hidden");
}

// Function to close the edit modal
function closeModal() {
  document.getElementById("edit-modal").classList.add("hidden");
}

// Function to save edited post
document.getElementById("edit-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const postId = document.getElementById("edit-post-id").value;
  const title = document.getElementById("edit-title").value;
  const content = document.getElementById("edit-content").value;

  fetch(`/edit-post/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Update the DOM with the new title and content
        const postElement = document.querySelector(`[data-id="${postId}"]`);
        postElement.querySelector("h2").innerText = title;
        postElement.querySelector("p").innerText = content;

        closeModal();
        alert(data.message);
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error:', error));
});
