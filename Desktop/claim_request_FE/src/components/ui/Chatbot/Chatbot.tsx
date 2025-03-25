import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaTimes, FaRobot, FaUser } from 'react-icons/fa';
import styles from './Chatbot.module.css';
import httpClient from '@/constant/apiInstance';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  name: string;
}

interface ChatbotProps {
  botName?: string;
  userName?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  welcomeMessage?: string;
}

const Chatbot = ({
  botName = 'Claim System Assistant',
  userName = 'You',
  position = 'bottom-right',
  welcomeMessage = 'Welcome to our Claims Assistant! How can I help you today?'
}: ChatbotProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const welcomeMessageShownRef = useRef(false);

  const userId = localStorage.getItem('user_id') || '';
  const roleId = localStorage.getItem('role_id') || '';
  const chatStorageKey = `chatMessages_${userId}`;

  useEffect(() => {
    const savedMessages = sessionStorage.getItem(chatStorageKey);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);

        const messagesWithDateObjects = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));

        setMessages(messagesWithDateObjects);
        welcomeMessageShownRef.current = true;
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
  }, [chatStorageKey]);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(chatStorageKey, JSON.stringify(messages));
    }
  }, [messages, chatStorageKey]);

  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isChatOpen && messages.length === 0 && !welcomeMessageShownRef.current) {
      const welcomeMessageId = Date.now().toString();
      const welcomeMsg: Message = {
        id: welcomeMessageId,
        text: welcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
        name: botName
      };

      setMessages([welcomeMsg]);
      welcomeMessageShownRef.current = true;
    }
  }, [isChatOpen, botName, welcomeMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const clearChatHistory = () => {
    sessionStorage.removeItem(chatStorageKey);
    setMessages([]);
    welcomeMessageShownRef.current = false;
  };

  const animateText = async (text: string, messageId: string) => {
    setIsAnimating(true);
    let currentText = '';

    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, text: currentText }
            : msg
        )
      );
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    setIsAnimating(false);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      name: userName
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Use httpClient instead of fetch
      const response = await httpClient.post('https://claimsystem.info.vn/chatbot/api/chat/stream', {
        message: inputValue,
        user_id: userId,
        role_id: roleId
      });

      if (!response.status || response.status !== 200) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = response.data;
      const botMessageId = (Date.now() + 1).toString();

      console.log("data", data.content);

      const cleanedContent = data.content ? data.content.replace(/\*/g, '') : 'Sorry, I encountered an error. Please try again.';

      const botResponse: Message = {
        id: botMessageId,
        text: cleanedContent,
        sender: 'bot',
        timestamp: new Date(),
        name: data.sender || botName
      };

      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        name: botName
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.chatbotContainer}>
      <motion.button
        className={styles.chatButton}
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        aria-label={isChatOpen ? "Close chat" : "Open chat"}
        style={{
          [position.includes('top') ? 'top' : 'bottom']: '30px',
          [position.includes('left') ? 'left' : 'right']: '30px'
        }}
      >
        <motion.div
          className={styles.iconContainer}
          initial={false}
          animate={{ rotate: isChatOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isChatOpen ? <FaTimes /> : <FaRobot />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className={styles.chatWindowContainer}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              [position.includes('top') ? 'top' : 'bottom']: '100px',
              [position.includes('left') ? 'left' : 'right']: '30px'
            }}
          >
            <div className={styles.chatHeader}>
              <h2>
                <span className={styles.headerIcon}><FaRobot /></span>
                {botName}
              </h2>
              <button
                className={styles.closeButton}
                onClick={toggleChat}
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.messagesContainer}>
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`${styles.messageBubbleWrapper} ${message.sender === 'user' ? styles.userMessage : styles.botMessage}`}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    layout
                  >
                    <div className={`${styles.messageBubble} ${message.sender === 'user' ? styles.userMessageBubble : styles.botMessageBubble}`}>
                      <div className={`${styles.messageRow}`}>
                        {message.sender === 'bot' && (
                          <div className={styles.avatarContainer}>
                            <div className={`${styles.avatar} ${styles.botAvatar}`}>
                              <FaRobot />
                            </div>
                          </div>
                        )}
                        <div className={styles.messageContent}>
                          {message.sender === 'bot' && (
                            <div className={styles.messageName}>
                              {message.name}
                            </div>
                          )}
                          <div className={styles.messageBody}>
                            <p className={styles.messageText}>{message.text}</p>
                            <span className={styles.timestamp}>{formatTime(message.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  className={styles.typingIndicator}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputContainer}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className={styles.messageInput}
              />

              <button
                className={styles.sendButton}
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;