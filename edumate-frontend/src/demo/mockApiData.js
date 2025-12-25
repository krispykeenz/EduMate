// DEMO MODE FIXTURES
// This module is ONLY used when VITE_DEMO_MODE === 'true'.
// It provides realistic-looking data so the real EduMate UI can run without the backend.
// Remove safely if you ever deploy the full stack.

function hoursFromNow(hours) {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString()
}

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
}

export const demoUser = {
  id: 1,
  name: 'Keenan Burriss',
  email: 'demo.student@edumate.local',
  role: 'student',
  studentId: 'STU-0001'
}

export const demoDashboardStats = {
  activeTutors: 3,
  sessionsThisMonth: 5,
  upcomingSessions: 2,
  averageRating: 4.6,
  totalSessions: 12,
  completedSessions: 10,
  user: {
    firstName: 'Keenan'
  }
}

export const demoUpcomingSessions = [
  {
    id: 101,
    startTime: hoursFromNow(6),
    endTime: hoursFromNow(7),
    location: 'Online (Demo)',
    capacity: 12,
    module: { code: 'CSC101', name: 'Intro to Programming' },
    tutor: { id: 42, name: 'Ava Naidoo' }
  },
  {
    id: 102,
    startTime: hoursFromNow(30),
    endTime: hoursFromNow(31),
    location: 'Library Room B (Demo)',
    capacity: 8,
    module: { code: 'MAT201', name: 'Discrete Mathematics' },
    tutor: { id: 43, name: 'Sipho Dlamini' }
  }
]

export const demoTutorProgress = [
  { name: 'Ava Naidoo', subject: 'Programming', sessions: 4, rating: 4.8, progress: 76, initials: 'AN' },
  { name: 'Sipho Dlamini', subject: 'Math', sessions: 3, rating: 4.5, progress: 62, initials: 'SD' },
  { name: 'Lerato Molefe', subject: 'Statistics', sessions: 2, rating: 4.7, progress: 48, initials: 'LM' }
]

export const demoActivities = [
  {
    id: 1,
    type: 'session_enrolled',
    description: 'Enrolled in CSC101 Study Session',
    createdAt: daysAgo(1)
  },
  {
    id: 2,
    type: 'message_sent',
    description: 'Sent a message to Ava Naidoo',
    createdAt: daysAgo(2)
  },
  {
    id: 3,
    type: 'session_completed',
    description: 'Completed MAT201 Review Session',
    createdAt: daysAgo(4)
  },
  {
    id: 4,
    type: 'session_reviewed',
    description: 'Left a 5-star review for Sipho Dlamini',
    createdAt: daysAgo(6)
  }
]

export const demoConversations = [
  {
    id: 2001,
    type: 'direct',
    isGroup: false,
    name: 'Ava Naidoo',
    userType: 'tutor',
    userId: 42,
    lastMessage: 'See you at the session later today!',
    timestamp: hoursFromNow(-2),
    unreadCount: 1,
    isOnline: true
  },
  {
    id: 2002,
    type: 'direct',
    isGroup: false,
    name: 'Sipho Dlamini',
    userType: 'tutor',
    userId: 43,
    lastMessage: 'I uploaded a quick recap doc (demo).',
    timestamp: hoursFromNow(-20),
    unreadCount: 0,
    isOnline: false
  }
]

export const demoMessagesByConversation = {
  2001: [
    {
      id: 1,
      sender: 'Ava Naidoo',
      content: 'Hi! Want to focus on loops or functions in CSC101?',
      timestamp: hoursFromNow(-6),
      isOwn: false,
      messageType: 'text'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Loops please — for/while are confusing me.',
      timestamp: hoursFromNow(-5.7),
      isOwn: true,
      messageType: 'text'
    },
    {
      id: 3,
      sender: 'Ava Naidoo',
      content: 'Perfect. I’ll bring examples and a mini quiz.',
      timestamp: hoursFromNow(-5.5),
      isOwn: false,
      messageType: 'text'
    }
  ]
}

export const demoGroupChats = [
  {
    id: 3001,
    type: 'session_chat',
    name: 'CSC101 Study Group',
    sessionId: 101,
    session: {
      id: 101,
      module: { code: 'CSC101', name: 'Intro to Programming' },
      tutor: { id: 42, name: 'Ava Naidoo' },
      startTime: demoUpcomingSessions[0].startTime,
      endTime: demoUpcomingSessions[0].endTime,
      location: demoUpcomingSessions[0].location
    },
    participants: [
      {
        id: 1,
        userId: 1,
        userName: 'Keenan Burriss',
        userRole: 'student',
        joinedAt: daysAgo(3),
        unreadCount: 0,
        isOnline: true
      },
      {
        id: 2,
        userId: 42,
        userName: 'Ava Naidoo',
        userRole: 'tutor',
        joinedAt: daysAgo(10),
        unreadCount: 0,
        isOnline: true
      }
    ],
    lastMessage: {
      content: 'Reminder: bring your questions on loops!',
      senderName: 'Ava Naidoo',
      sentAt: hoursFromNow(-3)
    },
    totalMessages: 6,
    unreadCount: 0,
    createdAt: daysAgo(10),
    updatedAt: hoursFromNow(-3)
  }
]

export const demoGroupMessagesByConversation = {
  3001: {
    messages: [
      {
        id: 11,
        conversationId: 3001,
        senderId: 42,
        senderName: 'Ava Naidoo',
        senderRole: 'tutor',
        content: 'Welcome to CSC101 study group (demo)!',
        messageType: 'system',
        attachments: [],
        sentAt: daysAgo(2),
        editedAt: null,
        isRead: true,
        isOwn: false
      },
      {
        id: 12,
        conversationId: 3001,
        senderId: 1,
        senderName: 'Keenan Burriss',
        senderRole: 'student',
        content: 'Thanks! Can we cover while loops?',
        messageType: 'text',
        attachments: [],
        sentAt: hoursFromNow(-4),
        editedAt: null,
        isRead: true,
        isOwn: true
      },
      {
        id: 13,
        conversationId: 3001,
        senderId: 42,
        senderName: 'Ava Naidoo',
        senderRole: 'tutor',
        content: 'Yep — we’ll do while + for + examples.',
        messageType: 'text',
        attachments: [],
        sentAt: hoursFromNow(-3.5),
        editedAt: null,
        isRead: true,
        isOwn: false
      }
    ],
    pagination: {
      page: 1,
      limit: 50,
      total: 3,
      hasMore: false
    }
  }
}

export const demoUploadsResponse = {
  success: true,
  data: {
    attachments: [
      {
        id: 'att-1',
        filename: 'demo-file.txt',
        originalName: 'demo-file.txt',
        mimeType: 'text/plain',
        size: 128,
        url: '/uploads/chat-attachments/demo-file.txt',
        uploadedAt: new Date()
      }
    ],
    message: 'Uploaded (demo mode)'
  }
}
