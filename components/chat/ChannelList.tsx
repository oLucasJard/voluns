'use client'

/**
 * 📋 Channel List Component
 * Lista de canais de chat
 */

import { useState, useEffect } from 'react'
import { ChatChannel } from '@/lib/chat/chat-service'
import chatService, { chatHelpers } from '@/lib/chat/chat-service'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface ChannelListProps {
  userId: string
  churchId: string
  selectedChannelId?: string
  onChannelSelect: (channel: ChatChannel) => void
}

export default function ChannelList({
  userId,
  churchId,
  selectedChannelId,
  onChannelSelect,
}: ChannelListProps) {
  const [channels, setChannels] = useState<ChatChannel[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'direct'>('all')

  useEffect(() => {
    fetchChannels()
  }, [userId])

  const fetchChannels = async () => {
    try {
      setLoading(true)
      const data = await chatService.getUserChannels(userId)
      setChannels(data)
    } catch (error) {
      console.error('Erro ao buscar canais:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredChannels = channels.filter(channel => {
    if (filter === 'unread') return (channel.unread_count || 0) > 0
    if (filter === 'direct') return channel.channel_type === 'direct'
    return true
  })

  if (loading) {
    return (
      <Card className="h-full p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          💬 Mensagens
        </h3>

        {/* Filters */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`
              px-3 py-1 rounded-lg text-sm font-medium transition-colors
              ${filter === 'all'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }
            `}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`
              px-3 py-1 rounded-lg text-sm font-medium transition-colors
              ${filter === 'unread'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }
            `}
          >
            Não lidas
          </button>
          <button
            onClick={() => setFilter('direct')}
            className={`
              px-3 py-1 rounded-lg text-sm font-medium transition-colors
              ${filter === 'direct'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }
            `}
          >
            Diretas
          </button>
        </div>
      </div>

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChannels.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredChannels.map(channel => {
              const isSelected = channel.id === selectedChannelId
              const hasUnread = (channel.unread_count || 0) > 0

              return (
                <button
                  key={channel.id}
                  onClick={() => onChannelSelect(channel)}
                  className={`
                    w-full p-4 text-left transition-colors
                    ${isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="text-2xl flex-shrink-0">
                      {chatHelpers.getChannelIcon(channel)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`
                          font-semibold truncate
                          ${hasUnread
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300'
                          }
                        `}>
                          {channel.name}
                        </h4>
                        {channel.last_message_at && (
                          <span className="text-xs text-gray-500 dark:text-gray-500 flex-shrink-0 ml-2">
                            {chatHelpers.formatMessageTime(channel.last_message_at)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {channel.description || 'Sem mensagens'}
                        </p>
                        {hasUnread && (
                          <Badge variant="error" size="sm" className="ml-2">
                            {channel.unread_count}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center">
              <div className="text-4xl mb-2">
                {filter === 'all' ? '💬' : filter === 'unread' ? '✅' : '👤'}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {filter === 'all' 
                  ? 'Nenhum canal disponível'
                  : filter === 'unread'
                  ? 'Nenhuma mensagem não lida'
                  : 'Nenhuma conversa direta'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}


