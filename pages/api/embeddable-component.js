// pages/api/embeddable-component.js
export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://tonomyai.netlify.app');

    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'ALLOW-FROM *'); // Allow embedding in iframes from any domain (*)

    // Your component rendering logic here
    res.status(200).json({ message: 'Embeddable component' });
}
