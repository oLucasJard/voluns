'use client'

/**
 * 💬 Message Bubble Component
 * Balão de mensagem individual
 */

import { ChatMessage } from '@/lib/chat/chat-service'
import { chatHelpers } from '@/lib/chat/chat-service'

interface MessageBubbleProps {
  message: ChatMessage
  isOwn: boolean
  showSender?: boolean
}

export default function MessageBubble({ message, isOwn, showSender = true }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Sender Name */}
        {showSender && !isOwn && message.sender && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 px-2">
            {message.sender.name}
          </p>
        )}

        {/* Message Bubble */}
        <div
          className={`
            px-4 py-2 rounded-2xl
            ${isOwn
              ? 'bg-blue-500 text-white rounded-br-sm'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm'
            }
          `}
        >
          {/* Reply To */}
          {message.reply_to && (
            <div className={`
              text-xs mb-2 pb-2 border-b
              ${isOwn
                ? 'border-blue-400'
                : 'border-gray-300 dark:border-gray-600'
              }
            `}>
              <p className="opacity-75">↩ Respondendo:</p>
              <p className="truncate opacity-90">{message.reply_to.content}</p>
            </div>
          )}

          {/* Content */}
          <p className="whitespace-pre-wrap break-words">
            {message.is_deleted ? (
              <span className="italic opacity-75">[Mensagem deletada]</span>
            ) : (
              message.content
            )}
          </p>

          {/* Edited */}
          {message.is_edited && (
            <span className={`
              text-xs opacity-75 ml-2
              ${isOwn ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}
            `}>
              (editada)
            </span>
          )}
        </div>

        {/* Timestamp */}
        <p className={`
          text-xs text-gray-500 dark:text-gray-500 mt-1 px-2
          ${isOwn ? 'text-right' : 'text-left'}
        `}>
          {chatHelpers.formatMessageTime(message.created_at)}
        </p>

        {/* Reactions */}
        {message.reactions && Object.keys(message.reactions).length > 0 && (
          <div className="flex gap-1 mt-1 px-2">
            {Object.entries(message.reactions).map(([emoji, users]) => (
              <div
                key={emoji}
                className="
                  px-2 py-1 rounded-full
                  bg-gray-100 dark:bg-gray-800
                  text-xs
                  flex items-center gap-1
                "
              >
                <span>{emoji}</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {(users as string[]).length}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


