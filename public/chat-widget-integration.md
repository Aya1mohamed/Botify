# Chat Widget Integration Guide

## Quick Integration

Add this script to any website to embed the chat widget in the bottom-right corner:

### 1. Basic Integration

```html
<!-- Configure the widget before loading -->
<script>
  window.ChatWidgetConfig = {
    chatbotId: 'your-chatbot-id-here',
    baseUrl: 'https://yourdomain.com' // Your chat application domain
  };
</script>

<!-- Load the widget -->
<script src="https://yourdomain.com/chat-widget.js"></script>
```

**Note:** Replace `your-chatbot-id-here` with your actual chatbot ID and `https://yourdomain.com` with your Botify application domain.

### 2. Advanced Configuration

```html
<script>
  window.ChatWidgetConfig = {
    chatbotId: 'your-chatbot-id-here',
    baseUrl: 'https://yourdomain.com',
    position: 'bottom-right', // Options: bottom-right, bottom-left, top-right, top-left
    margin: '20px',
    zIndex: 9999
  };
</script>
<script src="https://yourdomain.com/chat-widget.js"></script>
```

### 3. Programmatic Control

```javascript
// Show the widget
ChatWidget.show();

// Hide the widget
ChatWidget.hide();

// Toggle visibility
ChatWidget.toggle();

// Reload the widget
ChatWidget.reload();

// Update configuration and reload
ChatWidget.updateConfig({
  chatbotId: 'new-chatbot-id'
});
```

## Features

- ✅ Responsive design (adapts to mobile screens)
- ✅ No dependencies required
- ✅ Cross-origin compatible
- ✅ Prevents multiple instances
- ✅ Error handling with fallback UI
- ✅ Configurable positioning and styling
- ✅ Programmatic control API

## Browser Support

- Chrome, Firefox, Safari, Edge (modern versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

1. **Widget not appearing**: Check console for errors and verify `chatbotId` and `baseUrl` are correct
2. **CORS issues**: Ensure your domain allows iframe embedding
3. **Mobile issues**: The widget automatically adapts to smaller screens

## Security

The iframe uses sandbox attributes for security:
- `allow-scripts`: Enables JavaScript
- `allow-same-origin`: Allows API calls to your domain  
- `allow-forms`: Enables form submission
- `allow-popups`: Allows opening links
- `allow-top-navigation-by-user-activation`: Allows navigation only with user interaction 