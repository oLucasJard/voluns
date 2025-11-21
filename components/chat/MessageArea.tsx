'use client'

/**
 * 💬 Message Area Component
 * Área de mensagens com input e listagem
 */

import { useState, useEffect, useRef } from 'react'
import { ChatChannel, ChatMessage } from '@/lib/chat/chat-service'
import chatService, { chatHelpers } from '@/lib/chat/chat-service'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import MessageBubble from './MessageBubble'

interface MessageAreaProps {
  channel: ChatChannel
  userId: string
  onBack?: () => void
}

export default function MessageArea({ channel, userId, onBack }: MessageAreaProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    loadMessages()
    markAsRead()

    // Subscribe to realtime messages
    const subscription = chatService.subscribeToMessages(channel.id, {
      onMessage: (message) => {
        setMessages(prev => [...prev, message])
        markAsRead()
      },
      onUpdate: (message) => {
        setMessages(prev => prev.map(m => m.id === message.id ? message : m))
      },
    })

    return () => {
      chatService.unsubscribeFromMessages(channel.id)
    }
  }, [channel.id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = async () => {
    try {
      setLoading(true)
      const data = await chatService.getChannelMessages(channel.id, 50)
      setMessages(data)
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async () => {
    await chatService.markAsRead(channel.id, userId)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return

    try {
      setSending(true)
      await chatService.sendMessage(channel.id, userId, newMessage.trim())
      setNewMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value)
    
    // Auto-resize textarea
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ←
          </button>
        )}
        <div className="text-2xl">{chatHelpers.getChannelIcon(channel)}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 dark:text-white truncate">
            {channel.name}
          </h3>
          {channel.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {channel.description}
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : messages.length > 0 ? (
          <>
            {messages.map((message, index) => {
              const showSender = index === 0 || messages[index - 1].sender_id !== message.sender_id
              const isOwn = message.sender_id === userId

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={isOwn}
                  showSender={showSender}
                />
              )
            })}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">👋</div>
              <p className="text-gray-600 dark:text-gray-400">
                Seja o primeiro a enviar uma mensagem!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            disabled={sending}
            className="
              flex-1 resize-none overflow-hidden
              px-4 py-2 rounded-lg
              bg-gray-100 dark:bg-gray-800
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50
              max-h-32
            "
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            variant="primary"
            className="self-end"
          >
            {sending ? '...' : '📤'}
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          Enter para enviar, Shift+Enter para nova linha
        </p>
      </div>
    </Card>
  )
}


