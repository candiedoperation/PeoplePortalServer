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

export interface ITeamMeeting extends Document {
  teamId: Types.ObjectId;
  name: string;
  date: Date;
  location: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  isRecurring: boolean;
  recurrenceRule?: string; // iCal RRULE
}

const TeamMeetingSchema = new Schema<ITeamMeeting>({
  teamId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "teams"
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isRecurring: {
    type: Boolean,
    required: true
  },
  recurrenceRule: {
    type: String
  }
}, { timestamps: true });

TeamMeetingSchema.index({ teamId: 1, date: 1 });

export const TeamMeeting = model<ITeamMeeting>('Team Meeting', TeamMeetingSchema);