'use client'

/**
 * 💬 Chat Interface Component
 * Interface principal de chat com lista de canais e mensagens
 */

import { useState, useEffect } from 'react'
import { ChatChannel } from '@/lib/chat/chat-service'
import ChannelList from './ChannelList'
import MessageArea from './MessageArea'
import { Card } from '@/components/ui/Card'

interface ChatInterfaceProps {
  userId: string
  churchId: string
}

export default function ChatInterface({ userId, churchId }: ChatInterfaceProps) {
  const [selectedChannel, setSelectedChannel] = useState<ChatChannel | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showChannelList, setShowChannelList] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setShowChannelList(window.innerWidth >= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleChannelSelect = (channel: ChatChannel) => {
    setSelectedChannel(channel)
    if (isMobile) {
      setShowChannelList(false)
    }
  }

  const handleBackToChannels = () => {
    setShowChannelList(true)
  }

  return (
    <div className="flex h-[calc(100vh-200px)] min-h-[600px] gap-4">
      {/* Channel List */}
      <div className={`
        ${isMobile 
          ? showChannelList ? 'w-full' : 'hidden' 
          : 'w-80'
        }
        flex-shrink-0
      `}>
        <ChannelList
          userId={userId}
          churchId={churchId}
          selectedChannelId={selectedChannel?.id}
          onChannelSelect={handleChannelSelect}
        />
      </div>

      {/* Message Area */}
      <div className={`
        flex-1
        ${isMobile && showChannelList ? 'hidden' : 'block'}
      `}>
        {selectedChannel ? (
          <MessageArea
            channel={selectedChannel}
            userId={userId}
            onBack={isMobile ? handleBackToChannels : undefined}
          />
        ) : (
          <Card className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-gray-600 dark:text-gray-400">
                Selecione um canal para começar a conversar
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}


