import React, { useState } from 'react';
import { Calendar, LogOut, Plus, UserPlus, Users } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { InviteUserModal } from './InviteUserModal';
import { InvitedUsersModal } from './InvitedUsersModal';
import { useInvitations } from '../hooks/useInvitations';

interface HeaderProps {
  userEmail: string;
  userId: string;
  onCreateEvent: () => void;
  eventCount: number;
}

export function Header({ userEmail, userId, onCreateEvent, eventCount }: HeaderProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showInvitedUsersModal, setShowInvitedUsersModal] = useState(false);
  const { invitedUsers } = useInvitations(userId);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Event Scheduler</h1>
              <p className="text-sm text-gray-600">
                {eventCount} {eventCount === 1 ? 'event' : 'events'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">{userEmail}</span>
            
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Invite User</span>
            </button>
            
            <button
              onClick={onCreateEvent}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Event</span>
            </button>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {showInviteModal && (
        <InviteUserModal
          onClose={() => setShowInviteModal(false)}
          currentUserId={userId}
        />
      )}

      {showInvitedUsersModal && (
        <InvitedUsersModal
          onClose={() => setShowInvitedUsersModal(false)}
          invitedUsers={invitedUsers}
        />
      )}
    </>
  );
}