(function() {
  'use strict';

  // Default configuration
  const defaultConfig = {
    chatbotId: null,
    baseUrl: window.location.origin, // Should be set to your chatbot domain
    zIndex: 9999,
    position: 'bottom-right',
    margin: '20px'
  };

  // Widget configuration (can be overridden)
  window.ChatWidgetConfig = window.ChatWidgetConfig || {};
  const config = Object.assign({}, defaultConfig, window.ChatWidgetConfig);

  // Prevent multiple instances
  if (window.chatWidgetLoaded) {
    return;
  }
  window.chatWidgetLoaded = true;

  function createChatWidget() {
    // Create container
    const container = document.createElement('div');
    container.id = 'chat-widget-container';
    container.style.cssText = `
      position: fixed !important;
      ${config.position.includes('bottom') ? 'bottom' : 'top'}: ${config.margin} !important;
      ${config.position.includes('right') ? 'right' : 'left'}: ${config.margin} !important;
      z-index: ${config.zIndex} !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    `;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'chat-widget-iframe';
    
    // Build iframe URL with parameters
    const iframeUrl = new URL('/Chat', config.baseUrl);
    if (config.chatbotId) {
      iframeUrl.searchParams.set('chatbot_id', config.chatbotId);
    }
    
    iframe.src = iframeUrl.toString();
    iframe.style.cssText = `
      width: 320px !important;
      height: 400px !important;
      border: none !important;
      border-radius: 12px !important;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
      background: transparent !important;
      transition: all 0.3s ease !important;
      transform-origin: bottom right !important;
    `;

    // Initially hide the iframe (widget starts collapsed)
    iframe.style.display = 'none';

    iframe.setAttribute('allow', 'microphone; camera');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation');

    container.appendChild(iframe);
    document.body.appendChild(container);

    // Handle iframe load and communication
    iframe.onload = function() {
      console.log('Chat widget loaded successfully');
      
      // Add resize handling for different screen sizes
      handleResponsiveResize();
      window.addEventListener('resize', handleResponsiveResize);
    };

    iframe.onerror = function() {
      console.error('Failed to load chat widget');
      showErrorState();
    };

    return { container, iframe };
  }

  function handleResponsiveResize() {
    const iframe = document.getElementById('chat-widget-iframe');
    if (!iframe) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth <= 768) { // Mobile breakpoint
      iframe.style.width = `${Math.min(320, screenWidth - 40)}px !important`;
      iframe.style.height = `${Math.min(400, screenHeight - 80)}px !important`;
      
      // Adjust position for mobile
      const container = iframe.parentElement;
      container.style.right = '10px !important';
      container.style.bottom = '10px !important';
    } else {
      iframe.style.width = '320px !important';
      iframe.style.height = '400px !important';
      
      // Reset to default position
      const container = iframe.parentElement;
      container.style.right = config.margin + ' !important';
      container.style.bottom = config.margin + ' !important';
    }
  }

  function showErrorState() {
    const container = document.getElementById('chat-widget-container');
    if (container) {
      container.innerHTML = `
        <div style="
          background: #fee2e2;
          color: #dc2626;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #fecaca;
          font-size: 14px;
          max-width: 250px;
          text-align: center;
        ">
          <strong>Chat widget unavailable</strong><br>
          <small>Please try again later</small>
        </div>
      `;
    }
  }

  // Wait for DOM to be ready
  function initWidget() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createChatWidget);
    } else {
      createChatWidget();
    }
  }

  // Validate configuration
  if (!config.chatbotId) {
    console.warn('Chat Widget: chatbotId not specified. Please set window.ChatWidgetConfig.chatbotId');
  }

  // Initialize the widget
  initWidget();

  // Expose global functions for external control
  window.ChatWidget = {
    show: function() {
      const iframe = document.getElementById('chat-widget-iframe');
      if (iframe) {
        iframe.style.display = 'block';
      }
    },
    hide: function() {
      const iframe = document.getElementById('chat-widget-iframe');
      if (iframe) {
        iframe.style.display = 'none';
      }
    },
    toggle: function() {
      const iframe = document.getElementById('chat-widget-iframe');
      if (iframe) {
        iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
      }
    },
    reload: function() {
      const iframe = document.getElementById('chat-widget-iframe');
      if (iframe) {
        iframe.src = iframe.src;
      }
    },
    updateConfig: function(newConfig) {
      Object.assign(config, newConfig);
      this.reload();
    }
  };

})(); 