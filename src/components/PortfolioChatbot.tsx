/**
 * PORTFOLIO CHATBOT - Interactive AI Assistant with Live DOM Manipulation
 * ========================================================================
 *
 * ANALOGY: Think of this as a Universal Remote Control for Your Portfolio
 * ------------------------------------------------------------------------
 * Just like a universal remote can control your TV, speakers, and lights,
 * this chatbot can:
 * 1. Answer questions about Henry (the "information channel")
 * 2. Change the page's appearance live (the "smart home controls")
 * 3. Suggest next actions (the "favorites menu")
 *
 * What Makes This Special:
 * -----------------------
 * 🤖 Conversational AI: Powered by GPT-3.5/4 with personality
 * 🎨 Live DOM Manipulation: Changes colors, fonts, spacing in real-time
 * 💬 Session Memory: Remembers the conversation using sessionId
 * 🎯 Contextual Suggestions: Smart follow-up actions based on context
 * ⚡ Instant Actions: Executes commands without page reload
 *
 * Architecture:
 * ------------
 * Frontend (This File) ←→ Backend API ←→ OpenAI GPT ←→ Knowledge Base
 *       ↓                                                      ↑
 *    Live DOM                                          RAG Search
 * Manipulation                                    (henry_portfolio.md)
 *
 * Two Types of Interactions:
 * --------------------------
 * 1. **Question Answering** (Backend-powered):
 *    User: "What are Henry's skills?"
 *    → Sends to backend API
 *    → Backend searches knowledge base (RAG)
 *    → GPT generates conversational answer
 *    → Returns formatted response
 *
 * 2. **Live Actions** (Frontend-powered):
 *    User: "change background to blue"
 *    → Parsed locally by parseActions()
 *    → Executed immediately via executeAction()
 *    → DOM manipulated with JavaScript
 *    → No backend call needed (instant!)
 *
 * Key Features Explained:
 * ----------------------
 * 📱 **Floating Button**: Minimalist chat bubble in bottom-right
 * 💬 **Message History**: Stores all messages with timestamps
 * 🎭 **Typing Indicator**: Shows "Henry's AI is thinking..." while loading
 * 🎨 **Quick Actions**: Context-aware suggestion buttons
 * 🔄 **Auto-scroll**: Automatically scrolls to latest message
 * 💾 **Session Persistence**: Maintains conversation context
 *
 * Live DOM Manipulation Commands:
 * ------------------------------
 * • "change background to [color]" - Changes page background
 * • "make text bigger" - Increases font size by 20%
 * • "increase spacing" - Adds more padding/margin
 * • "reset everything" - Restores original styles
 *
 * Technical Stack:
 * ---------------
 * - Next.js 15 (React framework)
 * - Chakra UI v3 (component library)
 * - TypeScript (type safety)
 * - React Hooks (state management)
 * - DOM API (live style manipulation)
 *
 * @component PortfolioChatbot
 * @example
 * // Add to any page:
 * <PortfolioChatbot />
 *
 * // It will render a floating chat button that:
 * // 1. Opens a chat window when clicked
 * // 2. Connects to the AI backend
 * // 3. Executes live commands
 * // 4. Provides contextual suggestions
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '@/lib/chatbot-api';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { Input } from '@/design-system/atoms/Input/Input';
import { IoChatbubbleEllipses, IoClose, IoSend } from 'react-icons/io5';

/**
 * Message Interface
 * -----------------
 * Represents a single message in the chat conversation.
 *
 * @property role - Who sent the message ('user' or 'assistant')
 * @property content - The actual message text
 * @property timestamp - When the message was sent
 */
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Action Interface
 * ----------------
 * Represents a live DOM manipulation command.
 *
 * ANALOGY: Think of this as a remote control button press
 * - type: Which button was pressed (background, font size, etc.)
 * - params: The settings for that button (which color, how much to increase, etc.)
 *
 * @property type - The action type (e.g., 'change_background', 'increase_font_size')
 * @property params - Parameters for the action (e.g., { color: '#3b82f6' })
 *
 * @example
 * // Background change action:
 * { type: 'change_background', params: { color: 'blue' } }
 *
 * // Font size increase action:
 * { type: 'increase_font_size', params: {} }
 */
