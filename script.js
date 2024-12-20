// Handle profile image upload
function loadFile(event) {
    const image = document.getElementById('profileImage');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.display = 'block';
  }
  
  // Handle form submission and preview
  document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Collect form data
    const formData = new FormData(this);
  
    // Display the preview
    const previewSection = document.getElementById('previewSection');
    previewSection.innerHTML = `
      <h2>Preview</h2>
      <img src="${URL.createObjectURL(formData.get('profilePhoto'))}" alt="Profile Image">
      <p><strong>First Name:</strong> ${formData.get('firstName')}</p>
      <p><strong>Last Name:</strong> ${formData.get('lastName')}</p>
      <p><strong>Father's Name:</strong> ${formData.get('fatherName')}</p>
      <p><strong>Mother's Name:</strong> ${formData.get('motherName')}</p>
      <p><strong>Father's Occupation:</strong> ${formData.get('fatherOccupation')}</p>
      <p><strong>Mother's Occupation:</strong> ${formData.get('motherOccupation')}</p>
      <p><strong>Gender:</strong> ${formData.get('gender')}</p>
      <p><strong>Phone:</strong> ${formData.get('phone')}</p>
      <p><strong>Date of Birth:</strong> ${formData.get('dob')}</p>
      <p><strong>Qualification:</strong> ${formData.get('qualification')}</p>
      <p><strong>Email:</strong> ${formData.get('email')}</p>
      <p><strong>Institution Type:</strong> ${formData.get('institutionType')}</p>
      <p><strong>Institution Name:</strong> ${formData.get('institutionName')}</p>
      <p><strong>Institution Location:</strong> ${formData.get('institutionLocation')}</p>
      <p><strong>Address Number:</strong> ${formData.get('addressNumber')}</p>
      <p><strong>Address Street:</strong> ${formData.get('addressStreet')}</p>
      <p><strong>Address City:</strong> ${formData.get('addressCity')}</p>
      <p><strong>Address State:</strong> ${formData.get('addressState')}</p>
      <p><strong>Address Country:</strong> ${formData.get('addressCountry')}</p>
      <button id="editButton">Edit</button>
      <button id="confirmButton">Confirm</button>
      <div id="errorSection" style="color: red;"></div>
    `;
  
    // Edit button functionality
    document.getElementById('editButton').addEventListener('click', function() {
      previewSection.innerHTML = '';  // Clear preview
    });
  
    // Confirm button functionality
    document.getElementById('confirmButton').addEventListener('click', async function() {
      try {
        console.log('Form data:', formData);
        // Here, send the data to the backend (assuming '/students' is the endpoint)
        const response = await fetch('http://127.0.0.1:3001/students', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          alert('Student registered successfully!');
          previewSection.innerHTML = '';  // Clear preview
        } else {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          document.getElementById('errorSection').innerText = `Failed to register student: ${errorData.error || 'Unknown error'}`;
        }
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('errorSection').innerText = 'An error occurred while registering the student.';
      }
    });
  });