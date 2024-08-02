document.addEventListener('DOMContentLoaded', () => {
  const fraudForm = document.getElementById('fraudForm');
  const fraudType = document.getElementById('fraudType');
  const inputFields = document.getElementById('inputFields');
  const homePage = document.getElementById('homePage');
  const resultPage = document.getElementById('resultPage');
  const resultDiv = document.getElementById('result');
  const blogPage = document.getElementById('blogPage');
  const storyForm = document.getElementById('storyForm');
  const storiesDiv = document.getElementById('stories');

  fraudType.addEventListener('change', updateFields);
  fraudForm.addEventListener('submit', handleSubmit);
  storyForm.addEventListener('submit', handleStorySubmit);

  function updateFields() {
      const type = fraudType.value;
      console.log(type);
      inputFields.innerHTML = '';
      if (type === 'healthcare') {
          inputFields.innerHTML = `
              <label for="healthData">Healthcare Data:</label>
              <input type="text" id="healthData" name="healthData" required>
          `;
      } else if (type === 'vehicle') {
          inputFields.innerHTML = `
              <label for="vehicleData">Vehicle Insurance Data:</label>
              <input type="text" id="vehicleData" name="vehicleData" required>
          `;
      }
  }

  function handleSubmit(event) {
      event.preventDefault();
      const type = fraudType.value;
      const data = type === 'healthcare' ? document.getElementById('healthData').value : document.getElementById('vehicleData').value;

      fetch('/predict', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ type, data })
      })
      .then(response => response.json())
      .then(result => {
          resultDiv.innerHTML = `Prediction: ${result.result}`; // Corrected template literal
          homePage.style.display = 'none';
          resultPage.style.display = 'block';
      })
      .catch(error => console.error('Error:', error));
  }

  function handleStorySubmit(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const story = document.getElementById('story').value;
      const storyDiv = document.createElement('div');
      storyDiv.className = 'story';
      storyDiv.innerHTML = `<h3>${name}</h3><p>${story}</p>`; // Corrected template literal
      storiesDiv.appendChild(storyDiv);
      storyForm.reset();
  }

  window.goBack = function() {
      homePage.style.display = 'block';
      resultPage.style.display = 'none';
  }

  window.goHome = function() {
      homePage.style.display = 'block';
      blogPage.style.display = 'none';
  }

  window.showBlog = function() {
      homePage.style.display = 'none';
      blogPage.style.display = 'block';
  }
});
