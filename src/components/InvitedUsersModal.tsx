import React from 'react';
import { X, Users, Check, Clock, Mail } from 'lucide-react';
import { InvitedUser } from '../types/user';
import { format, parseISO } from 'date-fns';

interface InvitedUsersModalProps {
  onClose: () => void;
  invitedUsers: InvitedUser[];
}

export function InvitedUsersModal({ onClose, invitedUsers }: InvitedUsersModalProps) {
  const signedUpUsers = invitedUsers.filter(user => user.hasSignedUp);
  const pendingUsers = invitedUsers.filter(user => !user.hasSignedUp);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Invited Users</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {invitedUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invitations sent</h3>
              <p className="text-gray-600">You haven't invited anyone yet. Start by inviting your first user!</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{invitedUsers.length}</div>
                  <div className="text-sm text-blue-700">Total Invited</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{signedUpUsers.length}</div>
                  <div className="text-sm text-green-700">Signed Up</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{pendingUsers.length}</div>
                  <div className="text-sm text-yellow-700">Pending</div>
                </div>
              </div>

              {signedUpUsers.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    Signed Up ({signedUpUsers.length})
                  </h3>
                  <div className="space-y-2">
                    {signedUpUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Mail className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-900">{user.email}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Invited {format(parseISO(user.invitedAt), 'MMM dd, yyyy')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pendingUsers.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    Pending ({pendingUsers.length})
                  </h3>
                  <div className="space-y-2">
                    {pendingUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Mail className="h-4 w-4 text-yellow-600" />
                          </div>
                          <span className="font-medium text-gray-900">{user.email}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Invited {format(parseISO(user.invitedAt), 'MMM dd, yyyy')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}