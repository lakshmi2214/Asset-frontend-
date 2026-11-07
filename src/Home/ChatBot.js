import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const quickPrompts = [
  'Soundstage specs & rates',
  'Recommend a camera kit',
  'Where is the Malleshwaram hub?',
  'How do I book equipment?',
  'Browse equipment catalog',
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! I'm your Asli AI Production Assistant. Looking for soundstages, cinema cameras, lighting kits, or shoot advice in Bangalore?",
      actions: [
        { label: '🏢 Soundstages', action: 'stages' },
        { label: '🎥 Camera Rigs', action: 'cameras' },
        { label: '📍 Studio Hub', action: 'location' },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleActionClick = (action) => {
    if (action === 'stages') {
      handleSendMessage('Tell me about your soundstages and day rates');
    } else if (action === 'cameras') {
      handleSendMessage('What cinema camera bodies do you offer?');
    } else if (action === 'location') {
      handleSendMessage('Where is your Malleshwaram studio hub located?');
    } else if (action === 'catalog') {
      setIsOpen(false);
      navigate('/assets');
    } else if (action === 'book') {
      setIsOpen(false);
      navigate('/book-asset');
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : inputValue;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI intelligent answer generation
    setTimeout(() => {
      setIsTyping(false);
      const lower = query.toLowerCase();
      let botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: '',
        actions: [],
      };

      if (lower.includes('soundstage') || lower.includes('stage') || lower.includes('cyc') || lower.includes('cyclorama')) {
        botMsg.text = "🎬 We operate 3 fully acoustically treated soundstages in Malleshwaram:\n\n• Soundstage A (850 Sq.Ft): 3-wall seamless white infinity cyclorama, 16ft motorized grid, 63A 3-phase power, drive-in bay, and private green room. (₹12,000 / Half-Day • ₹20,000 / Full-Day)\n\n• Stage B (450 Sq.Ft): Matte blackout acoustic drapes, pre-hung pantographs, and motorized turntable for commercial inserts. (₹8,000 / Half-Day • ₹14,000 / Full-Day)\n\n• Studio C: STC-55 vocal suite, 4K multi-cam switcher, 4 Shure mics, and 1Gbps fiber. (₹4,500 / 2-Hr • ₹15,000 / Full-Day)";
        botMsg.actions = [
          { label: 'Book Soundstage A', action: 'book' },
          { label: 'Check Availability', action: 'catalog' },
        ];
      } else if (lower.includes('camera') || lower.includes('fx3') || lower.includes('fx6') || lower.includes('sony') || lower.includes('lens')) {
        botMsg.text = "🎥 Our cinema fleet includes Sony FX3, FX6, and A7S III bodies with 4K 120fps RAW recording. We carry Sony G Master prime optics (50mm f/1.4, 24-70mm f/2.8, 85mm f/1.4). Every body comes sensor-cleaned in a waterproof Pelican hard case with 160GB CFexpress media cards and extra NP-FZ100 batteries.";
        botMsg.actions = [
          { label: 'Explore Cameras', action: 'catalog' },
          { label: 'Reserve Gear', action: 'book' },
        ];
      } else if (lower.includes('location') || lower.includes('address') || lower.includes('where') || lower.includes('hub') || lower.includes('malleshwaram')) {
        botMsg.text = "📍 Our studio hub is at:\n280/1, Anniamma Arcade, Sampige Road, 18th Cross Rd, Malleshwaram, Bengaluru 560003.\n\n⏰ Hours: Monday–Saturday: 9:00 AM – 8:00 PM (Sundays by reservation).\nIncludes a dedicated camera prep bay to test your rigs before shoot day!";
        botMsg.actions = [
          { label: 'Browse Equipment', action: 'catalog' },
        ];
      } else if (lower.includes('podcast') || lower.includes('audio') || lower.includes('mic') || lower.includes('stream')) {
        botMsg.text = "🎙️ For podcasts and livestreams, Studio C features 4x Audio-Technica AT2040 and Shure hypercardioid mics, a Presonus multi-channel audio console, 4K multi-cam recording, a live teleprompter, and symmetrical 1Gbps broadcast fiber.";
        botMsg.actions = [
          { label: 'Book Studio C', action: 'book' },
        ];
      } else if (lower.includes('book') || lower.includes('rent') || lower.includes('how')) {
        botMsg.text = "⚡ Booking is 100% online with 3 easy steps:\n1. Choose your soundstage hours or cinema gear online with live availability.\n2. Pick up or test in our Malleshwaram prep bay.\n3. Shoot with peace of mind. Transparent day rates, full insurance coverage, and zero hidden deposit fees.";
        botMsg.actions = [
          { label: 'Start Booking', action: 'book' },
          { label: 'Browse Catalog', action: 'catalog' },
        ];
      } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
        botMsg.text = "Hello filmmaker! Looking to book our Infinity White Cyc soundstage, hire Sony FX3 cinema kits, or need a recommendation for your upcoming shoot?";
        botMsg.actions = [
          { label: 'Soundstage Rates', action: 'stages' },
          { label: 'Explore Equipment', action: 'catalog' },
        ];
      } else {
        botMsg.text = `I can help configure that shoot! Our Malleshwaram hub provides Soundstages A, B, and C along with calibrated Sony FX3/FX6 cameras, G Master glass, Godox 300W lighting, and audio kits. Would you like to check stage dates or browse the equipment catalog?`;
        botMsg.actions = [
          { label: 'View Equipment Catalog', action: 'catalog' },
          { label: 'Reserve Soundstage', action: 'book' },
        ];
      }

      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  return (
    <div className="asli-ai-widget-container">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          className="asli-ai-toggle-btn shadow-lg"
          onClick={() => setIsOpen(true)}
          title="Open Asli AI Studio Copilot"
        >
          <div className="asli-ai-toggle-pulse"></div>
          <span className="asli-ai-sparkle">✦</span>
          <span className="asli-ai-toggle-text">AI Copilot</span>
        </button>
      )}

      {/* Modern Glassmorphic Chat Window */}
      {isOpen && (
        <div className="asli-ai-chat-window shadow-2xl">
          {/* Header */}
          <div className="asli-ai-header">
            <div className="d-flex align-items-center gap-2">
              <div className="asli-ai-avatar">
                <span>✦</span>
              </div>
              <div>
                <div className="asli-ai-title">Asli AI Studio Copilot</div>
                <div className="asli-ai-status">
                  <span className="asli-ai-status-beacon"></span>
                  Online • Malleshwaram Hub
                </div>
              </div>
            </div>
            <button
              type="button"
              className="asli-ai-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="asli-ai-quick-bar no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                className="asli-ai-prompt-chip"
                onClick={() => handleSendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="asli-ai-messages-area">
            {messages.map((msg) => (
              <div key={msg.id} className={`asli-ai-message-row ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="asli-ai-msg-avatar">✦</div>
                )}
                <div className={`asli-ai-bubble ${msg.sender}`}>
                  <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>

                  {/* Interactive Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="asli-ai-actions-wrap mt-2">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="asli-ai-action-btn"
                          onClick={() => handleActionClick(act.action)}
                        >
                          {act.label} ➔
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="asli-ai-message-row bot">
                <div className="asli-ai-msg-avatar">✦</div>
                <div className="asli-ai-bubble bot asli-ai-typing-bubble">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="asli-ai-input-bar">
            <input
              type="text"
              placeholder="Ask about soundstages, camera packages, rates..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="asli-ai-input"
            />
            <button
              type="button"
              className="asli-ai-send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

