## Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices.
- **Modern UI**: Clean, contemporary design with smooth animations and transitions.
- **Interactive Elements**:
  - Mobile-friendly navigation menu.
  - Category filters for fitness programs.
  - Image upload with drag-and-drop functionality.
  - Daily fitness facts via AJAX.
  - Newsletter subscription form.
  - Animated content on scroll.
- **Image Upload System**:
  - Drag and drop interface.
  - File type validation (images only).
  - File size validation (max 5MB).
  - Upload progress visualization.
  - Preview before upload.
  - Gallery of uploaded images.
  - Backend storage with Node.js.

## Installation

1. Clone the repository or download the source code:
   ```plaintext
   git clone https://github.com/emmanueldanielmaziku/Click-Fit.git
   cd Click-Fit
   ```

2. Install the required Node.js dependencies:
   ```plaintext
   npm install express multer
   ```

3. Make sure you have Node.js installed (v12.0.0 or higher recommended).

## Usage

1. Start the Node.js server:
   ```plaintext
   node server.js
   ```

2. Open your browser and navigate to:
   ```plaintext
   http://localhost:3000
   ```

3. To use the image upload feature:
   1. Drag and drop images onto the upload area, or click to select files.
   2. Preview your images before uploading.
   3. Click "Upload All" to process the upload.
   4. View your uploaded images in the gallery section.

## Project Structure

```plaintext
click-fit/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript
├── server.js           # Node.js backend server
└── upload_images/      # Directory for uploaded images (created automatically)
```

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (with flexbox and grid layouts)
  - JavaScript (ES6+)
  - jQuery
  - Font Awesome icons

- **Backend**:
  - Node.js
  - Express.js
  - Multer (for file uploads)

- **APIs**:
  - NumbersAPI (for daily facts)

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)


## Credits

- Font Awesome for icons.
- jQuery for DOM manipulation.
- Slick Carousel for image sliders.
- NumbersAPI for daily facts.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
