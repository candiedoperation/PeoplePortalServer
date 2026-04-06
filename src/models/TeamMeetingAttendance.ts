/**
  People Portal Server
  Copyright (C) 2026  Atheesh Thirumalairajan

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Document, model, Schema, Types } from "mongoose";

export const AttendanceMethods = ["manual", "qr_scan"] as const;
export type AttendanceMethod = typeof AttendanceMethods[number];

export interface ITeamMeetingAttendance extends Document {
  meetingId: Types.ObjectId;
  teamId: Types.ObjectId;
  userId: Types.ObjectId;
  method: AttendanceMethod;
  attended: boolean;
  recordedAt: Date;
}

const TeamMeetingAttendanceSchema = new Schema<ITeamMeetingAttendance>({
  meetingId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "team_meeting",
  },
  teamId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "teams"
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },
  method: {
    type: String,
    enum: AttendanceMethods,
    required: true
  },
  attended: {
    type: Boolean,
    required: true
  },
  recordedAt: {
    type: Date,
    default: Date.now
  } 
}, { timestamps: true });

TeamMeetingAttendanceSchema.index({ meetingId: 1, teamId: 1, userId: 1});

export const TeamMeetingAttendance = model<ITeamMeetingAttendance>('Team Meeting Attendance', TeamMeetingAttendanceSchema);
