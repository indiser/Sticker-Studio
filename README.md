# 🎨 Sticker Studio

A modern, privacy-focused web application that converts your images into WhatsApp-ready sticker packs. Built with React and powered by client-side processing—no server uploads required.

![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.19-06B6D4?logo=tailwindcss&logoColor=white)

## ✨ Features

- **🖼️ Batch Processing** - Convert multiple images at once with drag-and-drop support
- **📐 Auto-Sizing** - Automatically resizes and centers images to 512x512px (WhatsApp sticker format)
- **🎯 WebP Conversion** - Converts JPG, PNG, and WebP images to optimized WebP format
- **📦 Zip Export** - Downloads all converted stickers in a single organized ZIP file
- **🔒 Privacy First** - 100% client-side processing—your images never leave your device
- **🌓 Dark Mode** - Beautiful light/dark theme with system preference detection
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **✨ Modern UI** - Glassmorphism design with smooth animations and transitions

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd sticker-drop

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.5
- **Build Tool:** Vite 8.0.10
- **Styling:** TailwindCSS 3.4.19
- **Image Processing:** HTML5 Canvas API
- **File Handling:** react-dropzone 15.0.0
- **ZIP Generation:** JSZip 3.10.1
- **Icons:** Lucide React 1.11.0

## 📖 How It Works

1. **Upload** - Drag and drop images or click to select files (supports JPG, PNG, WebP)
2. **Process** - Images are automatically resized to 512x512px with aspect ratio preservation
3. **Convert** - All images are converted to WebP format with 80% quality
4. **Download** - Get a ZIP file containing all your WhatsApp-ready stickers

## 🎯 Use Cases

- Create custom WhatsApp sticker packs for personal use
- Prepare branded stickers for business messaging
- Convert artwork collections to sticker format
- Batch process images for WhatsApp sticker apps

## 🔮 Future Improvements

### Planned Features
- [ ] **Custom Sizing Options** - Allow users to choose different output dimensions
- [ ] **Quality Slider** - Adjustable WebP compression quality
- [ ] **Image Editing** - Basic cropping, rotation, and filters before conversion
- [ ] **Sticker Preview** - Live preview of converted stickers before download
- [ ] **Background Removal** - AI-powered background removal for transparent stickers
- [ ] **Batch Naming** - Custom naming patterns for output files
- [ ] **Format Options** - Support for additional output formats (PNG with transparency)
- [ ] **Metadata Editor** - Add sticker pack name, author, and tray icon
- [ ] **Direct WhatsApp Integration** - Generate `.wastickers` files for Android
- [ ] **History/Favorites** - Save and reuse previous conversion settings
- [ ] **Drag to Reorder** - Rearrange sticker order before conversion
- [ ] **Cloud Sync** - Optional cloud storage for sticker packs (with user consent)

### Technical Enhancements
- [ ] Progressive Web App (PWA) support for offline usage
- [ ] Web Workers for faster parallel image processing
- [ ] IndexedDB caching for large batch operations
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Unit and integration tests
- [ ] Performance monitoring and optimization
- [ ] Multi-language support (i18n)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern glassmorphism design trends
- Built with ❤️ for the WhatsApp sticker community

---

**Note:** This tool is not affiliated with WhatsApp or Meta. It's an independent utility for creating WhatsApp-compatible sticker images.