interface Action {
  type: string;
  params: Record<string, any>;
}

export default function PortfolioChatbot() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  // ANALOGY: Think of state as the chatbot's "memory"
  // Each piece of state remembers something important about the current session

  /** Whether the chat window is open or closed */
  const [isOpen, setIsOpen] = useState(false);

  /** All messages in the conversation (the "transcript") */
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Henry's AI assistant.\n\nI can:\n• Answer questions about Henry's skills, projects, and experience\n• Show you live interactive demos of this portfolio\n• Change colors, fonts, and layout in real-time\n\nClick any suggestion below or ask me anything!",
      timestamp: new Date(),
    },
  ]);

  /** Current input text (what user is typing) */
  const [input, setInput] = useState('');

  /** Whether AI is thinking/generating a response */
  const [isLoading, setIsLoading] = useState(false);

  /** Session ID for conversation continuity (persists across messages) */
  const [sessionId, setSessionId] = useState<string>();

  /** Current font size percentage (100 = normal, 120 = 20% larger) */
  const [currentFontSize, setCurrentFontSize] = useState(100);

  /** Current spacing percentage (100 = normal, 125 = 25% more spacing) */
  const [currentSpacing, setCurrentSpacing] = useState(100);

  /** Reference to scroll to bottom of messages */
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ============================================================================
  // AUTO-SCROLL FUNCTIONALITY
  // ============================================================================

  /**
   * Scrolls to the bottom of the message list.
   * ANALOGY: Like how your chat app automatically scrolls when a new message arrives.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Auto-scroll whenever messages change.
   * This ensures you always see the latest message without manual scrolling.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ============================================================================
  // LIVE DOM MANIPULATION (The "Magic" Part)
  // ============================================================================

  /**
   * Executes live DOM manipulations on the page.
   *
   * ANALOGY: Think of this as a TV remote control
   * ------------------------------------
   * - TV Remote Button Press → executeAction() function call
   * - Volume Up → increase_font_size
   * - Channel Change → change_background
   * - Settings → change_spacing
   *
   * How It Works:
   * ------------
   * This function directly manipulates the DOM (Document Object Model)
   * - Creates/removes <style> tags for global changes
   * - Modifies element styles directly for specific changes
   * - Uses !important to override existing styles
   *
   * Why This Is Powerful:
   * --------------------
   * - Changes happen INSTANTLY (no page reload needed)
   * - Demonstrates interactive capabilities to portfolio visitors
   * - Works entirely in the browser (no backend required)
   *
   * Security Note:
   * -------------
   * Only executes predefined actions (no arbitrary code execution)
   * Color values are mapped to safe hex codes
   *
   * @param action - The action to execute with its parameters
   */
  const executeAction = (action: Action) => {
    try {
      switch (action.type) {
        case 'change_background':
          console.log('Executing background change to:', action.params.color);

          // Remove any existing override styles
          const existingStyle = document.getElementById('chatbot-override-styles');
          if (existingStyle) {
            existingStyle.remove();
          }

          // Inject a style tag with !important rules to override everything
          const styleTag = document.createElement('style');
          styleTag.id = 'chatbot-override-styles';
          styleTag.innerHTML = `
            body, html, main, [class*="chakra"] {
              background-color: ${action.params.color} !important;
            }
          `;
          document.head.appendChild(styleTag);

          console.log('Background change applied');
          break;

        case 'change_text_color':
          const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
          textElements.forEach((el) => {
            (el as HTMLElement).style.setProperty('color', action.params.color, 'important');
          });
          break;

        case 'change_accent':
          // Change accent color elements
          const accentElements = document.querySelectorAll('[data-accent], .accent, button');
          accentElements.forEach((el) => {
            (el as HTMLElement).style.setProperty('background-color', action.params.color, 'important');
          });
          break;

        case 'increase_font_size':
          const newSizeLarger = Math.min(currentFontSize + 20, 200);
          setCurrentFontSize(newSizeLarger);
          document.documentElement.style.fontSize = `${newSizeLarger}%`;
          console.log('Font size increased to:', newSizeLarger);
          break;

        case 'decrease_font_size':
          const newSizeSmaller = Math.max(currentFontSize - 20, 60);
          setCurrentFontSize(newSizeSmaller);
          document.documentElement.style.fontSize = `${newSizeSmaller}%`;
          console.log('Font size decreased to:', newSizeSmaller);
          break;

        case 'reset_font_size':
          setCurrentFontSize(100);
          document.documentElement.style.fontSize = '100%';
          console.log('Font size reset');
          break;

        case 'increase_spacing':
          const newSpacingLarger = Math.min(currentSpacing + 25, 200);
          setCurrentSpacing(newSpacingLarger);
          const increaseStyleTag = document.createElement('style');
          increaseStyleTag.id = 'chatbot-spacing-override';
          increaseStyleTag.innerHTML = `
            * {
              padding: calc(var(--chakra-space-4, 1rem) * ${newSpacingLarger / 100}) !important;
              margin: calc(var(--chakra-space-4, 1rem) * ${newSpacingLarger / 100}) !important;
            }
          `;
          const existingSpacing = document.getElementById('chatbot-spacing-override');
          if (existingSpacing) existingSpacing.remove();
          document.head.appendChild(increaseStyleTag);
          console.log('Spacing increased to:', newSpacingLarger);
          break;

        case 'decrease_spacing':
          const newSpacingSmaller = Math.max(currentSpacing - 25, 50);
          setCurrentSpacing(newSpacingSmaller);
          const decreaseStyleTag = document.createElement('style');
          decreaseStyleTag.id = 'chatbot-spacing-override';
          decreaseStyleTag.innerHTML = `
            * {
              padding: calc(var(--chakra-space-4, 1rem) * ${newSpacingSmaller / 100}) !important;
              margin: calc(var(--chakra-space-4, 1rem) * ${newSpacingSmaller / 100}) !important;
            }
          `;
          const existingSpacing2 = document.getElementById('chatbot-spacing-override');
          if (existingSpacing2) existingSpacing2.remove();
          document.head.appendChild(decreaseStyleTag);
          console.log('Spacing decreased to:', newSpacingSmaller);
          break;

        case 'reset_spacing':
          setCurrentSpacing(100);
          const spacingToRemove = document.getElementById('chatbot-spacing-override');
          if (spacingToRemove) spacingToRemove.remove();
          console.log('Spacing reset');
          break;

        case 'reset_styles':
          // Remove all injected styles
          const styleToRemove = document.getElementById('chatbot-override-styles');
          if (styleToRemove) styleToRemove.remove();
          const spacingToRemove2 = document.getElementById('chatbot-spacing-override');
          if (spacingToRemove2) spacingToRemove2.remove();
          // Reset state
          setCurrentFontSize(100);
          setCurrentSpacing(100);
          // Reset to original styles
          window.location.reload();
          break;

        default:
          console.warn('Unknown action type:', action.type);
      }
    } catch (error) {
      console.error('Error executing action:', error);
    }
  };

  // Parse message for action commands
  const parseActions = (message: string): Action[] => {
    const actions: Action[] = [];
    const lowerMessage = message.toLowerCase();

    // Brand color mapping
    const colorMap: Record<string, string> = {
      // Brand colors
      'teal': '#107c7c',
      'accent': '#107c7c',
      'primary': '#212529',
      'secondary': '#495057',
      'light': '#F8F9FA',
      'white': '#FFFFFF',
      'dark': '#212529',
      'gray': '#6C757D',
      'grey': '#6C757D',
      'success': '#228B67',
      'warning': '#E0A800',
      'error': '#B23A48',
      // Common colors
      'red': '#ef4444',
      'blue': '#3b82f6',
      'green': '#22c55e',
      'yellow': '#eab308',
      'purple': '#a855f7',
      'pink': '#ec4899',
      'orange': '#f97316',
      'black': '#000000',
    };

    // Background color change
    if (lowerMessage.includes('background') && lowerMessage.includes('to')) {
      for (const [name, hex] of Object.entries(colorMap)) {
        if (lowerMessage.includes(name)) {
          actions.push({
            type: 'change_background',
            params: { color: hex },
          });
          break;
        }
      }
    }

    // Text color change
    if (lowerMessage.includes('text') && lowerMessage.includes('color')) {
      for (const [name, hex] of Object.entries(colorMap)) {
        if (lowerMessage.includes(name)) {
          actions.push({
            type: 'change_text_color',
            params: { color: hex },
          });
          break;
        }
      }
    }

    // Accent color change
    if (lowerMessage.includes('accent') && lowerMessage.includes('to')) {
      for (const [name, hex] of Object.entries(colorMap)) {
        if (lowerMessage.includes(name)) {
          actions.push({
            type: 'change_accent',
            params: { color: hex },
          });
          break;
        }
      }
    }

    // Font size changes
    if ((lowerMessage.includes('bigger') || lowerMessage.includes('increase') || lowerMessage.includes('larger')) &&
        (lowerMessage.includes('text') || lowerMessage.includes('font'))) {
      actions.push({
        type: 'increase_font_size',
        params: {},
      });
    }

    if ((lowerMessage.includes('smaller') || lowerMessage.includes('decrease') || lowerMessage.includes('reduce')) &&
        (lowerMessage.includes('text') || lowerMessage.includes('font'))) {
      actions.push({
        type: 'decrease_font_size',
        params: {},
      });
    }

    if (lowerMessage.includes('reset') && (lowerMessage.includes('font') || lowerMessage.includes('text size'))) {
      actions.push({
        type: 'reset_font_size',
        params: {},
      });
    }

    // Spacing changes
    if ((lowerMessage.includes('increase') || lowerMessage.includes('more') || lowerMessage.includes('add')) &&
        lowerMessage.includes('spacing')) {
      actions.push({
        type: 'increase_spacing',
        params: {},
      });
    }

    if ((lowerMessage.includes('decrease') || lowerMessage.includes('less') || lowerMessage.includes('reduce')) &&
        lowerMessage.includes('spacing')) {
      actions.push({
        type: 'decrease_spacing',
        params: {},
      });
    }

    if (lowerMessage.includes('reset') && lowerMessage.includes('spacing')) {
      actions.push({
        type: 'reset_spacing',
        params: {},
      });
    }

    // Reset all styles
    if ((lowerMessage.includes('reset') && (lowerMessage.includes('styles') || lowerMessage.includes('everything') || lowerMessage.includes('all'))) ||
        lowerMessage.includes('original') ||
        lowerMessage.includes('default')) {
      actions.push({
        type: 'reset_styles',
        params: {},
      });
    }

    return actions;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Parse and execute actions immediately
      const actions = parseActions(input);
      const hasActions = actions.length > 0;

      console.log('Parsed actions:', actions);

      if (hasActions) {
        actions.forEach(executeAction);
        // Add contextual confirmation message for actions
        const actionType = actions[0].type;
        let confirmationText = '';

        switch (actionType) {
          case 'change_background':
            confirmationText = '🎨 Background updated! Try another color or ask me about Henry\'s work.';
            break;
          case 'increase_font_size':
            confirmationText = '📝 Text size increased! You can make it bigger again or try other demos.';
            break;
          case 'decrease_font_size':
            confirmationText = '📉 Text size decreased! Try adjusting other elements or ask questions.';
            break;
          case 'increase_spacing':
            confirmationText = '↔️ Added more spacing! See the difference? Try other visual changes.';
            break;
          case 'decrease_spacing':
            confirmationText = '↔️ Reduced spacing! Like the tighter layout? Try more adjustments.';
            break;
          case 'reset_styles':
            confirmationText = '🔄 All styles reset! Ready to try new demos or learn about Henry?';
            break;
          default:
            confirmationText = `✓ Done! I've changed the ${actions.map(a => a.type.replace(/change_/g, '').replace(/_/g, ' ')).join(', ')}.`;
        }

        const actionMessage: Message = {
          role: 'assistant',
          content: confirmationText,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, actionMessage]);
      }

      // Only send to chatbot API if it's not purely an action command
      const isOnlyAction = hasActions && !input.toLowerCase().includes('?') &&
                          !input.toLowerCase().includes('who') &&
                          !input.toLowerCase().includes('what') &&
                          !input.toLowerCase().includes('tell me');

      if (!isOnlyAction) {
        // Send to chatbot API
        const response = await sendChatMessage(input, sessionId);

        // Store session ID for conversation continuity
        if (!sessionId) {
          setSessionId(response.session_id);
        }

        const assistantMessage: Message = {
          role: 'assistant',
          content: response.response,
          timestamp: new Date(response.timestamp),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting to my backend. The action was executed, but I couldn't fetch additional information.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = async (message: string) => {
    if (isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Parse and execute actions immediately
      const actions = parseActions(message);
      const hasActions = actions.length > 0;

      console.log('Quick action - Parsed actions:', actions);

      if (hasActions) {
        actions.forEach(executeAction);
        // Add contextual confirmation message for actions
        const actionType = actions[0].type;
        let confirmationText = '';

        switch (actionType) {
          case 'change_background':
            confirmationText = '🎨 Background updated! Try another color or ask me about Henry\'s work.';
            break;
          case 'increase_font_size':
            confirmationText = '📝 Text size increased! You can make it bigger again or try other demos.';
            break;
          case 'decrease_font_size':
            confirmationText = '📉 Text size decreased! Try adjusting other elements or ask questions.';
            break;
          case 'increase_spacing':
            confirmationText = '↔️ Added more spacing! See the difference? Try other visual changes.';
            break;
          case 'decrease_spacing':
            confirmationText = '↔️ Reduced spacing! Like the tighter layout? Try more adjustments.';
            break;
          case 'reset_styles':
            confirmationText = '🔄 All styles reset! Ready to try new demos or learn about Henry?';
            break;
          default:
            confirmationText = `✓ Done! I've changed the ${actions.map(a => a.type.replace(/change_/g, '').replace(/_/g, ' ')).join(', ')}.`;
        }

        const actionMessage: Message = {
          role: 'assistant',
          content: confirmationText,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, actionMessage]);
      }

      // Only send to chatbot API if it's not purely an action command
      const isOnlyAction = hasActions && !message.toLowerCase().includes('?') &&
                          !message.toLowerCase().includes('who') &&
                          !message.toLowerCase().includes('what') &&
                          !message.toLowerCase().includes('tell me');

      if (!isOnlyAction) {
        // Send to chatbot API
        const response = await sendChatMessage(message, sessionId);

        // Store session ID for conversation continuity
        if (!sessionId) {
          setSessionId(response.session_id);
        }

        const assistantMessage: Message = {
          role: 'assistant',
          content: response.response,
          timestamp: new Date(response.timestamp),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting to my backend. The action was executed, but I couldn't fetch additional information.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate contextual suggestions based on the last message
  const getContextualSuggestions = (lastMessage: Message, userMessage: Message) => {
    const userText = userMessage.content.toLowerCase();
    const assistantText = lastMessage.content.toLowerCase();

    // After welcome message - show initial demos
    if (messages.length === 1) {
      return [
        { label: '🎨 Blue Background', message: 'change background to blue' },
        { label: '🟢 Green Theme', message: 'change background to green' },
        { label: '📝 Make Text Bigger', message: 'make text bigger' },
        { label: '❓ Tell me about Henry', message: 'what are Henry\'s skills?' },
      ];
    }

    // After a color change action - suggest more visual changes
    if (userText.includes('background') || userText.includes('color')) {
      return [
        { label: '🔴 Try Red', message: 'change background to red' },
        { label: '🟣 Try Purple', message: 'change background to purple' },
        { label: '📝 Bigger Text', message: 'make text bigger' },
        { label: '🔄 Reset', message: 'reset everything' },
      ];
    }

    // After font size change - suggest more typography options
    if (userText.includes('bigger') || userText.includes('smaller') || userText.includes('font')) {
      return [
        { label: '📏 More Spacing', message: 'increase spacing' },
        { label: '🎨 Change Color', message: 'change background to teal' },
        { label: '📉 Smaller Text', message: 'make text smaller' },
        { label: '🔄 Reset', message: 'reset everything' },
      ];
    }

    // After questions about skills/experience
    if (assistantText.includes('design') || assistantText.includes('skill') || assistantText.includes('experience')) {
      return [
        { label: '💼 Notable Projects', message: 'what are Henry\'s notable projects?' },
        { label: '🎨 Design Philosophy', message: 'tell me about his design philosophy' },
        { label: '🚀 Try a Demo', message: 'change background to blue' },
        { label: '🔧 Technical Skills', message: 'what are his technical skills?' },
      ];
    }

    // After questions about projects
    if (assistantText.includes('project') || assistantText.includes('portfolio') || assistantText.includes('chatbot')) {
      return [
        { label: '🎨 See It In Action', message: 'change background to purple' },
        { label: '💡 Design Process', message: 'what is his design process?' },
        { label: '🔧 Tech Stack', message: 'what technologies does he use?' },
        { label: '📝 More About Henry', message: 'tell me more about Henry' },
      ];
    }

    // After design philosophy questions
    if (assistantText.includes('philosophy') || assistantText.includes('believe') || assistantText.includes('approach')) {
      return [
        { label: '🎯 See Examples', message: 'show me his projects' },
        { label: '♿ Accessibility', message: 'how does he handle accessibility?' },
        { label: '🎨 Live Demo', message: 'change background to teal' },
        { label: '💼 Work Experience', message: 'what is his experience?' },
      ];
    }

    // After technical/tools questions
    if (assistantText.includes('react') || assistantText.includes('typescript') || assistantText.includes('next') || assistantText.includes('technical')) {
      return [
        { label: '🎨 Design Skills', message: 'what are his design skills?' },
        { label: '🚀 See Demo', message: 'change background to orange' },
        { label: '📚 More Tech', message: 'what other technologies does he know?' },
        { label: '💼 Projects', message: 'show me his projects' },
      ];
    }

    // After reset action
    if (userText.includes('reset')) {
      return [
        { label: '🎨 Try Blue', message: 'change background to blue' },
        { label: '🟢 Try Green', message: 'change background to green' },
        { label: '❓ Ask Questions', message: 'what are Henry\'s skills?' },
        { label: '📝 Typography', message: 'make text bigger' },
      ];
    }

    // After spacing changes
    if (userText.includes('spacing')) {
      return [
        { label: '🎨 Color Theme', message: 'change background to purple' },
        { label: '📝 Font Size', message: 'make text bigger' },
        { label: '❓ About Henry', message: 'tell me about Henry' },
        { label: '🔄 Reset', message: 'reset everything' },
      ];
    }

    // Default suggestions - mix of questions and actions
    return [
      { label: '🎨 Try Demo', message: 'change background to blue' },
      { label: '💼 His Projects', message: 'what projects has he worked on?' },
      { label: '🔧 Skills', message: 'what are his skills?' },
      { label: '🎯 Philosophy', message: 'what is his design philosophy?' },
    ];
  };

  return (
    <>
      {/* Floating Chat Button */}
      <IconButton
        aria-label="Toggle chat"
        onClick={() => setIsOpen(!isOpen)}
        position="fixed"
        bottom="24px"
        right="24px"
        zIndex={50}
        bg="brand.accent"
        color="brand.white"
        borderRadius="full"
        size="lg"
        boxShadow="lg"
        _hover={{
          bg: 'brand.accentDark',
          boxShadow: 'xl',
          transform: 'scale(1.1)',
        }}
        transition="all 0.3s"
      >
        {isOpen ? <IoClose size={24} /> : <IoChatbubbleEllipses size={24} />}
      </IconButton>

      {/* Chat Window */}
      {isOpen && (
        <Box
          position="fixed"
          bottom="100px"
          right="24px"
          zIndex={50}
          width="384px"
          height="600px"
          bg="brand.white"
          borderRadius="lg"
          boxShadow="2xl"
          border="1px"
          borderColor="brand.border"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          {/* Header */}
          <Box
            bg="brand.accent"
            color="brand.white"
            p={4}
          >
            <HStack gap={3}>
              <Flex
                w="40px"
                h="40px"
                bg="whiteAlpha.200"
                borderRadius="full"
                align="center"
                justify="center"
              >
                <Text fontSize="xl">🤖</Text>
              </Flex>
              <VStack align="start" gap={0}>
                <Text fontWeight="semibold">Henry's AI Assistant</Text>
                <Text fontSize="xs" opacity={0.9}>Ask about me or try commands!</Text>
              </VStack>
            </HStack>
          </Box>

          {/* Messages */}
          <Box
            flex={1}
            overflowY="auto"
            p={4}
            bg="brand.bg"
          >
            <VStack gap={4} align="stretch">
              {messages.map((msg, idx) => {
                // Check if this is an assistant message and should show suggestions
                const isLastAssistantMessage = idx === messages.length - 1 && msg.role === 'assistant' && !isLoading;
                const previousUserMessage = idx > 0 ? messages[idx - 1] : messages[0];
                const contextualSuggestions = isLastAssistantMessage
                  ? getContextualSuggestions(msg, previousUserMessage)
                  : [];

                return (
                  <Box key={idx}>
                    <Flex justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
                      <Box
                        maxW="80%"
                        borderRadius="lg"
                        p={3}
                        bg={msg.role === 'user' ? 'brand.accent' : 'brand.white'}
                        color={msg.role === 'user' ? 'brand.white' : 'brand.text'}
                        border={msg.role === 'assistant' ? '1px' : 'none'}
                        borderColor="brand.border"
                        boxShadow={msg.role === 'assistant' ? 'sm' : 'none'}
                      >
                        <Text fontSize="sm" whiteSpace="pre-wrap">{msg.content}</Text>
                        <Text fontSize="xs" mt={1} opacity={0.7}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                      </Box>
                    </Flex>

                    {/* Contextual Quick Action Buttons - Show after each assistant message */}
                    {isLastAssistantMessage && contextualSuggestions.length > 0 && (
                      <Box mt={3}>
                        <Text fontSize="xs" color="brand.textMuted" mb={2} fontWeight="semibold">
                          {idx === 0 ? 'Try these:' : 'What would you like to do next?'}
                        </Text>
                        <Flex flexWrap="wrap" gap={2}>
                          {contextualSuggestions.map((action, actionIdx) => (
                            <Box
                              key={actionIdx}
                              as="button"
                              onClick={() => handleQuickAction(action.message)}
                              fontSize="xs"
                              px={3}
                              py={1.5}
                              bg="brand.white"
                              border="1px"
                              borderColor="brand.border"
                              borderRadius="md"
                              color="brand.textSecondary"
                              cursor="pointer"
                              transition="all 0.2s"
                              _hover={{
                                bg: 'brand.accent',
                                color: 'brand.white',
                                borderColor: 'brand.accent',
                                transform: 'translateY(-2px)',
                                boxShadow: 'md',
                              }}
                              _active={{
                                transform: 'translateY(0)',
                              }}
                            >
                              {action.label}
                            </Box>
                          ))}
                        </Flex>
                      </Box>
                    )}
                  </Box>
                );
              })}
              {isLoading && (
                <Flex justify="flex-start" align="center" gap={2}>
                  <Box
                    bg="brand.white"
                    border="1px"
                    borderColor="brand.border"
                    borderRadius="lg"
                    px={4}
                    py={3}
                    boxShadow="sm"
                  >
                    <VStack gap={2} align="start">
                      <Text fontSize="xs" color="brand.textMuted" fontStyle="italic">
                        Henry's AI is thinking...
                      </Text>
                      <HStack gap={1.5}>
                        <Box
                          w="10px"
                          h="10px"
                          bg="brand.accent"
                          borderRadius="full"
                          animation="bounce 1s ease-in-out infinite"
                        />
                        <Box
                          w="10px"
                          h="10px"
                          bg="brand.accent"
                          borderRadius="full"
                          animation="bounce 1s ease-in-out infinite 0.2s"
                        />
                        <Box
                          w="10px"
                          h="10px"
                          bg="brand.accent"
                          borderRadius="full"
                          animation="bounce 1s ease-in-out infinite 0.4s"
                        />
                      </HStack>
                    </VStack>
                  </Box>
                </Flex>
              )}
              <div ref={messagesEndRef} />
            </VStack>
          </Box>

          {/* Input */}
          <Box p={4} bg="brand.white" borderTop="1px" borderColor="brand.divider">
            <HStack gap={2}>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Henry..."
                disabled={isLoading}
              />
              <IconButton
                aria-label="Send message"
                onClick={handleSend}
                isDisabled={isLoading || !input.trim()}
                bg="brand.accent"
                color="brand.white"
                _hover={{ bg: 'brand.accentDark' }}
              >
                <IoSend size={20} />
              </IconButton>
            </HStack>
          </Box>
        </Box>
      )}
    </>
  );
}
