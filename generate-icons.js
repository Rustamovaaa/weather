const fs = require('fs');
const path = require('path');

// Ensure the icons directory exists
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create an HTML template for placeholder icons
const createSvgIcon = (size, text) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="#0EA5E9"/>
  <text x="50%" y="50%" font-family="Arial" font-size="${size/10}px" fill="white" text-anchor="middle" dominant-baseline="middle">
    ${text}
  </text>
</svg>
`;

// Generate different sized icons
const sizes = [192, 384, 512];
sizes.forEach(size => {
  const svgContent = createSvgIcon(size, `${size}x${size}`);
  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.svg`), svgContent);
  console.log(`Created ${size}x${size} icon`);
});

console.log('PWA icons generated successfully! Replace these placeholder SVGs with proper PNG icons.');
