// DEMO MODE HTTP MOCKS
// This file is ONLY used when VITE_DEMO_MODE === 'true'.
// It intercepts Axios requests and returns fixture data so the real UI works without the backend.
// Remove safely if you ever deploy the full stack.

import axios from 'axios'
import axiosInstance from '../config/axios'

import {
  demoActivities,
  demoConversations,
  demoDashboardStats,
  demoGroupChats,
  demoGroupMessagesByConversation,
  demoMessagesByConversation,
  demoTutorProgress,
  demoUploadsResponse,
  demoUser
} from './mockApiData'

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function toPath(url) {
  if (!url) return ''

  try {
    // Handle absolute URLs
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return new URL(url).pathname
    }
  } catch {
    // fall through
  }

  // Strip query/hash from relative URLs
  return url.split('?')[0].split('#')[0]
}

function jsonResponse(config, data, status = 200) {
  return {
    data,
    status,
    statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
    headers: { 'content-type': 'application/json' },
    config,
    request: {}
  }
}

function matchDemoRoute(config) {
  const method = (config.method || 'get').toUpperCase()
  const path = toPath(config.url || '')

  // Auth
  if (method === 'POST' && path.endsWith('/auth/login')) {
    return { status: 200, data: { token: localStorage.getItem('token') || 'demo', success: true } }
  }
  if (method === 'POST' && path.endsWith('/auth/register')) {
    return { status: 200, data: { success: true } }
  }

  // User
  if (method === 'GET' && path.endsWith('/user')) {
    return { status: 200, data: demoUser }
  }

  // Dashboard
  if (method === 'GET' && path.endsWith('/dashboard/stats')) {
    return { status: 200, data: demoDashboardStats }
  }
  if (method === 'GET' && path.endsWith('/dashboard/upcoming-sessions')) {
    return { status: 200, data: demoUpcomingSessions }
  }
  if (method === 'GET' && path.endsWith('/dashboard/tutor-progress')) {
    return { status: 200, data: demoTutorProgress }
  }
  if (method === 'GET' && path.endsWith('/dashboard/activities')) {
    return { status: 200, data: demoActivities }
  }

  // Conversations (used by UnifiedMessaging)
  if (method === 'GET' && path.endsWith('/conversations')) {
    return { status: 200, data: demoConversations }
  }

  const convoMessagesMatch = path.match(/\/conversations\/(\d+)\/messages$/)
  if (method === 'GET' && convoMessagesMatch) {
    const conversationId = Number(convoMessagesMatch[1])
    return {
      status: 200,
      data: demoMessagesByConversation[conversationId] || []
    }
  }

  const convoMarkReadMatch = path.match(/\/conversations\/(\d+)\/mark-read$/)
  if (method === 'POST' && convoMarkReadMatch) {
    return { status: 200, data: { success: true } }
  }

  // Group chats (session chats) via axiosInstance
  if (method === 'GET' && path.startsWith('/group-chats/groups')) {
    return {
      status: 200,
      data: {
        success: true,
        data: {
          conversations: demoGroupChats,
          pagination: { page: 1, limit: 20, total: demoGroupChats.length, hasMore: false }
        }
      }
    }
  }

  const groupBySessionMatch = path.match(/\/group-chats\/session\/(\d+)$/)
  if (method === 'GET' && groupBySessionMatch) {
    const sessionId = Number(groupBySessionMatch[1])
    const chat = demoGroupChats.find(c => c.sessionId === sessionId) || demoGroupChats[0]
    return {
      status: 200,
      data: {
        success: true,
        data: chat
      }
    }
  }

  const groupMessagesMatch = path.match(/\/group-chats\/(\d+)\/messages$/)
  if (method === 'GET' && groupMessagesMatch) {
    const conversationId = Number(groupMessagesMatch[1])
    const payload = demoGroupMessagesByConversation[conversationId] || { messages: [], pagination: { page: 1, limit: 50, total: 0, hasMore: false } }

    return {
      status: 200,
      data: {
        success: true,
        data: payload
      }
    }
  }

  // File uploads
  if (method === 'POST' && path.endsWith('/files/upload')) {
    return { status: 200, data: demoUploadsResponse }
  }

  // Default: return a friendly error so UI can show an error state instead of failing silently
  return {
    status: 404,
    data: { success: false, error: `Demo mode: no mock for ${method} ${path}` }
  }
}

export function setupDemoApi() {
  if (!isDemoMode) return

  const adapter = async (config) => {
    const { status, data } = matchDemoRoute(config)

    // Add a small delay so loading states look realistic.
    await sleep(status === 200 ? 180 : 50)

    return jsonResponse(config, data, status)
  }

  axios.defaults.adapter = adapter
  axiosInstance.defaults.adapter = adapter
}
